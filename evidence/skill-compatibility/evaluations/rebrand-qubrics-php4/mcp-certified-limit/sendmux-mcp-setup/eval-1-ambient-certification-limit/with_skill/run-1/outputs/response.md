Preparation only. I have not accessed keys, started servers or clients, made MCP or API calls, inspected live state, sent mail or published anything. This explanation uses only the complete `sendmux-mcp-setup` guide.

Isolate both server and client environments

The intended `SENDMUX_API_KEY` does not establish which credential the server will use. `QUBRICS_` environment values take precedence over their `SENDMUX_` fallbacks, and a per-surface key can override a generic key. In the fixture, the different inherited `QUBRICS_API_KEY` and `QUBRICS_MAILBOX_API_KEY` can therefore interfere with the intended `mbx_support` credential. Do not start either example in that parent environment.

For later authorised setup, start local MCP examples and their clients in isolated child processes. Before loading anything, clear inherited generic API keys, Mailbox/Management/Sending per-surface keys, HTTP bearer tokens and API base-URL overrides under both `QUBRICS_` and `SENDMUX_`. Clear the whole relevant family, not merely the two variables named in the fixture. Then load only the intended values from the user's secret store. Preserve the parent environment and keep every credential out of arguments, displayed commands, logs and output. Do not ask for pasted secrets or write raw keys into checked-in MCP configuration.

For a Mailbox-only stdio preparation, the guide's `sendmux-mcp-mailbox` example receives the intended mailbox credential through `SENDMUX_API_KEY` after all inherited per-surface and competing namespace values have been removed. Mailbox accepts an `smx_mbx_` key or an appropriately scoped `smx_agent_` token. A selected client's documented configuration may instead forward the intended `SENDMUX_MAILBOX_API_KEY`; ensure it forwards the exact intended environment variable rather than leaving an old per-surface override in place. Do not populate extra surfaces merely to make setup work.

For combined stdio, prepare `sendmux-mcp` with explicit `mailbox,management,sending` surfaces through `--surfaces` or `SENDMUX_MCP_SURFACES`. Load only the intended per-surface secrets into `SENDMUX_MAILBOX_API_KEY`, `SENDMUX_MANAGEMENT_API_KEY` and `SENDMUX_SENDING_API_KEY`, with the competing `QUBRICS_` family absent. Management requires `smx_root_`; Sending requires a send-capable `smx_mbx_` key or an owner-approved Sending-resource `smx_agent_` token. A mailbox credential alone does not authorise Management or establish Sending approval. Leave generic keys unset when preparing these explicit per-surface credentials.

For local/private HTTP, the upstream Sendmux key belongs in the server environment. The client separately supplies `Authorization: Bearer ...` from the intended `SENDMUX_MCP_HTTP_BEARER_TOKEN`. That bearer protects the local MCP endpoint; it is not the upstream API key. Clear competing bearer values in both namespaces before loading it, and clear unapproved API base-URL overrides before choosing the authorised upstream endpoint. Use the documented local/private endpoint configuration for the selected client; do not repurpose this bearer setup for hosted OAuth.

No client was selected, so I am not emitting a generic JSON configuration. The guide's client-specific configuration shape, interpolation rules, environment forwarding and authentication UI or command must be followed for the actual client. A literal variable reference is useful only where that client documents expansion; it must not silently replace the intended credential with an unexpanded string. Credentials remain in the secret-backed environment, never expanded into process arguments.

Versions, catalogues and visible tools

The package version and the MCP protocol revision are different identifiers. The guide uses released `sendmux-mcp` package 2.1.3 as a historical catalogue reference and states MCP protocol revisions `2025-11-25` and `2026-07-28` over stdio or Streamable HTTP. Its unpublished candidate source declares package version 2.2.0.

| Catalogue | Mailbox | Management | Sending | Total |
| --- | ---: | ---: | ---: | ---: |
| Released 2.1.3 | 26 | 22 | 6 | 54 tools |
| Unpublished candidate 2.2.0 | 92 | 46 | 12 | 150 tool names |
| Candidate unprefixed tools | 46 | 23 | 6 | 75 tools |
| Candidate `qubrics_` aliases | 46 | 23 | 6 | 75 aliases |

Each of the candidate's 75 unprefixed tools has a `qubrics_` alias; 150 names do not mean 150 distinct unprefixed operations. Selected surfaces and approved OAuth grants control the subset a credential can see. A credential-visible subset is not the full catalogue, and discovering that subset does not validate the upstream credential or certify the client.

Resource and audience binding

The guide keeps `https://mcp.sendmux.ai/mcp` primary for hosted remote OAuth. The unpublished candidate declares `https://mcp.qubrics.com/mcp` canonical and retains the legacy URL as an alias. Those statements describe the guide and candidate respectively; they do not prove a candidate deployment or a newly published package.

For the guide's legacy-primary hosted OAuth flow, verify each binding separately: the client's authorisation request targets exactly `https://mcp.sendmux.ai/mcp`, the Sendmux authorisation server's approved grant stores that exact resource restriction, and the issued token has that exact audience. Do not silently substitute the candidate canonical URL or assume an alias changes a token's audience. Resource-neutral dynamic client registration can validly omit `resource`; that alone is not a reason to re-register. Hosted MCP and REST OAuth have separate resources, so a REST access token must not be reused as the hosted MCP bearer.

What the client examples establish

Documented examples establish configuration approaches and the intended client-specific fields. They do not establish certified client compatibility. The chosen client still needs separate verification of its applicable transport, configuration parsing, environment interpolation/forwarding and authentication flow against the actual server/package and authorised setup.

When real verification is authorised, refresh or restart the client's MCP servers, confirm visible tools match the selected surfaces and approved grant, then use the selected surface's harmless connection check: `mailbox_get_connection`, `management_get_connection` or `sending_get_connection`. Those checks require no mailbox selector and send no email. Tool discovery alone is insufficient to validate the upstream credential. These are future verification steps, not calls performed here.

This preparation proves no live connection, actual `mbx_support` identity, client certification, protocol negotiation, deployed catalogue or publication status. Source version declarations, catalogue counts and documented client examples cannot establish those outcomes.

Not checked: actual client, installed or published package, credentials, upstream identity and live compatibility. Risk: inherited precedence or unsupported client configuration can select the wrong credential or prevent connection; this preparation provides no live assurance.
