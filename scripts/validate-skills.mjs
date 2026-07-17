#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import YAML from "yaml";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");
const failures = [];
const warnings = [];
const names = new Set();
let evalCount = 0;
let jsonCount = 0;
let repositoryYamlCount = 0;

function relative(filePath) {
  return path.relative(repoRoot, filePath) || ".";
}

function fail(filePath, message) {
  failures.push(`${relative(filePath)}: ${message}`);
}

function warn(filePath, message) {
  warnings.push(`${relative(filePath)}: ${message}`);
}

function parseYaml(text, filePath) {
  const document = YAML.parseDocument(text, {
    prettyErrors: true,
    uniqueKeys: true,
  });

  for (const error of document.errors) {
    fail(filePath, `invalid YAML: ${error.message.replaceAll("\n", " ")}`);
  }

  if (document.errors.length > 0) {
    return null;
  }

  return document.toJS();
}

function parseFrontmatter(content, filePath) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    fail(filePath, "must start with YAML frontmatter bounded by ---");
    return null;
  }

  const data = parseYaml(match[1], filePath);
  return data ? { data, body: content.slice(match[0].length).trim() } : null;
}

function requireString(value, filePath, field) {
  if (typeof value !== "string" || value.trim() === "") {
    fail(filePath, `${field} must be a non-empty string`);
    return false;
  }

  return true;
}

function walkFiles(root, ignoredNames = new Set()) {
  const files = [];

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(entryPath, ignoredNames));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function validateOpenAiMetadata(skillDir, skillName) {
  const metadataPath = path.join(skillDir, "agents", "openai.yaml");

  if (!fs.existsSync(metadataPath)) {
    fail(metadataPath, "missing recommended Codex interface metadata");
    return;
  }

  const source = fs.readFileSync(metadataPath, "utf8");
  const metadata = parseYaml(source, metadataPath);
  if (!metadata) {
    return;
  }

  const topLevelKeys = Object.keys(metadata);
  if (topLevelKeys.length !== 1 || topLevelKeys[0] !== "interface") {
    fail(metadataPath, "must contain only the interface mapping");
  }

  const interfaceData = metadata.interface;
  if (!interfaceData || typeof interfaceData !== "object" || Array.isArray(interfaceData)) {
    fail(metadataPath, "interface must be a mapping");
    return;
  }

  const allowedKeys = new Set([
    "display_name",
    "short_description",
    "default_prompt",
  ]);

  for (const key of Object.keys(interfaceData)) {
    if (!allowedKeys.has(key)) {
      fail(metadataPath, `unsupported interface field '${key}'`);
    }
  }

  requireString(interfaceData.display_name, metadataPath, "interface.display_name");

  if (requireString(
    interfaceData.short_description,
    metadataPath,
    "interface.short_description",
  )) {
    const length = interfaceData.short_description.length;
    if (length < 25 || length > 64) {
      fail(metadataPath, "interface.short_description must be 25-64 characters");
    }
  }

  if (requireString(
    interfaceData.default_prompt,
    metadataPath,
    "interface.default_prompt",
  ) && !interfaceData.default_prompt.includes(`$${skillName}`)) {
    fail(metadataPath, `interface.default_prompt must mention $${skillName}`);
  }

  for (const line of source.split(/\r?\n/)) {
    if (/^\s{2}[a-z_]+:/.test(line) && !/:\s*"(?:[^"\\]|\\.)*"\s*$/.test(line)) {
      fail(metadataPath, "all interface string values must be double-quoted");
      break;
    }
  }
}

