# Guide-only preparation: Token-efficient usage

This is a synthetic explanation. Neither credential case, fixture nor proposed call is executed.

## Preconditions for both CLI and SDK

Before any connection check or task command, start an isolated child process and clear inherited `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. Then load only account A's intended credential from the user's secret store. For an existing profile, leave direct credentials unset and explicitly select `--profile work`. Apply this even when reusing a durable profile. Use the authorised endpoint before transmitting credentials, keep secrets out of arguments and output, and never ask for a pasted key.

This removes account B's inherited key, the competing token and both unapproved endpoint overrides. Selecting a profile alone is not the guide's isolation step. The guide does not give a complete QUBRICS-versus-SENDMUX precedence table, so no additional ordering is invented.

For SDK application work, the application supplies a compatible `apiKey` or `accessToken`, or its own provider callback. SDK helpers do not read or update CLI profile state. An explicit `apiKey` does not establish that an inherited base URL is authorised. Clear both base-URL variables and all competing credential/profile values before constructing or using the client, establish the authorised endpoint and validate that SDK connection before task work. Do not invent a constructor option or SDK implementation-precedence rule to bypass the boundary.

## Existing durable profile: the first fixture is a stop

The intended mailbox is `mbx_support`, but the initial connection identifies `mbx_sales`. That is a mismatch even if the credential grants permission. Verify the returned identity and authorised mailbox selection against intended account A and its credential; permission alone does not identify the intended mailbox.

For CLI profile `work`, use the selected Mailbox connection check, `mailbox:get-connection`, with that profile after isolation. The check needs no mailbox selector and sends no email. If it identifies `mbx_sales`, stop and resolve the mismatch with the user before counting, reading content, sending, mutating or handing the task off as verified. Do not run a count against the wrong mailbox merely because it is narrower than a body read. An unverifiable identity also requires stopping. An unisolated connection identifying B has the same stop behaviour.

An SDK application uses `mailboxGetConnection` with its own intended application credentials; this is not a check of the CLI profile. An already-connected MCP session would use `mailbox_get_connection` and would validate only that session, not a REST/CLI profile. Public OpenAPI discovery is not credential validation. There is no universal Mailbox default for an OAuth profile whose approved surface is unknown; establish its already-approved surface before choosing that check.

## Separate matching-identity fixture: unread-invoice count only

The second fixture is stipulated to match the intended identity and to authorise only counting unread invoices. Treat that as the hypothetical branch for this explanation, not evidence that the first live connection has been repaired or that any real check has occurred.

The cheapest suitable path is one server-side count after the matching connection and mailbox gate:

- **One-off terminal:** `sendmux mailbox:count-messages --profile work --query q=invoice --query is_unread=true --json`.
- **Application code:** use `mailboxCountMessages` after `mailboxGetConnection`, with the matching application's authorised Mailbox credential and the same invoice/unread filters. The guide names these operations but does not provide this count's complete SDK argument shape, so no implementation code is invented.
- **Already-connected, appropriately authorised MCP:** `mailbox_count_messages` is the count alternative; it requires validation of that MCP session rather than assuming the CLI fixture establishes it.

Choose the route matching the environment; do not execute all alternatives. Here, reusing the intended durable CLI profile is the terminal path. For ordinary API-key Mailbox authentication the guide uses `smx_mbx_*`; `smx_root_*` belongs to Management and is unnecessary for this count. The durable profile's Mailbox reads become available after provisioning and before owner approval, subject to the identity and task boundaries.

Count only. Do not search snippets, fetch individual or batch message bodies, enumerate every message, inspect attachments, mutate read state or send. The narrower count answers the authorised question directly; no content sample is needed. The supplied matching fixture does not expand authorisation beyond that count.

## Separate case: no existing account, key or profile

The guide documents a keyless registration sequence for an agent with no key and routes setup details to `sendmux-getting-started`. Do not require an existing Management/root connection or copy tokens manually. Apply the same cleared-process and authorised-endpoint preconditions, then the documented bootstrap registers one durable profile with `sendmux agent:register my-agent --default --json`.

Registration may happen before the new profile's connection-identity check because it creates the profile that will be checked. Register once and reuse that durable profile across processes. After registration, verify the newly saved profile's returned identity and any authorised mailbox selection before content reads, sending, other task work or a subsequent handoff representing the setup as verified. The short registration sample's later `mailbox:me:get` does not remove that stated verification precondition. Stop and resolve any mismatched or unverifiable identity with the user.

Mailbox reads become available after provisioning, before owner approval. Sending has two separate owner gates: invitation acceptance and explicit sending approval. The guide provides `agent:invite-owner` for the invitation; once both gates are complete, use the same profile with `sending:*`, and the CLI automatically exchanges and caches its one-hour delegated token. SDK helpers do not perform that CLI profile exchange on the application's behalf. Storage is capped at 500 MiB before approval; owner-approved sending raises it to at least 5 GiB first. Revoking sending alone does not change the current storage allocation.

No commands, real credentials, API calls, mailbox reads/counts, mutations, sends or actual handoffs occurred. Both fixtures remain synthetic; identity, endpoint and live behaviour are not certified.
