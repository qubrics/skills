# Guide-only preparation: Sendmux CLI

No commands or live actions are performed in this explanation.

## Existing account A

Start an isolated child process before CLI setup, connection validation or account commands. Clear all eight inherited variables: `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. This removes account B's key, the competing access token and both unapproved endpoint overrides. Use only the authorised endpoint and keep credentials out of arguments and output; never ask the user to paste a key.

For existing profile `work`, leave direct credentials unset and explicitly select `--profile work`. For a direct-key call or creation of an API-key profile, load only account A's intended credential from the user's secret store into the isolated process. Do not put the secret into `--api-key`: although supported, that flag exposes its expanded value in process arguments. An explicit profile does not defeat a direct key or a base-URL override.

Validate the selected surface with `management:get-connection`, `mailbox:get-connection` or `sending:get-connection`, using the intended profile or credential and `--json`. These connection checks need no mailbox selector and send no email. Verify the returned connection name in `data.label`, stable team identifier in `data.team.id`, and any authorised mailbox selection against account A and the intended credential before content reads or mutations. Permission alone does not identify the intended account. If an unisolated connection grants permission but returns B, stop: do not search snippets, batch-read message bodies, send or perform other mutations. Resolve the identity mismatch with the user, then establish the intended identity before continuing. An identity that cannot be verified also requires a stop.

## Authentication and endpoint precedence

- Access tokens: `QUBRICS_ACCESS_TOKEN`, then `SENDMUX_ACCESS_TOKEN`. A simultaneous API key supplied by `--api-key`, `QUBRICS_API_KEY` or `SENDMUX_API_KEY` is an error; do not treat it as a fallback.
- Direct API keys: `--api-key`, then `QUBRICS_API_KEY`, then `SENDMUX_API_KEY`.
- If no direct key exists: `--profile` / `-p`, then `QUBRICS_PROFILE`, then `SENDMUX_PROFILE`, then the configured default profile.
- Base URL: `--base-url`, then `QUBRICS_BASE_URL`, then `SENDMUX_BASE_URL`, then the selected profile.
- `profiles:set` reads `QUBRICS_API_KEY` before `SENDMUX_API_KEY`; `--api-key` takes precedence over both, but must not carry an expanded secret in this preparation.

This guide teaches CLI mechanics, not SDK constructor examples. It supplies no SDK-specific guarantee about explicit `apiKey` versus an inherited base URL, so I cannot invent one. Its applicable protection is to clear both inherited endpoint variables, use only the authorised endpoint, isolate the intended credential and verify returned identity before subsequent content or mutation. Explicit credential selection alone is not evidence that an endpoint is authorised.

## Separate profiles, surfaces and key kinds

Prepare separate named root, mailbox and sending profiles by loading each intended key from the secret store into the isolated process and using `profiles:set`; do not print keys or pass them as command-line secrets. For later profile-based calls, leave direct keys and tokens unset and explicitly select the intended profile. Profile reads mask stored API keys and never reveal agent credentials. Validate each selected surface and identity before task access.

Management, Mailbox and Sending are three command surfaces and may use three profiles. The CLI's ordinary API-key kinds are `root` and `mailbox`; a send-capable mailbox key can populate both mailbox and sending profiles. A sending profile is not a third key kind. Management requires `smx_root_`; Mailbox accepts `smx_mbx_` or appropriately scoped `smx_agent_`; Sending requires a send-capable `smx_mbx_` key or owner-approved Sending-resource `smx_agent_` token. Agent profiles use their durable read credential for Mailbox, obtain a delegated token for Sending after owner approval, and are rejected by Management before the request. OAuth profiles instead require the approved surface, scopes and mailbox access.

The guide's exact root-key-on-Sending error is:

> Command requires a sending API key, but --api-key contains a root API key.

Prefix preflight prevents a wrong key kind from reaching the network. It does not replace the returned-identity gate before snippet or batch-content reads.

The unpublished candidate catalogue lists Management **57**, Mailbox **63**, Sending **8**, OAuth **2**, Profiles **3** and Agent **2** operation commands. The guide requires verifying the published version before relying on the candidate commands; this explanation does not establish their published availability.

## Separate case: no account, key or profile

The documented keyless flow permits `agent:register` first, without an existing Sendmux account or API key. Apply the same isolated-process and authorised-endpoint preconditions, but do not require a connection identity for a profile that does not yet exist. Registration creates the credential/profile needed for the subsequent identity check. An owner invitation may be included during registration; otherwise the guide provides `agent:invite-owner` for later.

The CLI persists registration idempotency before its request, stores the durable credential locally with restricted permissions without printing it, reloads it from disk and waits up to 10 minutes for readiness. Repeating registration with the same profile and options resumes safely. After registration, validate the newly saved profile's selected connection and verify its returned identity and any authorised mailbox selection before content access, sending or other mutations. Do not continue this task or hand off the profile as verified until that check succeeds; stop and resolve any mismatch or unverifiable identity with the user.

Read/receive access remains available without an expiry date while registration is active. Sending stays blocked until the invited owner accepts and approves it. Afterwards, Sending commands automatically exchange and cache a one-hour delegated token. Storage is capped at 500 MiB before owner approval and rises to at least 5 GiB when owner-approved sending is enabled. Revoking sending alone does not change the current storage allocation; full registration revocation removes read access and every delegated token.

No commands, credentials, connection checks, mailbox reads, mutations or sends were executed. Identity, endpoint, readiness, publication and live behaviour remain unverified; this is not live certification.
