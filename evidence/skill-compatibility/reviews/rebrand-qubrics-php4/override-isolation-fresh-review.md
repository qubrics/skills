# Fresh complete-body MCP override-isolation review

Review time: 2026-11-06 21:08 AEDT.

**Verdict: COMPATIBLE — complete-body source/historical-contract scope.** Independently read all 463 lines of the current canonical MCP setup skill, including frontmatter, boundaries, release/candidate distinctions, every client example, verification and routing. The approved boundary correction covers the schema-source overrides and HTTP-authentication opt-out in the retained release and selected candidate. No different substantive unsupported claim or source contradiction was identified. This is not live client, production-policy, publication or delivery certification.

## Exact inputs and independence

- Repository: `/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-php4-compat`; read its `AGENTS.md`.
- Frozen current skills commit: `67493228154807c14a54c8c964e7218a18f29378`; baseline: `408f23cf49ff66731a3b26945a653cce8a7386bd`. Current canonical `skills/sendmux-mcp-setup/SKILL.md` and generated `plugins/sendmux/skills/sendmux-mcp-setup/SKILL.md` are byte-identical; both SHA-256 values are `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`. The final read-only HEAD/hash check confirmed that freeze after it was committed by the parent; no review decision relies on reported gate or grading results.
- Fresh byte comparison found 463 lines in both current and baseline bodies, with only line 16 changed. Baseline body SHA-256 is `ed0e7e9cb20a1d4aa6a8e232baec5373fa78a1f89935ded70e8525e68b59ef70`, identical to the body at `64d4bf097fe9821f06393c5fe75ffe556640ae2a` reviewed by `legacy-removal-fresh-review.md:8-11`. The current line matches the approved body hunk in `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-php4-sync/skills-pr40-review408-proposed.patch`.
- **SDK** below is `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk` at `73bedb8b0005e96e580e39cca4aac6bd030753a5`, read with immutable Git-object inspection. **App** is `/Users/rj/Desktop/GIT-REPOS/sendmux` at `87ce115810ebcfa91655295603c27af52fcff96f`.
- **Wheel** is the retained `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-php4-sync/released-contracts/sendmux_mcp-2.2.0-py3-none-any.whl`; freshly computed SHA-256 is `0f23f8ecdf46edb958f4fba677d14d79811d9e01ae22421e5083d0dd2401d697`. Members were decoded in memory without extraction, installation or execution; `!member:line` denotes decoded archive lines.
- New override-isolation evaluation explanation, assertions and grade were not read. Prior review verdict labels were not accepted as proof of the changed boundary; its environment lookup and enforcement paths were remeasured directly.

## Fresh boundary and identity measurements

Canonical per the pinned implementations: clear inherited selection and security overrides in the isolated child before loading intended values. A generic API key or an explicitly supplied HTTP bearer does not itself neutralise an inherited competing override.

