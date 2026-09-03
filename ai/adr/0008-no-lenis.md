# 0008 - No Lenis (smooth scroll)

**Context.** Smooth-scroll libraries like Lenis are common in portfolio
sites for a heavier, more cinematic scroll feel.

**Decision.** Not used. A JS-driven smooth-scroll library inserts a
`requestAnimationFrame` loop between the user's most common input (the
wheel/trackpad) and the pixels - a direct INP liability - and desynchronizes
the native scrollbar thumb from content, breaking find-in-page and
`PageDown`. It must also be disabled under `prefers-reduced-motion`, meaning
two scroll code paths to maintain for a purely aesthetic preference some
visitors actively dislike.

**Consequences.** `scroll-behavior: smooth` handles anchor jumps natively
(and is overridden to `auto` under reduced motion for free via
`core/styles/reset.css`). Where momentum matters (a horizontal series rail
in Frame, not yet built), the plan is native `scroll-snap-type: x
mandatory` - thumb-perfect on touch, keyboard-accessible for free, zero JS.
