# Calendar API compatibility review

Independent reviewer: `/root/pr48_compat_review_default`

Verdict: **PASS** for all 11 `qubrics-*` skills in this release candidate.

## Exact source tuple

- App: `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e` (tree `b95bd0a45111209d40cfa21194c72a66b8da3efa`)
- Sending: `2f4226655efc05f109b5feda50ed2ca1570aea91`
- SDK: `a326bc923fff448470d908bb527afaaa35f6d739`
- App OpenAPI SHA-256: `1d49dc00e00b86837041b76cdb0676d96c68317ec74354d6a5acf4cf2ff0e73c`
- App policy SHA-256: `86d3bfb49737e1eea40ee12468fba1c4a281e9dbfb383d95e14e141272e37e90`
- App export receipt SHA-256: `9d0562c356f7774c02d0ff864a01cba31cd65c50f522a75949586125122bb76f`

## Substantive delta

The prior blocker is closed. Hosted MCP now maps `mailboxDeleteCalendar` to `mailbox_delete_calendar` with `calendar.write` at App `src/server/mcp/proxy.ts:175-180`, and the registry contract covers it at `tests/unit/server/mcp-proxy.test.ts:188-205`. Registry construction derives the DELETE method and path from OpenAPI and fails startup when an operation is absent at `src/server/mcp/proxy.ts:616-638`.

The reviewed OpenAPI retains `DELETE /mailbox/calendars/{calendar_id}`, exact `If-Match`, empty-only deletion and `calendar.write` at `src/app/api/v1/_lib/schemas/mailbox-calendar.ts:267-289`. The service rejects missing, wildcard or stale ETags, non-empty calendars and unknown acknowledgements at `src/server/api-v1/mailbox-calendar.ts:367-406`.

`qubrics-mailbox-agent` therefore passes the substantive delta review. The remaining ten skills pass as no-impact renewals under the exact source tuple:

- `qubrics-agent-email-inbox`
- `qubrics-attachments`
- `qubrics-cli`
- `qubrics-email-for-agents`
- `qubrics-email-for-ai-agents`
- `qubrics-getting-started`
- `qubrics-management`
- `qubrics-mcp-setup`
- `qubrics-send-email`
- `qubrics-token-efficient-usage`

## Published legacy lane

All 11 published entries at `9d8059b10111943ce08860217a27222f43507686` pass as no-impact renewals. No published skill byte changed, and the SDK and Sending revisions are unchanged. App retains the legacy Sendmux discovery aliases at `src/constants/agent-discovery.ts:5-13`; SDK retains the `sendmux` CLI executable at `packages/ts/cli/package.json:6-9` and hosted `https://mcp.sendmux.ai/mcp` at `packages/python/mcp/qubrics/mcp/hosted_auth.py:11-14` and `mcp-contract.json:6-10`.

The reviewed published entries are `agent-email-inbox`, `email-for-ai-agents`, `sendmux-attachments`, `sendmux-cli`, `sendmux-email-for-agents`, `sendmux-getting-started`, `sendmux-mailbox-agent`, `sendmux-management`, `sendmux-mcp-setup`, `sendmux-send-email` and `sendmux-token-efficient-usage`.

## Limits

Review is source and contract evidence. It does not claim a live hosted-MCP OAuth request, registry availability or continued availability of historical package releases. Parent verification independently observed App merge-sha CI `42965836419` green; the independent reviewer did not fetch that run.
