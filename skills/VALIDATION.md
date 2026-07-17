# Validation standard

The suite contains 12 release-candidate Skills and 37 initial eval prompts. Automated checks establish package and distribution integrity; behavioral evals establish usefulness and trigger quality; independent human review remains authoritative for subjective product/UI design quality.

Run the complete automated gate from the repository root:

```bash
bun install --frozen-lockfile
bun run check
```

Do not infer behavioral quality from a green static check.

## Validation goals

1. Confirm each Skill materially improves its target output compared with the same task and inputs without the Skill.
2. Confirm that Skill descriptions trigger for intended tasks and stay quiet for difficult near-misses.
3. Confirm that the suite remains project-agnostic across products, platforms, design maturity, and evidence quality.
4. Confirm that missing product, domain, brand, behavior, and governance decisions remain visible instead of being invented.
5. Confirm that foundation sources remain distinct but cross-traceable.
6. Confirm that a concrete request can travel from feature spec through rendered artifact and independent evaluation.
7. Confirm that Agentic Interface rules preserve user control, renderer control, authorization, and fallback.
8. Confirm that evaluation uses real evidence, deterministic policy, blockers, round comparison, and governed stopping.

## Fixture matrix

Use anonymized but realistic fixtures.

| Fixture | Product/artifact state | Primary purpose |
| --- | --- | --- |
| Existing B2B product | Many screens, inconsistent Figma/code, no formal foundation | Reconstruction, provenance, normalization and migration |
| Partially systemized product | Some tokens/components and incomplete documentation | Preservation versus repair |
| Greenfield product | Brief and research, no UI | First-principles foundation, alternatives and human gates |
| Existing approved foundation | Proposed brand, component, template or policy change | Update, diff, regression and authority |
| High-risk feature | Permissions, sensitive data, partial success and recovery | Six-layer spec and blocker coverage |
| Structurally ambiguous feature | Several plausible task and information priorities | Template fit and genuine IA variants |
| Agentic workflow | Dynamic results, authorization and human decisions | AX, GenUI freedom, A2UI renderer contract and fallback |
| Runnable artifact with seeded defects | Layout, accessibility, dead action, misleading data and visual issues | Browser evidence, scoring, blockers and return plan |
| Two-round artifact | Second round fixes some issues and regresses a critical path | Comparison, best-version retention and stopping |
| Near-miss routine task | Local visual or copy change under approved standards | False-trigger resistance |

Do not use one fixture to judge generality.

## Validation sequence

### Stage 1 — Static suite checks

The automated `bun run check` gate verifies:

- every Skill has valid portable frontmatter and a matching directory name;
- every Skill has valid Codex-facing `agents/openai.yaml` metadata;
- every referenced local asset/reference/script and Markdown link exists;
- every eval file and bundled JSON Schema parses;
- no Skill exceeds the 500-line progressive-disclosure limit;
- the deterministic score helper passes its regression tests;
- `skills.sh.json` covers every Skill exactly once;
- the pinned official `skills` CLI discovers the exact on-disk catalog;
- a clean Codex project installation contains every file from all 12 Skill packages.

Manual source review additionally checks:

- all 12 packages pass the pinned official `skills-ref` validator in
  `RELEASING.md`;
- no fixture-specific product values, tokens, templates, thresholds, credentials, or unsafe instructions leak into reusable content;
- descriptions distinguish adjacent Skills;
- external claims and adapted concepts retain first-party provenance.

### Stage 2 — Per-Skill comparison

For every prompt in each `evals/evals.json`:

1. Run one Agent with the target Skill.
2. Run one baseline Agent with identical inputs and no Skill.
3. Save outputs, timing, and token usage separately.
4. Add objective assertions only where they measure real contract compliance.
5. Generate the Skill Creator review viewer.
6. Ask at least two design reviewers to assess output quality without seeing only aggregate scores.

Do not revise a Skill before both its with-Skill and baseline runs finish.

### Stage 3 — Cross-layer scenarios

Run at least:

1. one reconstruction foundation from evidence to independent foundation review;
2. one greenfield foundation with visual/craft alternatives and approval gates;
3. one ordinary feature from vague request to spec, variants, artifact and prototype evaluation;
4. one Agentic workflow from capability/authority model to A2UI contract and evaluated prototype;
5. one two-round evaluation that includes a deliberate regression.

Check that each downstream output consumes upstream sources instead of recreating them.

### Stage 4 — Trigger evaluation

[`tests/trigger-cases.json`](../tests/trigger-cases.json) contains 20 natural
language queries for each Skill:

- 8 tasks that should trigger;
- 6 difficult adjacent tasks that should not trigger the target Skill;
- 6 clear negative tasks;
- include collisions such as foundation review versus artifact evaluation, patterns versus templates, DESIGN versus CRAFT, and bootstrap versus execute.

The fixture test verifies exact catalog coverage, balance, uniqueness, bilingual
coverage, and that queries do not force activation by naming `$skill-name`.

For a behavioral run, give a fresh evaluator only:

1. all Skill names and frontmatter descriptions;
2. `ARCHITECTURE.md`;
3. case IDs and queries, with expectations removed.

Record exactly one predicted Skill or `none` for every case, then score the run:

```bash
node scripts/score-trigger-evals.mjs predictions.json
```

