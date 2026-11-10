Use the `qubrics` CLI path when the requirement is a durable agent inbox and a reusable terminal profile. The CLI package is `@qubrics/cli`. For a new self-registered inbox, `qubrics agent:register` creates and stores the permission-restricted agent profile; `qubrics agent:invite-owner` links the owner when needed. Those are explanations of the setup path, not commands I have run.

The saved agent profile can read and receive mail without an expiry date while registration remains active. That durable credential does not authorise sending or message changes. Sending becomes available only after the owner accepts the invitation and approves it; the CLI then exchanges the durable credential for a one-hour `email.send` token for `sending:*` commands. A full registration revoke removes the durable access and derived tokens.

You already have authorised credentials, so do not register another inbox merely to migrate source. Reuse the intended existing profile. Before later mailbox work, validate that profile with the Mailbox connection check and verify the returned account and authorised mailbox identity; permission alone does not establish the intended identity. Keep direct credential overrides unset when using a profile.

Choose MCP when your agent client needs the connected, curated tool interface. For SDK source `a326bc923fff448470d908bb527afaaa35f6d739`, the Python distribution and local server executable identity is `qubrics-mcp`; use the linked Qubrics MCP setup guide for surface-specific executable configuration. This source reads `QUBRICS_*` credential names before compatible `SENDMUX_*` fallbacks.

Do not assume the renamed Python distribution is published. The guide marks `qubrics-mcp` as pending publication. Local source migration needs an installed build of the intended source, or verification of the intended published release before using `pipx install qubrics-mcp`. For setup now, the guide offers hosted OAuth at `https://mcp.qubrics.com/mcp` or an authorised existing server.

No credentials were requested or extracted from a CLI profile. No registration, authentication, mailbox read or send was performed.
