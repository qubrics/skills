## CLI

Native task: `/root/php4_changed_workflows`  
Skill SHA256: `c0378b14ec33434c1637275476a8891ca70585bc8addaf8a7a86496a12f3221e`  
Exact model, evaluation timing and token metadata unavailable.

For `profiles:set`, API-key precedence is `--api-key` → `QUBRICS_API_KEY` → `SENDMUX_API_KEY`. When both environment variables differ, the Qubrics value wins. Although `--api-key` wins over both, expanding a credential into that flag exposes it in process arguments.

For ordinary commands:

- Access token: `QUBRICS_ACCESS_TOKEN` → `SENDMUX_ACCESS_TOKEN`. A token conflicts with any API key supplied through `--api-key`, `QUBRICS_API_KEY` or `SENDMUX_API_KEY`; the CLI rejects that combination.
- Without an access token, direct API key: `--api-key` → `QUBRICS_API_KEY` → `SENDMUX_API_KEY`.
- Without a direct key, profile: `--profile` / `-p` → `QUBRICS_PROFILE` → `SENDMUX_PROFILE` → configured default.
- Base URL: `--base-url` → `QUBRICS_BASE_URL` → `SENDMUX_BASE_URL` → selected profile.

Consequently, `--profile` alone cannot isolate a command from ambient direct credentials, and an environment base URL overrides the profile’s URL. The skill explicitly documents `profiles:set` key selection and the general base-URL chain; it does not separately describe how `profiles:set` persists a base URL or specify a fallback when no profile URL exists.

Secret-safe preparation, described only:

1. Start a clean child process or subshell with tracing disabled. Remove both namespaces’ API-key, access-token, profile and base-URL variables from that process. Keep unrelated shell state outside it.
2. Have the user’s secret store inject a root `smx_root_` key as `QUBRICS_API_KEY` into a process running `sendmux profiles:set root`. Supply the intended non-secret endpoint through `--base-url`; do not supply `--api-key`.
3. In another clean process, inject an `smx_mbx_` key as `QUBRICS_API_KEY` and prepare the `mailbox` profile.
4. In another clean process, inject a **send-capable** `smx_mbx_` key and prepare the `sending` profile. The same send-capable mailbox key may populate both profiles if its permissions fit.
5. Inspect profiles only through the documented masked `profiles:list` / `profiles:show` output. Never print the injected environment, enable tracing or place credentials in arguments.
6. For later profile-based commands, keep both namespaces’ direct key/access-token variables absent. Remove ambient base-URL overrides unless deliberately required, and select the intended profile explicitly.

Management, Mailbox and Sending are **three command surfaces**, potentially represented by three profiles. The CLI’s API-key kinds are **root and mailbox**, not three separate kinds. Management requires a root key; Mailbox accepts a mailbox key or appropriately scoped `smx_agent_` credential; Sending requires a send-capable mailbox key or an owner-approved Sending-resource agent token. Agent registration creates a separate discriminated agent profile: its durable credential serves mailbox reads, while approved sending exchanges it for a cached one-hour delegated token. OAuth profiles depend on approved surfaces, scopes and mailbox access; REST OAuth credentials authenticate HTTP, not SMTP or IMAP.

The unpublished candidate lists **57 Management, 63 Mailbox and 8 Sending operations**: 128 across those surfaces. It additionally lists 2 OAuth, 3 Profiles and 2 Agent commands. These are candidate-source counts; the skill requires checking publication before relying on new commands and does not establish that they are released.
