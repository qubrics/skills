# Fresh complete-body review after approved legacy-claim removal

**Verdict: COMPATIBLE — complete-body source/historical-contract scope.** Read the entire current MCP setup skill. The approved removal resolves the sole unsupported claim recorded by the prior independent whole-body review. No different substantive unsupported claim or contradiction was identified in the remaining body. This verdict does not certify a live client, connection, production policy, delivery, or candidate publication.

## Frozen identity and exact deletion

- Repository: `/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-php4-compat`; read its `AGENTS.md` before review.
- Frozen skills commit: `64d4bf097fe9821f06393c5fe75ffe556640ae2a`; complete canonical body `skills/sendmux-mcp-setup/SKILL.md:1-463` was read, including frontmatter, boundaries, all client examples, verification, and routing.
- Canonical and generated `plugins/sendmux/skills/sendmux-mcp-setup/SKILL.md` SHA-256: `ed0e7e9cb20a1d4aa6a8e232baec5373fa78a1f89935ded70e8525e68b59ef70`. Both working files equal their frozen Git blobs and each other byte-for-byte.
- Comparison baseline: `8da2b650bef456f7a6b01c959a5d10ab5c22d343`; both previous bodies have SHA-256 `195ff3637906a8192475cafe73b91b78a700b13147970c6ee388c73ef11af78b`.
- Fresh Git diff and byte comparison independently confirm that each body differs only by deletion of exactly one occurrence of the former line 202 legacy Windsurf/Cascade bullet. No replacement text or other body change exists. Old lines 1-201 are unchanged; old lines 203-464 become current lines 202-463.

The deleted bullet asserted the historical configuration path/settings UI, HTTP `serverUrl`/`url` fields, and environment interpolation. Removing those assertions needs no new client configuration claim. The remaining description's Windsurf/Cascade trigger is routing scope, not an assertion of those settings or certified compatibility. The body still requires client-specific configuration and separate verification; no legacy-client instructions remain to substantiate.

## Prior evidence retained and adopted

Read both complete reports in this directory: `copilot-scope-fresh-review.md` and `windsurf-consented-review.md`. They remain historical and unchanged. The former independently measured the complete 464-line baseline and returned UNKNOWN solely for the now-deleted bullet; the latter records the consented research refusal and does not substantiate the bullet. Neither refusal nor deletion proves that the historical Windsurf claim was false.

For all unchanged material, this review explicitly adopts the former report's intact independent domain measurements and cited source identities. This includes released entrypoints and transport/health behaviour, separate local bearer enforcement, CLI-first registration, tool/permission preconditions, attachment limits and secret-transfer boundary, and the Cursor, Claude Code, Codex, VS Code/Copilot, Cline IDE/CLI and Gemini client documentation. Those client references were **not freshly retrieved or remeasured in this pass**. Their applicability here follows the exact unchanged-byte comparison, complete current-body read, and absence of a new contradictory assertion. The latter report contributes only the historical refusal/stop record, not extra compatible-domain measurements.

No evaluation answers, grades, CI results, canary results, or other skill bodies informed this verdict.

## Fresh local source measurements

Source identities: **SDK** `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk` at `73bedb8b0005e96e580e39cca4aac6bd030753a5`; **App** `/Users/rj/Desktop/GIT-REPOS/sendmux` at `87ce115810ebcfa91655295603c27af52fcff96f`. Source was read from those immutable Git objects. **Wheel** means the already-retained `sendmux_mcp-2.2.0-py3-none-any.whl` under App `.claude/artifacts/rebrand-qubrics-php4-sync/released-contracts/`, opened as an archive without installation or execution.