Require, across at least two fresh runs:

- 100% positive recall for every target Skill;
- 0% target-Skill false positives on its near-miss and negative cases;
- at least 95% exact routing to the expected alternate Skill or `none`;
- manual adjudication of every disagreement without exposing expectations to
  the evaluator or silently changing a description.

Exact alternate routing is diagnostic; the primary safety invariant is whether
the target Skill activates when it should and stays quiet when it should not.
Use new held-out queries whenever a description changes.

## Objective checks by capability

### Common governance

- evidence, inference, proposal, decision and gap are separated;
- approved files/rounds are preserved;
- material decisions have owner/approval status;
- unresolved dependencies are visible;
- reusable Skill output contains no unrelated fixture values.

### Foundation authoring

- standard documents and required sections exist;
- Google `DESIGN.md` lint/diff succeeds when the official tool is available;
- token references resolve and prose agrees with normative values;
- CRAFT rules translate subjective words into observable behavior;
- component semantics and template slots/constraints are explicit;
- Agentic Interface is created only when relevant and separates declaration from rendering;
- EVAL defines evidence, subchecks, policy, blockers, modes, return plan, stop rules and calibration status;
- foundation review checks cross-document integrity and does not pass on file presence or lint alone.

### Feature specification and exploration

- SPEC covers all six layers;
- non-ideal, permission, uncertainty and recovery states are treated according to scope;
- acceptance criteria are observable and trace to source rules;
- IA variants differ structurally and use comparable content/fidelity;
- an existing template is preferred when it truly fits;
- selected/synthesized direction and human trade-offs are recorded.

### Production execution

- artifact type, maturity, source of truth and authorization are explicit;
- spec and structural direction precede high-fidelity work;
- tokens, craft, components, patterns, templates and domain semantics are consumed rather than re-invented;
- runtime system gaps become visible proposals instead of silent literals;
- representative non-ideal and responsive states are rendered;
- generator self-check is not substituted for independent evaluation;
- deployment or release is not inferred from design authorization.

### Agentic Interface

- dynamic UI is justified by changing intent/context/state/decision structure;
- generation freedom is bounded and explained;
- Agent declaration and client rendering responsibilities are separate;
- action authorization, idempotency, stale state, untrusted content, fallback and audit are covered;
- users can understand, verify, correct, cancel/recover and inspect provenance;
- schema/example contains no arbitrary executable UI.

### Artifact evaluation

- evaluated artifact version and evidence scope are frozen and identified;
- DOM/layout/accessibility, page profile, interaction smoke and visual/device evidence are collected when applicable;
- destructive or external side effects are not triggered without authorization;
- every subcheck cites evidence;
- the bundled helper recomputes numeric subchecks/weights and detects inconsistent recorded scores;
- deterministic aggregation follows the approved policy;
- blockers and missing-evidence rules override a flattering average;
- return plan is short, prioritized, actionable and routed;
- round comparison identifies fixed, unchanged, regressed and new findings;
- best valid version and stop state are explicit;
- evaluator does not mutate the artifact during the independent phase.

Do not automate judgments such as brand fit or product usefulness into simplistic keyword assertions. Review those qualitatively with visible artifacts and product context.

## Human review questions

Ask reviewers:

- Would another designer or Agent make a materially better decision with this output?
- Are uncertain and approval-dependent claims honestly represented?
- Does the output preserve room for product-appropriate exploration?
- Are constraints connected to user/product consequences rather than personal taste?
- Can a finding be traced to evidence and returned to the correct source?
- Does the system improve repeatability without freezing one fixture's style?

## Acceptance criteria for a team pilot

- No critical project-specific leakage across fixtures.
- No unsupported decision is presented as approved.
- Reviewers prefer with-Skill outputs for structure, traceability, actionability, and decision quality.
- Objective contract compliance improves materially over baseline.
- Near-miss tasks do not trigger heavyweight workflows.
- One reconstruction and one greenfield foundation pass independent review.
- One ordinary feature and one Agentic feature complete the end-to-end chain.
- Artifact evaluation catches all seeded blockers and does not invent unobserved evidence.
- A regression round retains the best valid earlier version.
- Team owners understand and accept the human approval responsibilities.

## Iteration loop

1. Review outputs and transcripts.
2. Generalize from failures rather than patching one fixture.
3. Keep `SKILL.md` lean; move reusable detail into references, assets, or deterministic scripts.
4. Rerun all affected fixtures against the same baseline.
5. Retest trigger near-misses after description changes.
6. Stop when reviewers are satisfied or changes no longer improve generality.

## Current release-candidate evidence

The non-normative
[`reconstruction-b2b`](../tests/fixtures/reconstruction-b2b/README.md) scenario
completed the first Stage 3 reconstruction comparison. Two fresh final
reviewers preferred the with-Skill candidate:

- product/design governance: 19/20 versus 15/20;
- design-system/accessibility/implementation: 20/20 versus 15/20.

The iteration record is in
[`docs/releases/v0.1.0-rc.1-reconstruction-review.md`](../docs/releases/v0.1.0-rc.1-reconstruction-review.md).
This satisfies the release candidate's representative reconstruction evidence;
it does not satisfy the stable-release human-review or remaining rendered
cross-layer scenario requirements.
