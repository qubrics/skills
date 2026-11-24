# Management MCP DNS example compatibility

Compare SDK `551d3e46934c2f605a25ccc0ea072f61c8ed2a2e` with `3d646e88198cc6166c36d0f165dd68d8a84c536b` against Skills main `48f65b83c9fd4c81fed6e36274b3a76e788816ed` and its existing published lane. App and Sending producer inputs match across the comparison.

The runtime snapshot updates the DNS TXT examples from `_sendmux.acme.com` to `_qubrics.acme.com` and from `sendmux-verify=team_abc123` to `qubrics-verify=team_abc123`. The regenerated MCP contract repeats those two example changes across 60 fields in domain create, get and list and their aliases. Apart from provenance, restoring those two example strings yields the same parsed contract. Tool availability, schemas, authentication and transport match the baseline.

- Published `sendmux-management` teaches operators to fetch the actual zone-file records and verify the domain. Its key, command and ID requirements still apply.
- Proposed `qubrics-management` uses the same domain body and idempotency key, fetches records by public ID and verifies through the same tool. The updated examples require no new step.
- Published `sendmux-mcp-setup` describes the legacy released wheel and an identified historical candidate. Its selected domain tool has the same inputs, discovery and credentials.
- Proposed `qubrics-mcp-setup` uses the same 130-tool catalogue, connection checks and CLI/SDK fallback. The selected domain tool's response examples leave setup instructions applicable.

Independent AI source reviewer: OpenAI Codex /root/skills_compat_review. The reviewer compared the immutable SDK contracts and selected skill sources. None of the four skill directories uses the changed literals. The review confirmed the four exact digest changes and that the existing instructions apply to the updated examples.

Sources: [runtime snapshot diff](https://github.com/qubrics/qubrics-sdk/compare/551d3e46934c2f605a25ccc0ea072f61c8ed2a2e...3d646e88198cc6166c36d0f165dd68d8a84c536b) and [upstream TXT examples](https://github.com/qubrics/docs/commit/8805bfb41b34a8842f5e67d79d97055410587544).
