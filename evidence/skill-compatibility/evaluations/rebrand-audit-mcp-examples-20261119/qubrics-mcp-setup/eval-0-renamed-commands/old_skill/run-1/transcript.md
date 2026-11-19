# Offline historical-skill evaluation transcript

Evaluator: `/root/skill_workflow_eval/old_skill_run`.

Repository: `/Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-audit-fixes-ecosystem-examples`.

## Actual task input

The exact task text hashed as UTF-8 without a trailing newline was:

> Using this MCP setup skill for exact SDK candidate a326bc923fff448470d908bb527afaaa35f6d739, name all five Python console executables and give a Cursor local mailbox-only configuration with a placeholder environment credential. Explain canonical versus legacy environment names, legacy MCP tool names and their qubrics_ aliases, and the hosted OAuth resource boundary. Do not launch a server, authenticate, access a mailbox or claim that the source distribution is already published.

The evaluation brief restricted evidence to historical skill `skills/sendmux-mcp-setup/SKILL.md` at Git revision `9d8059b10111943ce08860217a27222f43507686`, with expected SHA-256 `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`. It authorised writes only to this run's output paths and prohibited network, authentication, mailbox, server, installation, publication and additional-agent actions.

## Actual tool calls and actions

1. Used `functions.exec` to await two independent `tools.exec_command` calls: `sed -n '1,240p' AGENTS.md` and `sed -n '1,240p' CLAUDE.md`, both in the governing repository. Both exited 0; the returned instructions were identical.
2. Used `functions.exec` to await three independent `tools.exec_command` calls:
   - `git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md`; exited 0. The shell output wrapper abbreviated the body after its initial portion.
   - The same `git show` piped to `shasum -a 256`; exited 0 and returned `4d749ee80029bfd22ea4d76949bf28aaede1ffd30340a00ca4acba814b12d0c1`, matching the supplied expected hash.
   - A read-only `python3 -c` computation of `hashlib.sha256(task.encode()).hexdigest()` using the exact task text above; exited 0 and returned `4118ef9f899b8710ba35963d3ee8bebb0989efeb9b44f6d561f0ce9d0a2556ee`.
3. Used `functions.exec` to await two independent `tools.exec_command` calls: `rtk proxy git show 9d8059b10111943ce08860217a27222f43507686:skills/sendmux-mcp-setup/SKILL.md | sed -n '67,240p'` and the same command with `sed -n '241,470p'`. Both exited 0, supplying the remainder of the historical skill, including Cursor configuration, catalogue and OAuth guidance.
4. Wrote the actual answer verbatim to `outputs/response.md`, this transcript to `transcript.md` and the binding metadata to `receipt.json` using `tools.apply_patch` through `functions.exec`, with absolute paths.
5. Used `tools.exec_command` through `functions.exec` for a read-only Python integrity check. It re-read the same Git blob, matched its SHA-256 against the receipt, extracted the exact prompt from this transcript and matched its hash, parsed the response's Cursor JSON and the receipt, asserted the recorded empty MCP-server list and false external-actions flag, and computed artifact hashes. It exited 0 with `integrity_checks: passed`. The response SHA-256 was `aa7fa52c97988270688baf5395b98ebdc129373273a07ae1ca5dc669db8e30e7`.
6. Appended this actual verification record with `tools.apply_patch` through `functions.exec`. The earlier transcript hash consequently does not describe this final transcript; no final transcript hash is claimed.

The response was generated from that immutable skill, not the current skill or another evaluation arm. The source discusses candidate `73bedb8`, so the response explicitly records that it cannot verify the requested candidate `a326bc923fff448470d908bb527afaaa35f6d739`.

No grading was performed. No referenced material beyond the immutable skill was needed. No source, policy, test or skill files were changed. No server, network, secret, authentication, mailbox, installation or publication action was taken; no MCP server was invoked and no additional agent was spawned.

Host-provided total token use and total run duration were unavailable. Individual shell calls reported their own elapsed wall time; these were not represented as a total evaluation duration.
