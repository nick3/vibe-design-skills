# Validation plan

The suite contains 12 draft Skills and 37 initial eval prompts. Behavioral evals have not yet been run. Validate before installation or team-wide distribution.

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

- every Skill has valid frontmatter and a matching directory name;
- every referenced local asset/reference exists;
- every eval file and bundled JSON schema parses;
- no Skill exceeds the progressive-disclosure size target without a justified reference split;
- no fixture-specific product values, tokens, templates, thresholds, or credentials leak into reusable instructions;
- descriptions distinguish adjacent Skills.

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

Create at least 20 realistic trigger queries for each Skill:

- 8–10 tasks that should trigger;
- 8–10 difficult adjacent tasks that should not trigger;
- include collisions such as foundation review versus artifact evaluation, patterns versus templates, DESIGN versus CRAFT, and bootstrap versus execute.

Use held-out queries when tuning descriptions.

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
