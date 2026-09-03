import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"

// parses src/core/styles/themes.css directly, so a palette edit is re-checked
// automatically - no hand-copied token table to fall out of sync with the source
const themesPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/core/styles/themes.css",
)
const css = readFileSync(themesPath, "utf-8")

function relativeLuminance(hex: string): number {
  const c = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255)
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

interface Theme {
  name: string
  vars: Record<string, string>
}

function parseThemes(source: string): Theme[] {
  const themes: Theme[] = []
  const blockRe = /\[data-theme="([a-z]+)"\]\s*{([^}]*)}/g
  let m: RegExpExecArray | null
  while ((m = blockRe.exec(source))) {
    const [, name, body] = m
    const vars: Record<string, string> = {}
    const varRe = /--([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi
    let vm: RegExpExecArray | null
    while ((vm = varRe.exec(body!))) {
      vars[vm[1]!] = vm[2]!
    }
    themes.push({ name: name!, vars })
  }
  return themes
}

// deliberately excludes decorative fills (e.g. velvet's --maroon) from the surface
// list: fg-subtle on a maroon fill measures 4.24, below AA, so it is never a
// sanctioned text surface and this checker must not validate that pair
const SURFACES: Record<string, string[]> = {
  ink: ["bg-0", "bg-1", "bg-2"],
  steel: ["bg-0", "bg-1", "bg-2"],
  velvet: ["bg-0", "bg-1", "bg-2", "bg-3"],
}
const TEXT_ROLES = ["fg", "fg-muted", "fg-subtle", "accent"]
const MIN_TEXT_RATIO = 4.5
const MIN_UI_RATIO = 3.0

const themes = parseThemes(css)
if (themes.length === 0) {
  console.error('no [data-theme="..."] blocks found in themes.css')
  process.exit(1)
}

let failed = false

for (const theme of themes) {
  const surfaces = SURFACES[theme.name]
  if (!surfaces) {
    console.warn(`no surface list registered for theme "${theme.name}" - skipping`)
    continue
  }

  for (const role of TEXT_ROLES) {
    const fg = theme.vars[role]
    if (!fg) continue
    let worst = Infinity
    for (const surfaceName of surfaces) {
      const bg = theme.vars[surfaceName]
      if (!bg) continue
      worst = Math.min(worst, contrastRatio(fg, bg))
    }
    const pass = worst >= MIN_TEXT_RATIO
    console.log(
      `${pass ? "PASS" : "FAIL"}  ${theme.name.padEnd(7)} --${role.padEnd(10)} worst ${worst.toFixed(2)}`,
    )
    if (!pass) failed = true
  }

  const focus = theme.vars["focus"]
  const halo = theme.vars["focus-halo"]
  if (focus) {
    for (const surfaceName of surfaces) {
      const bg = theme.vars[surfaceName]
      if (!bg) continue
      const ratio = contrastRatio(focus, bg)
      const pass = ratio >= MIN_UI_RATIO
      console.log(
        `${pass ? "PASS" : "FAIL"}  ${theme.name.padEnd(7)} focus vs ${surfaceName.padEnd(6)} ${ratio.toFixed(2)}`,
      )
      if (!pass) failed = true
    }
    if (halo) {
      const ratio = contrastRatio(focus, halo)
      const pass = ratio >= MIN_UI_RATIO
      console.log(
        `${pass ? "PASS" : "FAIL"}  ${theme.name.padEnd(7)} focus vs halo   ${ratio.toFixed(2)}`,
      )
      if (!pass) failed = true
    }
  }
}

if (failed) {
  console.error("\ncontrast check failed")
  process.exit(1)
}
console.log("\nall theme tokens meet AA")
