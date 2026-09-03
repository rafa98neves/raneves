# 0001 - pnpm with a 7-day dependency cooldown

**Context.** Rafael's non-functional requirement: never install a package
version published less than 7 days ago, as a supply-chain defense (most
malicious versions are caught and yanked within days of publish).

**Decision.** pnpm, pinned via `packageManager` in `package.json` and
`corepack`, with `minimumReleaseAge: 10080` (7 days in minutes) in
`pnpm-workspace.yaml`. npm has an equivalent (`min-release-age`, in days)
but needs npm >= 11.10.0; this machine's npm was older, and pnpm's version
of the feature is longer-established.

**Consequences.** The cooldown must be set *before* the first install, and
package ranges must be loose enough (e.g. `^3.4.0`, not `^3.5.42`) for the
resolver to step back to a compliant version - pinning to the exact latest
patch leaves nothing for it to resolve to and the install hard-fails
(`ERR_PNPM_NO_MATURE_MATCHING_VERSION`). `esbuild` and `sharp` need their
install scripts explicitly approved via `allowBuilds` in
`pnpm-workspace.yaml`, since pnpm blocks lifecycle scripts by default now.
Never add anything to `minimumReleaseAgeExclude` - every exclusion is a hole
in the rule.
