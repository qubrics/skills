# Fresh released-install whole-body review

Review date: 2026-11-06. Frozen skills source: `36720e03e6179f0c3241479831d9aa82367432e5`. Independently read all four complete bodies and the canonical MCP eval input; previous reviews, generated eval responses, grades, benchmarks and CI results were not used.

## Verdicts

`COMPATIBLE` below means the stated behaviour agrees with the supplied frozen producer source and retained release packages, including an explicit installed-support gate for unpublished operations. It does not mean a present production journey or a third-party client was exercised. `UNKNOWN` means a substantive whole-body assertion lacks evidence in the permitted corpus; it is not a demonstrated incompatibility.

| Complete body | Frozen candidate / producer contracts | Retained CLI 1.7.2 / MCP 2.2.0 | Whole-body verdict |
| --- | --- | --- | --- |
| `skills/sendmux-cli/SKILL.md`, lines 1–304 | COMPATIBLE | COMPATIBLE; candidate catalogue and QUBRICS precedence are labelled candidate-only | **COMPATIBLE**, within the static contract scope above |
| `skills/sendmux-mcp-setup/SKILL.md`, lines 1–462 | Sendmux-owned contract COMPATIBLE | Sendmux-owned contract COMPATIBLE; 54 released tools are distinct from 150 candidate names | **UNKNOWN** for the complete guide: VS Code/Copilot execution-scope ambiguity remains (F1) |
| `skills/sendmux-getting-started/SKILL.md`, lines 1–246 | COMPATIBLE with the selected historical policy | COMPATIBLE for the retained CLI/MCP setup and first-call surfaces | **COMPATIBLE**, within the static contract scope; current registration availability UNKNOWN (F2) |
| `skills/sendmux-mailbox-agent/SKILL.md`, lines 1–324 | COMPATIBLE | COMPATIBLE: unsupported draft/schedule/text names are explicitly conditional on installed support | **COMPATIBLE**, within the static contract scope; candidate methods must remain gated |

No demonstrated Sendmux CLI/MCP source-contract incompatibility was found in the corrected bodies. Public official documentation resolves most client syntax assertions; the precise remaining client-variant limitations below prevent an unqualified whole-guide verdict.

## Exact reviewed identities

SHA256 values computed from each file's bytes at the frozen skills commit:

| Input | SHA256 |
| --- | --- |
| `skills/sendmux-cli/SKILL.md` | `7cd602f71a2dd19ae3ac33053490e3b01308cc25347a6c7fee7385573ec55400` |
| `skills/sendmux-mcp-setup/SKILL.md` | `3023a1da7f040b5a68a560de958b35de295709ec7829aee165156c13304ab1e2` |
| `skills/sendmux-getting-started/SKILL.md` | `d407453b70a792838608009e21f8bb08b2ced99f8bdc0def544215da6a7596fb` |
| `skills/sendmux-mailbox-agent/SKILL.md` | `368ef6d17bfe8a6c2e6947795f91ff472f6119a903750540af18b47688378923` |
| `skills/sendmux-mcp-setup/evals/evals.json` | `bc97804f8d679186091bf10ae452babe58b874fe9fb934c2e9060313730265bf` |

Retained release directory: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-php4-sync/released-contracts/`.

| Actual archive read, without installing or executing it | Computed SHA256 |
| --- | --- |
| `cli-1.7.2.tgz` | `8081332265be59b562aaf92c3653cf5d6d058189e3f17fde9ce03d04bc9ffe19` |
| `sendmux_mcp-2.2.0-py3-none-any.whl` | `0f23f8ecdf46edb958f4fba677d14d79811d9e01ae22421e5083d0dd2401d697` |

Candidate SDK: `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk` at `73bedb8b0005e96e580e39cca4aac6bd030753a5`. App producer: `/Users/rj/Desktop/GIT-REPOS/sendmux` at `87ce115810ebcfa91655295603c27af52fcff96f`. Archive-member citations below identify line numbers in the decoded member, not a separately installed checkout.

Selected tracked exports were read and their content hashes recomputed; all four equal their selected export manifest values:

| Selected contract | SHA256 | Binding |
| --- | --- | --- |
| `contracts/calendar-20261030/app-openapi.json` | `4e4fbc8024eaad195169a18cc096856d1653a3c01fb4f66d0313e67cb0b2e705` | `contracts/calendar-20261030/app-export.json:4-8` binds App `87ce115810ebcfa91655295603c27af52fcff96f` |
| `contracts/calendar-20261030/app-policy.json` | `d4159fc4ad2a7b1927c294303fbc11533f8dab9f5a9b3cc73b2139c7354e71bf` | Same App export; policy runtime fingerprints at `app-policy.json:6-22` |
| `contracts/row07-actualtuple-20261012/sending-openapi.json` | `eb69dc0ca27e5f42cd9da70e90e2b1a386dfe588b743e47a8d91f3b7928a75e5` | `contracts/row07-actualtuple-20261012/sending-export.json:4-8` binds Sending `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| `contracts/row07-actualtuple-20261012/sending-policy.json` | `64b2ab07617f084045921f7078100372c3175712cecc117a799109a2c2546fd3` | Same Sending export; delegated-sending fingerprint at `sending-policy.json:4-7` |

