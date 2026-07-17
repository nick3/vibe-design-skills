# Releasing

This repository distinguishes package integrity from demonstrated design effectiveness.

## Release levels

### Release candidate

A commit may be called a release candidate when local static validation, deterministic tests, and CLI discovery pass, while remote distribution or behavioral review still has an explicitly tracked gap.

### Public preview (`0.x`)

A public preview requires:

- an explicit root license and aligned README wording;
- complete local and remote discovery of all cataloged Skills;
- a clean Codex installation containing each Skill's bundled resources;
- green CI on the release commit;
- security and provenance review;
- representative forward tests of both orchestration entrypoints;
- an honest validation report describing untested or provisional behavior.

### Stable (`1.0`)

A stable release additionally requires:

- with-Skill versus no-Skill comparisons on contrasting reconstruction and greenfield fixtures;
- trigger and near-miss evaluation for all Skill descriptions;
- cross-layer feature execution and independent artifact evaluation;
- independent human product/UI design review against the acceptance criteria in `skills/VALIDATION.md`;
- no unresolved release blocker in the evaluation report.

Static validation alone must never be presented as proof that a Skill improves design quality.

## Release checklist

1. Confirm the worktree contains only intended release changes.
2. Review all source and third-party notices.
3. Run:

   ```bash
   bun install --frozen-lockfile
   bun audit
   bun run check
   ```

4. Validate every Skill with the official reference implementation:

   ```bash
   for skill in skills/*; do
     test -f "$skill/SKILL.md" || continue
     uvx --from 'git+https://github.com/agentskills/agentskills@38a2ff82958afee88dadf4831509e6f7e9d8ef4e#subdirectory=skills-ref' \
       skills-ref validate "$skill"
   done
   ```

   The same pinned validator runs in GitHub Actions; the local command catches
   specification problems before pushing.

5. Perform a clean local installation and inspect installed resources.
6. Push the candidate commit and wait for GitHub Actions to pass.
7. Verify the published artifact:

   ```bash
   npx skills add nick3/vibe-design-skills --list
   ```

8. Confirm the remote command reports the exact catalog and no malformed Skill is skipped.
9. Record the behavioral evidence required for the release level, plus any
   available human-review evidence, in a versioned file under `docs/releases/`.
10. Move relevant changelog entries from `Unreleased` to the release version and date.
11. Create an annotated `vX.Y.Z` tag and GitHub Release that link to the validation report.
12. Re-run remote installation from the tag or release commit and record rollback guidance.

Do not publish or tag from a dirty worktree, a commit with failing CI, or a state whose README overstates its evaluation maturity.
