---
name: design-system-review
description: Independently review a Vibe Design foundation document set and decide whether it is ready for team use. Use this skill after creating, reconstructing, or updating PRODUCT.md, DOMAIN.md, DESIGN.md, CRAFT.md, COMPONENTS.md, PATTERNS.md, TEMPLATES.md, AGENTIC-INTERFACE.md, or EVAL.md; when validating Google DESIGN.md compatibility; or when checking cross-document contradictions, unsupported assumptions, traceability, representative previews, and migration regressions. This skill reviews foundation readiness, not a single feature artifact, and must not silently rewrite approved standards.
---

# Vibe Design Foundation Review

Review the visible documentation and evidence as an independent gate. Judge what the documents and artifacts actually establish, not what their creators intended to establish.

Read:

- `references/review-rubric.md`
- `assets/REVIEW.template.md`

## Review modes

- `foundation-draft`: first complete documentation set before adoption.
- `reconstruction`: standards derived from existing design evidence.
- `greenfield`: standards created for a new product.
- `update`: proposed revision to approved documents.

State the mode and review scope at the top of the report.

## Expected inputs

Review all available items:

- root `DESIGN.md` or proposed draft;
- `design/PRODUCT.md`;
- `design/DOMAIN.md`;
- `design/CRAFT.md`;
- `design/COMPONENTS.md`;
- `design/PATTERNS.md`;
- `design/TEMPLATES.md`;
- `design/AGENTIC-INTERFACE.md` and A2UI schema when applicable;
- `design/EVAL.md`;
- evidence, audit, decisions and gaps;
- representative rendered artifacts;
- previous approved documents in update mode.

Missing inputs are findings, not permission to assume they exist.

## Review workflow

### 1. Establish provenance and authority

Check:

- document status, owner, scope and freshness;
- traceability to evidence or explicit decisions;
- whether inferred rules are labeled;
- whether unresolved gaps are visible;
- whether approvals match the claimed status.

### 2. Check Google DESIGN.md compatibility

When the official tool is available, run:

```bash
npx @google/design.md lint DESIGN.md
```

In update mode run:

```bash
npx @google/design.md diff DESIGN-old.md DESIGN.md
```

Do not install dependencies or access the network without required authorization. If the tool cannot run, record `official_cli_not_run` and perform the structural checks described in the rubric.

### 3. Review each document on its own terms

Check whether each file fulfills its responsibility without absorbing another file's job.

- `PRODUCT.md`: users, jobs, outcomes, principles, scope and non-goals.
- `DOMAIN.md`: terminology, entities, states, risk, permissions and sensitive data.
- `DESIGN.md`: visual intent, normative tokens and rationale.
- `CRAFT.md`: hierarchy, composition, content, motion, accessibility and product-specific quality rules.
- `COMPONENTS.md`: semantic selection, states, behavior and accessibility.
- `PATTERNS.md`: recurring task/page structures, adaptation and recovery.
- `TEMPLATES.md`: callable shells, regions, slots, constraints and responsive transformations.
- `AGENTIC-INTERFACE.md`: generation freedom, user control, declaration/rendering boundary, authorization and fallback.
- `EVAL.md`: evidence, dimensions, blockers, modes and return plans.

### 4. Review cross-document integrity

Trace representative decisions through the set:

- product task to pattern;
- domain state to component semantic role;
- component visual role to `DESIGN.md` token;
- template region to approved pattern/component and craft rule;
- Agent-declared action to renderer, authorization, fallback and audit rule when applicable;
- evaluation subcheck to its source document;
- identified gap to owner or next action.

Flag contradictions, duplication that can drift, missing references and circular definitions.

### 5. Review representative artifacts

When previews or real screens are available, check that:

- visual intent is observable;
- typography, color, spacing, shape and hierarchy use the declared system;
- composition, content, motion and product expression follow the craft standard;
- components express the documented semantics;
- templates preserve the intended task and responsive order;
- agentic surfaces stay within the approved generation and authority boundary;
- non-ideal states and responsive behavior are credible;
- the system does not merely recreate one reference screen;
- the product retains a distinctive but appropriate identity.

If no representative artifact is available, the design system can be structurally reviewed but not visually validated.

### 6. Decide and return

Use one verdict:

- `PASS`: ready for the stated scope, with no blockers.
- `PASS_WITH_FOLLOW_UP`: usable for a limited scope; non-blocking work is owned and explicit.
- `REVISE`: important gaps or contradictions prevent reliable team use.
- `BLOCKED`: evidence or authority is insufficient to complete review.

Prioritize a small return plan. Do not produce an unranked wish list.

## Finding severity

- `blocker`: unsafe, contradictory, untraceable or unusable for the claimed scope.
- `major`: likely to cause inconsistent Agent outputs or material migration errors.
- `minor`: localized clarity or completeness issue.
- `note`: observation or future improvement without current impact.

## Mutation policy

Default to report-only review. Do not modify approved standards unless the user separately authorizes fixes. If authorized, preserve the original, apply scoped changes and rerun the review.

## Boundaries

- Do not give PASS based on file presence alone.
- Do not give PASS based only on Google lint.
- Do not compensate for missing product/domain rules with visual guesses.
- Do not treat a polished preview as proof of reusable system coverage.
- Do not punish an explicit, owned gap more severely than a hidden assumption.
- Do not expose or rely on private generator reasoning.
