For SDK candidate `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`, the skill lists all five Python console executables:

- `qubrics-mcp`: combined local server. Surface-selection precedence is `--surfaces`, then `--surface`, then `QUBRICS_MCP_SURFACES` or its `SENDMUX_MCP_SURFACES` fallback.
- `qubrics-mcp-mailbox`: mailbox-only local server.
- `qubrics-mcp-management`: management-only local server.
- `qubrics-mcp-sending`: sending-only local server.
- `qubrics-mcp-hosted`: hosted runtime; use the local commands above for normal agent setup.

Cursor local mailbox-only configuration, using an environment reference rather than a real credential:

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

Cursor expands `${env:QUBRICS_MBX_KEY}` from its launch environment. Load that value from the user's secret store; Mailbox accepts an `smx_mbx_` key or appropriately scoped `smx_agent_` token. Do not paste a key into the configuration. Cursor uses `.cursor/mcp.json` for project configuration or `~/.cursor/mcp.json` globally.

The candidate Python MCP source prefers canonical `QUBRICS_` credential names and accepts legacy `SENDMUX_` fallbacks. Local examples use `QUBRICS_API_KEY`; combined examples use `QUBRICS_MAILBOX_API_KEY`, `QUBRICS_MANAGEMENT_API_KEY` and `QUBRICS_SENDING_API_KEY`. An inherited per-surface credential can override a generic key. Before any future launch, isolate the child process, clear inherited credentials, bearer tokens, API base-URL, transport, surface-selection and OpenAPI overrides under both prefixes as specified by the skill, and load only intended values from the secret store. A local HTTP bearer protects the MCP endpoint and is separate from the upstream Qubrics API key.

Legacy unprefixed MCP runtime selectors remain usable: for example, `mailbox_search_message_snippets`, `management_create_mailbox` and `sending_send_email`. Each candidate unprefixed tool also has a `qubrics_` alias, giving `qubrics_mailbox_search_message_snippets`, `qubrics_management_create_mailbox` and `qubrics_sending_send_email` for those examples. The candidate catalogue has 65 unprefixed tools and 65 aliases, totalling 130 names. Discover the actual connected server's tools before choosing a selector; the separate old `sendmux-mcp` `2.2.0` wheel described by the skill has no `qubrics_` aliases.

For hosted OAuth, the canonical MCP endpoint and resource is `https://mcp.qubrics.com/mcp`; the skill records `https://mcp.sendmux.ai/mcp` as a compatibility alias. Hosted setup uses OAuth sign-in, not API keys. MCP OAuth and REST OAuth are separate resources: do not reuse a REST access token as a hosted MCP bearer. The client authorisation request must target the canonical MCP resource, the approved grant must retain that exact restriction, and the token must have that exact audience. Dynamic client registration may omit `resource` without making registration invalid. OAuth grants limit visible tools, so the full source catalogue is not a promise of access.

The skill marks candidate `qubrics-mcp` source version `3.0.0` as unpublished. Local setup requires an installed build of that exact candidate, or verification that the intended package-index release is published before relying on it. I have not verified publication, launched a server, authenticated, or accessed a mailbox.
