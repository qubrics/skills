# SDK344 immutable MCP namespace selection

## Cause and scope

Ops A18 directive on 2026-11-10 requires the checker to accept either committed MCP namespace. Before this change, `scripts/skill-compatibility.mjs` hardcoded `packages/python/mcp/sendmux_mcp`; `sdkContracts()` used that root for the MCP contract, every provenance source and both OpenAPI snapshots. A commit containing only `qubrics_mcp` therefore failed before compatibility could be assessed.

Canonical per the directive and the existing `committed().read()` boundary: read `packages/python/mcp/pyproject.toml` through the same immutable SDK revision, select `sendmux_mcp` for `[project].name = "sendmux-mcp"` or `qubrics_mcp` for `"qubrics-mcp"`, and reject any other identity. All three consumers retain the shared root. No working-tree fallback, generated production tree, new dependency, changed review record or acceptance bypass is added.

Only the checker, its existing CLI tests and this evidence change. Public skill content, publication configuration, SDK sources and marketplace operator steps remain unchanged.

## Tests

Existing public CLI seams: `--inspect-candidate` and `--candidate`. Test fixtures are temporary Git repositories, never SDK production trees. Their Git helper asserts that every command stays under its own `mkdtemp` directory; cleanup removes each fixture after its test.

- Added `MCP namespace follows the project identity in the pinned SDK revision`: legacy inspection succeeds; a committed module rename preserves tool contracts and snapshot hashes; an uncommitted legacy project name cannot redirect the pinned read; normal acceptance still produces all 22 reviewed rows; changed committed provenance is still rejected.
- Added `MCP namespace selection rejects missing or unsupported project identity`: neither an unrelated project name nor a name in another TOML table can select the root.
- Existing fixtures now include the real MCP `[project]` identity. The console-script mutation fixture preserves that identity while testing its existing review gate.
- No tests removed, skipped, weakened or implemented with source-text assertions.

Red on base checker `c4e01f547b32591b658844da8d65b54da86554aa`: renamed source fails with `fatal: path 'packages/python/mcp/sendmux_mcp/mcp-contract.json' does not exist`; unsupported identity fails the new assertion with `Expected "actual" to be strictly unequal to: 0`, proving the old checker silently accepted that identity.

First full local run exposed a fixture error: the provenance mutation commit also included the deliberately dirty legacy `pyproject.toml`. The checker correctly selected the committed legacy root, which no longer existed. Restoring `qubrics-mcp` before that fixture commit makes it exercise stale provenance as intended; its assertion remains unchanged. This was a fixture correction, not a second implementation attempt.

After correction, `node --test scripts/skill-compatibility.test.mjs` passed 23/23, zero skipped, exit 0. `git diff --check` passed. Full static/compatibility checks and exact acceptance run in the existing Skills CI; PR/main results will be recorded after they finish. No browser journey applies to this command-line checker change.

Raw logs retained in MAIN `.claude/artifacts/rebrand-qubrics-skills34/`: `sdk344-mcp-root.red.log`, `sdk344-mcp-identity.red.log`, `sdk344-compatibility-tests.log` (fixture failure), and `sdk344-compatibility-tests-fixed.log` (23/23).

## SDK guard requires a release on its default path

Read-only inspection at SDK main `f0e8b721acf62816475f43dd87b18fe025fa0e10`:

- [Release Please lines 75–85](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/.github/workflows/release-please.yml#L75) invokes `skill-release-checks` without its optional revision input, before publication preflight.
- [Skill release action lines 25–35](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/.github/actions/skill-release-checks/action.yml#L25) selects the latest Skills release, downloads `acceptance.json`, requires `accepted: true`, and takes its proposed Skills revision. [Lines 61–68](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/.github/actions/skill-release-checks/action.yml#L61) bind checkout, tag and receipt before exporting the immutable revision.
- [Publication guard lines 59–80](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/scripts/publication-guard.mjs#L59) requires those pinned inputs, verifies checker bytes against that revision, and computes acceptance for the exact publishing source with matching snapshot hashes.

Therefore a merged checker alone cannot update the default SDK publication guard. It needs a separately approved latest Skills release/tag containing this checker and the unmodified exact-main CI acceptance asset. The action supports an explicit proposed revision for existing review/diagnostic callers; no SDK workflow or input is changed here. A merged record is not a substitute for the default release selection.

No Skills release/tag, SDK workflow, ClawHub enablement/publication, npm action or Cursor submission is authorised by this source fix. Any release/tag remains a separate exact ASK. Source rollback is a normal revert PR. Existing `v2.0.0` remains the released checker until that boundary is approved and executed.
