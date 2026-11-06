# Guide-only preparation

These are preparation steps from the supplied guide; none has been executed.

## Account, process and endpoint boundaries

For terminal mailbox work, prefer the authorised existing CLI profile `work`. Registration is CLI-first; MCP is a runtime surface. Do not extract a credential from that profile merely to force MCP setup. If the user chooses MCP, use hosted OAuth or authorised local credentials loaded from the user's secret store.

Start local servers and clients in an isolated child process. Before loading intended values, clear inherited API keys, per-surface keys, access/bearer tokens, API base-URL overrides, transport overrides and surface-selection overrides under both `QUBRICS_` and `SENDMUX_`. This includes account B's `QUBRICS_API_KEY`, the competing `SENDMUX_ACCESS_TOKEN`, both unapproved base URLs and the different `QUBRICS_MAILBOX_API_KEY`. Supplying account A's generic key alone does not defeat a competing per-surface key.

Also clear all of these explicitly:

- `OPENAPI_INPUT_DIR`
- `SENDMUX_MCP_OPENAPI_INPUT_DIR`, `QUBRICS_MCP_OPENAPI_INPUT_DIR`
- `SENDMUX_MCP_APP_OPENAPI`, `QUBRICS_MCP_APP_OPENAPI`
- `SENDMUX_MCP_SENDING_OPENAPI`, `QUBRICS_MCP_SENDING_OPENAPI`
- `SENDMUX_MCP_ALLOW_UNAUTHENTICATED_HTTP`, `QUBRICS_MCP_ALLOW_UNAUTHENTICATED_HTTP`

Then load only the intended, authorised settings and secrets. The unprefixed `OPENAPI_INPUT_DIR` is a schema-input override, not a supported credential name; clearing prefixed credentials alone leaves it behind. An inherited schema override can select unintended input. An inherited unauthenticated-HTTP opt-out is a separate setting: merely supplying the intended bearer token does not establish that authentication is enforced. Clear both opt-out variables before configuring authenticated HTTP.

Confirm the authorised endpoint before any credential transmission. The guide supplies no canonical REST API base URL or SDK constructor precedence to infer here. It contains MCP configuration examples, not SDK initialisation examples. Consequently, it does not establish that an explicit SDK `apiKey` overrides or neutralises an inherited base URL. Apply its isolation and authorised-endpoint preconditions; do not invent SDK implementation code or claim verified SDK behaviour.

## Mailbox-only, combined and HTTP preparation

For Mailbox-only local MCP, select `sendmux-mcp-mailbox` and load the intended `mbx_support` credential from the authorised secret source into `SENDMUX_API_KEY`. Mailbox accepts an `smx_mbx_` key or appropriately scoped `smx_agent_` token. Remove the inherited competing per-surface key first. Mailbox-only discovery should expose no Management or Sending tools.

For a combined server, select `sendmux-mcp` and explicitly choose `mailbox,management,sending`. Load intended credentials separately into `SENDMUX_MAILBOX_API_KEY`, `SENDMUX_MANAGEMENT_API_KEY` and `SENDMUX_SENDING_API_KEY`. Management requires an `smx_root_` key; Sending requires a send-capable `smx_mbx_` key or owner-approved Sending-resource `smx_agent_` token. Do not assume the mailbox credential authorises all three surfaces.

In both released and candidate versions, a per-surface key can override the generic key. Released 2.2.0 uses `SENDMUX_` credential names. Candidate `73bedb8` adds `QUBRICS_` credential names before those fallbacks; matching versions do not make candidate names available in the released wheel.

For combined-server surface selection, the guide documents `--surfaces`, then `--surface`, then the environment fallback. Released 2.2.0 supports `SENDMUX_MCP_SURFACES`; the candidate adds `QUBRICS_MCP_SURFACES` before that fallback. Dedicated Mailbox, Management and Sending scripts select their respective surfaces. Clear inherited selectors before setting the intended one, and clear transport overrides before deliberately choosing local stdio or local HTTP.

For local/private HTTP, keep the upstream Sendmux key in the server environment and use a separate `SENDMUX_MCP_HTTP_BEARER_TOKEN` for the client's `Authorization: Bearer ...` header. That bearer protects the MCP endpoint; it is not the upstream API key. Keep secrets out of arguments, checked-in configuration and output. Isolate the client's launch environment too, then use its documented configuration and interpolation rules. No client was selected here, so no generic configuration object is justified.

Hosted OAuth uses `https://mcp.sendmux.ai/mcp` without API keys. REST OAuth and hosted MCP have separate resources; a REST token must not be reused as the MCP bearer.

## Returned identity gate

Before content access or account mutation, perform the selected surface's connection check: `mailbox_get_connection`, `management_get_connection` or `sending_get_connection`. These need no mailbox selector; the Sending check sends no email. Verify the returned identity against intended account A and the authorised credential, and verify the intended mailbox selection before task tools. Tool discovery and permission grants alone do not establish identity.

If an unisolated connection grants permission but identifies B, stop before content access or mutation. Do not treat its successful grant as authority to continue. Resolve the identity mismatch with the user and establish the intended connection first. For an authorised multi-mailbox grant, after validating the connection, use `mailbox_list_granted_mailboxes` and target mailbox tools with the returned authorised `mailbox_id`.

## Protocol, catalogue and resource distinctions

| Item | Released wheel | Unpublished candidate |
| --- | --- | --- |
| Identity | `sendmux-mcp` 2.2.0 | SDK `73bedb8`, also declaring 2.2.0 |
| Catalogue | 54 tool names: 26 Mailbox, 22 Management, 6 Sending | 150 tool names: 92 Mailbox, 46 Management, 12 Sending |
| Aliases | No `qubrics_` aliases | 75 unprefixed tools, each with a `qubrics_` alias |
| Unprefixed candidate split | Not applicable | 46 Mailbox, 23 Management, 6 Sending |

The guide states that the released wheel speaks MCP protocol revisions `2025-11-25` and `2026-07-28` over stdio or Streamable HTTP. Protocol revisions are separate from package versions. The install command resolves the released wheel, so its supported credentials, selectors and catalogue apply. The candidate's matching 2.2.0 declaration does not prove its extra features or aliases were published.

Selected surfaces and approved OAuth grants determine the tools a credential can see; that visible subset is not the complete catalogue.

The guide keeps `https://mcp.sendmux.ai/mcp` primary. The candidate declares `https://mcp.qubrics.com/mcp` canonical and retains the legacy URL as an alias. For the documented legacy-primary OAuth flow, the authorisation request, stored grant restriction and issued token audience must each bind exactly to `https://mcp.sendmux.ai/mcp`. Resource-neutral dynamic registration can omit `resource`; that alone is not a reason to re-register. The Sendmux authorisation server owns the stored grant. Do not substitute the candidate's canonical URL into the documented flow or infer acceptance from alias status.

## Client and certification limits

VS Code resolves the guide's `${input:...}` examples locally. Servers depending on those input variables are not forwarded to Copilot harness sessions; caching the secret locally does not change that boundary.

The client examples document configurations. They do not certify compatibility for any named client. The chosen client's configuration, interpolation, transport, authentication, visible surfaces and returned account identity still require separate verification. This synthetic explanation performs none of those checks and proves no live compatibility, credential validity, deployed behaviour or candidate publication.
