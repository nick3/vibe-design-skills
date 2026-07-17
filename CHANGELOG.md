# Changelog

All notable suite-level changes are documented here. The project follows [Semantic Versioning](https://semver.org/) once tagged releases begin.

## [Unreleased]

### Added

- Codex-facing `agents/openai.yaml` metadata for all 12 Skills.
- Deterministic repository validation for Skill metadata, resources, evals, JSON Schemas, local links, and skills.sh grouping.
- Tests for the artifact-evaluation score recomputation helper.
- A balanced 240-case bilingual trigger, near-miss, and negative routing fixture with a deterministic result scorer.
- Official `skills` CLI discovery verification for the complete catalog.
- GitHub Actions validation, dependency vulnerability auditing, and dependency update automation.
- Pinned official Agent Skills reference validation in GitHub Actions.
- A post-push remote-distribution check that installs the public default branch and compares every installed file with the checked-out source.
- Tested `npx skills add` installation guidance and a grouped skills.sh catalog.
- Contribution, security, provenance, and release-governance documentation.
- Versioned release-candidate reports with package, security, reference-format,
  remote-baseline, entrypoint, and iterative reconstruction comparison evidence.
- A non-normative B2B reconstruction fixture and governance-integrity regression test.
- Repository-level Agent contribution instructions, deterministic LF
  normalization, and Windows portability validation.

### Changed

- Reworked the root README around installation, entrypoints, compatibility, trust, and validation.
- Replaced the placeholder evaluation-schema identifier with the repository's canonical source URL.
- Constrained evaluation aggregate scores and thresholds to the documented 0–10 scale.
- Tightened bootstrap evidence handling so “not supplied” is never treated as proof that an artifact does not exist.
- Made feature execution progressively discover project evidence before requesting domain, API, design-system, or evaluation details.
- Updated validation dependencies to vulnerability-free versions and removed an unnecessary transitive format package.
- Pinned every GitHub Action to an immutable current stable commit and disabled
  an inapplicable `uv` cache with no dependency manifest.
- Separated author self-checks from independent foundation review and separated
  advisory readiness limitations from approved release blockers.
- Tightened reconstruction output around single-source rules, method/product
  provenance, unknown permissions, semantic table/list/grid and link/button
  boundaries, cross-reference integrity, and operational rollback preflight.

### Fixed

- Corrected invalid YAML in `vibe-design-execute` that caused the official CLI to silently omit the Skill.
- Made fixture-leakage checks skip binary assets and clean-install comparisons
  ignore untracked operating-system metadata files.
- Made the trigger scorer reject a `null` prediction document with a
  descriptive error instead of a runtime exception.
- Split the default public-repository check from the arbitrary-source check so
  both local release verification and candidate-ref CI remain explicit.
