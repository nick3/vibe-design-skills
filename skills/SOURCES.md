# Sources and adaptations

The suite synthesizes transferable methods from first-party sources. It does not copy product-specific visual values, CloudAI components, page templates, evaluator thresholds, or implementation code.

## Vibe Designing Playbook

Source: https://alibaba-cloud-design.github.io/vibe-designing-playbook/

Adapted principles:

- Design I/O as an inspectable chain with return destinations;
- separate design declarations from execution/evaluation contracts;
- feature specification, domain meaning, craft, visual systems, component semantics and templates as different sources;
- controlled GenUI and separation of Agent declaration from client rendering;
- evidence before score;
- page/task-sensitive dimensions and subchecks;
- blockers that cannot be averaged away;
- generator/evaluator isolation;
- prioritized return plans, stop rules and offline calibration.

Project-specific examples from the Playbook are not treated as universal standards.

## Google `DESIGN.md`

Repository: https://github.com/google-labs-code/design.md

Specification: https://github.com/google-labs-code/design.md/blob/main/docs/spec.md

Adapted principles:

- root `DESIGN.md` as a portable visual source for humans and coding Agents;
- machine-readable values plus human-readable rationale;
- lint, diff and export compatibility where the current alpha specification supports them.

The upstream format is marked alpha. `design-system-foundation` requires checking the current specification when network access and authorization permit.

## Agent Skills format and distribution

Specification: https://agentskills.io/specification

CLI: https://github.com/vercel-labs/skills

Adapted principles:

- portable `SKILL.md` metadata and self-contained Skill directories;
- progressive disclosure through `SKILL.md`, `references/`, `assets/`, and deterministic `scripts/`;
- valid parent-directory/name matching and relative resource references;
- GitHub repository discovery through `npx skills add owner/repo`;
- realistic eval cases, with-Skill/baseline comparison, trigger boundary testing, and human review for subjective quality.

The CLI is a distribution dependency, not copied implementation code. Codex-specific `agents/openai.yaml` files are optional interface metadata and do not replace the portable Skill instructions.

## Local research

- `../docs/research/vibe-designing-playbook-notes.md`
- `../docs/research/playbook-skills-gap-analysis.md`
- `../docs/research/skills-cli-installability.md`
- `../docs/research/popular-skills-release-practices.md`

These notes explain the interpretation and the gap analysis that led to the twelve-Skill architecture.