| Boundary | Independently read source and result |
| --- | --- |
| Released schema-source selection | Wheel `!sendmux_mcp/config.py:123-125` reads `SENDMUX_MCP_OPENAPI_INPUT_DIR`, then unprefixed `OPENAPI_INPUT_DIR`, plus `SENDMUX_MCP_APP_OPENAPI` and `SENDMUX_MCP_SENDING_OPENAPI`. Wheel `!sendmux_mcp/specs.py:31-45` prioritises explicit schema paths, then the input directory, then bundled schemas. Current body `:16` explicitly clears every one of those inherited inputs. |
| Candidate schema-source selection | SDK `packages/python/mcp/sendmux_mcp/config.py:27-31,138-140` resolves the three SENDMUX-prefixed schema settings through QUBRICS-first lookup. Its `env_value("OPENAPI_INPUT_DIR")` remains that same unprefixed name. SDK `packages/python/mcp/sendmux_mcp/specs.py:17-45` consumes the selected local/URL source. Body `:16` covers `OPENAPI_INPUT_DIR`, both `SENDMUX_MCP_OPENAPI_INPUT_DIR` / `QUBRICS_MCP_OPENAPI_INPUT_DIR`, both `SENDMUX_MCP_APP_OPENAPI` / `QUBRICS_MCP_APP_OPENAPI`, and both `SENDMUX_MCP_SENDING_OPENAPI` / `QUBRICS_MCP_SENDING_OPENAPI`. No invented `QUBRICS_OPENAPI_INPUT_DIR` is required by this lookup. |
| Released HTTP-authentication opt-out | Wheel `!sendmux_mcp/config.py:94-98,127-128` reads `SENDMUX_MCP_ALLOW_UNAUTHENTICATED_HTTP` and permits HTTP without the bearer requirement when enabled. Wheel `!sendmux_mcp/security.py:113-117` also omits bearer middleware when that flag is true, even if a token exists. Body `:16` explicitly clears the opt-out before intended configuration; body `:29,115-127` continues to require the separate local bearer. Merely setting a token would not close this inherited bypass. |
| Candidate HTTP-authentication opt-out | SDK `packages/python/mcp/sendmux_mcp/config.py:27-31,109-113,142-143` reads `QUBRICS_MCP_ALLOW_UNAUTHENTICATED_HTTP` before the SENDMUX fallback. SDK `packages/python/mcp/sendmux_mcp/security.py:125-129` has the same opt-out condition. Body `:16` clears both names. SDK `packages/python/mcp/sendmux_mcp/cli.py:91-114` preserves environment schema/security values when flags do not replace them, confirming that the global precondition applies to the shown invocations. |
| Credential, endpoint and surface selection | Wheel `!sendmux_mcp/config.py:71-76,107-128` and SDK `packages/python/mcp/sendmux_mcp/config.py:27-31,86-91,122-143,194-200` confirm per-surface keys override generic keys, Sending can fall back to Mailbox, and credential/base-URL/bearer/transport/surface environment inputs affect selection. Body `:16` retains clearing under both prefixes, intended secret-backed loading, authorised endpoint selection before credential transmission, and no credential arguments/output. Its corrected released claim is specifically about SENDMUX credential names, not all environment inputs; the unprefixed schema fallback is therefore no longer contradicted. |
| Key family and identity gate | SDK `packages/python/core/sendmux_core/auth.py:26-40` supports the named key families. App `src/app/api/v1/_lib/connection.ts:5-7,21-40` authenticates a connection-only request, checks the selected surface, and returns team, credential, permissions and authorised mailboxes. Body `:18,22-29,59,75,447-453` requires verified intended identity and mailbox selection before content access/mutation, stops on mismatch or unverifiable identity, separates discovery from credential validation, and keeps credential-free registration CLI-first. Permission alone is not treated as identity. Sending connection-schema details remain adopted below. |

These measurements establish the correction against actual lookup and middleware conditions, rather than treating the previous review's omission as resolved by wording alone. Clearing precedes intended loading in the single global boundary; none of the later client examples withdraws that precondition.

## Explicit adoption of unchanged domains

Read the named prior reports and adopt only their unchanged-domain measurements and cited immutable sources. The fresh whole-body read and exact comparison above establish that every body line except 16 is unchanged from the prior legacy-removal review. Adoption is not a fresh external retrieval or a present-runtime measurement.

