#!/usr/bin/env node

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = path.join(repoRoot, "skills");
const requestedSource = process.argv[2];
const installSource = requestedSource
  ? (
      path.isAbsolute(requestedSource) || requestedSource.startsWith(".")
        ? path.resolve(repoRoot, requestedSource)
        : requestedSource
    )
  : repoRoot;
const sourceLabel = requestedSource ?? "local checkout";
const cliEntry = path.join(
  repoRoot,
  "node_modules",
  "skills",
  "bin",
  "cli.mjs",
);

if (!fs.existsSync(cliEntry)) {
  console.error("skills CLI is not installed. Run `bun install` first.");
  process.exit(2);
}

const expectedNames = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .filter((entry) => fs.existsSync(path.join(skillsRoot, entry.name, "SKILL.md")))
  .map((entry) => entry.name)
  .sort();

function runCli(args, cwd) {
  return new Promise((resolveResult) => {
    // Invoke the pinned package entry with the current Node runtime. This avoids
    // platform-specific shebang/symlink behavior while exercising the same CLI.
    const child = spawn(process.execPath, [cliEntry, ...args], {
      cwd,
      env: {
        ...process.env,
        CI: "1",
        DISABLE_TELEMETRY: "1",
        DO_NOT_TRACK: "1",
        FORCE_COLOR: "0",
        NO_COLOR: "1",
      },
      stdio: ["ignore", "pipe", "pipe"],
    });
    const stdout = [];
    const stderr = [];
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, requestedSource ? 120_000 : 60_000);

    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      resolveResult({ error });
    });
    child.on("close", (status, signal) => {
      clearTimeout(timer);
      resolveResult({
        status,
        signal,
        timedOut,
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8"),
      });
    });
  });
}

function outputFor(result) {
  return `${result.stdout ?? ""}\n${result.stderr ?? ""}`
    .replace(/\u001B\[[0-?]*[ -/]*[@-~]/g, "");
}

function assertCliSuccess(result, operation) {
  if (result.error) {
    throw new Error(`Unable to run skills CLI for ${operation}: ${result.error.message}`);
  }

  if (result.timedOut) {
    throw new Error(`skills CLI ${operation} timed out after 60 seconds.`);
  }

  if (result.status !== 0) {
    throw new Error(
      `${outputFor(result).trim()}\n`
      + `skills CLI ${operation} exited with status ${result.status}.`,
    );
  }
}

function listRelativeFiles(root) {
  const files = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(entryPath);
      } else if (entry.isFile()) {
        files.push(path.relative(root, entryPath));
      } else {
        throw new Error(`Unexpected non-file entry: ${entryPath}`);
      }
    }
  }

  walk(root);
  return files.sort();
}

const result = await runCli(["add", installSource, "--list"], repoRoot);
try {
  assertCliSuccess(result, `${sourceLabel} discovery`);
} catch (error) {
  console.error(error.message);
  process.exit(2);
}

const output = outputFor(result);

const countMatch = output.match(/Found\s+(\d+)\s+skills?/i);
if (!countMatch) {
  console.error(output.trim());
  console.error("Could not determine the number of Skills discovered by the CLI.");
  process.exit(1);
}

const discoveredCount = Number.parseInt(countMatch[1], 10);
const missing = expectedNames.filter((name) => !output.includes(name));

if (discoveredCount !== expectedNames.length || missing.length > 0) {
  console.error(output.trim());
  console.error(
    `Expected ${expectedNames.length} Skills; CLI reported ${discoveredCount}.`,
  );
  if (missing.length > 0) {
    console.error(`Missing from CLI output: ${missing.join(", ")}`);
  }
  process.exit(1);
}

console.log(
  `skills CLI discovered all ${expectedNames.length} Skills from `
  + `${sourceLabel}: `
  + expectedNames.join(", "),
);

const installRoot = fs.mkdtempSync(path.join(os.tmpdir(), "vibe-design-skills-install-"));
let installFailure = null;

try {
  const installResult = await runCli([
    "add",
    installSource,
    "--skill",
    "*",
    "--agent",
    "codex",
    "--yes",
    "--copy",
  ], installRoot);
  assertCliSuccess(
    installResult,
    `clean Codex installation from ${sourceLabel}`,
  );

  const installedSkillsRoot = path.join(installRoot, ".agents", "skills");
  for (const name of expectedNames) {
    const sourceDir = path.join(skillsRoot, name);
    const installedDir = path.join(installedSkillsRoot, name);
    if (!fs.existsSync(installedDir)) {
      throw new Error(`Clean installation is missing ${name}.`);
    }

    const sourceFiles = listRelativeFiles(sourceDir);
    const installedFiles = listRelativeFiles(installedDir);
    if (JSON.stringify(sourceFiles) !== JSON.stringify(installedFiles)) {
      throw new Error(
        `Installed file list differs for ${name}.\n`
        + `Source: ${sourceFiles.join(", ")}\n`
        + `Installed: ${installedFiles.join(", ")}`,
      );
    }

    for (const relativePath of sourceFiles) {
      const source = fs.readFileSync(path.join(sourceDir, relativePath));
      const installed = fs.readFileSync(path.join(installedDir, relativePath));
      if (!source.equals(installed)) {
        throw new Error(`Installed content differs: ${name}/${relativePath}`);
      }
    }
  }

  const lockPath = path.join(installRoot, "skills-lock.json");
  const lock = JSON.parse(fs.readFileSync(lockPath, "utf8"));
  const lockedNames = Object.keys(lock.skills ?? {}).sort();
  if (JSON.stringify(lockedNames) !== JSON.stringify(expectedNames)) {
    throw new Error(
      `skills-lock.json does not contain the exact catalog: ${lockedNames.join(", ")}`,
    );
  }

  console.log(
    `Clean Codex install from ${sourceLabel} preserved every file in all `
    + `${expectedNames.length} Skill packages.`,
  );
} catch (error) {
  installFailure = error;
} finally {
  fs.rmSync(installRoot, { recursive: true, force: true });
}

if (installFailure) {
  console.error(installFailure.message);
  process.exit(1);
}
