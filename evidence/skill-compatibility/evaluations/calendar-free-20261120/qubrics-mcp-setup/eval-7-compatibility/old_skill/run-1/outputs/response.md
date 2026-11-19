The supplied guide identifies MCP protocol revisions `2025-11-25` and `2026-07-28` over stdio or Streamable HTTP for the released `sendmux-mcp` 2.2.0 wheel. These are protocol revisions; `2.2.0` is the package version, a separate identifier. The guide does not independently establish a renamed Qubrics package release.

Its released catalogue is 54 tools: 26 Mailbox, 22 Management and 6 Sending, with no `qubrics_` aliases. Candidate SDK `73bedb8` also declares package version 2.2.0 but has 150 tool names: 92 Mailbox, 46 Management and 12 Sending. Those are 75 unprefixed tools plus their 75 `qubrics_` aliases. The matching package version does not prove that candidate catalogue was published.

A customer should not expect the whole catalogue after OAuth. Selected server surfaces and the approved OAuth grant determine the visible subset. A credential-visible subset is not the package's complete catalogue. For a multi-mailbox grant, the guide says to call `mailbox_list_granted_mailboxes` first and use a returned `mailbox_id` when targeting mailbox tools. Discovery alone does not validate the upstream credential; the relevant connection check and returned identity must be verified before content access.

Clients named in the guide are documented configuration examples, not automatically certified compatible. Verify the chosen client separately.

No package publication, client certification or live OAuth visibility checked.
