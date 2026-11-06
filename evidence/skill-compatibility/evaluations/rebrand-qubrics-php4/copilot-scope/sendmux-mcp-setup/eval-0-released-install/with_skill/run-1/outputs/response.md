# Guide-only preparation

This is an explanation of the frozen `sendmux-mcp-setup` guide, not an installation or a live compatibility result. No guide commands were run, no real credentials were accessed, no API calls or mailbox reads were made, and nothing was sent or changed in a product.

## Account, process and endpoint preconditions

Start local MCP servers and their clients in an isolated child process. Before loading account A's authorised values from the user's secret store, clear inherited API keys, per-surface keys, access/bearer tokens, API base URLs, transport settings and surface-selection overrides under both `QUBRICS_` and `SENDMUX_`. Do not merely add A's key to the contaminated parent environment. Keep secrets out of arguments, output and checked-in configuration; do not ask the user to paste them.

The parent environment's `QUBRICS_API_KEY` belongs to B, `SENDMUX_ACCESS_TOKEN` competes with the intended credential, and neither inherited `QUBRICS_BASE_URL` nor `SENDMUX_BASE_URL` is authorised. Remove all of these from the child before preparing A's connection. Establish the authorised endpoint before any credential transmission. The guide does not specify a precedence rule for `SENDMUX_ACCESS_TOKEN`, so this explanation does not invent one: isolation removes that ambiguity.

The released wheel reads `SENDMUX_` environment values only. Candidate SDK `73bedb8` adds `QUBRICS_` values before the `SENDMUX_` fallbacks. Even when preparing the release, clear both namespaces so inherited candidate settings do not remain a latent dependency. Within both implementations, a per-surface key can override a generic key.

If A already has the authorised durable CLI profile `work` and the intended task is terminal mailbox work, prefer that profile. The guide does not teach a CLI profile-selection command, so none is invented here. Do not extract the profile's agent credential merely to force local MCP setup. If the user chooses MCP, prefer hosted OAuth when supported, or use an independently authorised secret-backed local credential. Registration remains CLI-first; MCP is not a registration instruction authority. If no credential exists, the guide routes registration to `sendmux-getting-started` and `sendmux agent:register`, rather than obtaining one through mailbox content.

This guide contains MCP server/client examples, not SDK construction examples. It therefore does not establish what an SDK constructor does when supplied an explicit `apiKey` alongside an inherited base URL, nor does it provide an SDK override API to reproduce. Apply its documented precondition: isolate the process, clear both inherited base URLs and competing credentials, then select the authorised destination and intended key. An explicit key alone is not evidence that the destination is authorised; no SDK implementation code or precedence guarantee is inferred here.

## Mailbox-only and combined preparation

For intended mailbox `mbx_support`, `SENDMUX_API_KEY` is the authorised secret source. The different inherited `QUBRICS_MAILBOX_API_KEY` must be cleared, even though the released wheel ignores that namespace. In the candidate, a per-surface credential can override a generic key; retaining it could select the wrong account or mailbox. Do not treat the spelling `SENDMUX_API_KEY` as proof of identity or scope.

- **Mailbox-only:** select `sendmux-mcp-mailbox`; pass only the intended mailbox credential through the clean server environment as `SENDMUX_API_KEY`. It must be an `smx_mbx_` key or appropriately scoped `smx_agent_` token. Clear all inherited per-surface keys first. A named local client starts this dedicated command and passes the intended environment value; client interpolation follows that client's documented syntax.
- **Combined:** select `sendmux-mcp` and explicitly select the authorised surfaces. The guide's all-surface example selects `mailbox,management,sending` and provides `SENDMUX_MAILBOX_API_KEY`, `SENDMUX_MANAGEMENT_API_KEY` and `SENDMUX_SENDING_API_KEY`. Populate the mailbox-specific variable from the intended `SENDMUX_API_KEY` secret source, not from the parent's conflicting Qubrics variable. Management separately requires an authorised `smx_root_` key. Sending separately requires a send-capable `smx_mbx_` key or owner-approved Sending-resource `smx_agent_` token. A mailbox credential alone does not justify enabling the other surfaces or supply their credentials. A combined client must launch that combined command, carry the same explicit surface selection, and pass the corresponding intended per-surface values.

For combined surface selection, the guide documents this order: `--surfaces`, then `--surface`, then the environment fallback. Released 2.2.0 supports `SENDMUX_MCP_SURFACES`. Candidate `73bedb8` additionally consults `QUBRICS_MCP_SURFACES` before the Sendmux environment fallback. The demonstrated values are `mailbox`, `management` and `sending`, comma-separated for multiple surfaces. The dedicated `sendmux-mcp-mailbox`, `sendmux-mcp-management` and `sendmux-mcp-sending` scripts select their respective single surface. Do not invent additional selector flags or environment names. Clear inherited selectors even when making an explicit selection, and do not use `sendmux-mcp-hosted` for ordinary local agent setup.

Local stdio passes upstream credentials in the server's clean environment. Local HTTP is for a local/private MCP endpoint; the guide demonstrates `--transport http`, host `127.0.0.1`, port `8765` and path `/mcp`. The server's `SENDMUX_MCP_HTTP_BEARER_TOKEN` protects the MCP endpoint; a client supplies the matching `Authorization: Bearer ...` header. This bearer is separate from the upstream Sendmux API key. Clear inherited HTTP bearer and transport settings before selecting intended values. The local HTTP URL is a client-to-MCP destination, not the upstream API base URL; authorise both destinations separately. The guide does not supply a universal API base-URL value to substitute for the two unapproved inherited overrides.

