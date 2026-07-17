# Vibe Design Skills

This directory contains a project-agnostic operating system for Agent-assisted product and UI design. It standardizes how a team creates design truth, turns a request into a real artifact, evaluates rendered evidence, and returns reusable learning to the system.

The skills define methods and output contracts. They do not contain a specific product's colors, fonts, components, business rules, templates, scoring thresholds, or aesthetic direction. Those values must come from the target project's evidence and approved decisions.

See `ARCHITECTURE.md` for layer boundaries and routing, and `SOURCES.md` for the first-party methods and specifications that informed the suite.

## Skill suite

### Orchestration

| Skill | Responsibility | Primary outputs |
| --- | --- | --- |
| `vibe-design-bootstrap` | Create, reconstruct, or update the reusable project foundation | Foundation documents below |
| `vibe-design-execute` | Run a concrete design request from specification through artifact evaluation | Feature spec, variants, artifact, run record and evaluation rounds |

### Foundation truth

| Skill | Responsibility | Primary outputs |
| --- | --- | --- |
| `product-design-context` | Establish product intent and domain truth | `PRODUCT.md`, `DOMAIN.md` |
| `design-system-foundation` | Establish visual identity, roles and normative tokens | Root `DESIGN.md` |
| `design-craft-foundation` | Turn hierarchy, composition, motion and anti-template judgment into rules | `CRAFT.md` |
| `component-pattern-foundation` | Define component semantics and reusable interaction patterns | `COMPONENTS.md`, `PATTERNS.md` |
| `design-template-and-variants` | Establish callable shells/templates and explore structural variants | `TEMPLATES.md`, feature `IA-VARIANTS.md` |
| `agentic-interface-foundation` | Define AX, GenUI freedom and controlled A2UI rendering | `AGENTIC-INTERFACE.md`, optional A2UI schema |
| `design-evaluation-foundation` | Define evidence, dimensions, blockers and release policy | `EVAL.md` |
| `design-system-review` | Independently decide whether the foundation is ready for team use | `REVIEW.md` |

### Feature production and evaluation

| Skill | Responsibility | Primary outputs |
| --- | --- | --- |
| `feature-design-spec` | Turn a concrete request into a six-layer functional and acceptance declaration | Feature `SPEC.md` |
| `design-artifact-evaluator` | Collect real artifact evidence and execute the evaluation gate | Evidence bundle, `evaluation.json`, `EVALUATION.md` |

## Operating flow

```text
Foundation lifecycle
evidence
  → PRODUCT / DOMAIN
  → DESIGN / CRAFT
  → COMPONENTS / PATTERNS / TEMPLATES
  → optional AGENTIC-INTERFACE
  → EVAL
  → independent foundation REVIEW

Feature lifecycle
request
  → feature SPEC
  → template selection or IA variants
  → skeleton
  → semantic fill
  → interaction/state
  → visual/craft refinement
  → rendered artifact
  → independent evidence evaluation
  → return plan / deliver / stop
```

## Standard project output

```text
<target-project>/
├── DESIGN.md
└── design/
    ├── PRODUCT.md
    ├── DOMAIN.md
    ├── CRAFT.md
    ├── COMPONENTS.md
    ├── PATTERNS.md
    ├── TEMPLATES.md
    ├── AGENTIC-INTERFACE.md       # when the product includes Agentic UI
    ├── a2ui-envelope.schema.json  # when structured runtime UI is used
    ├── EVAL.md
    ├── EVIDENCE.md
    ├── DECISIONS.md
    ├── GAPS.md
    ├── AUDIT.md                   # reconstruction/update mode
    ├── REVIEW.md                  # independent foundation review
    └── features/
        └── <feature-id>/
            ├── SPEC.md
            ├── IA-VARIANTS.md     # when structural exploration is needed
            ├── VISUAL-SPEC.md
            ├── RUN.md
            └── evaluations/
                └── round-<n>/
                    ├── evidence/
                    ├── evaluation.json
                    ├── score-calculation.json
                    └── EVALUATION.md
```

Drafts use `.draft.md` until the relevant approval gate is passed. A skill must not silently replace an approved document or prior evaluation round.

## Routing

- Standardize an existing or new product: start with `vibe-design-bootstrap`.
- Design or redesign a concrete feature, page, flow, app, or site: start with `vibe-design-execute`.
- Clarify a request without designing it: use `feature-design-spec`.
- Establish or repair one foundation area: use its specialized foundation skill.
- Review whether the foundation can be adopted: use `design-system-review`.
- Evaluate a real rendered artifact: use `design-artifact-evaluator`.
- Add GenUI/A2UI only when runtime context changes the task, evidence, or decision structure.

## Common operating rules

1. Separate observed evidence, Agent inference, proposed standard, and approved decision.
2. Treat existing designs as evidence, not automatically as the desired standard.
3. Do not invent missing product, domain, brand, behavior, or governance decisions. Record them in `GAPS.md`.
4. Keep each source focused: visual values in `DESIGN.md`, composition quality in `CRAFT.md`, semantics in `COMPONENTS.md`, structures in `PATTERNS.md`/`TEMPLATES.md`, and release policy in `EVAL.md`.
5. Require human approval when product intent, design direction, component meaning, generation freedom, sensitive action, or release policy materially changes.
6. Preserve traceability from task to artifact to evidence to finding to source rule.
7. Use representative artifacts to validate a system, but never hard-code a fixture's values into a reusable skill.
8. Keep generator and evaluator roles separate; evaluate visible evidence rather than hidden intent.
9. Let blockers override averages, and let missing evidence remain visible.
10. Treat repeated failures as candidates for governance review, not automatic new standards.

## Validation status

All twelve Skill drafts, bundled templates/references, and 37 initial eval prompts are included. Static structural validation has been prepared; behavioral comparisons against no-skill baselines and human design review have not yet been run. Follow `VALIDATION.md` before team-wide distribution.
