The supplied historical skill does not document SDK candidate `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`. It targets released `sendmux-mcp` 2.2.0 and separately describes unpublished candidate `73bedb8`. The details below are those historical claims; they do not verify the requested candidate or establish that its source distribution is published.

Its five Python console executables are:

- `sendmux-mcp` — combined local server.
- `sendmux-mcp-mailbox` — mailbox-only local server.
- `sendmux-mcp-management` — management-only local server.
- `sendmux-mcp-sending` — sending-only local server.
- `sendmux-mcp-hosted` — hosted runtime, not the normal local setup command.

Cursor mailbox-only configuration, at `.cursor/mcp.json` or `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sendmux-mailbox": {
      "type": "stdio",
      "command": "sendmux-mcp-mailbox",
      "env": {
        "SENDMUX_API_KEY": "${env:SENDMUX_MBX_KEY}"
      }
    }
  }
}
```

`${env:SENDMUX_MBX_KEY}` is a placeholder reference to Cursor's launch environment, not a literal credential. Load an authorised mailbox `smx_mbx_` key or appropriately scoped `smx_agent_` token from the user's secret store. Do not put its value in checked-in configuration. The skill requires an isolated child process with inherited `QUBRICS_` and `SENDMUX_` credentials and overrides cleared before loading only the intended values; an inherited per-surface key can override a generic key.

For environment compatibility, the released 2.2.0 package uses legacy `SENDMUX_` credential names. The historical `73bedb8` candidate adds `QUBRICS_` credential names ahead of those fallbacks, and specifically adds `QUBRICS_MCP_SURFACES` ahead of `SENDMUX_MCP_SURFACES`. The skill's examples retain `SENDMUX_API_KEY`, `SENDMUX_MAILBOX_API_KEY`, `SENDMUX_MANAGEMENT_API_KEY`, `SENDMUX_SENDING_API_KEY` and `SENDMUX_MCP_HTTP_BEARER_TOKEN`. It does not establish the exact canonical environment-name set for `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`.

Legacy MCP names remain unprefixed, such as `mailbox_get_connection`, `mailbox_search_message_snippets`, `management_create_mailbox` and `sending_send_email`. The historical candidate gives each unprefixed tool a `qubrics_` alias, for example `qubrics_mailbox_get_connection`, `qubrics_mailbox_search_message_snippets`, `qubrics_management_create_mailbox` and `qubrics_sending_send_email`. Its catalogue has 75 unprefixed tools plus 75 aliases: 92 Mailbox, 46 Management and 12 Sending names. The released 2.2.0 wheel instead has 54 tools and no `qubrics_` aliases. Selected surfaces and approved grants restrict visibility; that visible subset is not the whole catalogue. These counts are not verified for the requested candidate.

For hosted OAuth, the historical candidate declares `https://mcp.qubrics.com/mcp` canonical and retains `https://mcp.sendmux.ai/mcp` as an alias, while this skill keeps the legacy URL primary. Hosted MCP OAuth and REST OAuth are separate resources: never reuse a REST access token as a hosted MCP bearer, and do not pass API keys for hosted OAuth. The skill's legacy flow requires the authorisation request, stored grant restriction and token audience to match exactly `https://mcp.sendmux.ai/mcp`; alias support alone does not establish token interchangeability. Dynamic client registration may omit `resource` and still be valid; later resource bindings must be checked separately. A local HTTP bearer, if used, protects the local MCP endpoint and is separate from the upstream API key.

No server launched, authentication performed or mailbox accessed. Exact-candidate compatibility and publication status remain unverified from this historical source.
