# Producer compatibility renewal for Skills #34

Goal: qualify exact SDK candidates `c8549be2099e5a2f6947262bbeaf6f5e8b678801` and `b7dad6ca42ee59c747bf14c11cc4619fcc3b742f` through the existing Skills-origin review mechanism. No SDK source, workflow, marketplace, tag or release change is included.

## Reproduced failure and cause

Both official exact-candidate checks at Skills base `ce2484f012411e06a1ea692ed8b978800a3be047` exited 1:

```text
Skill compatibility failed: published/email-for-ai-agents requires a compatibility review or workflow evidence for f81288de22ec063dabed513a35ae2898641de1517a3ca321ab2eb02b0ce9b9f6
```

Each descriptor came from the existing `--prepare-candidate` command with the exact immutable SDK revision. No acceptance receipt was produced by either failed check. Raw descriptors, inspections and logs: Skills MAIN `.claude/artifacts/rebrand-qubrics-skills34/producer-sync-20261119/before-{c8549be2,b7dad6ca}*`.

The default v2.0.5 failure reported by the SDK owner has the same rejected contract. Its packet is SDK MAIN `.claude/tasks/rebrand-qubrics-sdk344/producer-sync-skills-origin-20261119.md`; raw `producer-sync-20261119/default/guard.log:3` and `ruby-sending-b7dad6ca-20261119/default-guard.log:3`. Those runs passed live OpenAPI equality first. Their runtime result is the SDK owner's evidence, not a new SDK guard run by this task.

Canonical per [the immutable checker](https://github.com/qubrics/skills/blob/ce2484f012411e06a1ea692ed8b978800a3be047/scripts/skill-compatibility.mjs#L334): a review must bind the actual skill digest and selected-contract digest, with committed evidence whose hash verifies. Changed descriptions and examples remain contract inputs. A legacy skill without direct approval can pass only through its changed, genuinely evaluated replacement with the exact previous-skill binding (lines 339–350).

Root cause: the SDK's generated MCP contract now includes Qubrics producer metadata. Compared with prior reviewed SDK `57435acb6517ece3a78a3f1774f37dcce6985935`, `packages/python/mcp/qubrics/mcp/mcp-contract.json` changes its two snapshot provenance hashes and twelve example values across original tools and Qubrics aliases. The CLI and MCP runtime sources are unchanged; changed comments in a mapped TypeScript declaration do not change its selected tokens. The checker verifies the provenance before selecting and hashing tool contracts. Fifteen of 22 lane/name pairs have no direct matching record; this includes legacy pairs that require tested supersession rather than a new direct compatibility approval.

The origin App/Sending tuple is preserved: App `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e`, Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`. No producer export, receipt, policy fingerprint or selector is replaced to manufacture acceptance. Official inspections show all 22 skill/contract pairs identical between the two exact SDK candidates. Their Ruby release metadata difference does not change a selected Skills dependency. The independent source review supplies the content verdicts and limits.

## Default selector requires a release

A merged record alone cannot unblock the default SDK selector. At exact SDK `c8549be2099e5a2f6947262bbeaf6f5e8b678801`, [`.github/actions/skill-release-checks/action.yml:25–35`](https://github.com/qubrics/qubrics-sdk/blob/c8549be2099e5a2f6947262bbeaf6f5e8b678801/.github/actions/skill-release-checks/action.yml#L25) reads the latest Skills release, downloads its `acceptance.json`, and takes the checked-out Skills revision from that receipt. [`scripts/publication-guard.mjs:70–88`](https://github.com/qubrics/qubrics-sdk/blob/c8549be2099e5a2f6947262bbeaf6f5e8b678801/scripts/publication-guard.mjs#L70) binds the checker to that revision and recomputes acceptance for the exact SDK source and snapshot hashes. Neither a main-only record nor an older release pin reaches that default path.

At investigation time, latest is v2.0.5 at `05e24366cebc2caf2b5c395727414e634ba7bf8c`, sole acceptance asset `738939796`, SHA-256 `bf1b54bb504bb27c95c70683c8e7b02ada477421419f9ba43bd1c2e132a9245e`. A new release/tag requires a separate exact Ops ASK after green actual-main CI. No release action is authorised by this source change. Latest-selector rollback would return to v2.0.5; source rollback is a normal revert PR. Public tag/release history and already downloaded bytes cannot be recalled by changing latest.

## Scope and remaining gates

The independent [pair-by-pair source review](skill-compatibility/reviews/producer-sync-20261119/source-review.md) covers all missing direct bindings. Twelve new records implement its verdicts: ten direct compatibility reviews and two renewed genuine workflow records. Three published legacy pairs use tested Qubrics replacements: attachments and MCP setup through those renewals, getting-started through its unchanged existing exact workflow. No direct approval endorses obsolete Python imports or executables. Original evaluator/grader identities, actual outputs, previous-skill bindings and every negative/security assertion remain unchanged; the later source revalidation claims no new workflow execution.

Review records and the CI SDK input are the only executable data changes. No skill body, dependency/rename map, checker logic, existing review, workflow assertion, policy export, plugin version or marketplace metadata changes. Public immutable SDK `c8549be2` is fetchable and supplies CI's reviewed input; exact local successor `b7dad6ca` remains a separately checked source identity. Its public commit API returned 422 during investigation, so CI must not depend on fetching it.

Skill drift CI matches policy/evidence paths. Plugin bundles and Notify SITE do not match this change. ClawHub workflow `306493143` was read back `disabled_manually`; no enablement, ClawHub or other marketplace action is included. Cursor's external review hold remains unchanged.

Existing focused controls: `node --test scripts/skill-compatibility.test.mjs`, exit 0, **25 passed, 0 failed, 0 skipped**, 68.5 seconds. No new implementation or duplicate fixture test was added for review-record data. Raw receipt: MAIN task artifacts `producer-sync-20261119/compatibility-controls.log`.

Source review, record validation, exact acceptance, PR review and actual-main CI evidence follow below as measured. This checkpoint claims no exact-candidate PASS, merge or release.
