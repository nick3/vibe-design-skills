# Vibe Design Skills

A project-agnostic Skill system for governed Agent-assisted product and UI design.

This repository turns design judgment into reusable declarations, execution workflows, evidence-based evaluation, and a governed learning loop. It is informed by Alibaba Cloud Design's Vibe Designing Playbook and Google's `DESIGN.md` specification without copying a sample product's visual values, components, templates, or scoring thresholds.

> Status: draft suite. Static checks pass; behavioral comparisons and human design review are still pending.

## What is included

The repository contains 12 Skills across four layers:

```text
Foundation truth
  → PRODUCT / DOMAIN / DESIGN / CRAFT
  → COMPONENTS / PATTERNS / TEMPLATES
  → optional AGENTIC-INTERFACE / EVAL

Request and exploration
  → feature SPEC / IA variants

Production execution
  → skeleton / semantic fill / interaction / craft / artifact

Evidence and evaluation
  → browser evidence / subchecks / blockers
  → return plan / iterate / stop
```

Two orchestration Skills provide the primary entrypoints:

- `vibe-design-bootstrap` creates, reconstructs, or updates a project's reusable design foundation.
- `vibe-design-execute` takes a concrete feature from an ambiguous request through a rendered artifact and independent evaluation.

See:

- [`skills/README.md`](skills/README.md) for the complete Skill catalog and output contract.
- [`skills/ARCHITECTURE.md`](skills/ARCHITECTURE.md) for layer boundaries and routing.
- [`skills/VALIDATION.md`](skills/VALIDATION.md) for the planned evaluation process.
- [`skills/SOURCES.md`](skills/SOURCES.md) for first-party sources and adaptations.

## Repository structure

```text
.
├── skills/
│   ├── vibe-design-bootstrap/
│   ├── vibe-design-execute/
│   ├── feature-design-spec/
│   ├── product-design-context/
│   ├── design-system-foundation/
│   ├── design-craft-foundation/
│   ├── component-pattern-foundation/
│   ├── design-template-and-variants/
│   ├── agentic-interface-foundation/
│   ├── design-evaluation-foundation/
│   ├── design-artifact-evaluator/
│   └── design-system-review/
└── docs/research/
```

Each Skill includes:

- `SKILL.md` with trigger conditions and workflow;
- optional `assets/`, `references/`, and deterministic `scripts/`;
- `evals/evals.json` with realistic initial validation prompts.

## Design principles

1. Existing designs are evidence, not automatic standards.
2. Observations, inferences, proposals, and approved decisions remain distinct.
3. Product, domain, visual identity, craft, component semantics, templates, and evaluation policy have separate sources of truth.
4. A concrete feature starts with an executable specification rather than jumping from one sentence to a polished screen.
5. Runtime UI generation stays bounded by approved components, renderer rules, authorization, accessibility, and fallback behavior.
6. Evaluation begins with visible evidence; blockers cannot be averaged away.
7. Generators and evaluators remain separate.
8. Repeated failures become governed learning candidates, not automatic self-modification.

## Using the Skills

Treat this repository as source material until the validation plan is complete.

1. Select the Skill that matches the task using [`skills/ARCHITECTURE.md`](skills/ARCHITECTURE.md).
2. Import or copy that Skill directory using your Agent platform's supported Skill mechanism.
3. Keep project-specific outputs in the target product repository, not in this reusable Skill source.
4. Review and approve product, design, security, and release-governance decisions at the gates identified by each Skill.
5. Validate on contrasting fixtures before adopting the suite across a team.

## Validation

The suite currently includes 37 initial eval prompts. Static validation covers:

- Skill metadata and directory naming;
- progressive-disclosure size limits;
- local asset/reference integrity;
- JSON and schema syntax;
- project-specific leakage checks;
- deterministic evaluation score recomputation.

Behavioral with-Skill versus no-Skill comparisons and human review have not yet been run. See [`skills/VALIDATION.md`](skills/VALIDATION.md).

## Sources

- [Alibaba Cloud Design — Vibe Designing Playbook](https://alibaba-cloud-design.github.io/vibe-designing-playbook/)
- [Google Labs — `design.md`](https://github.com/google-labs-code/design.md)

Research and the historical gap audit are retained under [`docs/research/`](docs/research/).

## License

No open-source license has been selected yet. Public visibility of this repository does not by itself grant permission to copy, modify, or redistribute its contents. A license can be added after the repository owner chooses the intended terms.
