# Vibe Design Skills

[![Validate](https://github.com/nick3/vibe-design-skills/actions/workflows/validate.yml/badge.svg)](https://github.com/nick3/vibe-design-skills/actions/workflows/validate.yml)
[![skills.sh](https://skills.sh/b/nick3/vibe-design-skills)](https://skills.sh/nick3/vibe-design-skills)

A project-agnostic Agent Skills suite for governed, evidence-based product and UI design.

The suite turns design judgment into reusable product/design declarations, executable workflows, independent evaluation, and a governed learning loop. It is informed by Alibaba Cloud Design's Vibe Designing Playbook and Google's `DESIGN.md` specification without copying a sample product's visual values, components, templates, or scoring thresholds.

> **Status: release candidate.** Static, security, official-format, local CLI,
> representative entrypoint, B2B reconstruction, candidate CI, and candidate
> branch remote-install checks pass. A root license and 12/12 discovery from the
> public default branch remain blockers for the first public preview. Rendered
> cross-layer fixtures and independent human design review remain required for
> stable `v1.0`.

## Install

The repository already uses the standard `skills/<name>/SKILL.md` layout supported by the open [`skills` CLI](https://github.com/vercel-labs/skills). You do not need to clone this repository or publish it as an npm package.

```bash
# Inspect the complete catalog without installing
npx skills add nick3/vibe-design-skills --list

# Choose Skills and target Agents interactively
npx skills add nick3/vibe-design-skills
```

For a reproducible Codex installation:

```bash
# Install the complete suite into the current project
npx skills add nick3/vibe-design-skills --skill '*' --agent codex --yes

# Install the complete suite for the current user
npx skills add nick3/vibe-design-skills --skill '*' --agent codex --global --yes

# Install one focused Skill
npx skills add nick3/vibe-design-skills --skill feature-design-spec --agent codex
```

Codex project Skills are installed under `.agents/skills/`; global Skills are installed under `~/.codex/skills/`. The same CLI supports many other [Agent targets](https://github.com/vercel-labs/skills#supported-agents).

Use explicit `--skill` and `--agent` flags in documentation or automation. A plain command is interactive in a normal terminal, but the CLI may auto-select the detected Agent and all discoverable Skills when it is run from inside an Agent environment. Do not use `--all` when you mean “all Skills for Codex”; `--all` targets every detected Agent.

Update or remove installed Skills with:

```bash
npx skills update
npx skills remove vibe-design-bootstrap --agent codex
```

## Start here

| Goal | Entry Skill | Example request |
| --- | --- | --- |
| Build or reconstruct a reusable product design foundation | `vibe-design-bootstrap` | `Use $vibe-design-bootstrap to reconstruct our design foundation from the current product, Figma, and code.` |
| Design or redesign a concrete feature end to end | `vibe-design-execute` | `Use $vibe-design-execute to take this feature from an ambiguous request through a rendered and evaluated artifact.` |
| Review whether foundation documents are ready for team adoption | `design-system-review` | `Use $design-system-review to independently review this design foundation.` |
| Evaluate a real rendered screen, flow, or prototype | `design-artifact-evaluator` | `Use $design-artifact-evaluator to collect evidence and evaluate this prototype without modifying it.` |

The two orchestration Skills call on the specialized capabilities conceptually, but the CLI does not resolve Skill-to-Skill dependencies. Install all 12 Skills for the complete workflow.

## What is included

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
  → browser or device evidence / subchecks / blockers
  → return plan / iterate / stop
```

The catalog contains 12 Skills:

- 2 orchestration entrypoints;
- 6 product/design foundation capabilities;
- 2 feature specification and structural exploration capabilities;
- 2 independent review and evaluation capabilities.

See [the complete Skill catalog](skills/README.md) and [architecture and routing rules](skills/ARCHITECTURE.md).

Each installable Skill is self-contained and can include:

- `SKILL.md` for triggering and procedural instructions;
- `agents/openai.yaml` for Codex-facing display metadata;
- `assets/` for output templates and schemas;
- `references/` for on-demand domain guidance;
- `scripts/` for deterministic operations;
- `evals/evals.json` for realistic behavioral cases.

Repository-level files such as `skills/ARCHITECTURE.md` are documentation for maintainers and are not copied when one Skill is installed.

## Design principles

1. Existing designs are evidence, not automatic standards.
2. Observations, inferences, proposals, and approved decisions remain distinct.
3. Product, domain, visual identity, craft, component semantics, templates, and evaluation policy have separate sources of truth.
4. A concrete feature starts with an executable specification rather than jumping from one sentence to a polished screen.
5. Runtime UI generation stays bounded by approved components, renderer rules, authorization, accessibility, and fallback behavior.
6. Evaluation begins with visible evidence; approved blockers cannot be averaged away.
7. Generators and evaluators remain separate in both role and reasoning context.
8. Repeated failures become governed learning candidates, not automatic self-modification.

## Compatibility and execution requirements

The Skill format is portable across compatible Agents. Actual execution depends on the tools available in the target environment:

- browser/device evaluation requires a browser, device, or design-inspection capability;
- Figma extraction requires authorized access to the relevant file or integration;
- the deterministic score recomputation helper requires Node.js;
- Google `DESIGN.md` lint/diff requires the official tool and network access when it is not already installed;
- deployment, production changes, destructive actions, and external communication always require separate authorization.

No Skill grants itself permissions or bypasses an Agent's approval and sandbox policies.

## Validation

The repository includes deterministic release checks for:

- valid and portable YAML frontmatter;
- exact Skill name/directory matching;
- all 12 Codex interface metadata files;
- bundled resource references and local Markdown links;
- 37 realistic eval cases;
- 240 balanced natural-language trigger, near-miss, and negative routing cases;
- JSON and JSON Schema syntax;
- the score recomputation helper;
- deterministic trigger-routing result validation and scoring;
- exact discovery of all 12 Skills by the official CLI;
- a clean Codex project installation that preserves every bundled file;
- official Agent Skills reference validation of every Skill in CI;
- a post-push install of the public default branch with exact source-to-install
  file comparison.

For contributors:

```bash
bun install
bun audit
bun run check
```

The private `package.json` and Bun lockfile are only for repository validation. They are not required to install or use the Skills.

The release checklist additionally validates every package with the pinned
official Agent Skills reference validator. See [RELEASING.md](RELEASING.md).

Representative with-Skill versus baseline comparisons for both orchestration
entrypoints are recorded in the
[v0.1.0-rc.1 validation report](docs/releases/v0.1.0-rc.1-validation.md).
The final B2B reconstruction comparison scored 19/20 and 20/20 against a 15/20
baseline in two separate review lenses; its complete iteration record is in the
[reconstruction review](docs/releases/v0.1.0-rc.1-reconstruction-review.md).
Two blind trigger/near-miss runs are recorded in the main report as well.
Rendered cross-layer fixtures and human design review remain tracked in
[the validation plan](skills/VALIDATION.md). Static checks establish package
integrity; they do not prove design quality.

“Independent” means the reviewer receives a frozen candidate in a separate
reasoning context and did not author that candidate. When no approved evaluation
policy exists, reviews must distinguish advisory readiness limitations from
organizational release blockers.

## Security and trust

Agent Skills are instructions and may direct an Agent to read files, invoke tools, or create artifacts. Review a Skill and its bundled resources before installing it into a sensitive environment. Keep the Agent's normal permission prompts, sandboxing, and source-control review enabled.

The only bundled executable in this repository is a local score-recomputation helper. It reads a supplied JSON file (or standard input), writes JSON to standard output, performs no network access, and does not modify the evaluated artifact.

See [SECURITY.md](SECURITY.md) for the trust model and private vulnerability-reporting route.

## Support and feedback

- Report reproducible installation, routing, resource, or behavior problems with
  the [Skill bug template](https://github.com/nick3/vibe-design-skills/issues/new?template=bug_report.yml).
- Propose reusable workflow changes with the
  [Skill proposal template](https://github.com/nick3/vibe-design-skills/issues/new?template=skill_change.yml).
- Report security issues privately as described in [SECURITY.md](SECURITY.md).

Include the Skill name, repository commit or tag, Agent/environment, sanitized
inputs, actual behavior, and expected behavior. Do not attach credentials,
customer data, or confidential design artifacts.

## Contributing and releases

- [CONTRIBUTING.md](CONTRIBUTING.md) defines Skill structure, eval, and pull-request requirements.
- [CHANGELOG.md](CHANGELOG.md) records suite-level changes.
- [RELEASING.md](RELEASING.md) defines public-preview and stable-release gates.
- [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) records upstream specifications and conceptual sources.

## Sources

- [Alibaba Cloud Design — Vibe Designing Playbook](https://alibaba-cloud-design.github.io/vibe-designing-playbook/)
- [Google Labs — `design.md`](https://github.com/google-labs-code/design.md)
- [Agent Skills specification](https://agentskills.io/specification)
- [Vercel Labs — `skills` CLI](https://github.com/vercel-labs/skills)

Detailed adaptations and source boundaries are documented in [skills/SOURCES.md](skills/SOURCES.md).

## License

An open-source license has not yet been selected. Public visibility alone does not grant permission to copy, modify, or redistribute the contents. License selection is a blocking release decision and will be resolved before the first formal release.
