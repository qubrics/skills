Use an isolated child process before profile setup, validation or account commands. Clear inherited `QUBRICS_API_KEY`, `SENDMUX_API_KEY`, `QUBRICS_ACCESS_TOKEN`, `SENDMUX_ACCESS_TOKEN`, `QUBRICS_PROFILE`, `SENDMUX_PROFILE`, `QUBRICS_BASE_URL` and `SENDMUX_BASE_URL`. For the existing authorised A profile, select `--profile work` and leave direct credentials unset. For direct-key setup, load only the intended key from the user's secret store after clearing the environment. Keep credentials out of argv, output and chat, and use the authorised endpoint before sending them.

Resolution rules explain why `--profile work` alone is insufficient in the supplied parent environment:

- Access token: `QUBRICS_ACCESS_TOKEN`, then `SENDMUX_ACCESS_TOKEN`; a simultaneous API key from `--api-key`, `QUBRICS_API_KEY` or `SENDMUX_API_KEY` is an error.
- Direct API key: `--api-key`, then `QUBRICS_API_KEY`, then `SENDMUX_API_KEY`. Direct keys override profile selection. The supported flag must not contain an expanded secret because argv exposes it.
- With no direct key: `--profile`/`-p`, then `QUBRICS_PROFILE`, then `SENDMUX_PROFILE`, then the configured default.
- Endpoint: `--base-url`, then `QUBRICS_BASE_URL`, then `SENDMUX_BASE_URL`, then the selected profile. Neither inherited base URL is approved here.

Plan separate root, mailbox and sending profiles using the guide's `default`, `mailbox` and `sending` names only where available. In the isolated setup process, privately supply A's root key through `QUBRICS_API_KEY` for `profiles:set default --default --json`; separately supply its mailbox key for `profiles:set mailbox --json` and a send-capable mailbox key for `profiles:set sending --json`. Do not overwrite an occupied profile without resolving that choice. Existing `work` needs no recreation. Profile list/show output masks keys and never reveals agent credentials.

Management, Mailbox and Sending are three command surfaces and may use three profiles, but API-key kinds are only `root` and `mailbox`. Management needs `smx_root_`; Mailbox accepts `smx_mbx_` or scoped `smx_agent_`; Sending needs send-capable `smx_mbx_` or an owner-approved Sending-resource `smx_agent_` token. A send-capable mailbox key can populate both mailbox and sending profiles. Agent registration instead creates a discriminated durable agent profile: read/receive while active, sending only after owner acceptance and approval, when `sending:*` automatically obtains/caches a one-hour delegated token. Management rejects agent profiles before a request. OAuth uses its approved surface, scopes and mailbox access rather than key-prefix checks.

Exact root-key-on-Sending preflight error:

> Command requires a sending API key, but --api-key contains a root API key.

The guide's unpublished candidate operation counts are Management 57, Mailbox 63, Sending 8, OAuth 2, Profiles 3 and Agent 2; these are candidate counts, requiring published-version verification before reliance.

Plan the selected surface's `management:get-connection`, `mailbox:get-connection` or `sending:get-connection` without a mailbox selector. Check returned identity against A and its intended credential, using `data.label` for connection name and `data.team.id` for stable team ID, plus authorised mailbox selection where applicable. A permitted result identifying B must stop for user resolution before snippet searches, batch-content reads or mutations. This guide teaches CLI mechanics, not SDK constructor examples. No setup, commands, credential reads, connection calls or sends were performed.
