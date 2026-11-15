# Phase 2 source compatibility review

Independent reviewer: `/root/phase2_contract_review`; coordinating reviewer: `/root`.

Reviewed exact Skills content commit `92b566d46f66a0923998f802189f8b51974588c4` against SDK `8d3d7492dc83852906c163d0ce0c30cfdd0bc06f`, App `87ce115810ebcfa91655295603c27af52fcff96f`, and Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`. All 11 renamed skill bodies are source-compatible. The source bodies remain byte-identical when these review records are added; exact checker bindings enforce that property.

The reviewer read all 11 whole bodies and compared their commands, imports, credentials, payloads and links with the selected contracts and callers. SDK paths below are relative to that immutable SDK revision; body paths are `skills/<skill>/SKILL.md`.

| Skill | Disposition and reviewed source |
| --- | --- |
| `qubrics-agent-email-inbox` | COMPATIBLE. Body lines 16-47 preserve scoped bounded reads. SDK `packages/ts/mailbox/src/generated/sdk.gen.ts:178,401,425,451,606`; CLI `packages/ts/cli/src/base-command.ts:53` confirms credential precedence. |
| `qubrics-attachments` | COMPATIBLE. Body lines 35-44,107-140,248-343 preserve returned upload headers and distinct attachment identifiers. SDK `packages/ts/mailbox/src/node.ts:67,95,171` and `packages/ts/sending/src/node.ts:63,88`. Python helper imports remain `sendmux_*`. |
| `qubrics-cli` | COMPATIBLE. Body lines 36,99-107,130-173 match launchers, environment aliases, flags and catalogue. SDK `packages/ts/cli/package.json:2-8,43-50`, `src/base-command.ts:53-149`, `src/operation-flags.ts:38-109`. |
| `qubrics-email-for-agents` | COMPATIBLE. Body lines 14-42,62-103,125-154 retain registration/runtime/approval separation and canonical install path. SDK `packages/ts/cli/src/agent-auth.ts:54,99,127,141,183,204`; `src/base-command.ts:110-136`. |
| `qubrics-email-for-ai-agents` | COMPATIBLE. Body lines 18-24,32-64 match delegated Sending, payload shape and retry metadata. SDK `packages/ts/cli/src/agent-auth.ts:215-258`, `src/operation-runner.ts:272-309`, `packages/ts/sending/src/generated/sdk.gen.ts:84`. |
| `qubrics-getting-started` | COMPATIBLE. Body lines 32,63-99,126-129,194-227 use correct hosts, packages and imports. SDK factories `packages/ts/mailbox/src/index.ts:15-19`, management `:14-18`, sending `:14-18`. Python MCP package/scripts remain `sendmux-mcp`. |
| `qubrics-mailbox-agent` | COMPATIBLE. Body lines 26,105-132,226-260 preserve mailbox selection, draft revisions, schedule versions and extraction outcomes. SDK `packages/ts/mailbox/src/generated/sdk.gen.ts:196,240,253,529,540,595,606`. Publication wording distinguishes released TypeScript/CLI from unpublished Python MCP. |
| `qubrics-management` | COMPATIBLE. Body lines 40-50,95-135,142,207-258 match factory, payloads, scopes and conditional reads. SDK `packages/ts/management/src/generated/sdk.gen.ts:72,176,187,270,356,426,677,688`; factory `src/index.ts:16-18`. |
| `qubrics-mcp-setup` | COMPATIBLE. Body lines 16,33,41-48,63-83 separate released wheel and source catalogue. SDK `packages/python/mcp/sendmux_mcp/config.py:15-31,116-150,194-200`, `hosted_auth.py:13,53-61`, `pyproject.toml:6-7,32-37`. The Qubrics canonical resource and legacy resource alias remain distinct. |
| `qubrics-send-email` | COMPATIBLE. Body lines 24-32,64-140,190-240 preserve Sending authority, required address objects, attachment references and idempotency. SDK `packages/ts/sending/src/generated/sdk.gen.ts:26,41,57,84,99,114`; core `src/auth.ts:29-48`. |
| `qubrics-token-efficient-usage` | COMPATIBLE. Body lines 48,77-82,158-230,260-270 match credential ownership, helpers, sync tokens and HTTP metadata. SDK `packages/ts/core/src/headers.ts:7-26`, `retry.ts:37-62`, `pagination.ts:6-26`; CLI `operation-runner.ts:104-111`. |

Initial candidate `846e49f377a09c0af108637cf042ec767ddb95aa` had stale CLI/Mailbox publication wording and two incorrectly cased install references. The reviewer independently validated corrections committed at `92b566d46f66a0923998f802189f8b51974588c4`, including their eval expectations. Cached published npm artefacts also contain the advertised draft/schedule/text exports in `@qubrics/mailbox` 3.0.0 (`dist/generated/sdk.gen.js:163,203,215,469,479`) and matching commands in `@qubrics/cli` 2.0.0 (`dist/generated/operations.js:74,360,664,2859,3073`). Relative body links resolve with zero missing targets.

Every new dependency map retains all selectors from its legacy counterpart and adds `/bin/qubrics`; `/bin/sendmux` remains selected. Historical legacy maps and reviews remain unchanged. Catalogue counts match CLI Mailbox/Management/Sending 63/57/8 and MCP source 92/46/12. Legacy upload headers remain accepted alongside Qubrics headers.

This is an explicit compatibility review, not workflow evaluation evidence. It makes no claim of fresh model benchmarks, live URL equivalence, client certification, Python publication, marketplace installation or product execution. No credentials, user data, registration, sends or account mutations were used. The reviewer created no acceptance receipt; the existing checker must bind each exact skill/contract and measure acceptance independently.
