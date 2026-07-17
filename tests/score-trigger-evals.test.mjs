import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const scorer = path.join(repoRoot, "scripts", "score-trigger-evals.mjs");

function runScorerPayload(fixture, run) {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "trigger-score-test-"));
  try {
    const fixturePath = path.join(tempRoot, "fixture.json");
    const runPath = path.join(tempRoot, "run.json");
    fs.writeFileSync(fixturePath, JSON.stringify(fixture));
    fs.writeFileSync(runPath, JSON.stringify(run));
    return spawnSync(process.execPath, [scorer, runPath, fixturePath], {
      encoding: "utf8",
    });
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
}

function runScorer(fixture, predictions) {
  return runScorerPayload(fixture, { predictions });
}

const fixture = {
  schema_version: 1,
  skills: [
    {
      skill_name: "alpha-skill",
      cases: [
        {
          id: "alpha-positive",
          expect: "trigger",
          kind: "positive",
          expected_skill: "alpha-skill",
        },
        {
          id: "alpha-near-miss",
          expect: "not_trigger",
          kind: "near_miss",
          expected_skill: "beta-skill",
        },
      ],
    },
    {
      skill_name: "beta-skill",
      cases: [
        {
          id: "beta-positive",
          expect: "trigger",
          kind: "positive",
          expected_skill: "beta-skill",
        },
      ],
    },
  ],
};

test("scores exact routing and target false positives", () => {
  const result = runScorer(fixture, [
    { id: "alpha-positive", predicted_skill: "alpha-skill" },
    { id: "alpha-near-miss", predicted_skill: "alpha-skill" },
    { id: "beta-positive", predicted_skill: "beta-skill" },
  ]);

  assert.equal(result.status, 0, result.stderr);
  const score = JSON.parse(result.stdout);
  assert.equal(score.total_cases, 3);
  assert.equal(score.exact_matches, 2);
  assert.equal(score.exact_accuracy, 2 / 3);
  assert.equal(score.per_skill["alpha-skill"].positive_recall, 1);
  assert.equal(
    score.per_skill["alpha-skill"].target_false_positive_rate,
    1,
  );
  assert.deepEqual(score.errors, [
    {
      id: "alpha-near-miss",
      target_skill: "alpha-skill",
      kind: "near_miss",
      expected_skill: "beta-skill",
      predicted_skill: "alpha-skill",
    },
  ]);
});

test("rejects missing or unknown predictions", () => {
  const missing = runScorer(fixture, [
    { id: "alpha-positive", predicted_skill: "alpha-skill" },
  ]);
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /Expected 3 predictions/u);

  const unknown = runScorer(fixture, [
    { id: "alpha-positive", predicted_skill: "unknown-skill" },
    { id: "alpha-near-miss", predicted_skill: "beta-skill" },
    { id: "beta-positive", predicted_skill: "beta-skill" },
  ]);
  assert.equal(unknown.status, 1);
  assert.match(unknown.stderr, /unknown predicted Skill/u);
});

test("rejects a null prediction document with a descriptive error", () => {
  const result = runScorerPayload(fixture, null);

  assert.equal(result.status, 1);
  assert.match(result.stderr, /must contain a JSON object/u);
  assert.doesNotMatch(result.stderr, /TypeError/u);
});
