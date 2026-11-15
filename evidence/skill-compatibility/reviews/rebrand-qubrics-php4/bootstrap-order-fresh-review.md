# Fresh whole-body review: bootstrap order

Review date: 2026-11-06. Reviewer: independent delegated static review.

Goal: independently qualify the five complete canonical skill bodies against the selected static producer tuple, including the bounded keyless bootstrap exception and the remaining credential/identity gates.

Tally: 5 reviewed; 5 COMPATIBLE; 0 INCOMPATIBLE; 0 UNKNOWN within this static scope.

## Scope and identity

Read every line of each canonical `skills/<name>/SKILL.md`, including frontmatter, all examples, tables, routing, safety rules and lifecycle claims. Verdicts are whole-body judgments, not judgments restricted to the changed paragraph. No previous review verdict, evaluation output, grade or CI result was consulted to derive them.

Selected sources:

- APP: `/Users/rj/Desktop/GIT-REPOS/sendmux`, revision `87ce115810ebcfa91655295603c27af52fcff96f`; source was read with `git show` at that revision.
- SENDING: revision `2f4226655efc05f109b5feda50ed2ca1570aea91`, represented by the tracked `contracts/row07-actualtuple-20261012/sending-{openapi,policy,export}.json` files.
- SDK: `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk`, revision `73bedb8b0005e96e580e39cca4aac6bd030753a5`; source was read with `git show` at that revision, including its bundled Python MCP source.
- APP tracked contracts: `contracts/calendar-20261030/app-{openapi,policy,export}.json`.

Contract paths above are relative to `evidence/skill-compatibility/`. Export revision/tree identities are at `contracts/calendar-20261030/app-export.json:3-9` and `contracts/row07-actualtuple-20261012/sending-export.json:3-9`. Fresh SHA256 computations matched the exported OpenAPI/policy hashes:

| File | SHA256 |
| --- | --- |
| `calendar-20261030/app-openapi.json` | `4e4fbc8024eaad195169a18cc096856d1653a3c01fb4f66d0313e67cb0b2e705` |
| `calendar-20261030/app-policy.json` | `d4159fc4ad2a7b1927c294303fbc11533f8dab9f5a9b3cc73b2139c7354e71bf` |
| `row07-actualtuple-20261012/sending-openapi.json` | `eb69dc0ca27e5f42cd9da70e90e2b1a386dfe588b743e47a8d91f3b7928a75e5` |
| `row07-actualtuple-20261012/sending-policy.json` | `64b2ab07617f084045921f7078100372c3175712cecc117a799109a2c2546fd3` |

The primary body identity below hashes every byte of the canonical `SKILL.md`, including frontmatter. The additional Markdown-body hash covers the exact bytes after the closing frontmatter delimiter and its newline, retaining the following blank line. This makes both meanings of “body” explicit.

| Canonical skill | Verdict | Full `SKILL.md` SHA256 | Markdown-body SHA256 | Bytes |
| --- | --- | --- | --- | ---: |
| `sendmux-cli` | COMPATIBLE | `7c46b4b8ca9f1052a5081439cfeb45d808d8a1c018f671d5c0ed37d2bb2a4d3d` | `472b552f34a0ef92afd1484da5224abdacdc94e8a1a3973184b04638ff74c79c` | 15995 |
| `sendmux-email-for-agents` | COMPATIBLE | `24b28b74515ea9f63221fad9739e9927baef1a34b4e414aae0df94bce9ec0f7f` | `9a615956f68274088ee2dbf01c54986510780946fab97f3f975d4be7a82b9f17` | 19566 |
| `sendmux-getting-started` | COMPATIBLE | `2801551638c668c510d97accafdb4e32a1b22a07cb2c89164bb8217e9bc3fd19` | `dbb8fbe78e48599bbeee9510c88d9c3c0cc3c49e1f28d6332a3921e20f46f4ea` | 13700 |
| `sendmux-management` | COMPATIBLE | `d6cb879e97cc0e374d9d50e1c7523f1099e6ad6753f2d0df49f54e02241442bc` | `941d7279f9690a37cb712f387d96627bc94e3b40b9e2d087a026021a90ee08a2` | 13942 |
| `sendmux-token-efficient-usage` | COMPATIBLE | `96e7760080559f8ce8ffd33aef85293400af1f70dbf00a6d2befb4a996b8cab2` | `f3c9ce1468dfc9034ebb7c76a22debf059e6b71c39958f370319e9f50b3a68ab` | 19111 |