- `legacy-removal-fresh-review.md:13-21,29-34,45-51`: retained CLI-first bootstrap, surface/permission and connection-schema preconditions, release/candidate separation, resource/grant/audience stages, attachment identities and transfer boundary, named-client scope and certification limits. Its earlier credential-isolation completeness claim is **not** adopted; the schema/auth controls were independently reviewed above.
- `copilot-scope-fresh-review.md:35-44,48-50`: unchanged key families, connection/discovery schemas, entrypoints, transport/health, catalogue measurements, OAuth/permission distinctions, attachments, actual CLI registration command, and immutable VS Code/Copilot, Cline IDE/CLI, Codex and Gemini source measurements. Current `:293` retains the local-VS-Code versus Copilot-harness restriction. The former UNKNOWN for the removed legacy-client bullet is not imported into the current body; no such configuration bullet remains.
- `released-install-fresh-review.md:54-58,64-72,82,88-92,94-107,111`: retained release versus candidate counts and entrypoints, separate local bearer, bootstrap/identity behaviour, Cursor and Claude configurations, Copilot CLI, Gemini and Cline contract measurements, and attachment limits. Exclude its historical positive Windsurf claim at `:93`, its superseded VS Code scope ambiguity, other skill bodies and evaluation expectations. No Windsurf retrieval or reconstruction was performed.

Together, these measurements support current body `:33,41-83,85-437,438-463`, including 54 released tools (`26/22/6`, no aliases) versus 150 candidate names (`92/46/12`, 75 aliases); legacy hosted resource primary and candidate canonical/alias labelled unpublished; client-specific configuration with separate verification; no local MCP `file_path`; inline/real-file boundaries and distinct Mailbox `blob_id` / Sending `attachment_id`; and harmless connection checks followed by identity verification. None establishes installed candidate features, current entitlement, a successful client journey or delivery.

## Historical producer binding

Fresh reads of `evidence/skill-compatibility/contracts/calendar-20261030/app-export.json:4-8` bind App `87ce115810ebcfa91655295603c27af52fcff96f`, source tree `80d75dbab08d0d535ceb7722b56d598bc9450c58`. `evidence/skill-compatibility/contracts/row07-actualtuple-20261012/sending-export.json:4-8` binds Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`, source tree `95b6078936a93304770b32c0e6df7d866b6e54ba`. Fresh hashes match all four declarations:

| Retained file, relative to `evidence/skill-compatibility/contracts/` | SHA-256 |
| --- | --- |
| `calendar-20261030/app-openapi.json` | `4e4fbc8024eaad195169a18cc096856d1653a3c01fb4f66d0313e67cb0b2e705` |
| `calendar-20261030/app-policy.json` | `d4159fc4ad2a7b1927c294303fbc11533f8dab9f5a9b3cc73b2139c7354e71bf` |
| `row07-actualtuple-20261012/sending-openapi.json` | `eb69dc0ca27e5f42cd9da70e90e2b1a386dfe588b743e47a8d91f3b7928a75e5` |
| `row07-actualtuple-20261012/sending-policy.json` | `64b2ab07617f084045921f7078100372c3175712cecc117a799109a2c2546fd3` |

These bindings support selected historical contracts and adopted attachment/policy measurements only; they do not establish current deployment, live flags, provider readiness or account entitlement.

## Disposition and limits

Complete-body verdict is **COMPATIBLE for SHA-256 `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`**, combining fresh complete-body, changed-boundary and pinned-source measurements with the explicitly limited adoption above. This report does not automatically qualify another body hash or source revision and grants no merge authority.

Only this new evidence report was written. No body, compatibility record, evaluation, existing report or metadata was edited; no external research/search/fetch/cache/mirror, Windsurf retrieval, guide/client command, package download/install, credential retrieval, product call, test, CI workflow, live write, send, Git mutation or deletion was performed. Session housekeeping and auxiliary state writes were excluded by the explicit one-file, read-only review scope.

Goal: independent complete-body source verdict for the exact approved MCP override-isolation correction. Tally: 1 new report; 2 byte-identical current body copies verified; 9 explicitly named schema/auth override variables checked; 0 remaining substantive source blockers identified; 0 live/product calls; 0 merges.

Skipped: fresh external client-source retrieval, runtime/client certification, tests, CI, credentials and publication checks. Risk: source/historical compatibility does not establish today's production policy, selected-client operation or candidate publication; merge remains unapproved.