Contract paths in this table are relative to `evidence/skill-compatibility/`. These are selected historical producer bindings, not a measurement of today's deployed source or flags.

## Release versus candidate reconciliation

- Released CLI archive `package/package.json:2-8` declares `@sendmux/cli` 1.7.2 and the `sendmux` binary. Its `package/dist/base-command.js:23-57,69-108` reads `SENDMUX_API_KEY`, `SENDMUX_ACCESS_TOKEN`, `SENDMUX_BASE_URL` and `SENDMUX_PROFILE`; direct credentials supersede profiles and simultaneous token/key input fails. `package/dist/commands/profiles/set.js:25-38` reads the SENDMUX key input. No `QUBRICS` byte string occurs in any shipped JavaScript member. Candidate `packages/ts/cli/src/base-command.ts:52-91` and `commands/profiles/set.ts:28-32` introduce QUBRICS-first fallbacks. CLI body lines 99–107 state this difference accurately.
- Counting actual generated CLI command files gives released Management/Mailbox/Sending **54/42/8**, and candidate **57/63/8**; both also contain OAuth/Profile/Agent **2/3/2**. CLI body lines 130–139 correctly label **57/63/8** as unpublished candidate counts. Every concrete CLI command named in the CLI and getting-started bodies exists in the retained release. The server-qualified MCP name at MCP body line 30 is not a CLI command.
- Released wheel `sendmux_mcp/mcp-contract.json:20-26,14827` declares package 2.2.0, the two contract protocol revisions and **54** tools. Independently enumerating `tools.by_surface` yields Mailbox/Management/Sending **26/22/6**, zero `qubrics_` aliases. No `QUBRICS` byte string occurs anywhere in the wheel. The five console scripts match `sendmux_mcp-2.2.0.dist-info/entry_points.txt:1-6`.
- Candidate `packages/python/mcp/pyproject.toml:5-7` still declares 2.2.0. Candidate `sendmux_mcp/mcp-contract.json:23-29,40288` contains **150** names: **92/46/12**, comprising **46/23/6** unprefixed tools and **75** aliases. Candidate `sendmux_mcp/server.py:76,81` explicitly emits aliases and removes the prefix on resolution. Matching package versions therefore do not establish matching released features. MCP body lines 41,65–73 and canonical MCP eval 7 at `evals/evals.json:101-109` preserve that distinction.
- Released wheel `sendmux_mcp/config.py:71-76,101-137,179-185` establishes per-surface precedence over a generic key, SENDMUX-only environment reads, separate app/sending base URLs and local bearer configuration. Candidate `sendmux_mcp/config.py:27-31,116-143` adds QUBRICS-first lookup. Released `sendmux_mcp/cli.py:80-88` establishes `--surfaces`, then `--surface`, then `SENDMUX_MCP_SURFACES`. MCP body lines 16,45,90–120 use supported released inputs.
- Released hosted resource is `https://mcp.sendmux.ai/mcp` (`sendmux_mcp/mcp-contract.json:6-9`). Candidate canonical resource and legacy alias are `https://mcp.qubrics.com/mcp` and `https://mcp.sendmux.ai/mcp` (`sendmux_mcp/mcp-contract.json:6-12`). MCP body lines 26,33,61–63 keep the released resource primary and distinguish the candidate.
- The two named contract revisions are not an exhaustive runtime-protocol list: released `sendmux_mcp/mcp-contract.json:67-72` also lists `2024-11-05`, `2025-03-26` and `2025-06-18`. MCP body line 41 does not say its two revisions are exclusive; canonical eval 7 calls them contract-supported revisions. Neither should be interpreted as proof of certification for every runtime revision or client.

