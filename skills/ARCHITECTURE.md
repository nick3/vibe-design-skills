# Vibe Design Skill Architecture

## Purpose

The suite separates durable design truth from task-specific decisions and separates generation from evaluation. This prevents a single Skill from becoming an unreviewable combination of product strategy, styling, implementation, and approval.

## Four layers

### 1. Foundation truth

Durable, project-specific declarations:

- product and domain;
- visual identity and craft;
- component semantics, patterns, and templates;
- optional agentic-interface contract;
- evaluation policy.

The method used to create these documents is project-agnostic. Their contents are not.

### 2. Request and exploration

Task-specific declarations:

- six-layer feature specification;
- template fit;
- information-architecture variants;
- selected or synthesized direction.

Feature decisions may expose foundation gaps, but they do not silently redefine the foundation.

### 3. Production execution

The real artifact is created in explicit layers:

```text
skeleton → semantic fill → interaction/state → visual/craft refinement
```

Tool choice follows the requested deliverable and uncertainty. A browser prototype, design file, implementation, or hybrid can all participate, but the source of truth and synchronization path must be recorded.

### 4. Evidence and evaluation runtime

An independent evaluator:

- freezes the artifact version;
- collects layout, structure, interaction, screenshot/device, runtime, and provenance evidence;
- applies approved subchecks, weights, blockers, and missing-evidence policy;
- returns a verdict and small prioritized plan;
- compares rounds and stops on pass, limit, plateau, regression, or human-decision need.

## Declaration and execution contracts

Declarations explain what counts as correct:

```text
PRODUCT, DOMAIN, SPEC, DESIGN, CRAFT,
COMPONENTS, PATTERNS, TEMPLATES,
AGENTIC-INTERFACE, EVAL
```

Execution contracts explain when and how those declarations enter work:

```text
foundation authoring skills
vibe-design-bootstrap
vibe-design-execute
design-artifact-evaluator
design-system-review
```

Neither category is sufficient alone.

## Authority order

When sources conflict, use the target project's documented authority order. A compatible default is:

1. current law, policy, security, accessibility, and authorized decisions;
2. approved product/domain/design/evaluation sources;
3. current production behavior and authoritative data systems;
4. repeated patterns in approved artifacts;
5. isolated legacy artifacts or Agent inference.

Expose conflicts rather than resolving them by frequency.

## Routing precedence

1. A concrete design/build request triggers `vibe-design-execute`.
2. A foundation-creation request triggers `vibe-design-bootstrap`.
3. A request to judge a rendered artifact triggers `design-artifact-evaluator`.
4. A request to judge the foundation documents triggers `design-system-review`.
5. A request limited to one declaration uses the corresponding specialized skill.
6. A stable interface does not trigger `agentic-interface-foundation` merely because “AI-native” is mentioned.

## Learning loop

```text
artifact finding
  → feature correction
  → repeated pattern identified
  → evidence gathered across features
  → proposed foundation/EVAL update
  → human governance
  → versioned approval
  → future generation and evaluation
```

This is governed learning, not unsupervised self-modification.