function validateEvals(skillDir, skillName) {
  const evalPath = path.join(skillDir, "evals", "evals.json");
  if (!fs.existsSync(evalPath)) {
    fail(evalPath, "missing evals/evals.json");
    return;
  }

  let payload;
  try {
    payload = JSON.parse(fs.readFileSync(evalPath, "utf8"));
  } catch (error) {
    fail(evalPath, `invalid JSON: ${error.message}`);
    return;
  }

  if (payload.skill_name !== skillName) {
    fail(evalPath, `skill_name must equal '${skillName}'`);
  }

  if (!Array.isArray(payload.evals) || payload.evals.length < 3) {
    fail(evalPath, "evals must contain at least three realistic cases");
    return;
  }

  const ids = new Set();
  for (const [index, evaluation] of payload.evals.entries()) {
    const prefix = `evals[${index}]`;
    if (!Number.isInteger(evaluation.id) || evaluation.id < 1) {
      fail(evalPath, `${prefix}.id must be a positive integer`);
    } else if (ids.has(evaluation.id)) {
      fail(evalPath, `${prefix}.id duplicates ${evaluation.id}`);
    } else {
      ids.add(evaluation.id);
    }

    requireString(evaluation.prompt, evalPath, `${prefix}.prompt`);
    requireString(evaluation.expected_output, evalPath, `${prefix}.expected_output`);

    if (!Array.isArray(evaluation.files)
      || evaluation.files.some((item) => typeof item !== "string")) {
      fail(evalPath, `${prefix}.files must be an array of strings`);
    }
  }

  evalCount += payload.evals.length;
}

function validateResourceReferences(skillDir, skillPath, content) {
  const resourcePattern = /`((?:assets|references|scripts)\/[^`\n]+)`/g;

  for (const match of content.matchAll(resourcePattern)) {
    const reference = match[1].trim();
    const resolved = path.resolve(skillDir, reference);
    const withinSkill = resolved.startsWith(`${path.resolve(skillDir)}${path.sep}`);

    if (!withinSkill) {
      fail(skillPath, `resource reference escapes the Skill directory: ${reference}`);
    } else if (!fs.existsSync(resolved)) {
      fail(skillPath, `referenced resource does not exist: ${reference}`);
    }
  }
}

function validateSkill(skillDir) {
  const directoryName = path.basename(skillDir);
  const skillPath = path.join(skillDir, "SKILL.md");
  const content = fs.readFileSync(skillPath, "utf8");
  const parsed = parseFrontmatter(content, skillPath);

  if (!parsed) {
    return;
  }

  if (!parsed.data || typeof parsed.data !== "object" || Array.isArray(parsed.data)) {
    fail(skillPath, "frontmatter must be a mapping");
    return;
  }

  const allowedFields = new Set(["name", "description"]);
  for (const field of Object.keys(parsed.data)) {
    if (!allowedFields.has(field)) {
      fail(skillPath, `frontmatter field '${field}' is not part of this suite's portable profile`);
    }
  }

  const { name, description } = parsed.data;
  if (requireString(name, skillPath, "name")) {
    if (name.length > 64 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
      fail(skillPath, "name must be <=64 characters using lowercase letters, digits, and single hyphens");
    }
    if (name !== directoryName) {
      fail(skillPath, `name '${name}' must match parent directory '${directoryName}'`);
    }
    if (names.has(name)) {
      fail(skillPath, `duplicate Skill name '${name}'`);
    }
    names.add(name);
  }

  if (requireString(description, skillPath, "description")) {
    if (description.length > 1024) {
      fail(skillPath, "description must be <=1024 characters");
    }
    if (!/\buse\b/i.test(description)) {
      warn(skillPath, "description may not clearly state when to use the Skill");
    }
  }

  if (parsed.body === "") {
    fail(skillPath, "body must not be empty");
  } else if (!/^#\s+\S/m.test(parsed.body)) {
    fail(skillPath, "body must contain a top-level heading");
  }

  const lineCount = content.split(/\r?\n/).length;
  if (lineCount > 500) {
    fail(skillPath, `SKILL.md has ${lineCount} lines; keep it under 500`);
  }

  const allowedEntries = new Set([
    "SKILL.md",
    "agents",
    "assets",
    "evals",
    "references",
    "scripts",
    "LICENSE.txt",
  ]);

  for (const entry of fs.readdirSync(skillDir, { withFileTypes: true })) {
    if (!allowedEntries.has(entry.name)) {
      fail(path.join(skillDir, entry.name), "unexpected file or directory in Skill package");
    }
  }

  validateResourceReferences(skillDir, skillPath, content);
  validateOpenAiMetadata(skillDir, directoryName);
  validateEvals(skillDir, directoryName);
}

