# Guide-only preparation: Sendmux CLI

This is an explanation of `skills/sendmux-cli/SKILL.md`, not an executed setup. No credential, connection, account, mailbox content or installed package has been inspected.

## Existing account A

Before CLI setup, connection checks or account commands, start an isolated child process and clear inherited `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. The parent environment in this scenario is not an authorised credential or endpoint choice. Load only A's intended credential from the user's secret store, or use A's authorised existing `work` profile with direct credentials unset. Use the authorised endpoint before transmitting credentials. Never ask for a pasted key, print one, or expand one into `--api-key`, where it would appear in process arguments.

For `work`, select `--profile work` explicitly and keep direct API keys and access tokens unset. A profile flag does not neutralise a competing direct credential. Validate the relevant surface using `mailbox:get-connection`, `management:get-connection` or `sending:get-connection`, with `--profile work --json` as appropriate. These checks need no mailbox selector and send no email. Compare returned `data.label` and stable `data.team.id`, plus any authorised mailbox selection, with A and the intended credential. Permission alone is insufficient. If an unisolated check grants permission but identifies B, stop before snippet searches, batch-content reads, sending or other mutations; resolve the identity and endpoint selection with the user, then validate the intended selection. Do not carry the successful permission result forward as an A validation.

## Released 1.7.2 versus candidate resolution

The guide's install command, `npm install -g @sendmux/cli`, resolves released CLI 1.7.2 in this scenario. That release reads `SENDMUX_ACCESS_TOKEN`, `SENDMUX_API_KEY`, `SENDMUX_PROFILE` and `SENDMUX_BASE_URL`; it does not read their `QUBRICS_` equivalents. Explicit flags take precedence. A token plus an API key is an error. The isolation requirement still clears both families so this preparation remains safe across the release and candidate.

For released profile creation, the secret-store-loaded input is `SENDMUX_API_KEY`. The guide's examples use `SENDMUX_API_KEY="$SENDMUX_ROOT_KEY"` for a root profile and `SENDMUX_API_KEY="$SENDMUX_MBX_KEY"` for mailbox and sending profiles. Those source variables must themselves come from the intended secret store inside the isolated process. Clear the direct credential again before using a saved profile. Do not rely on `QUBRICS_API_KEY` for released `profiles:set`.

Candidate SDK `73bedb8` adds `QUBRICS_API_KEY` before the legacy fallback for `profiles:set`; consequently the legacy example also works on the candidate only after competing QUBRICS values have been cleared. The candidate's operation resolution is separately documented as:

1. Access token: `QUBRICS_ACCESS_TOKEN`, then `SENDMUX_ACCESS_TOKEN`; reject a simultaneous API key supplied by `--api-key`, `QUBRICS_API_KEY` or `SENDMUX_API_KEY`.
2. Otherwise direct key: `--api-key`, then `QUBRICS_API_KEY`, then `SENDMUX_API_KEY`.
3. With no direct key, profile: `--profile` / `-p`, then `QUBRICS_PROFILE`, then `SENDMUX_PROFILE`, then the configured default.
4. Base URL: `--base-url`, then `QUBRICS_BASE_URL`, then `SENDMUX_BASE_URL`, then the selected profile.

These QUBRICS-first rules describe the unpublished candidate, not released 1.7.2. Selecting the correct key does not authorise an inherited base URL. This guide has no SDK-construction example, so it does not establish an SDK implementation or base-URL option; no such code is invented here.

## Separate profiles and surfaces

Prepare separate root, mailbox and sending profiles with the secret-backed environment input above. A root profile uses `smx_root_` for `management:*`. A mailbox profile uses `smx_mbx_` or a scoped `smx_agent_` credential for `mailbox:*`; an agent profile is created by registration rather than by extracting its credential. Sending requires a send-capable `smx_mbx_` key or an owner-approved Sending-resource `smx_agent_` token. A send-capable mailbox key can populate both mailbox and sending profiles. These are three command surfaces, potentially three profiles, but the CLI's API-key kinds are only `root` and `mailbox`.

The guide's exact root-key-on-Sending preflight error is:

```text
Command requires a sending API key, but --api-key contains a root API key.
```

Prefix preflight fails before a network request, but passing preflight does not replace the returned-identity gate. An agent profile uses its durable read credential for `mailbox:*`; `management:*` rejects it before a request, and `sending:*` obtains delegated authority only after owner approval.

The explicitly unpublished candidate catalogue lists 57 Management, 63 Mailbox and 8 Sending operation commands, plus 2 OAuth, 3 Profiles and 2 Agent commands. Those counts are not claims about the released CLI. Verify the published version and its command help before relying on candidate operations.

## Separate case: no account, key or profile

The documented keyless flow is an exception to requiring an existing identity check before setup: complete `agent:register` first, then verify the newly saved profile before content access, sending or other task work. The guide shows registration of a named profile with `--mailbox-local-part`, `--client-name`, optional `--default`, and `--json`; `--owner-email` can invite the owner during registration, or `agent:invite-owner` can invite later. No existing account or API key is required. This is creation of a new agent inbox, not authentication to existing account A, and must remain separate from the existing-credential branch.

The CLI persists registration idempotency before the request, stores the durable credential in a restricted local profile without printing it, reloads it from disk and waits up to 10 minutes for readiness. Repeating the same profile and options resumes safely. After registration, validate the saved profile's connection and verify returned identity and mailbox selection; do not present later task work or a handoff as identity-verified until that gate succeeds.

Read and receive access has no expiry date while registration remains active. Sending waits for the invited owner to accept and approve it; after approval, `sending:*` automatically exchanges and caches a one-hour `email.send` token until near expiry. Storage starts capped at 500 MiB and owner-approved sending raises it to at least 5 GiB. Revoking sending alone does not change the current storage allocation. Full registration revocation removes read access and every delegated token.

No commands from the guide were run. Released/candidate behaviour above is guide-derived; this preparation proves neither live identity nor installed-client compatibility, publication or successful delivery.
