# 0010 - Module boundaries enforced by dependency-cruiser, not documentation

**Context.** The old site split components by shape (`atoms/blocks/sections`)
rather than by ownership, so nothing stopped any part of the codebase
depending on any other part. A documented convention that nothing checks is
easy to violate by accident, especially for an AI agent working file-by-file
without the full picture in mind.

**Decision.** `.dependency-cruiser.cjs` encodes three rules and runs in
`pnpm check` via `pnpm boundaries`: `modules/*` may not import each other;
`core/` may not import `modules/`; `content/` collection files may not
import `core/` or `modules/`. A violation fails the build, the same as a
type error.

**Consequences.** This caught a real mistake during implementation: sharing
the Engineering timeline row's layout with Frame's series row by importing
across `modules/code` -> `modules/frame` would have violated the first rule.
The actual fix was extracting the shared bit into `core/components/
EntryRow.vue` instead - which is the architecture the rule was designed to
push toward. See `ai/architecture.md`.
