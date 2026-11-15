import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { buildPluginBundles, collectPluginBundleDrift } from "./build-plugin-bundles.mjs";
import {
  validateWorkflowPathFilters,
  workflowPathRequirements,
} from "./check-workflow-path-filters.mjs";

function makeRepo() {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "sendmux-plugin-bundles-"));
  mkdirSync(path.join(repoRoot, "skills", "sendmux-test", "references"), { recursive: true });
  mkdirSync(path.join(repoRoot, "skills", "sendmux-test", "agents"), { recursive: true });
  mkdirSync(path.join(repoRoot, "skills", "sendmux-test", "evals"), { recursive: true });
  mkdirSync(path.join(repoRoot, "assets"), { recursive: true });
  writeFileSync(
    path.join(repoRoot, "assets", "sendmux-mark.svg"),
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"></svg>\n',
  );
  writeFileSync(
    path.join(repoRoot, "openclaw.skills.json"),
    `${JSON.stringify(
      {
        homepage: "https://github.com/qubrics/skills",
        version: "1.2.3",
        skills: {
          "sendmux-test": {
            displayName: "Sendmux Test",
            description: "Test Sendmux workflow.",
          },
        },
      },
      null,
      2,
    )}\n`,
  );
  writeFileSync(
    path.join(repoRoot, "skills", "sendmux-test", "SKILL.md"),
    [
      "---",
      "name: sendmux-test",
      "description: Test Sendmux workflow.",
      "---",
      "",
      "# Sendmux test",
      "",
      "Use this test skill.",
      "",
    ].join("\n"),
  );
  writeFileSync(
    path.join(repoRoot, "skills", "sendmux-test", "references", "notes.md"),
    "reference\n",
  );
  writeFileSync(
    path.join(repoRoot, "skills", "sendmux-test", "agents", "openai.yaml"),
    "interface:\n  display_name: Sendmux Test\n  short_description: Test\n",
  );
  writeFileSync(path.join(repoRoot, "skills", "sendmux-test", "evals", "evals.json"), "[]\n");
  return repoRoot;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

