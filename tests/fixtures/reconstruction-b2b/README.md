# B2B reconstruction fixture

This is a non-normative behavioral fixture. Its product name, domain rules,
observed values, support findings, and migration conflicts test the reusable
Skills; they must never become defaults inside an installable Skill.

## Inputs

- `request.md` is the task and task-level authorization visible to both runs.
- `brief.md` and `domain-glossary.md` are approved target-product sources.
- `component-inventory.md`, `ui-observations.md`, `support-findings.md`, and
  `legacy-tokens.css` are observed evidence with narrower authority.
- `scenario.json` contains hidden acceptance criteria and leakage sentinels. A
  generation or review Agent must not read it.

## Blind comparison protocol

1. Give one fresh Agent the request, six product evidence files, and the current
   `vibe-design-bootstrap` workflow with every routed specialist Skill.
2. Give a second fresh Agent the identical request and evidence without the
   Skills or their output contracts.
3. Freeze both outputs before inspecting or revising either Skill.
4. Give anonymous outputs, `request.md`, and the six evidence files to at least
   two separate reviewers. Do not reveal Skill source, expectations, generation
   history, prior scores, or prior reviews.
5. Score each output from 0–2 on:
   source authority, product/domain truth, conflict handling, output
   traceability, non-invention, component/pattern/template usefulness,
   migration/rollback, responsive/accessibility honesty, review governance, and
   practical proportionality.
6. Generalize from disagreements, rerun the affected candidate against the same
   baseline, and record both improvements and remaining limitations.

Task authorization can establish reconstruction scope and draft creation. It is
not product evidence and does not approve visual values, thresholds, release
gates, or organizational roles beyond what the request explicitly states.
