# 0003 - Plain CSS + custom-property tokens, not Tailwind

**Context.** The site needs three distinct themes and genuinely custom
motion work (a hover-triggered palette lean, a route-level view transition,
a font-gated entrance animation). Both lean heavily on native CSS features
(`@property`, `:has()`, `animation-timeline: view()`) that a utility
framework doesn't materially help with.

**Decision.** Plain CSS, with the full token set as custom properties in
`core/styles/tokens.css` and `themes.css`. No Tailwind, no UnoCSS.

**Consequences.** One dependency lighter. Theming is genuinely just
`[data-theme="x"] { --bg-0: ...; }` blocks - no utility-class remapping
needed. The tradeoff is more hand-written layout CSS per component; accepted
because the bespoke motion and gallery work would have dropped to plain CSS
anyway, and a second styling paradigm living alongside it would be more
confusing than one paradigm used everywhere.
