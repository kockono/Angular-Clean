# Feature-first template scaffold

## Objective and scope

Replace the README architecture example with a neutral feature-first organization and create its empty directories using `.gitkeep`. Reuse the CMS organization, not its restaurant functionality.

Authorized changes: README architecture section and 17 zero-byte placeholders under `src/app/core`, `layout`, `features/example`, and `shared`. Preserve existing runtime files, helpers, interfaces, pipes, and unrelated `.atl/` content. Do not migrate Angular, bootstrap, routing, or business behavior.

## Task

- [x] T1 — Update README architecture and add the matching 17 placeholders; verify documentation and filesystem agree.
  - Route: delegated direct. Preparation required repository inspection; one bounded writer keeps that context separate.
  - Acceptance: actual NgModule entry filenames remain documented; placeholders implement no behavior; future `routes.ts` is explicitly optional and absent; existing code remains untouched.
  - Checks: `git diff --check`, `git diff -- README.md`, `git status --short --untracked-files=all`, and explicit zero-byte placeholder inventory.
  - Runtime tests: N/A; documentation and zero-byte files do not change executable behavior. No explicit TDD configuration found; test-first cycle is not applicable to this work unit. Existing test runner is Jasmine/Karma (`npm test -- --watch=false --browsers=ChromeHeadless`), not executed for this passive change.
  - Rollback: restore the changed README section and remove only the 17 added `.gitkeep` files.

## Delivery and evidence

- Forecast: approximately 120–160 authored changed lines plus this tracking document.
- Delivery strategy: ask-on-risk; no push, PR, or merge authorized.
- RDD: on, global preference. Assessment with the unrelated `.atl/` inventory explicitly excluded returned high (`hot_path`: `src/app/core/auth/.gitkeep`), review due. STATUS requested `external.select_intended_untracked`; collection could not be completed with available tools. Review remains pending; no START, consent, or approval is claimed.
- Work-unit commit: `bb4cbe556f5f5c30c860891bff4078350421651a`; feature branch `docs/feature-first-scaffold`; base `35e1ba3d45fdbf7304d0f424b360293974749cf1`.
- Verification: writer and parent `git diff --check` passed. README diff contains only the architecture section (63 additions, 68 deletions). Independent read-only verifier confirmed the exact 19-file commit inventory, all 17 placeholders zero bytes with mode 100644, unchanged runtime, actual NgModule bootstrap and empty routing, and no `routes.ts`. Existing `.atl/` files remain outside the work unit.
- Authored work-unit size: 156 additions plus deletions, including this document's initial version.
- Next step: user may inspect the completed scaffold; native review is pending its untracked-selection collection. Build, lint, and runtime tests are intentionally not run for documentation and empty placeholders. No push, PR, or merge performed.
