# SDK source compatibility review: Skills #34 Phase 1

Reviewed SDK: `3eb0997b379d94b99659112d3c263ae59db7b14c`.
Prior reviewed SDK: `73bedb8b0005e96e580e39cca4aac6bd030753a5`.
Unchanged skill bytes: Skills `edc201aa0608a795f0aeddc14be25b6a641d57e8`, the verified `v1.8.1` release.
Producer exports remain App `87ce115810ebcfa91655295603c27af52fcff96f` and Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`.

Independent reviewer `/root/compatibility_review` read all 11 current bodies and their relevant references, compared every mapped declaration, and returned 11 COMPATIBLE verdicts. Coordinating reviewer traced exact checker binding and measured static drift. These are compatibility-kind source reviews of unchanged instructions. Historical workflow records and evaluations retain their original identities. No fresh workflow evaluation, package installation, product call, credential use, live origin equivalence or client certification is claimed.

## Contract delta and retained behaviour

All SDK paths below identify the reviewed SDK commit.

- Neither OpenAPI snapshot changes between the reviewed SDK sources. Git blobs remain App `edd5d08b873ec18de315bcdb9fb2c944abc6e9a1` and Sending `87e806db8a16fb90fd438994c73737b6526c10cf`. Generated SDK declarations and CLI operations are unchanged.
- Candidate TypeScript packages use `@qubrics/*`. They do not declare `@sendmux/*` package aliases. Current `@sendmux/*` installation examples still target released packages, as audited in [released-install-sweep.md](../rebrand-qubrics-php4/released-install-sweep.md). They do not install this candidate.
- CLI `packages/ts/cli/package.json:6-8,43-48` retains the `sendmux` launcher, colon commands and `dirname: "sendmux"`, alongside primary `qubrics`. `bin/sendmux.js:4-6` writes a deprecation line to stderr before loading the common launcher. `src/key-kind.ts:1-29` retains key kinds and `smx_*` prefixes. `src/profiles.ts:14-97,186-206` retains persisted profile shape and file permissions.
- CLI `src/base-command.ts:53-59` and `src/commands/profiles/set.ts:30-43` retain QUBRICS-first lookup with SENDMUX fallback. Existing agent profiles retain stored origins through `src/base-command.ts:129-139` and `src/agent-auth.ts:183,219`.
- New TypeScript defaults use Qubrics hosts: mailbox `src/index.ts:15`, management `:14`, sending `:14`, CLI `src/oauth-http.ts:1-2` and `src/agent-auth.ts:16-18`. Explicit factory origins remain supported. Python/MCP defaults remain Sendmux hosts in `packages/python/mcp/sendmux_mcp/config.py:15-16`. This review establishes source behaviour only.
- MCP contract content is unchanged after removing provenance: 150 names, split Mailbox 92 / Management 46 / Sending 12, retaining both tool-name families. Python clients/helpers, MCP configuration, CLI and console scripts have no delta.
- MCP `hosted.py:231-289` and `a2a.py:47-54,227-254,304-321,377-433` add host-specific A2A identity and metadata while retaining legacy paths. Current skills make no conflicting A2A-card claim. `hosted_auth.py:13,53-61` retains both MCP resources. Local bearer protection and its explicit opt-out remain in `security.py:125-128`.

## Per-skill review

Body locations refer to the unchanged Skills release above. Candidate source paths are relative to `packages/`.

| Skill | Verdict | Body and source evidence |
| --- | --- | --- |
| agent-email-inbox | COMPATIBLE | Body:16-24,30-47 retains hosted MCP, CLI reads and identity boundaries. TS CLI package:8 and bin/sendmux.js:4-6 retain the legacy launcher. Selected mailbox reads are unchanged. |
| email-for-ai-agents | COMPATIBLE | Body:20-24,34-56 retains delegated Sending authority and retry metadata. TS CLI src/agent-auth.ts:215-258 retains cache/exchange behaviour. Sending operations and schemas are unchanged. |
| sendmux-attachments | COMPATIBLE | Body:217,232,248-340 retains released HTTP/package examples. TS mailbox src/index.ts:17-19 and sending src/index.ts:16-18 preserve explicit baseUrl. Attachment helpers and schemas are unchanged. |
| sendmux-cli | COMPATIBLE | Body:99-107 explicitly separates released 1.7.2 from unpublished QUBRICS-first behaviour. TS CLI src/base-command.ts:53-59,90-149 and commands/profiles/set.ts:30-43 retain both namespaces and profile precedence. Command catalogue is unchanged. |
| sendmux-email-for-agents | COMPATIBLE | Body:14-16,36-42,94-116 retains selection/bootstrap/saved-profile boundaries. TS CLI src/agent-auth.ts:54-73,127-146,289-316 preserves saved state and endpoints. New unconfigured registrations use the new default origin. |
| sendmux-getting-started | COMPATIBLE | Body:63-65,82-96,124,140,196,221 describes released legacy installation/import/HTTP paths. Candidate factories preserve methods and explicit origins. Python MCP pyproject.toml:6,32-37 retains sendmux-mcp package/scripts. |
| sendmux-mailbox-agent | COMPATIBLE | Body:49-50,226,244-260 keeps candidate-only drafts, schedules and extraction subject to installed-support checks. Generated declarations and MCP tools are unchanged. Released imports retain their historical boundary. |
| sendmux-management | COMPATIBLE | Body:40-42,105-135,142,207-250 retains released examples and operation/permission guidance. TS management src/index.ts:16-18 retains root-kind configuration. Core src/auth.ts:29-48 preserves auth-provider behaviour. |
| sendmux-mcp-setup | COMPATIBLE | Body:16,33,41-45,63-75 distinguishes released wheel, candidate catalogue and legacy-primary hosted URL. Python MCP config.py:27-31,122-148,194-199 retains both namespaces. hosted_auth.py:13,53-61 retains both resources. |
| sendmux-send-email | COMPATIBLE | Body:24-32,60,190-228,240 retains released imports/HTTP origin and authority boundaries. TS CLI src/agent-auth.ts:219-225 uses the Sending resource. Core src/auth.ts:29-48 preserves exclusive auth providers. Send operations are unchanged. |
| sendmux-token-efficient-usage | COMPATIBLE | Body:36-49,77,208-229,260-269 retains surface ownership and released helper imports. Helpers are unchanged except paginate's brand-only diagnostic. Generated read/send/sync operations are unchanged. |

## Acceptance mechanism and release boundary

Canonical per `scripts/skill-compatibility.mjs:310-328`: bind each compatibility review to the exact skill digest and selected contract digest, with hashed source evidence. The reviewed inbox contract is `ff9bbe9c4e919ceac5310b94e501b49902514a69be84d7e96666628da315693b`.

SDK [skill-release-checks/action.yml:25-35,63-66](https://github.com/qubrics/qubrics-sdk/blob/3eb0997b379d94b99659112d3c263ae59db7b14c/.github/actions/skill-release-checks/action.yml#L25) selects the latest Skills release, downloads `acceptance.json`, checks out its proposed revision and verifies the release tag resolves to that revision. [release-please.yml:72-81](https://github.com/qubrics/qubrics-sdk/blob/3eb0997b379d94b99659112d3c263ae59db7b14c/.github/workflows/release-please.yml#L72) supplies no override. [publication-guard.mjs:61-79](https://github.com/qubrics/qubrics-sdk/blob/3eb0997b379d94b99659112d3c263ae59db7b14c/scripts/publication-guard.mjs#L61) then re-prepares and checks the publishing SDK source against that Skills revision.

A merged record alone cannot change the default SDK selection. A separately approved Skills GitHub release and matching acceptance asset are required. Proposed version is `v1.8.2`; release/tag creation and all marketplace publication remain held for explicit approval. Phase 2 begins only on Ops word after SDK packages are published.

