# Contributing

Contributions should improve the generality, safety, evidence quality, or usability of the Vibe Design Skills suite without embedding one product's design decisions.

## Before contributing

- Use an issue to explain a new capability, routing change, or behavioral problem before making a large change.
- Identify the user request that should trigger the Skill and difficult adjacent requests that should not.
- Distinguish a reusable workflow improvement from a project-specific rule that belongs in the target product's generated documents.
- Cite first-party specifications or source material for externally derived claims.

Until a root open-source license is selected, issue proposals and review feedback are welcome, but external pull requests will not be merged. This restriction will be removed before the first formal release.

## Skill package rules

Each Skill must remain self-contained:

```text
skills/<skill-name>/
├── SKILL.md
├── agents/openai.yaml
├── evals/evals.json
├── assets/       # only when output resources are needed
├── references/   # only when on-demand guidance is needed
└── scripts/      # only for deterministic operations
```

Requirements:

1. Use a lowercase, hyphenated name no longer than 64 characters and match the directory name exactly.
2. Keep frontmatter to `name` and `description` for this suite's portable profile.
3. Make the description state both what the Skill does and when it should be used; distinguish it from adjacent Skills.
4. Keep `SKILL.md` under 500 lines and move detailed material into directly referenced resources.
5. Use imperative instructions and preserve explicit evidence, authority, approval, and stopping rules.
6. Do not add `README.md`, changelogs, or process notes inside an individual Skill.
7. Do not add a repository-root `SKILL.md`; it would shadow the multi-Skill catalog in default CLI discovery.
8. Put every runtime dependency inside the Skill directory. The installer does not resolve dependencies between Skills or copy repository-level architecture documents.
9. Add or update `agents/openai.yaml` with a human-readable name, a 25–64 character summary, and a default prompt that explicitly mentions `$<skill-name>`.
10. Add at least three realistic eval cases: a primary use case, a difficult or risky case, and an adjacent/near-miss case.

## Validation

Contributor tooling requires Node.js 20+ and Bun 1.3.7.

```bash
bun install
bun run check
```

The complete check validates metadata, resources, local links, eval fixtures, JSON Schemas, deterministic script behavior, skills.sh grouping, and exact discovery through the pinned official `skills` CLI.

When behavior changes, also run the affected prompts with and without the Skill. Keep raw outputs separate, record the Skill/Agent/model versions, and ask an independent reviewer to assess subjective design quality. Do not tune a Skill using hidden expected answers that the evaluation Agent can read.

## Pull requests

A pull request should include:

- the user-visible problem and intended trigger boundary;
- the affected Skills and outputs;
- source/provenance notes for adapted concepts;
- deterministic validation results;
- behavioral comparison evidence when instructions changed;
- migration or compatibility impact;
- disclosure of material AI assistance and the human checks applied to it.

Generated content remains the contributor's responsibility. Reviewers may ask for a smaller Skill, a reference split, stronger near-miss tests, or evidence that a proposed rule generalizes across contrasting products.
