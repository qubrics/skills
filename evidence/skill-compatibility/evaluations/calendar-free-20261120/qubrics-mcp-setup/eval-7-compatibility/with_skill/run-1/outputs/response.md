The skill describes candidate `qubrics-mcp` source at SDK commit `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577` as supporting MCP protocol revisions `2025-11-25` and `2026-07-28`, over stdio or Streamable HTTP. Those date-labelled revisions identify the MCP protocol; `3.0.0` identifies the Python package version. They are separate version schemes. The skill marks that candidate source as unpublished; this is not a verification of an installed or published package.

Keep these catalogues distinct:

| Source described by the skill | Full catalogue |
| --- | --- |
| Candidate `qubrics-mcp` `3.0.0` | 130 tool names: 72 Mailbox, 46 Management, 12 Sending. Its 65 unprefixed tools each have a `qubrics_` alias. |
| Separate `sendmux-mcp` `2.2.0` wheel | 54 tools: 26 Mailbox, 22 Management, 6 Sending; old executable names and no `qubrics_` aliases. |

A customer should not expect the whole catalogue after OAuth. Hosted visibility depends on the approved OAuth grant; selected server surfaces also limit what is exposed. A credential-visible subset is not the package's full catalogue. Use the connected server's public tool discovery to establish available tools; candidate-source documentation does not establish support in the customer's installed server. For a multi-mailbox grant, use `mailbox_list_granted_mailboxes` and select a returned `mailbox_id` when later targeting a mailbox.

Clients named in the setup guide have documented configuration examples, not automatic compatibility certification. Verify the chosen client separately. I have not connected, authenticated, checked package publication, or certified any client.
