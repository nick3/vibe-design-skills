# Public Agent Skills repositories: release-practice review

Research date: 2026-07-17

## Executive conclusion

A public Skills repository is ready for a formal release only when four claims are
true and continuously verifiable:

1. every Skill conforms to the Agent Skills format;
2. users can discover and install the complete catalog through the advertised CLI;
3. reuse rights, third-party provenance, and security expectations are explicit;
4. the repository has evidence that its Skills improve real tasks, plus automated
   gates that prevent regressions.

The first three are the ecosystem and legal baseline. The fourth is especially
important for `nick3/vibe-design-skills`: its README currently calls the suite a
draft and states that behavioral comparisons and human design review are pending.
Those promised checks must be completed before calling the suite `v1.0`.

No npm package, `package.json`, or package-registry submission is required for
installation. The official CLI accepts GitHub `owner/repo` sources and discovers
the standard `skills/<name>/SKILL.md` layout directly. See the
[Vercel Skills CLI source formats](https://github.com/vercel-labs/skills#source-formats)
and [Skill discovery rules](https://github.com/vercel-labs/skills#skill-discovery).

## Scope and source selection

Only first-party sources were used. The main comparison set was selected for both
official ownership and visible adoption on GitHub at the research date:

| Source | Role in this review | Observed public adoption |
|---|---|---:|
| [anthropics/skills](https://github.com/anthropics/skills) | Large public reference collection and skill-authoring/evaluation patterns | about 162k stars |
| [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Popular Skills catalog designed for `npx skills` distribution | about 29k stars |
| [openai/skills](https://github.com/openai/skills) | Historical Codex catalog with per-Skill licensing and evaluation examples | about 24k stars |
| [agentskills/agentskills](https://github.com/agentskills/agentskills) | Canonical open specification and validator reference | about 23k stars |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | Official CLI and skills.sh discovery behavior | about 26k stars |
| [NVIDIA/skills](https://github.com/NVIDIA/skills) | Enterprise governance, signing, benchmark, and release-checklist reference | about 2.5k stars |

`openai/skills` is now explicitly deprecated in favor of OpenAI Plugins, so it is
useful as historical evidence rather than the current distribution model. See its
[current README notice](https://github.com/openai/skills/blob/main/README.md).

## Cross-repository comparison

### 1. Repository layout and progressive disclosure

The common portable unit is a directory containing `SKILL.md`, with optional
`scripts/`, `references/`, and `assets/`. The canonical specification requires
valid YAML frontmatter and says `name` must match the parent directory; it also
recommends keeping the main instructions under 500 lines and loading detailed
resources on demand. See the
[Agent Skills specification](https://agentskills.io/specification).

The repositories then add only what their domain needs:

- Vercel uses a flat `skills/<name>/` catalog. A substantial Skill can include
  `metadata.json`, compiled guidance, rule files, scripts, and dedicated test
  packages; its React Skill includes `license` and `metadata.author/version` in
  frontmatter. See
  [react-best-practices/SKILL.md](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md).
- Anthropic keeps each Skill self-contained and supplies `LICENSE.txt` per Skill.
  Simple Skills may contain only `SKILL.md` plus a license, while `skill-creator`
  adds `agents/`, `assets/`, `references/`, `scripts/`, and an evaluation viewer.
  See the [Anthropic catalog](https://github.com/anthropics/skills/tree/main/skills)
  and [Skill Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator).
- OpenAI separates curated and system Skills, uses per-Skill `LICENSE.txt`, and
  sometimes adds `agents/openai.yaml` for Codex-specific UI/dependency metadata.
  Some Skills also include `evaluations/`, examples, assets, and references. See
  the [historical catalog](https://github.com/openai/skills/tree/main/skills).
- NVIDIA uses the same flat Skill layout but adds a governance packet to each
  published Skill: `skill-card.md`, evaluation data, `BENCHMARK.md`, and a detached
  signature. See
  [NVIDIA's repository structure and verification contract](https://github.com/NVIDIA/skills#repository-structure).

Implication: `vibe-design-skills` already follows the right content architecture
with `SKILL.md`, `assets/`, `references/`, `scripts/`, and `evals/`. It should not
add a custom package format. It should validate and document the existing format.

### 2. README installation and onboarding

The strongest public catalogs make installation the first actionable step:

- Vercel presents the catalog, one `npx skills add` command, usage prompts, Skill
  structure, and license in a compact README. See
  [vercel-labs/agent-skills README](https://github.com/vercel-labs/agent-skills/blob/main/README.md).
- NVIDIA documents interactive installation, `--list`, installing one Skill,
  targeting Codex or other agents, updates, troubleshooting, help, and security
  routes. See [NVIDIA Skills README](https://github.com/NVIDIA/skills/blob/main/README.md).
- Anthropic documents Claude Code plugin, Claude.ai, and API installation routes,
  a starter template, and an explicit demonstration-only disclaimer. See
  [Anthropic Skills README](https://github.com/anthropics/skills/blob/main/README.md).

The skills.sh FAQ separately recommends hosting Skills in GitHub with a README,
and says leaderboard listing happens automatically after installations through
the CLI. See the [skills.sh FAQ](https://www.skills.sh/docs/faq).

Implication: a formal `vibe-design-skills` README should show, near the top:

```bash
npx skills add nick3/vibe-design-skills --list
npx skills add nick3/vibe-design-skills
npx skills add nick3/vibe-design-skills --skill vibe-design-bootstrap --agent codex
npx skills add nick3/vibe-design-skills --skill '*' --agent codex --global --yes
npx skills update
```

It should also explain the two entrypoints, common user prompts, output artifacts,
agent compatibility, known limitations, update/removal, security, and license.

### 3. License, security, contribution, and version governance

Practice is heterogeneous, so absence from one popular repository should not be
mistaken for a good release gate:

| Repository | License practice | Security/contribution practice | Version/release practice |
|---|---|---|---|
| Vercel Agent Skills | README says MIT; representative Skills also declare `license: MIT` | Skill-specific contribution/testing exists for complex Skills | Skill metadata contains versions; no GitHub releases/tags observed |
| Anthropic Skills | Mixed terms are explicit per Skill through `LICENSE.txt`; README distinguishes open-source and source-available Skills | README has a testing disclaimer | No GitHub releases/tags observed |
| OpenAI Skills | License is stored per Skill | Minimal `contributing.md` includes a private security-reporting address | No GitHub releases/tags observed; repository is deprecated |
| NVIDIA Skills | Root dual license plus provenance/IP review | `SECURITY.md`, `CONTRIBUTING.md`, code of conduct, release checklist, CI gates, signed artifacts | `CHANGELOG.md`, Skill versions, plugin-version checks; no GitHub releases/tags observed |

Sources: [OpenAI contributing](https://github.com/openai/skills/blob/main/contributing.md),
[NVIDIA contributing](https://github.com/NVIDIA/skills/blob/main/CONTRIBUTING.md),
[NVIDIA security policy](https://github.com/NVIDIA/skills/blob/main/SECURITY.md),
[NVIDIA changelog](https://github.com/NVIDIA/skills/blob/main/CHANGELOG.md), and
[NVIDIA release checklist](https://github.com/NVIDIA/skills/blob/main/docs/release-checklist.mdx).

The Agent Skills format makes `license` optional metadata, not optional legal
permission. Public visibility alone does not grant reuse rights. A repository
advertised for team reuse therefore needs an explicit root license before formal
release. Existing source attribution should remain in `skills/SOURCES.md`; copied
or adapted third-party material that carries notice obligations should also be
covered by `THIRD_PARTY_NOTICES.md` where appropriate.

GitHub Releases and tags are not ecosystem requirements: none of the four catalog
repositories above used them at the research date. A `v1.0.0` tag and changelog
are still useful for a team-facing stable contract, but they are maturity features,
not installation prerequisites.

### 4. Validation scripts and CI

The canonical specification recommends running `skills-ref validate` to check
frontmatter and naming conventions. See
[Specification: validation](https://agentskills.io/specification#validation).

Popular repositories add domain-specific checks where failure is costly:

- Vercel's React Skill CI runs its validator and build when the Skill or its build
  package changes. See
  [react-best-practices-ci.yml](https://github.com/vercel-labs/agent-skills/blob/main/.github/workflows/react-best-practices-ci.yml).
- The Vercel catalog has extensive deterministic tests for the complex
  `vercel-optimize` Skill, showing that scripts and contracts should be tested like
  software rather than treated as prose only. See
  [vercel-optimize tests](https://github.com/vercel-labs/agent-skills/tree/main/packages/vercel-optimize-tests).
- NVIDIA validates generated plugin drift and version policy, verifies signed file
  integrity, and runs scheduled catalog checks. See
  [plugin validation](https://github.com/NVIDIA/skills/blob/main/.github/workflows/validate-plugins.yml)
  and [content-integrity verification](https://github.com/NVIDIA/skills/blob/main/.github/workflows/verify-content-integrity.yml).

For this repository, CI should run on every `skills/**`, README, source, and
validation-tool change. It should fail on:

- malformed YAML or nonconforming `name`/`description`;
- a frontmatter name that differs from its directory;
- missing local references/assets/scripts or unsafe absolute local paths;
- invalid JSON/schema files or broken deterministic scripts;
- `SKILL.md` beyond the chosen progressive-disclosure limits;
- project-specific leakage prohibited by the suite's architecture;
- a catalog mismatch between expected Skill names and CLI discovery;
- failure of `npx skills add . --list` or a clean temporary installation.

After publishing a commit, the release checklist should also run
`npx skills add nick3/vibe-design-skills --list` against GitHub and compare the
exact 12-name set. This remote check catches differences between an unpushed local
tree and the artifact users actually receive.

### 5. Evals and release evidence

The official evaluation guide says a Skill should be tested on realistic prompts,
edge cases, and a with-Skill versus no-Skill or previous-version baseline. It
recommends `evals/evals.json`, objective assertions where possible, recorded timing
and token cost, evidence-backed grading, aggregate deltas, and human review for
subjective qualities such as visual design. See
[Evaluating skill output quality](https://agentskills.io/skill-creation/evaluating-skills).

The official description guide adds separate triggering tests: realistic positive
queries plus near-miss negative queries, repeated because model behavior is
nondeterministic. See
[Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

These practices appear in major catalogs:

- Anthropic's `skill-creator` implements draft → realistic prompts → with/without
  baseline → assertions → benchmark → human review → revise. See
  [Skill Creator source](https://github.com/anthropics/skills/blob/main/skills/skill-creator/SKILL.md).
- OpenAI's historical curated Skills include explicit evaluation scenarios with
  expected behavior and success criteria. See one
  [evaluation example](https://github.com/openai/skills/tree/main/skills/.curated/notion-spec-to-implementation/evaluations).
- NVIDIA publishes an evaluation dataset and `BENCHMARK.md` for every cataloged
  Skill and includes security, correctness, discoverability, effectiveness, and
  efficiency in its published Skill cards. See
  [NVIDIA verification requirements](https://github.com/NVIDIA/skills#verifying-skills).

For a design suite, mechanical assertions are insufficient. At least the two
orchestrators (`vibe-design-bootstrap` and `vibe-design-execute`) should be tested
on contrasting fixtures with and without the Skill, followed by blind or independent
human design review. Foundation Skills should additionally have trigger/near-miss
tests to prove routing boundaries. Results should be summarized in a versioned
release report rather than leaving only unevaluated prompt fixtures in `evals/`.

### 6. Discovery and skills.sh

The skills.sh leaderboard is populated automatically from anonymous CLI install
telemetry; no manual registry submission is required. The official badge is:

```markdown
[![skills.sh](https://skills.sh/b/nick3/vibe-design-skills)](https://skills.sh/nick3/vibe-design-skills)
```

See [skills.sh documentation](https://www.skills.sh/docs) and its
[leaderboard FAQ](https://www.skills.sh/docs/faq#how-do-i-get-my-skill-listed-on-the-leaderboard).

For a 12-Skill catalog, a root `skills.sh.json` is useful for grouping Foundation,
Specification, Execution, and Evaluation/Governance Skills. The file affects the
skills.sh page only, not installation, and is picked up after the repository is
seen through CLI telemetry. See
[Customize repo pages](https://www.skills.sh/docs/customize) and Vercel's
[live configuration](https://github.com/vercel-labs/agent-skills/blob/main/skills.sh.json).

## Prioritized release requirements for `nick3/vibe-design-skills`

### Must-have before the first formal release

1. **P0 — Legal permission:** choose and add a root `LICENSE`; align root README,
   Skill `license` metadata, and third-party notices with that choice.
2. **P0 — Specification compliance:** validate all 12 Skills with the canonical
   constraints, including valid YAML, exact directory/name match, description
   length/trigger quality, relative references, and progressive-disclosure limits.
3. **P0 — Exact installation proof:** make local and remote `npx skills ... --list`
   return the same expected 12 names, then perform a clean install into at least
   Codex and verify the installed resources, not only the `SKILL.md` files.
4. **P0 — Automated release gate:** add a deterministic repository validator and
   GitHub Actions workflow covering metadata, references, JSON/schema files,
   executable scripts, the exact catalog, and CLI discovery on every relevant PR.
5. **P0 — Honest onboarding:** replace draft-only copy instructions with tested
   `npx` commands, catalog/entrypoint guidance, usage prompts, compatibility,
   limitations, updates/removal, support, security, and license information.
6. **P0 — Minimum security posture:** add `SECURITY.md`; document whether each
   script reads/writes files, invokes external commands, requires network access,
   or handles credentials. Review the full distributable directory for secrets,
   unsafe commands, executable surprises, and unlicensed payloads.
7. **P0 for this suite's `v1.0` quality claim — behavioral evidence:** complete the
   promised with-Skill/baseline comparisons and human design review on contrasting
   fixtures. Publish a concise release report and remove the draft status only when
   its stated acceptance criteria pass.

### Recommended for a maintainable public `v1.x`

1. **P1 — Discovery:** add the skills.sh badge and a validated `skills.sh.json`
   grouping all 12 Skills.
2. **P1 — Contribution governance:** add `CONTRIBUTING.md`, PR/issue templates,
   review ownership, required validation evidence, and an AI-assistance disclosure
   rule for contributions to Agent instructions.
3. **P1 — Version contract:** add `CHANGELOG.md`, `metadata.author` and
   `metadata.version` consistently, document compatibility-breaking changes, and
   create a `v1.0.0` tag after all P0 gates pass.
4. **P1 — Stronger eval program:** add positive and near-miss trigger suites,
   objective assertions, multiple runs for nondeterministic checks, token/time
   measurements, cross-Agent runs, and retained human-review evidence.
5. **P1 — Script reliability:** give bundled scripts noninteractive interfaces,
   documented prerequisites, structured output, helpful errors, tests, and pinned
   external tool versions where reproducibility matters. See the official
   [scripts guidance](https://agentskills.io/skill-creation/using-scripts).
6. **P1 — Release checklist:** require a clean worktree, green CI, remote discovery,
   license/provenance review, behavioral evidence, changelog update, and rollback
   note for every release candidate.

### Optional enterprise hardening

- **P2 — Skill cards:** add an owner, intended users, inputs/outputs, dependencies,
  risks, mitigations, support route, and evaluation summary per Skill.
- **P2 — Artifact signing:** sign release artifacts and verify their contents in CI
  if the suite becomes an organization-wide or externally governed catalog.
- **P2 — Multi-platform packaging:** package the suite as Codex/Claude plugins only
  when platform-specific UI, MCP dependencies, or marketplace distribution is
  needed. Keep the portable `skills/` directories as the source of truth.

## Practical definition of done

The repository is formally releasable when a clean checkout of the intended release
commit passes the complete validator and test suite; a fresh user can list and
install exactly 12 Skills from GitHub; every installed Skill has valid metadata and
all referenced resources; the license, provenance, support, and security routes are
unambiguous; and the published evaluation report demonstrates useful design outcomes
on contrasting cases with human review. Badge, catalog grouping, changelog, and tag
should then be added as the release-facing record of that verified state.

## Follow-up maintainability audit

A second sample on the same research date added three highly adopted,
actively released catalogs:

| Source | Observed public adoption | Relevant practice |
|---|---:|---|
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | about 79k stars | Repository Agent instructions, LF normalization, trigger/routing evals, and a real plugin-install job |
| [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | about 24k stars | Repository Agent instructions, LF normalization, test matrices, changelog/version gates, and deterministic release automation |
| [google/skills](https://github.com/google/skills) | about 15k stars | A minimal portable catalog with an explicit Apache-2.0 license and contribution policy |

The official
[`vercel-labs/skills` CI](https://github.com/vercel-labs/skills/blob/main/.github/workflows/ci.yml)
also tests the installer on both Linux and Windows. These examples support three
additional maintainability decisions for this repository:

1. add a root `AGENTS.md` so future Agent-authored changes preserve package,
   evidence, authority, evaluation, and release invariants;
2. add `.gitattributes` with LF normalization so byte-level installation checks
   and text artifacts remain deterministic across contributor platforms;
3. run the complete local discovery and clean-install suite on Windows as well
   as Linux.

Automatic tagging was not copied. This suite requires an explicit owner license
decision, behavioral evidence, and a post-merge public-distribution check, so a
deliberate checklist-driven release remains safer than making every changelog
heading a release trigger.
