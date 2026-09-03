# 0004 - Typed TypeScript locale files, not JSON

**Context.** vue-i18n conventionally loads messages from JSON/YAML. JSON
gives no compile-time guarantee that a Portuguese file has every key its
English counterpart does - a missing key degrades to a runtime warning (and
the English fallback rendering silently) rather than failing anything.

**Decision.** `src/i18n/locales/en.ts` and `pt.ts` are plain TypeScript
modules, each exported as `const en: MessageSchema = {...}`. Missing or
misspelled keys are `vue-tsc` errors, at the exact file and line.

**Consequences.** No `@intlify/unplugin-vue-i18n` (see ADR 0005) - that
plugin precompiles JSON/YAML message files and SFC `<i18n>` blocks, neither
of which this project has; it would sit in the config doing nothing.
Collection translations (timeline, projects, series) use
`Record<ExactIdUnion, Translation>` rather than `Record<string,
Translation>` specifically to get full-union exhaustiveness checking - see
ADR 0013 for how this replaced a runtime parity script entirely.