## Whole-body behavioural review

### Credentials, identity and bootstrap

All four bodies require clearing inherited direct credentials, profiles and endpoint overrides before loading only the intended secret-backed values; MCP adds per-surface keys, transport and bearer overrides. All require a connection check and identity/mailbox verification before content access or mutation, and stop on unverified or mismatched identity (CLI 16–18; MCP 16–22; getting-started 16–25; mailbox 16–26). These are meaningful protections: the released CLI and MCP precedence rules above prove that an ambient credential can supersede the apparent selection. The guides do not equate permission with intended identity.

The keyless exception is limited to registration followed by validation of the saved profile, rather than requiring an impossible pre-registration connection check (CLI 18,59–83; getting-started 133–168). MCP lines 22,59 route credential-free creation to the CLI and forbid extracting a raw profile credential merely to configure MCP. Getting-started lines 24,35,135 and mailbox line 25 reject inbound-content setup authority. No guide directs the agent to execute message-supplied setup, disclose a credential, or use a credential in literal process arguments.

Released `package/dist/agent-auth.js:31-99` persists registration intent before the POST, saves the returned credential, reloads the profile, and checks readiness; lines 9,98-113 establish the ten-minute wait and credential-free result. `package/dist/profiles.js:27-29,65-67,92-116` establishes restricted directory/file permissions. Agent register flags in `package/dist/commands/agent/register.js:4-40` support all shown examples. Thus CLI lines 62–83 and getting-started lines 139–168 describe real released client behaviour, subject to the server-policy limit in F2.

Released `package/dist/agent-auth.js:146-188` exchanges and caches a Sending-resource `email.send` token with a sixty-second safety margin; App `src/server/agent-auth/token-exchange.ts:33,85-86,157-160` defines one hour and the exact grant/resource. App `src/server/agent-auth/registrations.ts:269,282` supports non-expiring durable registration/read tokens. App `src/constants/mailbox-quotas.ts:2-15`, `src/server/agent-auth/onboarding-operations.ts:282-297` and `src/server/agent-auth/token-exchange.ts:582-588` support 500 MiB before approval and at least 5 GiB before sending readiness. App `src/app/auth.md/route.ts:713-728` and `src/server/agent-auth/revocation.ts:145-179` distinguish sending revocation from full registration revocation. No contradiction found in the three bodies' lifecycle descriptions.

Connection checks are genuine metadata operations: App `src/app/api/v1/_lib/connection.ts:5-7,21-40` checks surface access without a mailbox storage read and returns `team`, `credential`, `label`, permissions and authorised mailboxes. Released wheel connection tool schemas have no `mailbox_id`, whereas later mailbox tool schemas expose it. Getting-started lines 59–67 and mailbox lines 26,34 maintain this separation. Discovery is explicitly not credential validation; Sending checks do not send a message.

### CLI mechanics and examples

Reviewed OAuth login, logout and recovery, agent onboarding, profile creation/masking, key-family preflight, complete catalogue, operation flags, every example and routing. The retained archive's `package/dist/commands/auth/login.js:5-34`, `package/dist/oauth-profile.js:14-42,85-107` and profile storage support the documented local OAuth and serialised refresh/recovery mechanics. `package/dist/base-command.js:69-108,140-159` distinguishes OAuth profiles, agent read/delegated-send handling and API-key preflight. Candidate-only environment precedence is not applied to the released examples.

Released `package/dist/operation-flags.js:4-46,68-86,116-145` supports the listed flags, repeated parameter inputs and mutually exclusive JSON/file bodies. Released `package/dist/operation-runner.js:88-98,118-147,174-242` constrains local attachment convenience to supported operations, uses mailbox `blob_id` versus Sending `attachment_id`, and transfers presigned bytes without an upstream bearer. The body does not invent a third API-key kind for a Sending profile.

### MCP setup and factual eval expectations

Reviewed the full setup matrix, every client-specific example and note, local HTTP bearer, hosted OAuth, attachment boundary, verification and routing. Supported Sendmux server invocations use released command names and environment inputs. Upstream API keys and the local MCP bearer remain separate. The connection checks listed at body lines 446–450 all exist in the released wheel. Client examples are explicitly described as configurations rather than certification (line 75); F1 records the remaining variant-specific ambiguities after official documentation review.