## Shared source findings

1. **Registration is keyless.** SDK `packages/ts/cli/src/commands/agent/register.ts:32-42` calls `registerAgent` directly, without `resolveAuth`. SDK `packages/ts/cli/src/agent-auth.ts:54-108` persists the registration intent/idempotency state before its unauthenticated registration request. Lines 111-137 save the returned durable credential; lines 141-158 reload the profile, wait for readiness and return a safe result without the credential. Registration cannot reasonably require a pre-existing profile connection check.
2. **The exception must end after bootstrap.** APP `src/app/api/v1/_lib/schemas/connection.ts:5-18,28-54` defines stable team, credential, label, permission and authorised-mailbox metadata; its connection check requires no mailbox selector and does not check storage/readiness. SDK `packages/python/mcp/sendmux_mcp/curation.py:138-154,329-333,463-468` exposes the corresponding metadata checks and distinguishes the Mailbox profile read from connection validation. The reviewed bodies require identity verification after registration and before content, sending or other task work; the router/Management bodies also expressly retain verification before a subsequent task handoff.
3. **Existing credentials remain protected.** All five bodies clear both branded and legacy credential/profile/base-URL environment aliases in an isolated process, keep secrets out of arguments/output, select an intended profile without direct credentials, use an authorised endpoint and require identity resolution on mismatch. This matches SDK `packages/ts/cli/src/base-command.ts:53-149`: access-token/key collision rejection, direct credentials taking precedence over profile selection, and base-URL overrides taking precedence over stored endpoints. SDK `packages/ts/core/src/generated-client.ts:20-42` independently confirms both environment credential fallback and base-URL fallback for SDK clients.
4. **Durable read and delegated send remain separate.** APP `src/server/agent-auth/registrations.ts:248-285` gives durable registration/token rows no expiry. APP `src/server/agent-auth/metadata.ts:27-42` distinguishes pre-claim email read/receive from post-claim email send/message-update permissions. APP `src/server/agent-auth/token-exchange.ts:33,81-88,139-160,182-189` requires owner-approved Sending-resource access and issues a one-hour `email.send` token. SDK `packages/ts/cli/src/base-command.ts:112-142` rejects agent profiles for Management and exchanges only for Sending; `agent-auth.ts:204-258` caches the delegated token. The reviewed bodies do not turn that delegated Sending token into Mailbox send/update authority.
5. **Storage/revocation claims agree.** APP `src/constants/mailbox-quotas.ts:2-15` defines 500 MiB and 5 GiB. APP `src/server/agent-auth/onboarding-operations.ts:282-327` completes the quota upgrade before adding sending scopes. APP `src/server/agent-auth/owner-grants.ts:228-337` revokes sending grants/tokens without a quota write. APP `src/server/agent-auth/revocation.ts:140-178` revokes registration tokens and invite/recovery state.
6. **Named surfaces resolve.** A read-only inventory against SDK's committed CLI command paths found exactly 57 Management, 63 Mailbox, 8 Sending, 2 OAuth, 3 profile and 2 agent commands, agreeing with the CLI body. Every literal operation command in the five bodies resolves to a committed command path; every named generated SDK operation resolves in its selected `packages/ts/{mailbox,management,sending}/src/generated/sdk.gen.ts`; every named MCP tool resolves in selected `packages/python/mcp/sendmux_mcp/curation.py`. That curation also omits filtered query-change and stream-event tools, agreeing with the CLI/SDK-only routing claims.

## Per-skill verdicts

### `sendmux-cli`: COMPATIBLE

Reviewed lines 1-304. The boundary at `skills/sendmux-cli/SKILL.md:16-18` permits documented `agent:register` before a profile exists, then requires newly saved profile verification before content, sends or other mutations. Existing-profile protection remains mandatory. The onboarding, profile, preflight, catalogue, flag, example and routing sections were all included in the judgment.

