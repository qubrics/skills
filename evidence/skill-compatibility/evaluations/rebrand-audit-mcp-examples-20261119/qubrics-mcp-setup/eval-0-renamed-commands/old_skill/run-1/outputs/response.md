The immutable skill does not document SDK candidate `a326bc923fff448470d908bb527afaaa35f6d739`. It documents released `sendmux-mcp` 2.2.0 and candidate `73bedb8`, so I cannot verify executable names or compatibility for your exact candidate from this source alone.

Its five documented Python console executables are:

- `sendmux-mcp` — combined local server.
- `sendmux-mcp-mailbox` — mailbox-only local server.
- `sendmux-mcp-management` — management-only local server.
- `sendmux-mcp-sending` — sending-only local server.
- `sendmux-mcp-hosted` — hosted runtime, rather than normal local agent setup.

For Cursor, the historical skill gives this local mailbox-only configuration in project `.cursor/mcp.json` or global `~/.cursor/mcp.json`:

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

`${env:SENDMUX_MBX_KEY}` is an environment reference, not a credential value. The skill instructs loading the intended credential from a secret store into Cursor's launch environment. It documents `smx_mbx_` keys or appropriately scoped `smx_agent_` tokens for local Mailbox MCP. This configuration is the historical skill's example; its suitability for the requested exact candidate remains unverified.

For environment compatibility, the skill says released 2.2.0 uses legacy `SENDMUX_` credential names, while candidate `73bedb8` adds canonical `QUBRICS_` names before those fallbacks. It explicitly names `QUBRICS_MCP_SURFACES` before `SENDMUX_MCP_SURFACES`; combined-server selection also supports `--surfaces`, then `--surface`. An inherited per-surface key can override a generic key, so isolate the child process and clear inherited credentials, bearer tokens, base-URL, transport, surface-selection and OpenAPI overrides under both prefixes before loading intended values. Do not assume that a generic environment value neutralises an inherited per-surface credential.

Legacy MCP tool names are unprefixed names such as `mailbox_get_connection`, `mailbox_search_message_snippets`, `management_create_domain` and `sending_send_email`. The historical candidate catalogue gives every unprefixed tool a `qubrics_` alias: for example, `qubrics_mailbox_get_connection`, `qubrics_mailbox_search_message_snippets`, `qubrics_management_create_domain` and `qubrics_sending_send_email`. Those are tool aliases, distinct from console executables and environment names. The skill describes the released wheel as 54 tools with no `qubrics_` aliases and candidate `73bedb8` as 75 unprefixed tools plus 75 aliases; it does not establish the requested candidate's catalogue.

For hosted OAuth, the historical candidate declares canonical resource `https://mcp.qubrics.com/mcp` and retains `https://mcp.sendmux.ai/mcp` as an alias, although this guide keeps the legacy URL primary. Hosted MCP OAuth and REST OAuth have separate resources: do not reuse a REST access token as the hosted MCP bearer. For the legacy endpoint documented in this guide, the authorisation request, approved grant restriction and token audience must all bind exactly to `https://mcp.sendmux.ai/mcp`; an alias does not establish interchangeable token audiences. Dynamic client registration may omit `resource` and remain valid, but later resource bindings still need to match. The authorisation server owns the grant restriction. Local HTTP bearer protection is separate from the upstream API credential and hosted OAuth.

Source: `skills/sendmux-mcp-setup/SKILL.md` at immutable revision `9d8059b10111943ce08860217a27222f43507686`, sections “Boundaries”, “Install”, “Choose A Setup”, “Candidate source surface map” and “Cursor JSON”.

No server was launched, authentication attempted or mailbox accessed. Exact-candidate compatibility and publication status were not checked; the historical skill describes its candidate as unpublished, and I make no claim that the requested source distribution is already published.
