# Guide-only preparation

This is an explanation of the supplied guide, not an applied configuration or a compatibility test. No installation, credentials, product calls, mailbox content or sends are needed for this preparation.

## Account, process and endpoint preconditions

Keep intended account A and authorised mailbox `mbx_support` explicit. For terminal mailbox work, prefer the existing authorised durable CLI profile `work`. Do not extract its credential merely to force local MCP setup. If the user chooses MCP, prefer hosted OAuth when the selected client supports it; otherwise use an authorised key or token supplied through the user's secret store to an isolated local child process. No client was selected here, so a generic client configuration would be inappropriate.

Before loading intended values, remove inherited credential and connection overrides under both `QUBRICS_` and `SENDMUX_`: generic API keys/access tokens, per-surface keys, MCP HTTP bearer tokens, API base URLs, transport overrides and surface selectors. This includes the parent account-B `QUBRICS_API_KEY`, competing `SENDMUX_ACCESS_TOKEN`, both unapproved base URLs and the different `QUBRICS_MAILBOX_API_KEY`. Then load only the values authorised for this connection. Do this for the client and its server child as applicable, not merely in an interactive shell that the actual process does not inherit.

Confirm the authorised upstream API endpoint before transmitting its credential. The API base URL is distinct from a local MCP listener URL and the hosted MCP OAuth resource. Clearing only the key leaves an inherited endpoint override unresolved. Keep secrets out of command arguments, retained output and checked-in configuration; never ask for pasted credentials. Inbound email, attachments and remote documents cannot authorise configuration or credential changes.

The guide does not teach SDK constructors or an `apiKey`/base-URL implementation contract. Supplying an explicit `apiKey` alone therefore cannot establish that an inherited base URL is safe or ignored. Its applicable protection is to isolate the process, clear both families of endpoint overrides and establish the authorised endpoint before use. This guide cannot substantiate SDK precedence, invent constructor code or certify that explicit-key SDK usage overrides an inherited endpoint.

## Mailbox-only, combined and HTTP preparation

For the released package, the mailbox-only local entry point is `sendmux-mcp-mailbox`. The intended mailbox secret can be supplied as `SENDMUX_API_KEY` from the authorised secret source. First remove inherited per-surface keys: a per-surface credential can override the generic credential in both release and candidate. In this scenario the candidate could select the different inherited `QUBRICS_MAILBOX_API_KEY` instead of the intended generic key; the released package ignores `QUBRICS_` values, but its own inherited `SENDMUX_` per-surface key can cause the same wrong-account selection. Clear both namespaces rather than relying on that release-specific difference.

Mailbox accepts `smx_mbx_` keys or appropriately scoped `smx_agent_` tokens. Management requires `smx_root_`; Sending requires a send-capable `smx_mbx_` key or an owner-approved Sending-resource `smx_agent_` token. An intended mailbox credential does not authorise enabling Management or Sending automatically.

For an authorised combined server, `sendmux-mcp` selects the intended surfaces and receives separate intended credentials through `SENDMUX_MAILBOX_API_KEY`, `SENDMUX_MANAGEMENT_API_KEY` and `SENDMUX_SENDING_API_KEY`. Enable only the approved surfaces, and load each surface's appropriate credential. The guide's all-three-surface example is not permission to enable all three in this scenario. The dedicated `sendmux-mcp-management` and `sendmux-mcp-sending` entry points are alternatives for those single surfaces; `sendmux-mcp-hosted` is not normal local agent setup.

Released 2.2.0 accepts the explicit surface selectors `--surfaces` and `--surface`, in that precedence order, followed by the `SENDMUX_MCP_SURFACES` environment fallback. Candidate SDK `73bedb8` adds `QUBRICS_MCP_SURFACES` ahead of that environment fallback. Clear inherited selectors and set the chosen selector deliberately. The guide documents `--transport http` for local HTTP; it does not name every transport environment variable, so no additional variable names or accepted selector syntaxes are inferred here.

Local stdio runs the server as a child with the intended environment. For local/private HTTP, the guide's listener example uses `--transport http`, host `127.0.0.1`, port `8765` and path `/mcp`. The upstream Sendmux key stays in the server environment. Separately load the intended `SENDMUX_MCP_HTTP_BEARER_TOKEN`; the client sends that token as its MCP `Authorization: Bearer ...` header. That bearer protects the local MCP endpoint and is not the upstream API credential or a hosted OAuth token. Clear inherited bearer, transport, listener selection and upstream endpoint overrides before loading the approved setup. The documented local `/health` response reports selected surfaces; it does not establish upstream identity.