OAuth consent, occupied-profile preservation and `--no-browser` claims match SDK `packages/ts/cli/src/oauth-login.ts:20-47,57-105`; refresh serialisation/uncertain-outcome handling and logout retention match `oauth-profile.ts:23-68,109-171`. Permission-restricted local persistence is implemented in `profiles.ts:107-118,124-157,179-187`. Profile key precedence and masked output agree with `commands/profiles/set.ts:28-54` and `key-kind.ts:1-44`. The two CLI key kinds and Sending compatibility are deliberate: `smx_agent_` is classified as mailbox, while the Sending requirement separately accepts mailbox/agent prefixes.

Operation flags and parsing match SDK `operation-flags.ts:38-109,112-172,175-200`. Attachment commands match `operation-runner.ts:63-77,114-130,160-217,220-250`; local Sending upload refs also match `packages/ts/sending/src/node.ts:63-85,88-126`. The shown Sending upload headers/query/body are advertised by the selected Sending contract `/emails/attachments` POST. Domain, batch-get, Mailbox send and conditional delivery-log examples agree with the selected App request/parameter schemas.

Finding: no static incompatibility found. Short onboarding examples do not repeat every global guard; they remain governed by the mandatory boundary at lines 16-18 and are not qualified here as standalone scripts that discard that boundary.

### `sendmux-email-for-agents`: COMPATIBLE

Reviewed lines 1-166. `skills/sendmux-email-for-agents/SKILL.md:14-16` permits the initial keyless setup handoff and expressly requires saved-profile verification before mailbox access, sending or any subsequent task handoff. The complete routing, safety, permission/approval table, setup variants, triage loop, replies, notifications and output-shape requirements preserve this boundary.

Its owner-managed versus self-registered split agrees with shared findings 1-5. The separate API permission and human-intent gates at lines 58-66 and 145-154 agree with selected App operation security: message updates require `mailbox.settings.update`, saved draft writes require `mailbox.read` plus `mailbox.drafts.write`, and Mailbox sends require `email.send`. The selected Sending `/me`, `/emails/send` and `/emails/send/batch` security requires Sending `email.send`; a Mailbox grant is not treated as a substitute. The draft handoff remains revision-bound and does not authorise a send from a draft-only request; SDK `packages/python/mcp/sendmux_mcp/curation.py:84-124` describes the matching saved-draft operations. Attachment routing agrees with that curation and the direct/presigned implementations cited below.

Finding: no static incompatibility found. This router delegates detailed protocols to the named task skills; those entire unchanged skills are not independently re-qualified by this five-body review.

### `sendmux-getting-started`: COMPATIBLE

Reviewed lines 1-246. `skills/sendmux-getting-started/SKILL.md:16-18,52-67` separates credential/profile configuration from validation. The explicit self-registration example at lines 133-160 registers first, checks `mailbox:get-connection` on the saved profile, then performs the harmless profile read and optional owner invite. It does not require authenticating a nonexistent profile, and it does not replace validation with public OpenAPI discovery.

Connection URLs, selector-free checks, returned field names and readiness limits agree with selected App `app-openapi.json:358` (`Connection`), `:15236` (`mailboxGetConnection`), `:23051` (`managementGetConnection`) and selected Sending `sending-openapi.json:826` (`sendingGetConnection`). The Management list requires its additional `mailbox.admin.read` scope, as the body states. Package/bin names agree with SDK `packages/ts/cli/package.json:2-9`, `packages/ts/mailbox/package.json:2-14`, `packages/ts/sending/package.json:2-14`, and `packages/python/mcp/pyproject.toml:5-7`. Durable lifetime, readiness, owner approval, one-hour sending and quota statements agree with shared findings 1-5, subject to the historical runtime limit below.

Finding: no static incompatibility found. Installation and discovery examples are source-contract guidance; this review does not establish which candidate package version is currently published.

### `sendmux-management`: COMPATIBLE

Reviewed lines 1-269. `skills/sendmux-management/SKILL.md:16-22` routes a keyless inbox request to setup without requiring a Management connection. It still verifies the newly registered profile before access/sends/subsequent handoff and verifies the intended Management identity before Management task work.