| Gate | Fresh local evidence and complete-body conclusion |
| --- | --- |
| Credential isolation and selection | SDK `packages/python/mcp/sendmux_mcp/config.py:27-31,86-91,116-150,194-200` and Wheel `!sendmux_mcp/config.py:71-76,101-135,179-185` were reread. Released code reads `SENDMUX_`; the candidate checks `QUBRICS_` first. Surface keys override a generic key, with Mailbox fallback for Sending. Body `:16-29` requires clearing inherited credentials/base URL/bearer/transport/surfaces before loading intended values; local examples do not override that precondition. SDK `packages/python/core/sendmux_core/auth.py:26-40` supports the named key families, with Sending agent-token use explicitly conditioned on owner approval in the body. |
| Returned identity and preconditions | App `src/app/api/v1/_lib/connection.ts:5-40` authenticates a connection-only check, requires the selected surface, and returns team, credential, permissions, and mailboxes. Body `:18` requires matching that identity and authorised mailbox before content access or mutation; discovery or a permission grant alone is insufficient. Verification names harmless connection checks and does not promise sending, entitlement, or identity from discovery. Detailed tool-schema and mailbox-discovery measurements remain explicitly adopted from the prior report. |
| Release versus candidate | Fresh JSON enumeration of Wheel and SDK `packages/python/mcp/sendmux_mcp/mcp-contract.json` returned respectively 54 names (`26/22/6`, zero `qubrics_` aliases) and 150 names (`92/46/12`, 75 aliases). Both declare version `2.2.0` and protocols `2025-11-25` / `2026-07-28`. Body `:41-75` labels the source catalogue as candidate and does not infer publication from matching versions or a credential-visible subset. |
| Resource, grant, and audience | Wheel contract declares `https://mcp.sendmux.ai/mcp`; SDK contract and `packages/python/mcp/sendmux_mcp/hosted_auth.py:13,49-61` declare candidate canonical/alias handling. App `src/constants/agent-discovery.ts:1-6`, `src/server/mcp/client-registration.ts:91-94,127-137`, `authorization.ts:165-174`, `grant-creation.ts:418-423`, and `token-exchange.ts:67-100` were reread. They distinguish REST/MCP resources, accept resource-neutral registration, bind the later request and stored grant, and reject mismatched exchange resources. Body `:33,61-75` preserves those stages and does not assign grant ownership to the client or predict a resource-server response from an authorisation-stage error. Token-audience issuance details remain adopted from the prior report. |
| Attachment identities and transfer boundary | Reread selected historical App `calendar-20261030/app-openapi.json:2107-2185` and Sending `row07-actualtuple-20261012/sending-openapi.json:274-310,333-385,1216-1231`. Exact metadata/method/headers, returned maximum, temporary upload identity and final Sending attachment identity are distinct. Body `:77-83` preserves that separation, keeps real-file bytes and secret capabilities out of model context/arguments/output, and does not use a Mailbox `blob_id` as a Sending `attachment_id`. Detailed MCP upload-schema/limit measurements remain adopted from the prior report. |
| Certification boundary | Entire body retains selected-client configuration, isolated secret-backed process setup, post-setup checks, identity verification, and explicit separate client verification at `:75`. Neither the approved deletion nor this verdict upgrades configuration documentation to live or end-to-end client certification. |

The selected historical contract export identities were reread: App revision `87ce115810ebcfa91655295603c27af52fcff96f`, source tree `80d75dbab08d0d535ceb7722b56d598bc9450c58`; Sending revision `2f4226655efc05f109b5feda50ed2ca1570aea91`, source tree `95b6078936a93304770b32c0e6df7d866b6e54ba`. Fresh file hashes match their export declarations:

| Selected retained file | SHA-256 |
| --- | --- |
| `calendar-20261030/app-openapi.json` | `4e4fbc8024eaad195169a18cc096856d1653a3c01fb4f66d0313e67cb0b2e705` |
| `calendar-20261030/app-policy.json` | `d4159fc4ad2a7b1927c294303fbc11533f8dab9f5a9b3cc73b2139c7354e71bf` |
| `row07-actualtuple-20261012/sending-openapi.json` | `eb69dc0ca27e5f42cd9da70e90e2b1a386dfe588b743e47a8d91f3b7928a75e5` |
| `row07-actualtuple-20261012/sending-policy.json` | `64b2ab07617f084045921f7078100372c3175712cecc117a799109a2c2546fd3` |

These are selected historical schemas and policy fingerprints, not a current live-policy measurement. They do not prove current credential entitlement, provider readiness, delivery, or publication of candidate SDK features.

## Disposition and limits

The complete-body source verdict is COMPATIBLE for the exact current hash above, combining fresh whole-body/deletion/source measurements with the explicitly adopted unchanged prior independent domain measurements. This is broader than merely confirming the deleted line is absent, and narrower than live certification. A future body/source change requires review of its changed inputs; this report cannot qualify another hash automatically.

No external retrieval/search/fetch/cache/mirror, guide/client command, package download/install, test, workflow, credential retrieval, product call, live write, Git mutation, deletion, body edit, compatibility-record edit, or merge was performed. Only this new report was written. Metadata, push/CI, and the exact-head merge ASK belong to the separately authorised continuation; this report grants no merge authority.

Goal: independent complete-body source verdict after the approved one-line legacy-claim removal. Tally: 1 new report; 2 identical current body copies verified; 1 removed unsupported claim; 0 remaining substantive source blockers identified; 0 live/product calls; 0 merges.

Skipped: fresh external client-source retrieval, live/client certification, credentials, tests, CI, release work and other skill bodies. Risk: source/historical compatibility alone does not establish current production policy, a functioning selected client, or a published candidate catalogue; merge remains unapproved.
