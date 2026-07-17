---
name: vibe-design-bootstrap
description: Coordinate the creation or reconstruction of a complete, reusable Vibe Design documentation foundation for a product. Use this skill whenever a team wants to standardize design work, bootstrap design documentation, rebuild standards from existing UI, start a design system for a new product, or prepare a project for Agent-assisted product and UI design. Do not use it for a routine single-screen design task when approved foundation documents already exist.
---

# Vibe Design Bootstrap

Create the documentation foundation that future design and implementation agents will use. This is an orchestration skill: it coordinates specialized skills and protects the dependency order between their outputs.

## Scope

Use one of three modes:

- `reconstruct`: the product has existing designs, code, components, or brand assets but lacks reliable documentation.
- `create`: the product is new and needs a design foundation from first principles.
- `update`: approved foundation documents exist and a deliberate revision is required.

Do not choose a mode from a keyword alone. Inspect the supplied evidence and existing documents first. If multiple modes are plausible, state the evidence and ask the user to confirm the mode before writing final files.

## Required specialized skills

Run these workflows in order when available:

1. `product-design-context`
2. `design-system-foundation`
3. `design-craft-foundation`
4. `component-pattern-foundation`
5. `design-template-and-variants` in library/reconstruction mode
6. `agentic-interface-foundation` when the product includes AI/Agent/GenUI behavior
7. `design-evaluation-foundation`
8. `design-system-review`

If a specialized skill is unavailable, do not pretend it ran. Report the missing capability and either stop or complete only the explicitly authorized subset.

## Phase 1: Intake and evidence inventory

Inspect the target project's available sources:

- product brief, research, analytics, requirements and business rules;
- approved brand guidance;
- Figma files, variables, components and prototypes;
- production screenshots and representative flows;
- code tokens, CSS variables, themes and component implementations;
- accessibility or regulatory requirements;
- historical design review comments;
- existing `DESIGN.md` or companion documents.
- Agent capabilities, renderer constraints, and action/authorization policy when relevant.

Create or update `design/EVIDENCE.md`. For each source record its location, authority, freshness, scope and reliability.

Classify every important observation as one of:

- `confirmed`: explicitly approved or present in an authoritative source;
- `observed`: consistently present but not formally approved;
- `inferred`: a reasoned interpretation that requires confirmation;
- `conflicting`: credible sources disagree;
- `missing`: required information is unavailable.

Never turn `observed` or `inferred` evidence into a final standard without an approval record.

## Gate A: Confirm scope and mode

Before creating standards, present:

- selected mode and why;
- target products/platforms;
- evidence coverage and blind spots;
- intended output files;
- decisions that will require design-team approval.

Continue after the user or designated design owner confirms the scope.

## Phase 2: Establish product and domain truth

Use `product-design-context` to produce draft `PRODUCT.md` and `DOMAIN.md` before visual-system work. Visual choices need a product purpose and domain boundary; otherwise they become decoration without responsibility.

## Phase 3: Establish visual identity and craft

Use `design-system-foundation` in the selected mode. It must create a Google `DESIGN.md`-compatible draft and supporting audit, decisions and gaps. In reconstruction mode, it must distinguish canonical patterns from legacy accidents. In create mode, it must show coherent alternatives before selecting one.

Use `design-craft-foundation` to translate hierarchy, composition, typography usage, density, content, motion, feedback, accessibility, and anti-template judgment into executable rules. Keep exact visual values in `DESIGN.md` and composition quality in `CRAFT.md`.

## Gate B: Confirm design direction

Do not finalize `DESIGN.md` until the design owner confirms:

- visual intent;
- palette and typography roles;
- density, spacing and shape language;
- craft thesis and product-specific expression;
- component visual strategy;
- deliberate exceptions and unresolved gaps.

## Phase 4: Establish component, pattern and template semantics

Use `component-pattern-foundation` after product/domain truth and visual roles are stable. It should describe when components and patterns are correct, not merely list available assets.

Use `design-template-and-variants` in library-create or reconstruct mode to establish a small, evidence-backed set of callable shells and page/task templates. Do not turn every historical screen into a canonical template.

## Phase 5: Establish Agentic Interface contract when relevant

If the product contains conversational Agents, autonomous actions, dynamic UI, generated reports, or human-in-the-loop decisions, use `agentic-interface-foundation`. Define generation freedom, user control, authorization, lifecycle, declaration/rendering boundaries, fallbacks, and evidence requirements.

Do not add this document merely to make a stable product appear “AI-native.”

## Phase 6: Establish evaluation contract

Use `design-evaluation-foundation` to define evidence requirements, quality dimensions, blockers and approval modes. Thresholds and blockers are governance decisions; require human confirmation.

## Gate C: Independent review

Use `design-system-review` to review the complete set without relying on the generator's hidden reasoning. Resolve blocking findings before replacing approved documents.

## Final report

Report:

- mode used;
- sources inspected and major evidence gaps;
- files created or changed;
- decisions approved;
- unresolved gaps and owners;
- validation actually performed;
- next recommended pilot task.

Do not claim the foundation is validated merely because all files exist.
