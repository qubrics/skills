# Guide-only preparation: Getting started

No setup, command, credential access or API call is executed here.

## Existing account A: isolate before authentication

Run CLI and SDK examples only in an isolated child process. Before loading any intended credential, clear inherited `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. Load only account A's intended key from the user's secret store, or leave direct credentials unset when selecting the existing `--profile work`. Use the authorised endpoint before transmitting credentials and keep secrets out of arguments and output. Never request a pasted key.

The guide's legacy `SENDMUX_API_KEY` examples do not waive this boundary. Assigning the intended legacy variable in a process that still contains B's `QUBRICS_API_KEY`, a competing access token or an unapproved endpoint is not the documented safe sequence. Clear all eight first, then load only the intended credential. Do not assume choosing a profile or setting a legacy key neutralises other inherited overrides. This guide does not provide a complete QUBRICS-versus-SENDMUX precedence table; its explicit protection is process isolation and removal of the competing values.

## Raw-key setup: separate root and mailbox profiles

For raw keys, configure the matching profile before checking its connection. Keep Management and Mailbox keys in separate profiles or clients; do not use a root key in mailbox-scoped examples.

- **Root branch:** in the cleared process, supply the intended account A root key through secret-backed `SENDMUX_API_KEY` input to `profiles:set root`. Do not expand it into `--api-key` or print it. Before profile-based follow-up calls, leave direct credentials unset, select `--profile root`, and use `management:get-connection`. Verify the returned identity against account A before proceeding to the guide's later `management:mailboxes:list` example with `limit=1`.
- **Mailbox branch:** separately load only the intended account A mailbox key through secret-backed `SENDMUX_API_KEY` input to `profiles:set mailbox`. Then leave direct credentials unset, select `--profile mailbox`, and use `mailbox:get-connection`. Verify the identity and any authorised mailbox selection before the subsequent harmless `mailbox:me:get` call or any message-content access.

The examples' `--default` choices do not replace explicit selection of the intended profile for later calls. Permission-restricted CLI profiles and authorised secret-store files are expected credential storage; never copy their raw credentials into chat, logs, prompts, screenshots or repository files.

## Existing authenticated profile: reuse it

For the already authenticated `work` profile, create no new profile and do not log in again merely for this preparation. Leave direct key/token overrides unset and use that actual profile name for both the connection check and following call. OAuth authorises access to an existing account; `agent:register` creates a new agent inbox and is a separate path.

Choose the connection check for the intended surface: `sending:get-connection`, `mailbox:get-connection` or `management:get-connection`, with `--profile work --json`. The checks need no mailbox selector. Returned metadata identifies the connection through `data.label`, the stable team through `data.team.id`, and authorised mailboxes through `data.mailboxes[].id` / `data.mailboxes[].email` when present. Compare those fields privately against account A and the intended credential; do not list customer values unnecessarily. Any later mailbox selection must be authorised by that response.

A check that grants permission but identifies B is a stop, not success for A. Do not read snippets or message bodies, send, mutate or continue task work. Resolve the mismatch with the user before proceeding. An unverifiable identity also requires stopping. Permission alone does not establish intended identity.

A successful connection check validates the credential and surface, not Sending credits, provider readiness or mailbox storage. Sending's connection check requires `email.send`; Management and Mailbox checks require access to their surfaces without an additional read permission. The later Management list additionally needs its operation permission (`mailbox.admin.read` for OAuth). Public OpenAPI discovery does not validate credentials.

## Later SDK examples

The guide's `createMailboxClient`, `createManagementClient` and `createSendingClient` examples explicitly supply `apiKey`, but remain subject to the same initial isolation, authorised-endpoint and returned-identity gate. Clear both inherited base-URL variables before constructing or using a client; an explicit key is not evidence that an inherited endpoint is authorised. Load only the intended secret after clearing all competing credential/profile variables.

Do not invent a constructor option or claim undocumented SDK environment precedence. This guide supplies no such implementation detail. If the authorised endpoint cannot be established, do not transmit the credential. Validate the same credential and surface before the later SDK task call: `mailboxGetMe` or `managementListMailboxes` is subsequent work, not a substitute for the prescribed connection validation. The Sending `sendingGetOpenApiSpec` example is discovery only, not credential verification or a reason to send a test email. A real send requires an explicit request with message details and routes to `sendmux-send-email` with an `Idempotency-Key`.

## Separate case: keyless agent registration

The installed Sendmux skill and the CLI's `--help` are the setup authority. No existing account, API key, challenge or proof-of-work step is required. In a future execution, install `@sendmux/cli` if necessary and use the guide's `agent:register my-agent` sequence with the selected profile and options. Apply the cleared-process and authorised-endpoint boundary first, without loading an unrelated parent credential.

Registration is allowed before the connection-identity check because the new saved profile does not exist yet. The CLI saves idempotency state before registration, stores the returned credential in a permission-restricted profile without printing it, and waits up to 10 minutes for mailbox readiness. Repeating the same command with the same profile and options resumes safely.

After registration, leave direct credentials unset and validate the newly saved profile with `mailbox:get-connection --profile my-agent --json`. Verify its returned identity and any authorised mailbox selection before the later `mailbox:me:get`, mailbox content, sending, other task work or a handoff representing setup as verified. Stop for a mismatched or unverifiable identity. The registration-first exception is not permission to skip the resulting profile's verification.

Invite the owner during registration with `--owner-email`, or later with `agent:invite-owner`. The saved profile permits read and receive without an expiry date while registration remains active; its durable credential does not authorise sending or message changes. A delegated Sending token is unavailable until the owner accepts the invitation and approves sending. Afterwards `sending:*` CLI commands automatically exchange the durable credential for a one-hour `email.send` token and cache it until near expiry. Storage is capped at 500 MiB before approval; owner-approved sending first raises it to at least 5 GiB. Revoking sending alone does not change the current storage allocation.

The guide's full-registration-revocation guarantee is exactly:

> A full registration revoke removes read access, invite/recovery handles and every derived delegated sending token.

That guarantee identifies read access, invite/recovery handles and all derived delegated sending tokens. It does not state that revocation deletes an accepted owner's association; no such effect is inferred.

No commands, real credentials, connection checks, content reads, mutations, sends or handoffs were performed. Identity, endpoint, permissions, readiness and revocation behaviour remain unverified live; this is no live certification.