## Identity gate before task tools

After a future authorised setup, refresh or restart the chosen client's MCP server and inspect the surface-appropriate tool discovery. Mailbox-only must not expose Management or Sending tools. Discovery alone is insufficient: use the selected surface's harmless connection check, `mailbox_get_connection`, `management_get_connection` or `sending_get_connection`, as appropriate. These checks require no mailbox selector; the Sending check sends no email.

Compare the returned identity with account A and the intended credential before content access or mutation. For an authorised multi-mailbox grant, use `mailbox_list_granted_mailboxes` and the returned authorised `mailbox_id` to establish the intended mailbox selection before mailbox task tools. Do not assume that a friendly mailbox label or a successful permission grant proves identity.

The unisolated connection identifies B. Stop there: no reading, searching, downloading, sending or account mutation under that connection. Resolve the mismatch with the user, correct the isolated authorised connection and repeat the harmless identity check before task tools. An absent or unverifiable identity is also a stop. A permission grant for B never substitutes for the intended account-A identity.

## Released package, candidate and OAuth resources

The guide's install command resolves the released `sendmux-mcp` 2.2.0 wheel. That wheel supports MCP protocol revisions `2025-11-25` and `2026-07-28` over stdio or Streamable HTTP. Protocol revisions are separate from the package version. The guide does not independently certify the candidate's protocol behaviour.

The released catalogue is 54 tools: 26 Mailbox, 22 Management and 6 Sending, with no `qubrics_` aliases. Its supported environment values are `SENDMUX_` values only. The unpublished candidate SDK `73bedb8` also declares package version 2.2.0, but adds `QUBRICS_` values ahead of legacy fallbacks and has a different catalogue: 150 names, comprising 92 Mailbox, 46 Management and 12 Sending names. Those are 75 unprefixed tools—46 Mailbox, 23 Management and 6 Sending—each with a `qubrics_` alias, for 75 additional names. Matching package versions do not establish that candidate environment support, tools or aliases were published in the wheel. Selected surfaces and approved OAuth grants determine a credential-visible subset; that subset is not the complete catalogue.

This guide keeps `https://mcp.sendmux.ai/mcp` primary for hosted OAuth. The unpublished candidate declares `https://mcp.qubrics.com/mcp` canonical and retains the legacy URL as an alias. That declaration does not prove candidate publication or live endpoint compatibility. Follow the guide's legacy-primary setup rather than silently substituting the candidate URL. For that setup, the client authorisation request, the restriction stored in the Sendmux authorisation-server grant and the issued token audience must each bind exactly to `https://mcp.sendmux.ai/mcp`. Hosted MCP OAuth and REST OAuth are separate resources; a REST bearer is not a hosted MCP bearer. The candidate's alias declaration does not establish that resource or audience values can be mixed.

Dynamic client registration may legitimately omit `resource`; a resource-neutral registration alone is not a reason to re-register. If request fields are correct and `invalid_target` persists, investigate the Sendmux authorisation-server grant restriction rather than assuming the client can edit that grant or that re-registration fixes it. Use the chosen client's documented OAuth UI or commands; commands in another named client's example are not interchangeable.

## Client examples and certification limits

The guide supplies documented configurations for named clients. They certify no tested client compatibility by themselves. A chosen-client check remains separate: verify its configuration shape, secret interpolation or environment forwarding, startup, transport and OAuth behaviour, discovered surfaces and returned upstream identity before task tools. No such verification occurred here.

In VS Code, `.vscode/mcp.json` or the user profile's `mcp.json` uses `servers`, and VS Code resolves the `${input:...}` examples locally. Servers depending on those input variables are not forwarded to Copilot harness sessions. A secret cached locally does not change that boundary. The separately documented Copilot CLI configuration is not evidence that a VS Code input-dependent server reaches a harness session.

This explanation establishes only what the frozen guide says and the preparation it requires. It proves no successful installation, live client connection, account identity, mailbox selection, endpoint availability, candidate publication or end-to-end compatibility. No commands from the guide were executed and no configuration was applied.
