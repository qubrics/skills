# Offline skill evaluation transcript

## Exact prompt

For a compatibility note, what protocol revisions can the Qubrics MCP package speak, and how is that different from its package version? Our setup guide lists mailbox, management, and sending tools, but a customer only sees some after OAuth—should they expect the whole catalogue? Also, are the clients named in the setup guide automatically certified?

## Immutable source

- Skills commit: `6751d3112af4fc0e78a223ba94cdbcea53bbdfe3`
- Canonical file: `skills/qubrics-mcp-setup/SKILL.md`
- Source SHA256: `ecabd5c26f1ac9b9ccf06f896f18788678761f63a9c2d5d51ca33bee78c87a3f`
- Read with `git show 6751d3112af4fc0e78a223ba94cdbcea53bbdfe3:skills/qubrics-mcp-setup/SKILL.md`.
- Hash measured with `git show 6751d3112af4fc0e78a223ba94cdbcea53bbdfe3:skills/qubrics-mcp-setup/SKILL.md | shasum -a 256`.

## Evaluation steps

1. Read the Skills worktree's `AGENTS.md` and the immutable canonical skill file. Used only that skill as substantive knowledge for this answer.
2. Applied the exact prompt to the skill's protocol revisions, package version, source-versus-wheel catalogues, OAuth visibility and client-certification boundary. Did not read expected outputs, assertions, historical grader artifacts or an alternate version of this skill.
3. Wrote the actual response below to `outputs/response.md`. Did not install packages, launch a server or client, authenticate, access account content, or call installed provider tools. Did not verify publication or client certification.
4. Mechanically checked that this transcript's response equals `outputs/response.md`. This was a file-consistency check, not a grade.

## Actual response

The skill describes candidate `qubrics-mcp` source at SDK commit `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577` as supporting MCP protocol revisions `2025-11-25` and `2026-07-28`, over stdio or Streamable HTTP. Those date-labelled revisions identify the MCP protocol; `3.0.0` identifies the Python package version. They are separate version schemes. The skill marks that candidate source as unpublished; this is not a verification of an installed or published package.

Keep these catalogues distinct:

| Source described by the skill | Full catalogue |
| --- | --- |
| Candidate `qubrics-mcp` `3.0.0` | 130 tool names: 72 Mailbox, 46 Management, 12 Sending. Its 65 unprefixed tools each have a `qubrics_` alias. |
| Separate `sendmux-mcp` `2.2.0` wheel | 54 tools: 26 Mailbox, 22 Management, 6 Sending; old executable names and no `qubrics_` aliases. |

A customer should not expect the whole catalogue after OAuth. Hosted visibility depends on the approved OAuth grant; selected server surfaces also limit what is exposed. A credential-visible subset is not the package's full catalogue. Use the connected server's public tool discovery to establish available tools; candidate-source documentation does not establish support in the customer's installed server. For a multi-mailbox grant, use `mailbox_list_granted_mailboxes` and select a returned `mailbox_id` when later targeting a mailbox.

Clients named in the setup guide have documented configuration examples, not automatic compatibility certification. Verify the chosen client separately. I have not connected, authenticated, checked package publication, or certified any client.
