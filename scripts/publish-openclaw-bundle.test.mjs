import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  isNewSkillRateLimitError,
  parseRateLimitResetSeconds,
  planRateLimitRetry,
} from "./publish-openclaw-bundle.mjs";

for (const dryRun of [false, true]) {
  test(`publisher forwards the configured version${dryRun ? " in dry-run mode" : ""}`, () => {
    const { version } = JSON.parse(readFileSync("openclaw.skills.json", "utf8"));
    const result = spawnSync(
      process.execPath,
      [
        "scripts/publish-openclaw-bundle.mjs",
        "--root",
        "skills",
        "--clawhub-bin",
        "echo",
        ...(dryRun ? ["--dry-run"] : []),
      ],
      { encoding: "utf8" },
    );

    assert.equal(result.status, 0, result.stderr);
    const commands = result.stdout.split("\n").filter((line) => line.startsWith("skill publish "));
    assert.ok(commands.length > 0);
    for (const command of commands) {
      assert.ok(command.includes(` --version ${version} `), command);
      assert.equal(command.endsWith(" --dry-run"), dryRun);
    }
  });
}

test("detects ClawHub new-skill rate-limit failures", () => {
  const stderr = [
    "Error: Rate limit: max 5 new skills per hour. Please wait before publishing more.",
    "    at enforceNewSkillRateLimit (../../convex/skills.ts:1505:6) (reset in 57s)",
  ].join("\n");

  assert.equal(isNewSkillRateLimitError(stderr), true);
  assert.equal(parseRateLimitResetSeconds(stderr), 57);
});

test("does not retry unrelated ClawHub failures", () => {
  const stderr = "Error: missing metadata.openclaw";

  assert.equal(isNewSkillRateLimitError(stderr), false);
  assert.equal(parseRateLimitResetSeconds(stderr), null);
});

test("adds a small buffer to rate-limit retry waits", () => {
  const retry = planRateLimitRetry({
    output: "Rate limit: max 5 new skills per hour (reset in 57s)",
    bufferSeconds: 5,
    maxWaitSeconds: 120,
  });

  assert.deepEqual(retry, { shouldRetry: true, waitSeconds: 62 });
});

test("refuses rate-limit waits beyond the configured ceiling", () => {
  const retry = planRateLimitRetry({
    output: "Rate limit: max 5 new skills per hour (reset in 3600s)",
    bufferSeconds: 5,
    maxWaitSeconds: 120,
  });

  assert.deepEqual(retry, { shouldRetry: false, waitSeconds: 3605 });
});

test("workflow publishes through the rate-limit-aware wrapper", () => {
  const workflow = readFileSync(".github/workflows/openclaw-clawhub.yml", "utf8");

  assert.match(workflow, /node scripts\/publish-openclaw-bundle\.mjs --dry-run/);
  assert.match(workflow, /node scripts\/publish-openclaw-bundle\.mjs/);
  assert.doesNotMatch(workflow, /for skill_path in dist\/clawhub\/skills\/\*/);
});

test("workflow auto-publishes ClawHub skills on main pushes", () => {
  const workflow = readFileSync(".github/workflows/openclaw-clawhub.yml", "utf8");

  assert.match(workflow, /if:\s*\$\{\{\s*github\.event_name == 'push'/);
  assert.match(workflow, /^\s+environment:\s+clawhub$/m);
});
