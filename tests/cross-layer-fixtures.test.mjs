import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const skillsRoot = path.join(repoRoot, "skills");
const fixturesRoot = path.join(repoRoot, "tests", "fixtures");

function walkFiles(root) {
  const files = [];
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(entryPath));
    } else if (entry.isFile()) {
      files.push(entryPath);
    } else {
      throw new Error(`Fixture contains unsupported entry: ${entryPath}`);
    }
  }
  return files;
}

test("cross-layer scenarios are complete and do not leak into Skills", () => {
  const scenarioPaths = walkFiles(fixturesRoot)
    .filter((filePath) => path.basename(filePath) === "scenario.json");
  assert.ok(scenarioPaths.length >= 1);

  const installableContents = walkFiles(skillsRoot)
    .map((filePath) => fs.readFileSync(filePath, "utf8"))
    .join("\n")
    .toLocaleLowerCase();

  const scenarioIds = new Set();
  for (const scenarioPath of scenarioPaths) {
    const scenario = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));
    assert.match(scenario.id, /^[a-z0-9-]+$/u);
    assert.ok(!scenarioIds.has(scenario.id), `duplicate scenario: ${scenario.id}`);
    scenarioIds.add(scenario.id);

    assert.equal(typeof scenario.purpose, "string");
    assert.ok(
      scenario.purpose.toLocaleLowerCase().includes("non-normative"),
      `${scenario.id}: fixture purpose must say it is non-normative`,
    );
    assert.ok(["create", "reconstruct", "update"].includes(scenario.mode));
    assert.equal(typeof scenario.request, "string");
    assert.equal(typeof scenario.prompt, "string");
    assert.ok(scenario.prompt.length >= 100);
    assert.ok(scenario.inputs.length >= 3);
    assert.ok(scenario.acceptance_criteria.length >= 5);
    assert.ok(scenario.prohibited_leakage.length >= 3);

    const scenarioRoot = path.dirname(scenarioPath);
    const requestPath = path.resolve(scenarioRoot, scenario.request);
    assert.ok(
      requestPath.startsWith(`${scenarioRoot}${path.sep}`),
      `${scenario.id}: request escapes fixture root`,
    );
    assert.ok(fs.statSync(requestPath).isFile());
    const request = fs.readFileSync(requestPath, "utf8")
      .replace(/\s+/gu, " ")
      .trim();
    assert.equal(request, scenario.prompt);

    for (const relativePath of scenario.inputs) {
      const inputPath = path.resolve(scenarioRoot, relativePath);
      assert.ok(
        inputPath.startsWith(`${scenarioRoot}${path.sep}`),
        `${scenario.id}: input escapes fixture root`,
      );
      assert.ok(fs.statSync(inputPath).isFile(), `${relativePath} is not a file`);
    }

    for (const value of scenario.prohibited_leakage) {
      assert.equal(typeof value, "string");
      assert.ok(value.length >= 3);
      assert.ok(
        !installableContents.includes(value.toLocaleLowerCase()),
        `${scenario.id}: fixture value leaked into installable Skills: ${value}`,
      );
    }
  }
});
