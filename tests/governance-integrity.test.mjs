import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
}

test("foundation workflow preserves review and governance integrity", () => {
  const bootstrap = read("skills/vibe-design-bootstrap/SKILL.md");
  const review = read("skills/design-system-review/SKILL.md");
  const reviewTemplate = read(
    "skills/design-system-review/assets/REVIEW.template.md",
  );
  const foundation = read("skills/design-system-foundation/SKILL.md");
  const evaluation = read("skills/design-evaluation-foundation/SKILL.md");
  const components = read("skills/component-pattern-foundation/SKILL.md");
  const product = read("skills/product-design-context/SKILL.md");

  assert.match(
    bootstrap,
    /must not create `REVIEW\.md`[\s\S]+same reasoning pass/u,
  );
  assert.match(bootstrap, /`Gate C: pending`/u);
  assert.match(bootstrap, /must link instead of\s+retranscribing/u);
  assert.match(bootstrap, /Do not create a separate `SELF-CHECK\.md` by default/u);

  assert.match(review, /A review is independent only when/u);
  assert.match(review, /`governed_gate`/u);
  assert.match(review, /`advisory_review`/u);
  assert.match(review, /readiness limitations/u);
  assert.match(reviewTemplate, /Reviewer separation\/context/u);
  assert.match(reviewTemplate, /Policy source/u);

  assert.match(foundation, /method provenance/u);
  assert.match(foundation, /not a mandatory promotion gate/u);
  assert.match(foundation, /do not bind one observed value/u);
  assert.match(foundation, /do not invent missing font sizes/u);
  assert.match(evaluation, /`proposed blocker candidates`/u);
  assert.match(evaluation, /must not apply its own proposed blockers/u);
  assert.match(components, /Do not name a component `Grid`/u);
  assert.match(components, /every component\/pattern identifier/u);
  assert.match(product, /An unspecified permission is unknown/u);
  assert.match(product, /do not make hidden, disabled, unavailable/u);
});
