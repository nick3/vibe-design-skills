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
const fixturePath = path.join(repoRoot, "tests", "trigger-cases.json");

const expectedSkillNames = fs
  .readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) =>
    fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
  .map((entry) => entry.name)
  .sort();

function hasCjk(text) {
  return /[\u3400-\u4dbf\u4e00-\u9fff]/u.test(text);
}

function isEnglishOnly(text) {
  return /[a-z]/iu.test(text) && !hasCjk(text);
}

test("trigger fixture covers every Skill with balanced held-out cases", () => {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

  assert.equal(fixture.schema_version, 1);
  assert.equal(typeof fixture.purpose, "string");
  assert.ok(fixture.purpose.length >= 20);
  assert.ok(Array.isArray(fixture.skills));

  const actualSkillNames = fixture.skills
    .map((entry) => entry.skill_name)
    .sort();
  assert.deepEqual(actualSkillNames, expectedSkillNames);

  const knownSkills = new Set(expectedSkillNames);
  const ids = new Set();
  const normalizedQueries = new Set();

  for (const entry of fixture.skills) {
    assert.ok(knownSkills.has(entry.skill_name));
    assert.equal(entry.cases.length, 20, entry.skill_name);

    const kinds = { positive: 0, near_miss: 0, negative: 0 };
    let chineseQueries = 0;
    let englishQueries = 0;

    for (const item of entry.cases) {
      assert.equal(typeof item.id, "string");
      assert.match(item.id, /^[a-z0-9-]+$/u);
      assert.ok(!ids.has(item.id), `duplicate case id: ${item.id}`);
      ids.add(item.id);

      assert.equal(typeof item.query, "string");
      assert.ok(item.query.length >= 12, `${item.id}: query is too short`);
      assert.ok(!item.query.includes("$"), `${item.id}: explicit Skill mention`);
      const normalizedQuery = item.query.trim().toLocaleLowerCase();
      assert.ok(
        !normalizedQueries.has(normalizedQuery),
        `${item.id}: duplicate query`,
      );
      normalizedQueries.add(normalizedQuery);

      assert.ok(item.kind in kinds, `${item.id}: unknown kind`);
      kinds[item.kind] += 1;
      assert.ok(
        item.expect === "trigger" || item.expect === "not_trigger",
        `${item.id}: invalid expectation`,
      );
      assert.equal(typeof item.reason, "string");
      assert.ok(item.reason.length >= 12, `${item.id}: reason is too short`);

      if (item.kind === "positive") {
        assert.equal(item.expect, "trigger", item.id);
        assert.equal(item.expected_skill, entry.skill_name, item.id);
      } else {
        assert.equal(item.expect, "not_trigger", item.id);
        assert.notEqual(item.expected_skill, entry.skill_name, item.id);
        assert.ok(
          item.expected_skill === "none"
            || knownSkills.has(item.expected_skill),
          `${item.id}: unknown expected Skill`,
        );
      }

      if (hasCjk(item.query)) {
        chineseQueries += 1;
      }
      if (isEnglishOnly(item.query)) {
        englishQueries += 1;
      }
    }

    assert.deepEqual(kinds, {
      positive: 8,
      near_miss: 6,
      negative: 6,
    });
    assert.ok(
      chineseQueries >= 5,
      `${entry.skill_name}: needs at least five Chinese queries`,
    );
    assert.ok(
      englishQueries >= 5,
      `${entry.skill_name}: needs at least five English-only queries`,
    );
  }

  assert.equal(ids.size, expectedSkillNames.length * 20);
});
