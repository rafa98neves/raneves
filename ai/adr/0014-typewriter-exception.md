# 0014 - A bounded setInterval exception for the typewriter effect

**Context.** Rafael asked for a typing animation on the first statement of
both Engineering ("Now") and Frame ("Why"). Every other animation on this
site is CSS-only (`ai/adr/0006`), specifically to avoid a main-thread loop
competing with scroll/input. A genuine character-by-character reveal across
wrapped, multi-line, rich text (inline links and bold spans included) has no
CSS-only solution - the classic `steps()` + `width` typewriter trick only
works for a single unwrapped line, which these multi-line statements are
not.

**Decision.** `core/motion/useTypewriter.ts` uses a `setInterval` that
reveals one character per tick (`~1000/45`ms, so ~45 chars/sec) and clears
itself the moment the full text is visible. It is not a `requestAnimationFrame`
loop, it is not tied to scroll, and it runs once, briefly (a few seconds), on
mount - not for the life of the page.

**Consequences.** This is the one documented exception to "no main-thread
animation" (`ai/adr/0011` said that was true as of the motion work that
predates this decision - it no longer is). Skips entirely under
`prefers-reduced-motion` (renders the full text immediately), and also
skips on every visit after the first within a browser tab - `sessionKey`
gates it through `sessionStorage`, so re-visiting `/code` or `/frame` later
in the same session shows the finished text immediately instead of
replaying the reveal. Reuses
`RichText.vue` for rendering - the composable just truncates `Paragraph[]`
down to the currently-visible character count, so no separate rendering
path was needed. Do not extend this pattern to more than the two statements
it exists for without reconsidering the cost; a `setInterval` per instance
is cheap alone but is exactly the kind of thing that stops being cheap if
copy-pasted everywhere.