function validateJsonFiles() {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  ajv.addFormat("date-time", {
    type: "string",
    validate(value) {
      return (
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(
          value,
        ) && Number.isFinite(Date.parse(value))
      );
    },
  });
  const jsonFiles = walkFiles(skillsRoot).filter((filePath) => filePath.endsWith(".json"));

  for (const filePath of jsonFiles) {
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
      jsonCount += 1;
    } catch (error) {
      fail(filePath, `invalid JSON: ${error.message}`);
      continue;
    }

    if (typeof data?.$schema === "string" && data.$schema.includes("json-schema.org")) {
      if (typeof data.$id === "string" && data.$id.includes("example.invalid")) {
        fail(filePath, "JSON Schema must not retain a placeholder $id");
      }
      try {
        ajv.compile(data);
      } catch (error) {
        fail(filePath, `invalid JSON Schema: ${error.message}`);
      }
    }
  }
}

function validateDistributableSafety() {
  const textExtensions = new Set([
    ".json",
    ".md",
    ".mjs",
    ".txt",
    ".yaml",
    ".yml",
  ]);
  const developerPathPattern = /(?:\/Users\/[^/\s]+\/|\/Volumes\/[^/\s]+\/|[A-Za-z]:\\Users\\[^\\\s]+\\)/;
  const credentialPattern = /(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|(?:^|[^A-Za-z0-9])(?:sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{20,}|github_pat_[A-Za-z0-9_]{20,}))/m;

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      const stats = fs.lstatSync(entryPath);

      if (stats.isSymbolicLink()) {
        fail(entryPath, "symbolic links are not allowed in distributable Skill packages");
        continue;
      }
      if (stats.isDirectory()) {
        walk(entryPath);
        continue;
      }
      if (!stats.isFile()) {
        fail(entryPath, "unsupported filesystem entry in distributable Skill package");
        continue;
      }
      if (stats.size > 5 * 1024 * 1024) {
        fail(entryPath, "individual distributable files must be no larger than 5 MiB");
      }
      if ((stats.mode & 0o111) !== 0 && !entryPath.includes(`${path.sep}scripts${path.sep}`)) {
        fail(entryPath, "executable files are only allowed under scripts/");
      }
      if (!textExtensions.has(path.extname(entry.name).toLowerCase())) {
        continue;
      }

      const content = fs.readFileSync(entryPath, "utf8");
      if (developerPathPattern.test(content)) {
        fail(entryPath, "contains an absolute developer-machine path");
      }
      if (credentialPattern.test(content)) {
        fail(entryPath, "contains content resembling a private key or access token");
      }
    }
  }

  walk(skillsRoot);
}

function validateLocalMarkdownLinks() {
  const ignored = new Set([".git", ".gstack", "node_modules"]);
  const markdownFiles = walkFiles(repoRoot, ignored)
    .filter((filePath) => filePath.endsWith(".md"));
  const linkPattern = /!?\[[^\]]*]\(([^)]+)\)/g;

  for (const filePath of markdownFiles) {
    const content = fs.readFileSync(filePath, "utf8");

    for (const match of content.matchAll(linkPattern)) {
      let target = match[1].trim();
      if (
        target === ""
        || target.startsWith("#")
        || /^(?:https?:|mailto:)/i.test(target)
      ) {
        continue;
      }

      if (target.startsWith("<") && target.endsWith(">")) {
        target = target.slice(1, -1);
      }

      target = target.split("#", 1)[0].split("?", 1)[0];
      let decodedTarget;
      try {
        decodedTarget = decodeURIComponent(target);
      } catch {
        fail(filePath, `invalid percent-encoding in Markdown link: ${target}`);
        continue;
      }

      const resolved = path.resolve(path.dirname(filePath), decodedTarget);
      if (!fs.existsSync(resolved)) {
        fail(filePath, `local Markdown link does not exist: ${target}`);
      }
    }
  }
}

