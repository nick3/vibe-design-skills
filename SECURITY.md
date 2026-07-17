# Security policy

## Supported versions

Security fixes are applied to the default branch and the latest tagged release, when a tagged release exists. Pre-release commits are not guaranteed to receive backports.

## Report a vulnerability

Do not open a public issue for a vulnerability, suspected prompt-injection path, credential exposure, or unsafe destructive instruction.

Use [GitHub's private security advisory form](https://github.com/nick3/vibe-design-skills/security/advisories/new) and include:

- the affected Skill and commit;
- the threat or unintended action;
- the minimum reproduction;
- the files, tools, credentials, or external systems at risk;
- a proposed mitigation, if known.

Reports are handled on a best-effort basis during the public preview; no
response-time commitment is currently offered. Do not include real credentials,
customer data, or confidential design artifacts in the report.

## Trust model

Agent Skills are executable instructions. Installing a Skill gives an Agent procedural guidance; it does not grant new operating-system, network, design-tool, or account permissions.

Users and integrators should:

1. inspect `SKILL.md` and bundled resources before installation;
2. retain the Agent's normal sandbox and approval prompts;
3. use least-privilege accounts for browser, Figma, repository, and production access;
4. review generated files and source-control diffs before accepting them;
5. separately authorize destructive actions, deployment, production changes, or external communication.

The Skills intentionally require evidence and authorization boundaries, but those instructions are not a substitute for platform security controls.

## Bundled executable surface

The suite currently includes one executable:

`skills/design-artifact-evaluator/scripts/recompute-scores.mjs`

It:

- reads one JSON file or standard input;
- validates and recomputes numeric subcheck/dimension totals;
- writes JSON to standard output;
- performs no network access;
- writes no files;
- does not issue a governance or release verdict.

Some Skill workflows may direct an Agent to use tools already available in the user's environment, such as a browser, a design editor, Figma, or the Google `DESIGN.md` CLI. Those actions remain subject to the target Agent's permissions and the user's authorization.

## Dependency and supply-chain scope

The repository's private `package.json` is used only for contributor validation and CI. End users installing Skills do not execute its package scripts.

The advertised `npx skills add` command executes the third-party open-source [`skills` CLI](https://github.com/vercel-labs/skills). Users with stricter supply-chain requirements should review and pin the CLI version according to their own policy.