The synthetic connection response matches APP `src/app/api/v1/_lib/schemas/connection.ts:5-18`; the body labels it synthetic rather than a verified account. Domain modes, mailbox-create/key-create payloads, resource identifiers, operation names and OAuth scopes match selected App OpenAPI paths `/domains`, `/mailboxes`, `/mailboxes/{public_id}/keys`, `/providers`, `/webhooks` and their named lifecycle children. In particular, mailbox creation uses `mailbox.admin.create` while key creation/revocation uses `mailbox.admin.manage`; webhook read/create/update/delete/manage mappings agree with each selected `security` entry. MCP curation restrictions agree with SDK `packages/python/mcp/sendmux_mcp/curation.py:322-461`. SDK credentials/provider callbacks agree with `packages/ts/core/src/types.ts:48-57`. One-time secrets stay within authorised storage and destructive/targeted changes retain confirmation gates.

Finding: no static incompatibility found. Management connection success alone is not treated as operation permission or Mailbox runtime authorisation.

### `sendmux-token-efficient-usage`: COMPATIBLE

Reviewed lines 1-294. `skills/sendmux-token-efficient-usage/SKILL.md:16-18,28-36` allows keyless registration before saved-profile verification but keeps verification mandatory before content, sending or other task work. It selects an already-approved OAuth surface rather than assuming Mailbox. The complete cost map, attachment alternatives, read/batch/sync/log examples, conditional headers, retry guidance and routing were included.

The direct SDK file helpers and `/node` exports agree with SDK `packages/ts/sending/package.json:6-14`, `packages/ts/mailbox/package.json:6-14`, `packages/ts/sending/src/node.ts:63-126`, and `packages/ts/mailbox/src/node.ts:95-133`. MCP curation and limits agree with `packages/python/mcp/sendmux_mcp/curation.py:463-510` and `server.py:49,535-584,955-967`: real files use external transfer, Mailbox presign is bounded at 7,500,000 bytes, and tiny inline content is bounded at 32 KiB decoded. Selected Sending intent/complete schemas distinguish temporary `upload_id` from final `attachment_id` and advertise returned `max_size_bytes`.

Selected App `/mailbox/changes` accepts CSV `types` and distinct per-resource state inputs; `MailboxTypedChanges` (`app-openapi.json:7716`) and `MailboxChanges` (`:3189`) support the documented per-resource `new_state`/`has_more`. Filtered query changes use `since_query_state`, `new_query_state` and `has_more`, matching `MailboxMessageQueryChanges` (`:5480`) and operation `mailboxQueryMessageChanges` (`:19696`). The body keeps this separate from cursor pagination. Supported log filters and 304 responses match `/emails/logs` (`:12401`) and `/emails/logs/{public_id}` (`:12526`). The CLI body-only limitation is real: SDK `packages/ts/cli/src/operation-runner.ts:104-111,590-595` strips the SDK response envelope. The metadata-aware SDK example instead uses `throwOnError: false` and `responseEtag`, supported by `packages/ts/management/src/generated/sdk.gen.ts:182-191` and `packages/ts/core/src/headers.ts:7-26`. Terminal status names agree with the selected log contract; unchanged representation is not mistaken for terminal delivery.

Finding: no static incompatibility found. The compact registration snippet remains subject to its whole-body validation precondition; it does not waive the gate for a reused durable profile.

## Limits and actions

The no-challenge/no-proof-of-work durable registration branch is conditional in APP `src/app/agent-auth/agent/identity/route.ts:39-73,93-107`. The raw historical declaration `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/install-surface/contracts/app-policy-runtime.json:2-27` records `AGENT_AUTH_DURABLE_READ_REGISTRATION_ENABLED=true` on four ready pods at **2026-09-30T06:02:13.882283+00:00**. It is historical evidence only. This review does not assert that its raw envelope equals the later exported snapshot envelope, nor that those pods/flags remain current. The selected App policy records runtime value/snapshot hashes at `contracts/calendar-20261030/app-policy.json:20-22`; those hashes do not provide fresh runtime observation.

Accordingly, COMPATIBLE here qualifies the selected static contracts and documented durable-registration mode. It is not current production verification, public package availability, installation success, live OAuth consent, mailbox readiness, successful content access, send acceptance or delivery proof.

The reviewer's only write was this evidence file. The reviewer changed no skill body, bundle, export, production setting or secret and performed no tests, live calls, credential retrieval, mailbox-content reads, sends, commits, pushes or publication. No additional incompatibility/unknown is hidden behind those execution limits.
