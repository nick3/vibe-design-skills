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

## Local research

- `../docs/research/vibe-designing-playbook-notes.md`
- `../docs/research/playbook-skills-gap-analysis.md`

These notes explain the interpretation and the gap analysis that led to the twelve-Skill architecture.