test("OpenClaw metadata declares both environment names with Qubrics primary", () => {
  const repoRoot = makeRepo();
  try {
    const configPath = path.join(repoRoot, "openclaw.skills.json");
    const config = readJson(configPath);
    config.envVars = { QUBRICS_API_KEY: "Qubrics credential", SENDMUX_API_KEY: "Compatibility credential" };
    config.outputRoot = "dist/clawhub/skills";
    writeFileSync(configPath, JSON.stringify(config));
    const skillPath = path.join(repoRoot, "skills", "sendmux-test", "SKILL.md");
    writeFileSync(skillPath, `${readFileSync(skillPath, "utf8")}Use QUBRICS_API_KEY; SENDMUX_API_KEY remains supported.\n`);
    mkdirSync(path.join(repoRoot, "scripts"));
    cpSync("scripts/build-openclaw-bundle.mjs", path.join(repoRoot, "scripts", "build-openclaw-bundle.mjs"));

    const result = spawnSync(process.execPath, [path.join(repoRoot, "scripts", "build-openclaw-bundle.mjs")], { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    const generated = readFileSync(path.join(repoRoot, "dist", "clawhub", "skills", "sendmux-test", "SKILL.md"), "utf8");
    const frontmatter = generated.split("---")[1];
    assert.match(frontmatter, /primaryEnv: "QUBRICS_API_KEY"/);
    assert.match(frontmatter, /name: "QUBRICS_API_KEY"/);
    assert.match(frontmatter, /name: "SENDMUX_API_KEY"/);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("resolves Qubrics and deprecated Sendmux entries to installable matching manifests", () => {
  const repoRoot = makeRepo();
  try {
    renameSync(
      path.join(repoRoot, "skills", "sendmux-test"),
      path.join(repoRoot, "skills", "qubrics-test"),
    );
    const source = path.join(repoRoot, "skills", "qubrics-test", "SKILL.md");
    writeFileSync(source, readFileSync(source, "utf8").replaceAll("sendmux-test", "qubrics-test"));
    buildPluginBundles(repoRoot);

    for (const [catalogue, manifestDirectory] of [
      [".agents/plugins/marketplace.json", ".codex-plugin"],
      [".claude-plugin/marketplace.json", ".claude-plugin"],
    ]) {
      const marketplace = readJson(path.join(repoRoot, catalogue));
      assert.equal(marketplace.name, "qubrics");
      assert.deepEqual(marketplace.plugins.map((entry) => entry.name), ["qubrics", "sendmux"]);
      for (const entry of marketplace.plugins) {
        const pluginRoot = path.resolve(repoRoot, typeof entry.source === "string" ? entry.source : entry.source.path);
        const manifest = readJson(path.join(pluginRoot, manifestDirectory, "plugin.json"));
        assert.equal(manifest.name, entry.name, "installer requires marketplace and manifest names to match");
        assert.equal(manifest.version, "1.2.3");
        assert.equal(
          readFileSync(path.resolve(pluginRoot, manifest.skills, "qubrics-test", "SKILL.md"), "utf8"),
          readFileSync(source, "utf8"),
        );
        if (entry.name === "sendmux") {
          assert.match(manifest.description, /deprecated.*qubrics/i);
          if (manifest.interface) assert.match(manifest.interface.shortDescription, /deprecated.*qubrics/i);
        }
      }
    }
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("builds marketplace plugin bundles from canonical skills", () => {
  const repoRoot = makeRepo();
  try {
    buildPluginBundles(repoRoot);

    const claudeMarketplace = readJson(
      path.join(repoRoot, ".claude-plugin", "marketplace.json"),
    );
    assert.equal(claudeMarketplace.name, "qubrics");
    assert.equal(claudeMarketplace.owner.name, "Qubrics");
    assert.equal(claudeMarketplace.plugins[0].name, "qubrics");
    assert.equal(claudeMarketplace.plugins[0].source, "./plugins/qubrics");
    assert.equal(claudeMarketplace.plugins[0].version, "1.2.3");

    const codexMarketplace = readJson(
      path.join(repoRoot, ".agents", "plugins", "marketplace.json"),
    );
    assert.equal(codexMarketplace.name, "qubrics");
    assert.equal(codexMarketplace.interface.displayName, "Qubrics");
    assert.equal(codexMarketplace.plugins[0].source.path, "./plugins/qubrics");
    assert.equal(codexMarketplace.plugins[0].policy.installation, "AVAILABLE");

    const codexManifest = readJson(
      path.join(repoRoot, "plugins", "qubrics", ".codex-plugin", "plugin.json"),
    );
    assert.equal(codexManifest.name, "qubrics");
    assert.equal(codexManifest.version, "1.2.3");
    assert.equal(codexManifest.skills, "./skills/");
    assert.equal(codexManifest.interface.displayName, "Qubrics");

    const cursorManifest = readJson(
      path.join(repoRoot, ".cursor-plugin", "plugin.json"),
    );
    assert.deepEqual(cursorManifest, {
      name: "qubrics",
      displayName: "Qubrics",
      version: "1.2.3",
      description:
        "Official Qubrics Agent Skills for email, mailbox, MCP, CLI, and SDK workflows.",
      author: { name: "Qubrics" },
      homepage: "https://qubrics.com/docs/guides/agent-skills",
      repository: "https://github.com/qubrics/skills",
      license: "Apache-2.0",
      logo: "assets/sendmux-mark.svg",
      keywords: ["qubrics", "email", "agent-skills", "mcp", "cli"],
      category: "communication",
      skills: "./skills/",
      mcpServers: "./mcp.json",
    });

    const cursorMcp = readFileSync(path.join(repoRoot, "mcp.json"), "utf8");
    const openPluginMcp = readFileSync(path.join(repoRoot, ".mcp.json"), "utf8");
    assert.equal(cursorMcp, openPluginMcp);
    assert.deepEqual(JSON.parse(cursorMcp), {
      mcpServers: {
        qubrics: {
          type: "http",
          url: "https://mcp.qubrics.com/mcp",
        },
      },
    });

    assert.equal(
      existsSync(path.join(repoRoot, "plugins", "qubrics", "skills", "sendmux-test", "SKILL.md")),
      true,
    );
    assert.equal(
      existsSync(
        path.join(repoRoot, "plugins", "qubrics", "skills", "sendmux-test", "references", "notes.md"),
      ),
      true,
    );
    assert.equal(
      existsSync(
        path.join(repoRoot, "plugins", "qubrics", "skills", "sendmux-test", "agents", "openai.yaml"),
      ),
      true,
    );
    assert.equal(
      existsSync(path.join(repoRoot, "plugins", "qubrics", "skills", "sendmux-test", "evals")),
      false,
    );
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("detects stale committed plugin bundles", () => {
  const repoRoot = makeRepo();
  try {
    buildPluginBundles(repoRoot);
    assert.deepEqual(collectPluginBundleDrift(repoRoot), []);

    writeFileSync(
      path.join(repoRoot, "plugins", "sendmux", "skills", "sendmux-test", "SKILL.md"),
      "stale\n",
    );

    assert.match(collectPluginBundleDrift(repoRoot).join("\n"), /plugins\/sendmux\/skills\/sendmux-test\/SKILL\.md/);
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("detects stale Cursor manifest and MCP outputs", () => {
  const repoRoot = makeRepo();
  try {
    for (const relativePath of [
      ".cursor-plugin/plugin.json",
      "mcp.json",
      ".mcp.json",
    ]) {
      buildPluginBundles(repoRoot);
      writeFileSync(path.join(repoRoot, relativePath), "stale\n");
      assert.match(
        collectPluginBundleDrift(repoRoot).join("\n"),
        new RegExp(relativePath.replaceAll(".", "\\.")),
      );
    }
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("fails clearly when the Cursor logo is missing", () => {
  const repoRoot = makeRepo();
  try {
    rmSync(path.join(repoRoot, "assets", "sendmux-mark.svg"));
    assert.throws(
      () => buildPluginBundles(repoRoot),
      /assets\/sendmux-mark\.svg must exist for the Cursor plugin bundle/,
    );
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("fails clearly when canonical skills are missing", () => {
  const repoRoot = makeRepo();
  try {
    rmSync(path.join(repoRoot, "skills"), { recursive: true, force: true });
    assert.throws(
      () => buildPluginBundles(repoRoot),
      /skills\/ must contain at least one skill with SKILL\.md/,
    );
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});

test("workflow checks plugin bundle drift", () => {
  const workflow = readFileSync(".github/workflows/plugin-bundles.yml", "utf8");

  assert.match(workflow, /node --test scripts\/build-plugin-bundles\.test\.mjs/);
  assert.match(workflow, /node scripts\/check-plugin-bundles\.mjs/);
  for (const filteredPath of [
    "skills/\\*\\*",
    "openclaw\\.skills\\.json",
    "assets/\\*\\*",
    "\\.cursor-plugin/\\*\\*",
    "mcp\\.json",
    "\\.mcp\\.json",
    "README\\.md",
    "scripts/build-plugin-bundles\\.test\\.mjs",
  ]) {
    assert.equal(
      workflow.match(new RegExp(`"${filteredPath}"`, "g"))?.length,
      2,
      `${filteredPath} must appear in pull_request and push filters`,
    );
  }
});

function mutateEventPath(workflowText, eventName, requiredPath) {
  const lines = workflowText.replaceAll("\r\n", "\n").split("\n");
  const eventIndex = lines.findIndex((line) => line === `  ${eventName}:`);
  assert.notEqual(eventIndex, -1, `missing ${eventName} event`);
  const nextEventIndex = lines.findIndex(
    (line, index) => index > eventIndex && /^  \S[^:]*:/.test(line),
  );
  const eventEnd = nextEventIndex === -1 ? lines.length : nextEventIndex;
  const pathIndex = lines.findIndex(
    (line, index) =>
      index > eventIndex && index < eventEnd && line.trim() === `- "${requiredPath}"`,
  );
  assert.notEqual(pathIndex, -1, `${eventName}.paths missing ${requiredPath}`);
  lines.splice(pathIndex, 1);

  const otherEvent = eventName === "push" ? "pull_request" : "push";
  const otherEventIndex = lines.findIndex((line) => line === `  ${otherEvent}:`);
  const duplicateIndex = lines.findIndex(
    (line, index) => index > otherEventIndex && line.trim() === `- "${requiredPath}"`,
  );
  assert.notEqual(duplicateIndex, -1, `${otherEvent}.paths missing ${requiredPath}`);
  lines.splice(duplicateIndex, 0, lines[duplicateIndex]);
  return lines.join("\n");
}

test("workflow path filters cover every reader independently for push and pull requests", () => {
  for (const [workflowPath, requiredPaths] of workflowPathRequirements) {
    const workflow = readFileSync(workflowPath, "utf8");
    assert.deepEqual(validateWorkflowPathFilters(workflowPath, workflow, requiredPaths), []);
    assert.deepEqual(
      validateWorkflowPathFilters(workflowPath, workflow.replaceAll("\n", "\r\n"), requiredPaths),
      [],
    );

    for (const eventName of ["pull_request", "push"]) {
      for (const requirement of requiredPaths) {
        const mutated = mutateEventPath(workflow, eventName, requirement.path);
        const failures = validateWorkflowPathFilters(workflowPath, mutated, requiredPaths);
        assert.equal(
          failures.some(
            (failure) =>
              failure.includes(`${eventName}.paths missing "${requirement.path}"`) &&
              failure.includes(requirement.reader),
          ),
          true,
          `${workflowPath} must reject ${eventName} omission of ${requirement.path}`,
        );
      }
    }
  }
});

test("Cursor discovers every declared canonical skill", () => {
  const manifest = readJson(".cursor-plugin/plugin.json");
  const config = readJson("openclaw.skills.json");
  const skillRoot = path.resolve(manifest.skills);
  const discoverable = readdirSync(skillRoot)
    .filter((slug) => existsSync(path.join(skillRoot, slug, "SKILL.md")))
    .sort();
  assert.deepEqual(discoverable, Object.keys(config.skills).sort());
});

test("documents the pending Cursor plugin without claiming publication", () => {
  const readme = readFileSync("README.md", "utf8");
  assert.match(readme, /Cursor \(after marketplace publication\):/);
  assert.match(readme, /\/add-plugin qubrics/);
  assert.match(readme, /\| Cursor \| After official marketplace publication/);
  assert.match(readme, /Generate Cursor, Claude, and Codex marketplace bundles:/);
});
