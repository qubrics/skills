# Guide-only preparation: Management connection validation

This preparation explains validation only. No administration, commands, credentials, API calls or mailbox reads are performed.

## Process, credential and endpoint preconditions

Before CLI or SDK examples, start an isolated child process and clear inherited `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. Then load only account A's intended credential from the user's secret store. Use the authorised endpoint before transmitting credentials; keep secrets out of arguments and output, and never request a pasted key or one-time secret.

For profile-based calls, leave direct credentials unset and explicitly select `--profile work`. The parent process's account B key, competing token and unapproved endpoints must not accompany that profile. For a raw-key branch, load only the intended root key into the isolated process rather than treating a profile selection as protection against inherited credentials. The guide's legacy `SENDMUX_API_KEY` examples remain subject to clearing the competing QUBRICS and SENDMUX values first. This guide does not supply a complete variable-precedence table, so no additional precedence rule is invented.

## 1. Validate the selected Management connection

- **Raw root key:** the required API-key kind is `smx_root_`. Load account A's intended root key secret-safely and use the Management connection-validation operation, `management:get-connection`. Do not use the guide's create-domain, create-mailbox or other administration examples as a credential test. This guide does not provide a raw-key profile-creation recipe; initial profile setup routes to `sendmux-getting-started` or `sendmux-cli` rather than an invented recipe.
- **Existing OAuth profile:** leave direct key/token overrides unset and use the documented `sendmux management:get-connection --profile work --json` validation form. This check requires Management access but no additional read permission. Reuse the selected configured profile; login or re-consent belongs to `sendmux-cli` when actually needed.
- **SDK:** the guide uses `@sendmux/management` and `createManagementClient`, with explicit `apiKey`; it also supports `accessToken`, including a provider resolving the current token before each request. Apply the same isolation, authorised-endpoint and identity requirements before any SDK task operation. An explicit `apiKey` is not proof that an inherited base URL is authorised: clear both base-URL variables and establish the authorised endpoint before transmitting it. The guide does not name a Management SDK connection-check helper or a constructor option for resolving this endpoint case. Do not invent either, infer SDK environment precedence, or run its domain-mutation examples as validation. Its concrete connection-check example is the CLI form above.

No administration operation is needed for this preparation.

## 2. Interpret identity and effective access

The guide's schema example is synthetic, not evidence about account A. For a real returned check:

- `data.credential.type` identifies `api_key`, `oauth` or `agent_token`; inspect the returned credential identity against the intended credential.
- `data.permissions` lists effective permission names.
- `data.label` is the server-provided connection display label, not the local CLI profile name.
- The returned `data.team` identifies the team; match its identity against intended account A. Treat any returned authorised-mailbox metadata as authorisation metadata, not message content, and verify any later mailbox selection against the intended account and credential.

Explain those fields without unnecessarily displaying account metadata. A permission grant alone does not prove intended identity. If an unisolated connection grants Management permission but identifies B, stop before administration, mailbox content, sending or other task work. Resolve the mismatch with the user; do not continue merely because the credential is valid. The same stop applies if identity cannot be verified.

A root key provides Management administration authentication; a mailbox key is for separately approved mailbox runtime access. Do not substitute a mailbox key for a root key or use Management calls to read, triage, sync or reply inside a mailbox. A Management OAuth grant must cover Management access and the requested operation, and remains limited by the authorising user's current team permissions.

## 3. Check operation-specific permissions without administering

Connection validation alone does not certify every Management operation. Match a later requested operation to the scope mapping explicitly documented by the guide, or to that operation's public Management OpenAPI `security` entry. Do not infer a scope from its operation name. No OpenAPI fetch occurs here, and no later administration operation is specified, so this explanation cannot certify its scope.

The guide's explicit examples distinguish `mailbox.admin.create` for mailbox creation from `mailbox.admin.manage` for creating or revoking mailbox keys. Webhooks use `webhook.read` for reads, `webhook.create` for creation, `webhook.update` for updates, `webhook.delete` for deletion and `webhook.manage` for secret rotation or test delivery. Those mappings do not authorise performing the operations in this validation-only task. Automatic OAuth refresh preserves the existing grant; obtaining extra requested scopes belongs to login/re-consent, still subject to current team permissions.

## 4. Handoffs and the separate keyless case

For existing credentials, hand OAuth login/token lifecycle to `sendmux-cli` and mailbox read/search/sync/triage/replies to `sendmux-mailbox-agent` only after the intended connection identity is established. Management access does not replace those workflows.

Separately, a user with no account, key or profile who only needs an agent inbox routes first to `sendmux-getting-started` and its documented `sendmux agent:register` path. Do not require a Management connection or create/expose a root key for that purpose. This bootstrap handoff may occur before a connection identity check because the new agent profile does not exist yet.

Registration needs no existing account or API key and saves a durable CLI profile that can read and receive mail without expiry while registration remains active; full revocation ends that access. After registration, verify the newly saved profile's returned identity and authorised mailbox selection against the intended account and credential before mailbox access, sending, further task work or any subsequent task handoff. Stop and resolve a mismatched or unverifiable identity. The Management guide delegates the detailed registration lifecycle to `sendmux-getting-started`; no unavailable protocol details are invented here.

No live identity, endpoint, permissions or registration outcome was verified. No commands, administration, reads, mutations, sends or actual handoffs occurred; this is not live certification.