function validateRepositoryYamlFiles() {
  const githubRoot = path.join(repoRoot, ".github");
  if (!fs.existsSync(githubRoot)) {
    fail(githubRoot, "missing GitHub repository configuration");
    return;
  }

  const yamlFiles = walkFiles(githubRoot)
    .filter((filePath) => /\.ya?ml$/i.test(filePath));

  for (const filePath of yamlFiles) {
    const data = parseYaml(fs.readFileSync(filePath, "utf8"), filePath);
    if (data !== null) {
      repositoryYamlCount += 1;
    }
  }
}

function validateSkillsShConfig() {
  const configPath = path.join(repoRoot, "skills.sh.json");
  if (!fs.existsSync(configPath)) {
    fail(configPath, "missing skills.sh repository-page configuration");
    return;
  }

  let config;
  try {
    config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    jsonCount += 1;
  } catch (error) {
    fail(configPath, `invalid JSON: ${error.message}`);
    return;
  }

  if (config.$schema !== "https://skills.sh/schemas/skills.sh.schema.json") {
    fail(configPath, "must declare the official skills.sh JSON schema");
  }
  if (!["top", "bottom"].includes(config.notGrouped)) {
    fail(configPath, "notGrouped must be 'top' or 'bottom'");
  }
  if (!Array.isArray(config.groupings) || config.groupings.length === 0) {
    fail(configPath, "groupings must be a non-empty array");
    return;
  }

  const groupedNames = new Set();
  for (const [index, grouping] of config.groupings.entries()) {
    const prefix = `groupings[${index}]`;
    requireString(grouping.title, configPath, `${prefix}.title`);
    if (grouping.description !== undefined) {
      requireString(grouping.description, configPath, `${prefix}.description`);
    }
    if (!Array.isArray(grouping.skills) || grouping.skills.length === 0) {
      fail(configPath, `${prefix}.skills must be a non-empty array`);
      continue;
    }

    for (const skillName of grouping.skills) {
      if (typeof skillName !== "string") {
        fail(configPath, `${prefix}.skills must contain strings`);
      } else if (!names.has(skillName)) {
        fail(configPath, `${prefix} references unknown Skill '${skillName}'`);
      } else if (groupedNames.has(skillName)) {
        fail(configPath, `Skill '${skillName}' appears in more than one grouping`);
      } else {
        groupedNames.add(skillName);
      }
    }
  }

  const ungrouped = [...names].filter((name) => !groupedNames.has(name));
  if (ungrouped.length > 0) {
    fail(configPath, `missing Skill group assignments: ${ungrouped.join(", ")}`);
  }
}

if (fs.existsSync(path.join(repoRoot, "SKILL.md"))) {
  fail(path.join(repoRoot, "SKILL.md"), "root SKILL.md would shadow the suite in default CLI discovery");
}

const skillDirectories = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => path.join(skillsRoot, entry.name))
  .filter((entryPath) => fs.existsSync(path.join(entryPath, "SKILL.md")))
  .sort();

if (skillDirectories.length === 0) {
  fail(skillsRoot, "no skills/<name>/SKILL.md packages found");
}

for (const skillDir of skillDirectories) {
  validateSkill(skillDir);
}

const catalogPath = path.join(skillsRoot, "README.md");
const catalog = fs.readFileSync(catalogPath, "utf8");
for (const name of names) {
  if (!catalog.includes(`\`${name}\``)) {
    fail(catalogPath, `catalog does not mention '${name}'`);
  }
}

validateJsonFiles();
validateSkillsShConfig();
validateRepositoryYamlFiles();
validateDistributableSafety();
validateLocalMarkdownLinks();

for (const message of warnings) {
  console.warn(`WARN ${message}`);
}

if (failures.length > 0) {
  for (const message of failures) {
    console.error(`ERROR ${message}`);
  }
  console.error(`\nValidation failed with ${failures.length} error(s).`);
  process.exit(1);
}

console.log(
  `Validated ${skillDirectories.length} Skills, ${evalCount} eval cases, `
  + `${jsonCount} JSON files, ${repositoryYamlCount} repository YAML files, `
  + "interface metadata, resources, and local links.",
);
