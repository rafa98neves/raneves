# 0005 - No @intlify/unplugin-vue-i18n

**Context.** This plugin is the standard companion to vue-i18n in most Vite
setups - it precompiles message files into optimized render functions ahead
of time. It was in the original plan and the first draft of
`vite.config.ts`.

**Decision.** Not used. The plugin's precompilation targets JSON/YAML
message files and SFC `<i18n>` custom blocks. This project's locale files
are plain TypeScript modules (ADR 0004), which Vite already bundles
normally through its standard TS pipeline - the plugin has nothing to
precompile here.

**Consequences.** One fewer dependency, `vite.config.ts` stays simpler. If a
future need for SFC-local `<i18n>` blocks or JSON message files arises,
revisit this - but that would be a real reason to reconsider ADR 0004 too,
not just re-add this plugin on top of it.
