# Offline skill evaluation transcript

## Exact prompt

Using this MCP setup skill for exact SDK candidate ff61155fb25c77fa7794c68a4b9f3a6eaaba5577, name all five Python console executables and give a Cursor local mailbox-only configuration with a placeholder environment credential. Explain canonical versus legacy environment names, legacy MCP tool names and their qubrics_ aliases, and the hosted OAuth resource boundary. Do not launch a server, authenticate, access a mailbox or claim that the source distribution is already published.

## Immutable source

- Skills commit: `6751d3112af4fc0e78a223ba94cdbcea53bbdfe3`
- Canonical file: `skills/qubrics-mcp-setup/SKILL.md`
- Source SHA256: `ecabd5c26f1ac9b9ccf06f896f18788678761f63a9c2d5d51ca33bee78c87a3f`
- Read with `git show 6751d3112af4fc0e78a223ba94cdbcea53bbdfe3:skills/qubrics-mcp-setup/SKILL.md`; reread relevant sections through `rtk proxy git show` for this additional case.
- Hash measured again with `git show 6751d3112af4fc0e78a223ba94cdbcea53bbdfe3:skills/qubrics-mcp-setup/SKILL.md | shasum -a 256`.

## Evaluation steps

1. Reused the previously read Skills worktree `AGENTS.md` and reread the immutable canonical MCP setup skill. Used only that skill as substantive knowledge for this answer. Did not read expected outputs, assertions, historical grader artifacts or an alternate version of this skill.
2. Checked that this assigned run directory did not already exist. Applied the exact prompt to all five console executables, the Cursor environment-reference example, canonical and fallback environment names, tool aliases and the hosted OAuth resource boundary.
3. Wrote the actual response below to the new `outputs/response.md`. Did not overwrite a previous run. Did not edit skill source, install packages, launch a server or client, authenticate, access a mailbox, call installed provider tools, or verify publication. No grade or receipt was created.

## Actual response

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
