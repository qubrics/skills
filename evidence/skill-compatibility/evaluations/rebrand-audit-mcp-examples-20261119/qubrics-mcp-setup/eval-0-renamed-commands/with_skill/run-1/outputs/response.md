For SDK candidate `a326bc923fff448470d908bb527afaaa35f6d739`, the `qubrics-mcp` source declares version 2.2.0 and is **unpublished**. These local examples require an installed build of that candidate; package-index availability must be verified separately.

The five Python console executables are:

- `qubrics-mcp` — combined local server; select surfaces with `--surfaces`, then `--surface`, then `QUBRICS_MCP_SURFACES` or its `SENDMUX_MCP_SURFACES` fallback.
- `qubrics-mcp-mailbox` — mailbox-only local server.
- `qubrics-mcp-management` — management-only local server.
- `qubrics-mcp-sending` — sending-only local server.
- `qubrics-mcp-hosted` — hosted runtime; use the local executables above for normal local agent setup.

For Cursor, put this mailbox-only stdio entry in `.cursor/mcp.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "qubrics-mailbox": {
      "type": "stdio",
      "command": "qubrics-mcp-mailbox",
      "env": {
        "QUBRICS_API_KEY": "${env:QUBRICS_MBX_KEY}"
      }
    }
  }
}
```

`${env:QUBRICS_MBX_KEY}` is a placeholder reference to Cursor's launch environment. Load the intended `smx_mbx_` key or appropriately scoped `smx_agent_` token from the user's secret store; do not put a literal credential in the file. `QUBRICS_MBX_KEY` is the example's launch-environment variable, mapped to the server setting `QUBRICS_API_KEY`.

Candidate source prefers canonical `QUBRICS_` credential names and accepts legacy `SENDMUX_` fallbacks:

| Canonical name | Legacy fallback |
| --- | --- |
| `QUBRICS_API_KEY` | `SENDMUX_API_KEY` |
| `QUBRICS_MAILBOX_API_KEY` | `SENDMUX_MAILBOX_API_KEY` |
| `QUBRICS_MANAGEMENT_API_KEY` | `SENDMUX_MANAGEMENT_API_KEY` |
| `QUBRICS_SENDING_API_KEY` | `SENDMUX_SENDING_API_KEY` |
| `QUBRICS_MCP_SURFACES` | `SENDMUX_MCP_SURFACES` |
| `QUBRICS_MCP_HTTP_BEARER_TOKEN` | `SENDMUX_MCP_HTTP_BEARER_TOKEN` |

An inherited per-surface key can override a generic key. Before any future launch, use an isolated child process, clear inherited credentials and API-base-URL, transport, surface-selection, OpenAPI-input and unauthenticated-HTTP overrides under both prefixes, then supply only intended settings. The local HTTP bearer protects the local/private MCP endpoint; it is separate from the upstream Qubrics API credential.

Legacy unprefixed MCP tool names remain available in the candidate. Every unprefixed tool also has a `qubrics_` alias, for example:

| Existing name | Alias |
| --- | --- |
| `mailbox_get_connection` | `qubrics_mailbox_get_connection` |
| `mailbox_search_message_snippets` | `qubrics_mailbox_search_message_snippets` |
| `management_get_connection` | `qubrics_management_get_connection` |
| `sending_get_connection` | `qubrics_sending_get_connection` |

The candidate catalogue has 75 unprefixed tools and 75 aliases: **150 tool names**, comprising 92 Mailbox, 46 Management and 12 Sending names. The released `sendmux-mcp` 2.2.0 wheel is separate: old `sendmux-mcp*` executables, 54 tools (26 Mailbox, 22 Management, 6 Sending), and no `qubrics_` aliases. A credential-visible subset is not the full catalogue; discover the actual connected server's tools before relying on candidate capabilities.

Hosted OAuth uses canonical resource **`https://mcp.qubrics.com/mcp`**. Source retains `https://mcp.sendmux.ai/mcp` as a compatibility alias; new hosted examples use the Qubrics resource. Hosted MCP OAuth and REST OAuth have separate resources: do not reuse a REST access token as a hosted MCP bearer or send an API key to the hosted OAuth endpoint. A resource-neutral dynamic client registration may omit `resource`; the later authorisation request, Qubrics-owned approved grant restriction and issued token audience must each bind to the exact canonical MCP resource. Hosted tool visibility depends on the approved grant. If correct request fields still produce `invalid_target`, investigate the authorisation-server grant state rather than assuming registration must be repeated.

Source: canonical `skills/qubrics-mcp-setup/SKILL.md`, sections “Install”, “Choose A Setup”, “Candidate source surface map” and “Cursor JSON”.

No server launch, authentication, mailbox access or publication performed. Cursor runtime compatibility and package-index availability were not checked; candidate source remains unpublished.
