The local examples target installed SDK source `a326bc923fff448470d908bb527afaaa35f6d739`. Its Python distribution is `qubrics-mcp`, with publication still pending. Verify the intended published release before using a package-index install; a source metadata version is not proof of publication.

The five console executables are:

- `qubrics-mcp`: combined local server; select surfaces with `--surfaces`, then `--surface`, then `QUBRICS_MCP_SURFACES` or the `SENDMUX_MCP_SURFACES` fallback.
- `qubrics-mcp-mailbox`: mailbox-only local server.
- `qubrics-mcp-management`: management-only local server.
- `qubrics-mcp-sending`: sending-only local server.
- `qubrics-mcp-hosted`: hosted runtime, rather than the normal local agent setup command.

For Cursor, the guide's mailbox-only stdio entry can go in project `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "qubrics-mailbox": {
      "type": "stdio",
      "command": "qubrics-mcp-mailbox",
      "env": {
        "SENDMUX_API_KEY": "${env:SENDMUX_MBX_KEY}"
      }
    }
  }
}
```

The value above is a literal environment reference, not a credential. Cursor expands `${env:NAME}` from its launch environment. Load the intended mailbox credential from the user's secret store; do not paste it into chat, process arguments or checked-in configuration. Mailbox MCP accepts an `smx_mbx_` key or an appropriately scoped `smx_agent_` token.

That entry uses the retained `SENDMUX_` environment fallback shown in the guide. The candidate source prefers canonical `QUBRICS_` credential names, with `SENDMUX_` compatibility fallbacks. Before loading the intended values for a local child process, clear inherited credential, endpoint, transport, surface and OpenAPI overrides under both families: an inherited per-surface key can otherwise override a generic key.

Executable names do not rename runtime tools. Existing names such as `mailbox_get_connection` and `mailbox_search_message_snippets` remain, and the candidate provides their `qubrics_` aliases, such as `qubrics_mailbox_get_connection`. Discover the connected server's actual tools before choosing one; the candidate catalogue does not prove an installed server exposes them. Mailbox-only discovery should exclude `management_*` and `sending_*` tools. A later authorised connection check must also verify the returned account and mailbox identity before content access.

For hosted OAuth, use exactly `https://mcp.qubrics.com/mcp` as the MCP resource. The authorisation request, stored grant restriction and issued token audience must bind that resource. REST OAuth and hosted MCP OAuth are separate resources; a REST access token must not be reused as the hosted MCP bearer. The guide retains `https://mcp.sendmux.ai/mcp` as a compatibility resource alias, while these examples use the canonical Qubrics resource.

This is configuration guidance only. No server was launched, no authentication or mailbox access occurred, and no package publication or client certification is claimed.
