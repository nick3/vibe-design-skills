---
name: component-pattern-foundation
description: Create or reconstruct reusable component semantics and product interaction/page patterns for Agent-assisted design. Use this skill when a team needs COMPONENTS.md, PATTERNS.md, component usage rules, state requirements, pattern semantics, or a normalized inventory from existing Figma/code/UI. Use it after product/domain context and visual roles are sufficiently stable. Do not use it merely to restyle components, build callable page templates, or implement a single page.
---

# Component and Pattern Foundation

Define the product's interaction language: what components and patterns mean, when they are correct, which states they require and how they compose.

Read `assets/COMPONENTS.template.md` and `assets/PATTERNS.template.md` before drafting.

## Modes

- `reconstruct`: extract component and pattern rules from existing design/code evidence.
- `create`: define a minimal semantic catalog for a new product.
- `update`: add or revise rules because a new need exposed a system gap.

## Required inputs

Prefer approved versions of:

- `design/PRODUCT.md`;
- `design/DOMAIN.md`;
- root `DESIGN.md`;
- `design/CRAFT.md`;
- component libraries in design and code;
- representative workflows and states;
- accessibility requirements;
- `design/EVIDENCE.md`, `DECISIONS.md` and `GAPS.md`.

If component meaning depends on unresolved domain rules, record the dependency and do not finalize that rule.

## Outputs

- `design/COMPONENTS.draft.md`, promoted after approval;
- `design/PATTERNS.draft.md`, promoted after approval;
- updates to evidence, decisions and gaps;
- optional deprecation/migration mapping in reconstruct or update mode.

## Workflow

### 1. Inventory by responsibility

Group components by what they communicate or enable:

- action;
- navigation;
- selection and input;
- status and feedback;
- categorization and metadata;
- disclosure and overlays;
- data presentation;
- containers and layout;
- domain-specific meaning.

Do not inventory solely by visual similarity or component file name.

### 2. Resolve semantic collisions

Look for visually similar elements with different responsibilities, such as:

- Badge versus Tag;
- Dialog versus Drawer versus Popover;
- Tabs versus segmented mode switch;
- Dropdown selection versus action Menu versus Command search;
- Skeleton versus Spinner;
- Toast versus persistent Alert.

For each collision define selection criteria, prohibited substitutions and migration notes.

### 3. Define the component contract

Each component entry should include:

- semantic role;
- use when / do not use when;
- content rules;
- allowed variants and sizes;
- required states;
- behavior and dismissal/recovery;
- accessibility and keyboard requirements;
- domain mapping where relevant;
- visual-source reference in `DESIGN.md`;
- implementation/design source;
- status: approved, provisional, deprecated or missing;
- evidence or decision owner.

Do not duplicate exact visual tokens that already live in `DESIGN.md`.

### 4. Define reusable patterns

Patterns are multi-component solutions to recurring tasks, not screenshots to copy. Cover:

- task and page shape;
- entry conditions;
- information hierarchy;
- component composition;
- normal and non-ideal states;
- responsive behavior;
- risk and confirmation points;
- completion and recovery;
- known alternatives and selection criteria.

For a new product, start with the smallest catalog supported by actual product needs. Do not invent dozens of patterns for hypothetical completeness.

### 5. Validate against representative tasks

Check whether a future agent can choose correctly when presented with:

- a status versus a category;
- a local choice versus a global action;
- a lightweight explanation versus a task-blocking decision;
- known versus unknown duration loading;
- destructive versus reversible action;
- desktop versus narrow viewport behavior.

If the documents do not answer these choices, add rules or record a gap.

## Human approval gate

Require design/product approval for:

- new semantic roles;
- deprecations or component mergers;
- behavior changes;
- domain-specific mappings;
- destructive and permission-sensitive patterns;
- new canonical page/task patterns.

## Boundaries

- Do not turn a visual component inventory into a semantic contract without evidence.
- Do not define product-specific meaning from component names alone.
- Do not make templates rigid copies; preserve slots and adaptation rules.
- Keep callable app shells, page skeletons, and structural variants in `TEMPLATES.md` and feature `IA-VARIANTS.md`.
- Do not claim a component is accessible because it visually resembles a known pattern.
- Do not implement or ship component code unless separately requested.
