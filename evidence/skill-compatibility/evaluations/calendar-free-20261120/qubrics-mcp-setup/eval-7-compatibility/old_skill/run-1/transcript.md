# Historical skill evaluation transcript

## Exact prompt

For a compatibility note, what protocol revisions can the Qubrics MCP package speak, and how is that different from its package version? Our setup guide lists mailbox, management, and sending tools, but a customer only sees some after OAuth—should they expect the whole catalogue? Also, are the clients named in the setup guide automatically certified?

## Immutable skill source

- Repository: `/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-skills34`
- Commit: `9d8059b10111943ce08860217a27222f43507686`
- File: `skills/sendmux-mcp-setup/SKILL.md`
- SHA256 of actual source bytes: `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`
- Retrieval: `git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md`
- Hash measurement: `git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md | shasum -a 256`

## Evaluation steps

1. Read the Skills checkout's `AGENTS.md` for repository instructions.
2. Retrieved and read the assigned immutable setup skill with `git show`, including install, candidate catalogue, OAuth visibility and client compatibility notes.
3. Measured the SHA256 of the retrieved source bytes with the command above.
4. Authored the response below using only that skill as product knowledge. Did not inspect SDK source, proposed/final skills, expectations, assertions or historical grader artifacts.
5. Wrote this transcript and `outputs/response.md` using `apply_patch`. Did not check publication, launch a client, authenticate, access account content, grade the response or generate acceptance artifacts.

## Actual response

The supplied guide identifies MCP protocol revisions `2025-11-25` and `2026-07-28` over stdio or Streamable HTTP for the released `sendmux-mcp` 2.2.0 wheel. These are protocol revisions; `2.2.0` is the package version, a separate identifier. The guide does not independently establish a renamed Qubrics package release.

Its released catalogue is 54 tools: 26 Mailbox, 22 Management and 6 Sending, with no `qubrics_` aliases. Candidate SDK `73bedb8` also declares package version 2.2.0 but has 150 tool names: 92 Mailbox, 46 Management and 12 Sending. Those are 75 unprefixed tools plus their 75 `qubrics_` aliases. The matching package version does not prove that candidate catalogue was published.

A customer should not expect the whole catalogue after OAuth. Selected server surfaces and the approved OAuth grant determine the visible subset. A credential-visible subset is not the package's complete catalogue. For a multi-mailbox grant, the guide says to call `mailbox_list_granted_mailboxes` first and use a returned `mailbox_id` when targeting mailbox tools. Discovery alone does not validate the upstream credential; the relevant connection check and returned identity must be verified before content access.

Clients named in the guide are documented configuration examples, not automatically certified compatible. Verify the chosen client separately.

No package publication, client certification or live OAuth visibility checked.
