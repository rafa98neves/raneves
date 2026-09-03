# 0007 - No WebGL

**Context.** Early design exploration considered a WebGL treatment for
Frame (film grain, depth, a shader-driven transition).

**Decision.** No WebGL, no Three.js/TresJS. Three.js even aggressively
tree-shaken is well over 100KB gzipped, costs shader-compile time exactly
when chasing a fast LCP, and burns battery on the device class most likely
to be viewing a photography site (a phone). A non-WebGL fallback would be
required anyway for low-power/no-WebGL visitors, meaning two implementations
of the same effect would ship, and most visitors would only ever see the
cheap one.

**Consequences.** Every effect that might have wanted WebGL has a cheaper
CSS/canvas equivalent: film grain as a tiled, `translate3d`-animated
pseudo-element; bokeh as pre-blurred build-time image variants; the maroon
photo grade as `mix-blend-mode: multiply`, not a shader. If a genuine
one-off WebGL "toy" is wanted later, it belongs on its own lazy route that
nothing else depends on loading.
