import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = path.join(
  repoRoot,
  "skills",
  "design-artifact-evaluator",
  "scripts",
  "recompute-scores.mjs",
);

function evaluationFixture() {
  return {
    evidence_sufficiency: "sufficient",
    dimensions: [
      {
        id: "task",
        label: "Task",
        weight: 0.6,
        score: 10,
        subchecks: [
          { id: "task-1", score: 2, max_score: 2 },
        ],
      },
      {
        id: "recovery",
        label: "Recovery",
        weight: 0.4,
        score: 5,
        subchecks: [
          { id: "recovery-1", score: 1, max_score: 2 },
        ],
      },
    ],
    overall_score: 8,
    blockers: [
      { id: "broken-critical-path", active: false },
      { id: "missing-permission-evidence", active: true },
    ],
  };
}

function run(evaluation) {
  return spawnSync(process.execPath, [scriptPath, "-"], {
    cwd: repoRoot,
    encoding: "utf8",
    input: JSON.stringify(evaluation),
  });
}

test("recomputes dimension and weighted overall scores", () => {
  const result = run(evaluationFixture());

  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.dimensions[0].computed_score, 10);
  assert.equal(output.dimensions[1].computed_score, 5);
  assert.equal(output.computed_overall_score, 8);
  assert.deepEqual(output.active_blockers, ["missing-permission-evidence"]);
  assert.equal(output.consistency.matches_recorded_scores, true);
});

test("reports recorded score discrepancies without issuing a verdict", () => {
  const evaluation = evaluationFixture();
  evaluation.dimensions[0].score = 9;
  evaluation.overall_score = 7;

  const result = run(evaluation);

  assert.equal(result.status, 0, result.stderr);
  const output = JSON.parse(result.stdout);
  assert.equal(output.consistency.matches_recorded_scores, false);
  assert.deepEqual(
    output.consistency.discrepancies.map((item) => item.field),
    ["dimensions.task.score", "overall_score"],
  );
  assert.match(output.governance_note, /does not issue a release verdict/i);
});

test("rejects a subcheck score above its declared maximum", () => {
  const evaluation = evaluationFixture();
  evaluation.dimensions[0].subchecks[0].score = 3;

  const result = run(evaluation);

  assert.equal(result.status, 2);
  assert.match(result.stderr, /0 <= score <= max_score/);
});

test("keeps the bundled helper local, read-only, and non-spawning", () => {
  const source = fs.readFileSync(scriptPath, "utf8");

  assert.doesNotMatch(source, /\bfetch\s*\(/);
  assert.doesNotMatch(source, /node:(?:http|https|net|tls|child_process)/);
  assert.doesNotMatch(
    source,
    /\b(?:writeFile|appendFile|unlink|rm|rename|mkdir)(?:Sync)?\s*\(/,
  );
});