For hosted remote MCP, use the guide's primary `https://mcp.sendmux.ai/mcp` with the named client's OAuth flow, not a Sendmux API key or a REST access token as the hosted bearer. Do not emit a client-unspecified generic configuration: the guide's JSON/TOML shapes and interpolation rules belong to their named clients.

## Identity gate before task tools

After future authorised setup, restart or refresh MCP servers, inspect whether discovery matches the selected surfaces, then use the selected harmless connection check: `mailbox_get_connection`, `management_get_connection`, or `sending_get_connection`. These checks need no mailbox selector; the Sending check sends no email. Discovery alone does not validate the upstream credential.

Compare the returned identity with intended account A and the intended credential, and verify any authorised mailbox selection before accessing content or mutating state. For a multi-mailbox grant, the guide says to call `mailbox_list_granted_mailboxes` first and use the returned `mailbox_id` when targeting a mailbox; do not infer that a mailbox label is an authorised returned selection.

The hypothetical unisolated connection identifies B. Stop there, before mailbox content, uploads, sends, management changes or other task actions. A permission grant for B does not establish A's identity. Resolve the mismatch with the user and correct the isolated configuration before repeating the identity gate; do not continue because authentication succeeded. An unverifiable identity has the same stop condition. No such check is performed in this synthetic preparation.

## Released wheel, candidate catalogue and OAuth bindings

The guide's `pip install sendmux-mcp` resolves the released `sendmux-mcp` 2.2.0 wheel under the prompt's premise. Package version `2.2.0` is separate from MCP protocol revisions `2025-11-25` and `2026-07-28`; the guide says the released wheel speaks those revisions over stdio or Streamable HTTP.

| Catalogue | Mailbox | Management | Sending | Total |
| --- | ---: | ---: | ---: | ---: |
| Released 2.2.0 tool names | 26 | 22 | 6 | 54 |
| Candidate `73bedb8` unprefixed tools | 46 | 23 | 6 | 75 |
| Candidate `73bedb8` names including aliases | 92 | 46 | 12 | 150 |

The release has no `qubrics_` aliases. In the candidate, each of the 75 unprefixed tools has a `qubrics_` alias, producing 150 names. Both sources declare package version 2.2.0, but the source catalogues differ. Installing the released wheel does not establish availability of the candidate's aliases, extra tools or Qubrics environment fallbacks. Matching package-version strings do not identify identical source contents or prove publication of candidate features.

These are catalogue counts, not a promise that one credential discovers every name. Surface selection and approved OAuth grants constrain the visible subset. Client-side `tools: ["*"]` in the Copilot CLI example does not turn that subset into the whole catalogue or enlarge the upstream grant.

The guide keeps `https://mcp.sendmux.ai/mcp` primary. The unpublished candidate declares `https://mcp.qubrics.com/mcp` canonical and retains the Sendmux URL as an alias. This is a candidate declaration, not evidence that a particular deployment, client or issued token supports that migration. For the guide's legacy-primary OAuth setup, independently check that the authorisation request targets exactly `https://mcp.sendmux.ai/mcp`, the Sendmux authorisation server stores that exact approved resource restriction, and the issued token has that exact audience. Do not silently substitute the candidate canonical URL in one binding while retaining the legacy URL in another.

Dynamic client registration may validly omit `resource`; resource-neutral registration alone is not reason to re-register. If request fields are correct but `invalid_target` persists, investigate the Sendmux authorisation-server grant state. A client cannot edit that stored grant. Hosted MCP OAuth and REST OAuth use separate resources; a REST token does not become a valid hosted MCP bearer. An authorisation-stage error does not establish the resource server's eventual rejection shape.

## VS Code, Copilot and certification limits

VS Code stores these examples under `servers` in `.vscode/mcp.json` or user-profile `mcp.json`. VS Code resolves `${input:...}` locally, including the guide's password-style mailbox-key input and local-HTTP bearer input. **Servers using input variables are not forwarded to Copilot harness sessions, even after the secret has been cached locally.** Local caching does not cross or remove that boundary. A locally working input-dependent VS Code server therefore does not establish that a Copilot harness session can use it.

Copilot CLI is a separate documented configuration surface: it reads `~/.copilot/mcp-config.json` under `mcpServers`. Its examples keep secrets in the Copilot launch environment and retain literal `${SENDMUX_MBX_KEY}` or `${SENDMUX_MCP_HTTP_BEARER_TOKEN}` references in the file. Prepare that launch environment from the intended secret store in isolation; do not assume VS Code's local input resolution or cached secret supplies it. Mailbox-only versus combined command, surface and credential selection must remain consistent on the client and server sides described above.

The client examples document named-client configuration shapes and intended flows. They do **not** certify compatibility of VS Code, Copilot harnesses, Copilot CLI, or any other named client. Chosen-client verification remains a separate exercise covering its actual configuration resolution, transport, OAuth or bearer behaviour, discovered surface subset, upstream connection identity and authorised mailbox selection before task tools. No chosen-client verification has been performed here.

This explanation proves no live account identity, connectivity, tool availability, transport interoperability, successful install, hosted deployment state, candidate publication or live compatibility. Its only basis is the frozen guide, including its explicit release/candidate distinction and forwarding boundary. No SDK source, external implementation evidence or live product behaviour was inspected.

Skipped all guide execution and live verification as requested. Risk: contaminated inherited credentials or endpoints can select B or an unauthorised destination; correct isolation and a returned-identity check remain prerequisites for real use.
