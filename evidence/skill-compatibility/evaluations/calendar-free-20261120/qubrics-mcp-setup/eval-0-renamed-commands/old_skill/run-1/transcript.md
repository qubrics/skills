# Historical skill evaluation transcript

## Exact prompt

I am testing SDK source ff61155fb25c77fa7794c68a4b9f3a6eaaba5577 after the Qubrics Python namespace rename. Explain local mailbox-only and combined MCP stdio commands and give Cursor JSON using the mailbox-only command and the literal secret placeholder ${QUBRICS_API_KEY}. Preserve MCP runtime tool selectors and explain what package publication must be checked. Do not launch, authenticate or access content.

## Immutable skill source

- Repository: `/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-skills34`
- Commit: `9d8059b10111943ce08860217a27222f43507686`
- File: `skills/sendmux-mcp-setup/SKILL.md`
- SHA256 of actual source bytes: `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`
- Retrieval: `git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md`
- Hash measurement: `git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md | shasum -a 256`

## Evaluation steps

1. Read the Skills checkout's `AGENTS.md` for repository instructions.
2. Retrieved and read the assigned immutable setup skill with `git show`, including local stdio, Cursor, catalogue and verification sections.
3. Measured the SHA256 of the retrieved source bytes with the command above.
4. Authored the response below using only that skill as product knowledge. Did not inspect SDK source, proposed/final skills, expectations, assertions or historical grader artifacts.
5. Wrote this transcript and `outputs/response.md` using `apply_patch`. Did not launch an MCP server, authenticate, access account content, install packages, grade the response or generate acceptance artifacts.

## Actual response

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
