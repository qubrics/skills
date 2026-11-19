The supplied setup guide targets released `sendmux-mcp` 2.2.0 and candidate SDK `73bedb8`; it does not establish the renamed commands for SDK source `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`. Its documented local stdio commands are:

Mailbox only:

```bash
SENDMUX_API_KEY="$SENDMUX_MBX_KEY" sendmux-mcp-mailbox
```

Combined Mailbox, Management and Sending:

```bash
SENDMUX_MCP_SURFACES=mailbox,management,sending \
SENDMUX_MAILBOX_API_KEY="$SENDMUX_MBX_KEY" \
SENDMUX_MANAGEMENT_API_KEY="$SENDMUX_ROOT_KEY" \
SENDMUX_SENDING_API_KEY="$SENDMUX_MBX_KEY" \
sendmux-mcp
```

The combined server also accepts `--surfaces mailbox,management,sending`; the guide gives selection precedence as `--surfaces`, then `--surface`, then `SENDMUX_MCP_SURFACES`. Candidate `73bedb8` adds `QUBRICS_MCP_SURFACES` before that environment fallback. Mailbox uses an `smx_mbx_` key or scoped `smx_agent_` token; Management requires `smx_root_`; Sending needs a send-capable mailbox key or owner-approved Sending-resource agent token.

Cursor JSON using the guide's mailbox-only command and your exact literal secret placeholder:

```json
{
  "mcpServers": {
    "sendmux-mailbox": {
      "type": "stdio",
      "command": "sendmux-mcp-mailbox",
      "env": {
        "SENDMUX_API_KEY": "${QUBRICS_API_KEY}"
      }
    }
  }
}
```

The placeholder above is deliberately literal. The guide documents Cursor interpolation as `${env:NAME}`, so it does not establish that `${QUBRICS_API_KEY}` expands in Cursor. Its documented interpolation form for that launch-environment variable would be `${env:QUBRICS_API_KEY}`. Cursor project configuration belongs in `.cursor/mcp.json`, or global configuration in `~/.cursor/mcp.json`.

Preserve runtime tool selectors such as `mailbox_get_connection`, `management_get_connection`, `sending_get_connection`, and `mailbox_search_message_snippets`; a Python namespace rename alone does not supply different selectors in this guide. The guide's qualified example is `sendmux-mailbox:mailbox_search_message_snippets`.

Check the actual published package, its console scripts and tool catalogue before claiming the renamed source is available through package installation. The guide says released `sendmux-mcp` 2.2.0 and candidate `73bedb8` both declare 2.2.0 despite different catalogues; a matching version does not establish publication of candidate features. Its documented install is `pip install sendmux-mcp`, not a verified renamed-package install.

No launch, authentication or content access performed. SDK `ff61155` commands and actual package publication remain unchecked.
