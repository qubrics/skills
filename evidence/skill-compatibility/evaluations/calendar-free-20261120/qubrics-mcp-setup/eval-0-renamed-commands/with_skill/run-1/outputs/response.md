For SDK source `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`, the skill documents these renamed local stdio commands:

```bash
qubrics-mcp-mailbox
qubrics-mcp --surfaces mailbox,management,sending
```

`qubrics-mcp-mailbox` selects Mailbox only. Supply an `smx_mbx_` key or appropriately scoped `smx_agent_` token through `QUBRICS_API_KEY` in its environment. The combined command selects all three surfaces; supply `QUBRICS_MAILBOX_API_KEY`, `QUBRICS_MANAGEMENT_API_KEY` and `QUBRICS_SENDING_API_KEY` separately. Management needs an `smx_root_` key; Sending needs a send-capable `smx_mbx_` key or owner-approved Sending-resource `smx_agent_` token.

For the combined command, selection precedence is `--surfaces`, then `--surface`, then `QUBRICS_MCP_SURFACES` or its `SENDMUX_MCP_SURFACES` fallback. A per-surface key can override the generic key. Before any future launch, use an isolated child process, clear inherited `QUBRICS_` and `SENDMUX_` credentials, endpoint, transport, surface and OpenAPI overrides described by the skill, and load only the intended values from the user's secret store. Keep secrets out of arguments and output.

Cursor JSON using the mailbox-only command and the exact literal secret placeholder requested:

```json
{
  "mcpServers": {
    "qubrics-mailbox": {
      "type": "stdio",
      "command": "qubrics-mcp-mailbox",
      "env": {
        "QUBRICS_API_KEY": "${QUBRICS_API_KEY}"
      }
    }
  }
}
```

Here `${QUBRICS_API_KEY}` is a placeholder, not a key. The skill documents Cursor's environment interpolation as `${env:NAME}`; for a runnable Cursor configuration reading that launch-environment variable, use `${env:QUBRICS_API_KEY}`. Cursor configuration belongs in `.cursor/mcp.json` or `~/.cursor/mcp.json`.

Preserve MCP runtime tool selectors such as `mailbox_get_connection`, `management_get_connection`, `sending_get_connection` and `mailbox_search_message_snippets`; renaming the package does not require renaming those selectors. The candidate source also documents `qubrics_` aliases. A client needing a qualified name can use `qubrics-mailbox:mailbox_search_message_snippets`. Discover the connected server's actual tools before choosing one.

The skill identifies candidate package `qubrics-mcp` version `3.0.0` as unpublished and publication as pending. Before a package-index install, check that the intended release is actually published and supplies the renamed commands and expected source features. An installed build of the stated SDK source is the other documented prerequisite. The skill's separate `sendmux-mcp` `2.2.0` wheel has old executable names and a different catalogue; do not assume it supplies the candidate commands or aliases. I have not checked publication or an installed package, launched a server, authenticated, or accessed content.
