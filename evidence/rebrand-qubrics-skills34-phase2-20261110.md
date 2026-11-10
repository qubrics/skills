# Skills #34: Phase 2 candidate

Goal: fulfil [Skills #34](https://github.com/qubrics/skills/issues/34), spec A13, after the SDK producer publishes. This candidate renames all 11 canonical skill directories and frontmatter identities to `qubrics-*`, publishes Qubrics runtime content through generated plugin bundles, and preserves an installable deprecated `sendmux` plugin pointing users to `qubrics`.

## Producer and compatibility boundaries

Ops cleared the producer dependency on 2026-11-10: `@qubrics/cli@2.0.0` is live, npm shasum `7239e87899f96a644eb455ff6a6ab2ade774a92c`, with five native release assets from job `129624728202`. All seven npm versions were measured live: core/sending/cli `2.0.0`, management/mailbox/sdk `3.0.0`, ai-sdk `1.0.0`. Read-only CLI smoke verified `qubrics --version`, mailbox help and both published binary entries. Homebrew tap PR16 remains unmerged; no brew availability claim or brew installation proof.

The immutable SDK input is `8d3d7492dc83852906c163d0ce0c30cfdd0bc06f`, the version-final CLI release merge. Existing Python package/module/console-script identities, wire keys and MCP tool names remain unchanged. Source review counted 59 distinct legacy wire/key/tool tokens across 41 files, with all 341 occurrences preserved. Qubrics environment aliases are checked against exact CLI/MCP source; example-only secret aliases are distinguished from automatically read variables. The released `sendmux-mcp` wheel remains separate from unpublished Python source features.

Every historical dependency mapping and review is preserved. Eleven renamed dependency mappings select the same contracts and both CLI binaries. The checker recognises either complete legacy or complete Qubrics inventories without changing exact contract/evidence validation. Phase 1 acceptance is not reused for renamed bytes.

Canonical Codex behaviour requires each marketplace entry's name to match its plugin manifest. Therefore `qubrics` and deprecated `sendmux` use separate generated manifests containing the same 11 Qubrics skills, rather than mismatched entry aliases. Source: official OpenAI Codex `store.rs`, researched through Context7 `/openai/codex` during implementation.

## Checks measured

- Both bundle regressions were run against the original generators from base `0ebdb6c24ba58f1e2975c9c77ac3684942bb9c1a` and failed: Qubrics environment metadata was absent (`primaryEnv: "SENDMUX_API_KEY"`), and marketplace identity was `sendmux` instead of `qubrics`. Generators were restored to the candidate before the green run. Raw command log: MAIN `.claude/artifacts/rebrand-qubrics-skills34/phase2-bundle-regressions.red.log`.
- Related bundle/workflow tests: 28 passed, 0 failed, 0 skipped, exit 0; `phase2-bundle-tests.log`. This includes both new bundle regressions and PR43's ordinary/dry-run version assertions. Historical `bundle-tests.log` and `rename-test.*` belong to earlier slices, not this candidate's proof.
- Static-contract related tests: 31 passed, 0 failed, 0 skipped, exit 0; `phase2-static-tests.log`. The new unknown-Qubrics-env regression failed before implementation (`0 !== 1`) and passed after source-based validation.
- Compatibility tests: 21 passed, 0 failed, 0 skipped, exit 0; `phase2-compatibility-tests.log`. The renamed receipt regression was seen red before implementation, then green.
- Static drift passed against the exact SDK input and existing pinned producer exports.
- After correcting MCP alias prose against SDK `packages/python/mcp/sendmux_mcp/mcp-contract.json:7-9`, plugin generation/check, OpenClaw generation/check (11 skills), workflow path filters (pull_request and push), and `git diff --check` all exited 0.
- Live CLI help receipt: MAIN `.claude/artifacts/rebrand-qubrics-skills34/phase2-cli-mailbox-help.log`; no credentials, registration, send or mutation used.
- All 11 skills passed the installed skill creator's `quick_validate.py`. All 11 packaged with the existing toolkit's `scripts.package_skill`; archive integrity and each canonical `SKILL.md` byte comparison passed. Packaging logs are `phase2-package-qubrics-*.log`. These are local validation/package checks, not fresh model benchmarks or marketplace installation proofs.

## Independent reviews and corrections

Spec review `/root/phase2_spec_review` found one grouped release-boundary defect and canonical repository casing drift. CLI catalogue prose now names published `@qubrics/cli` 2.0.0; Mailbox prose distinguishes published CLI/TypeScript draft, scheduling and text operations from unpublished Python MCP names. Exact cached npm artefacts confirm those exports in `@qubrics/mailbox` 3.0.0 and corresponding CLI operations in 2.0.0. Install examples and eval expectations use canonical `qubrics/skills`.

Standards review `/root/phase2_standards_review` found no hard documented violations. The active regeneration guide now points at renamed directories and current TypeScript packages. Optional broader static-check coverage for a historical `@sendmux/cli` identity is Parked: exact proposed acceptance already selects both binaries and fails closed. No release guard was relaxed.

Fresh copy critique found Truth failures only in the stale release classifications and Protected-set failure in repository casing; the rest of the reviewed reference/metadata pieces passed applicable lines. One humanise pass on the replacement prose retained exact package names, versions and MCP distinction; added replacement sentences have zero em dashes, semicolons, curly quotes, banned vocabulary or contrastive framing. Historical technical instructions and literal API tokens remain intact.

## Publication and rollback

No merge, tag, release or external publication is authorised by this candidate. ClawHub remains disabled; PR43's explicit-version fix is retained. Cursor is submitted and awaiting review per operator report, not accepted, with no submission ID supplied. No duplicate submission is made.

Merge exposes repository marketplace/catalogue content to unpinned clients and matches the Notify SITE trigger. The destination's canonical identity was verified read-only with `gh repo view Sendmux/SITE_sendmux.ai`: `qubrics/SITE_qubrics.ai`; the workflow targets that repository. Normal merge requires exact-head Ops approval. A separately approved release and exact external inventory follow; the task remains open until required public listing/install proofs exist.

Rollback: revert the source merge through a PR. Prior immutable release `v1.8.2` can become latest again. External publication records and already-fetched client state require provider-supported corrective updates, so publication remains separately gated. No SDK workflow, npm publish/deprecation, retag, asset replacement or account transfer is included.

Status: local candidate; exact candidate acceptance, fresh compatibility/source review, PR CI and approval pending. No new harness or dependency added. Separate OpenAI universal-directory submission is Parked.
