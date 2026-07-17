# Repository instructions for Agents

These instructions apply to the entire repository. This repository is a
portable Agent Skills catalog, not a product-specific design system.

## Mission

Improve reusable product and UI design workflows while preserving evidence,
authority, safety, routing clarity, installation portability, and independent
evaluation.

Read these files before changing behavior:

- `skills/ARCHITECTURE.md` for layer ownership and routing;
- `skills/SOURCES.md` for provenance and adaptation boundaries;
- `skills/VALIDATION.md` for behavioral evidence requirements;
- `CONTRIBUTING.md` for package and pull-request rules;
- `RELEASING.md` for release gates.

## Non-negotiable boundaries

- Treat existing product artifacts as evidence, not automatic standards.
- Keep observations, inferences, proposals, and approved decisions distinct.
- Never turn a fixture's product rules, visual values, components, templates,
  or thresholds into reusable suite defaults.
- Keep generators and independent evaluators separate. An author self-check is
  not an independent review.
- Do not invent permissions, approval authority, business rules, accessibility
  conformance, research findings, or tool evidence.
- Do not claim a rendered, tested, deployed, or reviewed artifact unless the
  corresponding tool evidence exists.
- Preserve explicit stopping rules for missing authority, unsafe operations,
  destructive changes, deployment, and external communication.
- Do not add or change the root license without the repository owner's explicit
  choice.

## Package contract

- Keep installable packages at `skills/<name>/SKILL.md`.
- Do not add a repository-root `SKILL.md`; it shadows the catalog in default
  CLI discovery.
- Keep frontmatter to the portable `name` and `description` profile.
- Match each Skill name to its directory and keep `SKILL.md` under 500 lines.
- Keep every runtime resource inside its owning Skill directory. The installer
  does not copy repository-level architecture files or resolve Skill
  dependencies.
- Add or update `agents/openai.yaml` and at least three realistic eval cases
  whenever a Skill is added or renamed.
- Put detailed guidance in directly referenced `assets/`, `references/`, or
  `scripts/` files instead of expanding the main instructions indefinitely.
- Do not add executable, networked, credential-handling, or file-mutating
  helpers without documenting their trust surface and adding focused tests.

## Working approach

1. Inspect the affected source, adjacent Skills, routing rules, and existing
   tests before editing.
2. Make the smallest reusable change that fixes the real workflow problem.
3. Add positive, difficult, and near-miss evidence when routing or behavior
   changes.
4. Keep generated evaluation outputs separate from normative Skill source.
5. Update provenance, security, compatibility, migration, and release
   documentation when the change affects those contracts.

## Required validation

Run from a clean dependency state:

```bash
bun install --frozen-lockfile
bun run check
```

For dependency or release changes, also run:

```bash
bun audit
```

Use `bun run check:source -- <source>` for an explicit local path, Git source,
or candidate ref. `bun run check:remote` intentionally checks the public default
branch and must report the exact catalog.

Instruction changes require proportionate with-Skill/baseline evidence and an
independent review. Static validation proves package integrity, not design
quality.

## Release safety

Do not tag or publish when the worktree is dirty, CI is failing, the root
license is missing or inconsistent, the changelog and validation report
disagree, or the public default branch fails exact remote discovery and clean
installation.
