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
- RDD: on, global preference. Initial current-changes assessment refused the undeclared untracked inventory; no risk conclusion drawn. Assess the isolated committed work unit next.
- Work-unit commit: pending; feature branch `docs/feature-first-scaffold`.
- Verification: writer and parent `git diff --check` passed. README diff contains only the architecture section (63 additions, 68 deletions). Writer read back all 17 empty placeholders. Parent status confirms no runtime-file modifications and leaves existing `.atl/` files outside the work unit.
- Next step: record the work-unit commit and its scoped assessment. Build, lint, and runtime tests are intentionally not run for documentation and empty placeholders.
