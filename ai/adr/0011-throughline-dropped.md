# 0011 - THROUGHLINE concept dropped

**Context.** An earlier design pass proposed a single brass SVG line
running through every page, morphing between a square wave (Engineering)
and a sine wave (Frame), with the route transition unfolding the new theme
outward from the line itself (`useThroughline`, a per-frame path-lerp
`requestAnimationFrame` loop).

**Decision.** Rejected by Rafael. It was a strong unifying idea, but it
pulled the Engineering page toward a technical-drawing aesthetic - a
reserved monospace marginalia column and a tick grid behind everything -
that read as dense and cramped rather than modern and airy, which was the
actual brief.

**Consequences.** Do not reintroduce the line, the morph, `useThroughline`,
a marginalia gutter, or a light-grey Engineering theme (the palette that
went with it). The replacement unifier is Rafael's own portrait plus one
shared type system and section grammar across Home/Engineering/Frame - see
the "Design concept" section of `ai/initial-plan.md`. Separately, and for
unrelated reasons (see ADR 0006), there is still no `requestAnimationFrame`
loop anywhere in the codebase - that constraint holds on its own merits
now, not because of this rejected direction. (A later, narrower exception -
a bounded `setInterval`, not `requestAnimationFrame`, for the typewriter
effect - was added for unrelated reasons; see ADR 0014.)
