#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

function usage() {
  console.error(
    "Usage: node scripts/score-trigger-evals.mjs <predictions.json|-> "
      + "[trigger-cases.json]",
  );
}

function readJson(filePath) {
  try {
    const contents = filePath === "-"
      ? fs.readFileSync(0, "utf8")
      : fs.readFileSync(filePath, "utf8");
    return JSON.parse(contents);
  } catch (error) {
    throw new Error(`Cannot read ${filePath}: ${error.message}`);
  }
}

const predictionArgument = process.argv[2];
if (!predictionArgument) {
  usage();
  process.exit(2);
}

const fixtureArgument = process.argv[3]
  ?? path.join(repoRoot, "tests", "trigger-cases.json");
const predictionPath = predictionArgument === "-"
  ? "-"
  : path.resolve(process.cwd(), predictionArgument);
const fixturePath = path.resolve(process.cwd(), fixtureArgument);

try {
  const fixture = readJson(fixturePath);
  const run = readJson(predictionPath);
  const cases = fixture.skills.flatMap((entry) =>
    entry.cases.map((item) => ({
      ...item,
      target_skill: entry.skill_name,
    })));
  const caseById = new Map(cases.map((item) => [item.id, item]));
  const knownSkills = new Set(fixture.skills.map((entry) => entry.skill_name));
  if (run === null || typeof run !== "object" || Array.isArray(run)) {
    throw new Error("Prediction file must contain a JSON object.");
  }
  if (!Array.isArray(run.predictions)) {
    throw new Error("Prediction file must contain a predictions array.");
  }
  const predictions = run.predictions;

  if (predictions.length !== cases.length) {
    throw new Error(
      `Expected ${cases.length} predictions, received ${predictions.length}.`,
    );
  }

  const seen = new Set();
  const perSkill = new Map();
  const errors = [];

  for (const prediction of predictions) {
    if (!caseById.has(prediction.id)) {
      throw new Error(`Unknown case id: ${prediction.id}`);
    }
    if (seen.has(prediction.id)) {
      throw new Error(`Duplicate prediction id: ${prediction.id}`);
    }
    seen.add(prediction.id);

    if (
      prediction.predicted_skill !== "none"
      && !knownSkills.has(prediction.predicted_skill)
    ) {
      throw new Error(
        `${prediction.id}: unknown predicted Skill `
          + `${prediction.predicted_skill}`,
      );
    }

    const item = caseById.get(prediction.id);
    const expected = item.expected_skill;
    const exact = prediction.predicted_skill === expected;
    const targetFalsePositive = item.expect === "not_trigger"
      && prediction.predicted_skill === item.target_skill;

    if (!perSkill.has(item.target_skill)) {
      perSkill.set(item.target_skill, {
        total: 0,
        correct: 0,
        positives: 0,
        positive_correct: 0,
        negatives: 0,
        target_false_positives: 0,
      });
    }
    const score = perSkill.get(item.target_skill);
    score.total += 1;
    score.correct += Number(exact);
    if (item.expect === "trigger") {
      score.positives += 1;
      score.positive_correct += Number(exact);
    } else {
      score.negatives += 1;
      score.target_false_positives += Number(targetFalsePositive);
    }

    if (!exact) {
      errors.push({
        id: item.id,
        target_skill: item.target_skill,
        kind: item.kind,
        expected_skill: expected,
        predicted_skill: prediction.predicted_skill,
      });
    }
  }

  const totalCorrect = [...perSkill.values()]
    .reduce((sum, score) => sum + score.correct, 0);
  const summary = {
    evaluator: run.evaluator ?? "unspecified",
    model: run.model ?? "unspecified",
    fixture_schema_version: fixture.schema_version,
    total_cases: cases.length,
    exact_matches: totalCorrect,
    exact_accuracy: totalCorrect / cases.length,
    per_skill: Object.fromEntries(
      [...perSkill.entries()].sort(([left], [right]) =>
        left.localeCompare(right)).map(([name, score]) => [
        name,
        {
          ...score,
          exact_accuracy: score.correct / score.total,
          positive_recall: score.positive_correct / score.positives,
          target_false_positive_rate:
            score.target_false_positives / score.negatives,
        },
      ]),
    ),
    errors,
  };

  process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