Official vendor pages were actually fetched on 2026-11-06, not inferred from search snippets:

| Body assertion | Official source and result |
| --- | --- |
| Cursor paths and `${env:NAME}` in env/headers (133,199) | [Cursor MCP](https://cursor.com/docs/mcp), “Configuration locations” and “Config interpolation”: matches project/global paths and all five named interpolation fields. |
| Claude Code `.mcp.json`, `${VAR}` and HTTP add/sign-in (211–249) | [Claude Code MCP](https://code.claude.com/docs/en/mcp), “Project scope”, “Environment variable expansion in `.mcp.json`” and OAuth setup: matches the shown config and custom Sendmux variable references. |
| Codex `env_vars`, `oauth_resource`, bearer-token environment input (253–287) | [OpenAI configuration reference](https://developers.openai.com/codex/config-reference): explicitly documents all three keys, including RFC 8707 resource binding. |
| Cline wizard, `streamableHttp`, default legacy SSE (200–201) | [Cline MCP](https://docs.cline.bot/mcp/mcp-overview), “Manual config”, “CLI MCP wizard” and “Remote server”: matches wizard and explicit transport recommendation. The separate published-source pass below establishes the CLI environment behaviour. |
| Cline IDE `${env:NAME}` expansion (200) | Official historical source [envExpansion.ts at 9dea336c](https://github.com/cline/cline/blob/9dea336c/src/utils/envExpansion.ts) expands strings recursively; [McpHub.ts at that same revision](https://github.com/cline/cline/blob/9dea336c/src/services/mcp/McpHub.ts) calls it before validation and connection. Supports IDE examples at that revision, not a claim about every CLI version. |
| Legacy Windsurf/Cascade path and URL/interpolation (202) | [Windsurf/Cascade MCP](https://docs.windsurf.com/windsurf/cascade/mcp), “mcp_config.json”, “Remote HTTP MCPs” and “Config Interpolation”: matches `~/.codeium/windsurf/mcp_config.json`, URL aliases and interpolation; page explicitly confines that config to legacy Cascade. The guide correctly excludes Devin Local. |
| VS Code `servers`, `inputs` and password prompts (292–339) | [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration), “Configuration file” and “Input variables for sensitive data”: supports those VS Code-local config shapes, but explicitly says input-dependent servers are not forwarded to Copilot harness sessions; see F1. |
| Copilot CLI portable path, local/http config and variable references (355–383) | [GitHub Copilot CLI MCP](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers), “Editing the configuration file”, and [VS Code portable configuration reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration), “Environment-variable references”: match the shown `mcpServers`, `local`/`http`, `tools` and `${NAME}` syntax. `~/.copilot` is the default when `COPILOT_HOME` is unset. |
| Gemini `httpUrl`, env/header variables, `trust: false`, `/mcp auth` (386–435) | [Gemini MCP](https://geminicli.com/docs/tools/mcp-server/), “Configuration properties” and “Managing OAuth authentication”, plus [Gemini configuration](https://geminicli.com/docs/reference/configuration/), “Settings files”: support `httpUrl`, authentication command and expansion of string values throughout settings, including headers. |

These are public syntax qualifications, not proof that Sendmux has certified the clients or that a live client connection works. The body links no third-party vendor documentation directly; official-domain search identified the pages above, then each page was fetched.

Focused Cline CLI published-source qualification, without installation or execution:

- Public [npm registry metadata](https://registry.npmjs.org/cline/latest) identified CLI `3.0.74`; [its actual tarball](https://registry.npmjs.org/cline/-/cline-3.0.74.tgz) has SHA256 `4daea6d75508760b18447d6f00c6bac88ef20af8fe17da4252a90a20fe36c692`. Archive `package/package.json:3,41` binds that CLI version to exact `@cline/core` `0.2.0`. The wrapper resolves a platform binary; neither it nor its installation script was run.
- Exact [core 0.2.0 tarball](https://registry.npmjs.org/@cline/core/-/core-0.2.0.tgz) was decoded in memory (6,040,551 compressed bytes), SHA256 `a8fb438d68835b4637fbc997c0baf60928bf166dae3b96df60d301239c45101b`. Its `package/dist/index.js` SHA256 is `53a0d4e48b96fe296fe00d9313408d45411a59970162691a05e89b937cfbef25`.
- Core `package/dist/index.js:3`, `loadMcpSettingsFile` exported as `Nl` at character offset 19,847, performs file read, `JSON.parse` and schema validation; `resolveMcpServerRegistrations`/`Wn` at 20,907 and registration mapper `wA` at 20,995 pass the parsed transport through. The schema forwards `env:e.env` without interpolation. `Ol` at line 2, offset 15,984 only normalises the transport.
- Core `package/dist/index.js:231`, offset 376,304, spawns the MCP command with `env:{...process.env,...t.env??{}}`. Configured literal values override the parent environment unchanged. No `${env:NAME}` expansion occurs on the traced config-to-spawn path. This supports body line 201 for the inspected published CLI/core contract; it does not certify the platform executable or every past/future CLI version. The historical IDE expansion source is a separate implementation and is not substituted for this evidence.

App `src/server/mcp/client-registration.ts:91-93,136-137` allows absent registration `resource`; `src/server/mcp/authorization.ts:165-174` and `src/server/mcp/token-client-auth.ts:116-123` validate later resource restrictions. `src/server/mcp/grant-creation.ts:413-421` persists the authorisation request's resource. Thus body line 63 and canonical MCP evals 4–5 correctly separate DCR, authorisation/grant, token audience and resource-server stages. An authorisation-stage `invalid_target` is not used to invent the rejection shape of a REST token at the MCP resource server.

The canonical MCP eval input's factual expectations were read directly, including release/candidate counts and the same-version distinction (lines 101–109), secret-safe process arguments (15,47), Cline IDE/CLI distinction (32), bootstrap authority (53–60), resource boundary (65–86) and presigned real-file upload (91–97). These are inputs, not execution evidence. No prior response or grade was consulted.

Released wheel `sendmux_mcp/mcp-contract.json:14830-14845` supports the 32,768 decoded-byte inline cap, 7,500,000-byte mailbox cap, and Sending intent-response limit authority. The released `mailbox_upload_attachment` schema at lines 8112–8171 requires exact positive `size_bytes` for presign mode and exposes no `file_path`; the documented real-file route keeps bytes outside model context. Temporary upload IDs, final attachment IDs and mailbox blob IDs remain distinct.

### Mailbox operations, drafts, extraction and sync

Reviewed efficient defaults, search/batch examples and SDK response shape, mutations, direct send, real-file handoff, saved drafts, scheduling, attachment text, threads/folders, sync, error handling and routing. Every unconditionally recommended MCP tool exists in the retained wheel. CLI ordinary reads, mutations and sync commands exist in 1.7.2. SDK `packages/ts/mailbox/src/index.ts:11-19`, `generated/sdk.gen.ts:414,451,584,606` and `generated/types.gen.ts:764-785,5064-5071` support the shown client construction and `snippets.data.data.snippets[].message_id` access.

Seven named candidate operations are absent from both retained release catalogues: `create-draft`, `get-draft`, `update-draft`, `send-draft`, `control-draft-schedule`, `request-attachment-text` and `get-attachment-text`, with corresponding `mailbox_` MCP names. All exist in candidate source. Mailbox body lines 49–50 and 226 explicitly require verifying installed support before these operations; line 258 remains under that section. Therefore they are conditional candidate guidance, not evidence that installing CLI 1.7.2 or MCP 2.2.0 enables them. The ordinary filtered-query and event-stream MCP omissions are also accurate for both reviewed catalogues (body 55–56).

App draft create route `src/app/api/v1/mailbox/drafts/route.ts:21-25,65-81` establishes create permissions and adoption idempotency. `src/app/api/v1/_lib/schemas/mailbox-drafts.ts:44-69,85-142,154-174` establishes reserved-header rejection, source actions, revision/schedule version and uncertain-send rules. `src/app/api/v1/mailbox/drafts/[draftId]/send/route.ts:13-15,62-68` requires `mailbox.read` plus `email.send` and passes approved versions. `src/server/mailbox-draft-source.ts:54-88` distinguishes reply inline attachments from forwarded attachments. The guide keeps recipient/content/attachment approval before send, requires reconciliation of uncertain sends, and does not substitute draft-write permission for sending permission.

App attachment-text route `src/app/api/v1/mailbox/messages/[message_id]/attachments/[attachment_id]/text/route.ts:15-40,49-69` separates POST request from GET observation and returns 202 until complete. `src/schemas/mailbox-attachment-extraction.ts:3-6,13-27` establishes input/output limits and empty unsupported outcomes; `src/db/schema.ts:4889` establishes 24-hour expiry. `src/server/mailbox-attachment-extraction.ts:87-149` reuses a matching unexpired extraction and verifies source availability. Selected `contracts/calendar-20261030/app-openapi.json:18821` explicitly documents no extra charge, no request body/idempotency key and unavailable OCR. Body lines 258–260 correctly require status/outcome and truncation checks rather than treating empty unsupported output as an empty document.

App `src/app/api/v1/mailbox/messages/query-changes/route.ts:21-27,50-76,80-89` separates filter validation and query-state input. Mailbox body lines 294–314 preserve query-state versus broad resource-state separation and warn that a fresh baseline does not recover missed deltas. No unbounded content read or automatic destructive mutation is introduced.

## Findings and limits

**F1 — UNKNOWN: VS Code/Copilot execution-scope ambiguity.** MCP body section “VS Code And GitHub Copilot” at line 290 shows `${input:...}` credential entries at lines 298–311 and 322–335 without restricting them to the classic VS Code execution path. The actually fetched [VS Code reference](https://code.visualstudio.com/docs/agents/reference/mcp-configuration), “Configuration file” and “Input variables for sensitive data”, explicitly states that servers requiring interactive input are **not forwarded to Copilot harness sessions**, even after the secret was cached in a local session. Exact official source is [microsoft/vscode-docs at 062330f5d25b5562103c6322a17b255b645e1e67, `docs/agents/reference/mcp-configuration.md:28`](https://github.com/microsoft/vscode-docs/blob/062330f5d25b5562103c6322a17b255b645e1e67/docs/agents/reference/mcp-configuration.md#L28) and [lines 278–286](https://github.com/microsoft/vscode-docs/blob/062330f5d25b5562103c6322a17b255b645e1e67/docs/agents/reference/mcp-configuration.md#L278): “Forwarding rejects input and command variables before resolving them.”

The examples remain valid for classic/local VS Code. Applying them to the Copilot harness execution mode is contradicted by that current vendor contract; the guide does not say which execution mode it means under the combined heading, so the whole-body verdict remains UNKNOWN. This does not label all VS Code paths broken and does not invalidate the separate Copilot CLI environment-based examples at lines 355–383. The Cline CLI interpolation assertion is settled for the exact inspected published contract above. Live named-client support and certification remain outside qualification.

Smallest factual body-caveat proposal, for operator approval only; not applied: “These `${input:...}` examples apply to classic VS Code execution; input-dependent servers are not forwarded to Copilot harness sessions, even after the secret was cached locally.” This only clarifies execution scope; it does not certify a client or change the examples.

**F2 — UNKNOWN: current registration policy.** Getting-started line 148 says no challenge/proof-of-work step is required; CLI lines 75–85 and all three lifecycle tables describe durable registration. App `src/app/agent-auth/agent/identity/route.ts:39,50-73,83-105` gates that path on `AGENT_AUTH_DURABLE_READ_REGISTRATION_ENABLED === "true"`; when false it verifies proof of work and returns the legacy identity assertion. The supplied runtime declaration `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/install-surface/contracts/app-policy-runtime.json:2-3` is explicitly observed at **2026-09-30T06:02:13.882283+00:00**. Its historical true values do not establish today's flag, current production source or current bootstrap success. The selected App policy binds historical fingerprints only. Source/historical-policy compatibility is established; current production availability is UNKNOWN.

**F3 — retained releases do not provide candidate methods.** The mailbox installed-support gates are essential, not optional wording: retained CLI/MCP release catalogues omit the seven operations listed above. A same-version MCP 2.2.0 candidate or a successful ordinary connection check does not prove those methods exist. No candidate installation, publication, method invocation or live endpoint availability was verified.

Standalone released TypeScript/Python SDK packages were not supplied as archives. Their examples were checked against pinned candidate source and selected producer contracts; their present registry/install contents remain UNKNOWN. The CLI archive declares its SDK dependency but does not establish the bytes that a fresh dependency resolution would fetch.

Only archive listing/decoding, read-only frozen Git object inspection, local text reads, static JSON/count/hash computation, official-domain search, public vendor documentation/source fetches and in-memory public package inspection were performed. No guide command was executed, package installed, test or CI workflow run, secret read, product endpoint or customer-content call made, live state written, email sent, Git state mutated or file deleted. Only this review file was written. No current production, browser/client journey, delivery or release-publication claim follows from this review.
