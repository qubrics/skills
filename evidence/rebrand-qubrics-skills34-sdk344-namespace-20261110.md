# SDK344 canonical Python namespace correction

## Root cause

The v2.0.1 checker selected the module by replacing distribution-name hyphens with underscores. That produces `qubrics_mcp`, but spec A18 (`specs/rebrand-qubrics/spec.md:31` in qubrics/qubrics) requires native Python packages under import package `qubrics`. The MCP distribution `qubrics-mcp` therefore lives at `packages/python/mcp/qubrics/mcp`.

SDK344 measured the failure using the exact released checker at Skills `3ad9e60baad859cb5e9701bb1f857e1ee485e178`, blob `ebb8f8a4b4e2381b32b4a84d506366724c742d8a`. Its qualification log reports legacy acceptance PASS, changed-new-snapshot rejection PASS, and renamed-source positive acceptance FAIL: `fatal: path 'packages/python/mcp/qubrics_mcp/mcp-contract.json' does not exist`. Source: SDK344 `evidence/rebrand-qubrics-sdk344-python-20261110.md`, section “Confirmed Skills checker blocker”; raw log in SDK MAIN `.claude/artifacts/rebrand-qubrics-sdk344/skills-3ad9e60-qualification.log`. These are SDK owner's measurements, not SDK checks run by this task.

Escape: the Skills renamed-source fixture copied the same incorrect `qubrics_mcp` layout, so its positive test did not represent A18. The previous mapping and its test assumption are superseded by this correction; the earlier immutable-reader and provenance protections remain valid.

Canonical per A18 and the observed SDK namespace: exact immutable `[project].name` `sendmux-mcp` selects `sendmux_mcp`; `qubrics-mcp` selects `qubrics/mcp`; other identities fail closed. `sdkContracts()` remains the single selector. Contract, provenance sources and both snapshots all use its shared root through `committed().read()` at the same revision. No directory-existence fallback, synthetic production tree, compatibility directory, export, parser dependency or guard change.

## Red and green proof

Corrected the existing public CLI regression `MCP namespace follows the pinned project identity into canonical qubrics/mcp`. Its committed renamed source now contains only `qubrics/mcp`; the positive inspection, 22-row acceptance, snapshot identity, dirty-working-tree isolation and stale-provenance assertions are retained. No assertion weakened, test removed or case skipped.

Before the implementation fix, this exact regression failed against v2.0.1 with the same missing `qubrics_mcp/mcp-contract.json` error; one test, one failure, zero skipped. The origin fix is one root-mapping line, retaining the validated two-name identity boundary. Legacy fixtures and unrelated snapshot rejection cases are unchanged.

Raw local red/green output: Skills MAIN `.claude/artifacts/rebrand-qubrics-skills34/sdk344-canonical-root.red.log` and `sdk344-canonical-root.green.log`. Focused compatibility suite passed 23/23, zero skipped, exit 0; `git diff --check` passed. Existing CI results are recorded in the PR and task evidence after completion. No SDK source, test or workflow is changed or run. No browser journey applies to this CLI checker change.

## Publication boundary

Ops authorises an ordinary PR, normal non-admin merge after green CI/settled review, and one checker-only GitHub `v2.0.2` latest non-prerelease release under #34 approval 2A, with its NEW exact-main CI acceptance asset. Skill bodies and plugin metadata remain `2.0.0`; no marketplace, SDK, npm or telemetry action is included. ClawHub stays disabled, Cursor operator status and four cleanup holds stay unchanged.

The SDK default guard requires the corrected release: [publication guard lines 59–80](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/scripts/publication-guard.mjs#L59) pins checker bytes and computes fresh exact-source acceptance; [skill release action lines 25–35](https://github.com/qubrics/qubrics-sdk/blob/f0e8b721acf62816475f43dd87b18fe025fa0e10/.github/actions/skill-release-checks/action.yml#L25) selects latest Skills release/acceptance by default. A merged record alone does not update that default selection.

Rollback: `gh release edit v2.0.1 --repo qubrics/skills --latest`, plus a normal revert PR. No retag, deletion, asset replacement or marketplace rollback action. The new release baseline acceptance will not claim that SDK344's future candidate has passed; that candidate needs its own fresh measurement by its owner.
