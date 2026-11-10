# SDK344 real-candidate Python selector correction

## Origin and measured red

Ops requires exact SDK `a326bc923fff448470d908bb527afaaa35f6d739` acceptance before merge or the authorised v2.0.3 release. SDK344's three controls pass, but real source qualification against v2.0.2 fails because policy public selectors still name removed Python modules. This task independently reproduced the real command against released Skills `ffc8c41d20eab56184d11476809a9f5f319c8781`: exit 1, `fatal: path 'packages/python/mailbox/sendmux_mailbox/attachments.py' does not exist` at the required immutable SDK commit. No receipt produced. Raw `sdk344-real-v202.red.log` in Skills MAIN task artifacts. SDK owner's trace is MAIN SDK task `skills-v202-exact-candidate-blocker.md`.

Root: policy-selected public paths and MCP console-script names did not follow the A18 namespace move, although MCP contract/provenance/snapshot root selection already did. Seven unique paths occur across six dependency groups: mailbox attachments/client, sending attachments/client, core auth, MCP config/cli. Five MCP scripts occur in getting-started and MCP-setup groups. All are corrected in this PR, including historical skill groups.

## Minimal fix and retained enforcement

Policy declares canonical `qubrics/<component>` Python public paths and `qubrics-mcp*` script names. The checker resolves each component using that component's `[project].name` read through the SAME immutable SDK Git source: sendmux distributions select `sendmux_<component>`, qubrics distributions select `qubrics/<component>`, unknown identities fail closed. MCP uses the same private identity reader. No directory-existence fallback, SDK compatibility tree, omitted selector, external parser or source mutation.

Selected contract keys contain the actual resolved public path/script name and literal target. Thus legacy SDK contract identities remain unchanged, while real renamed identity/value changes still require genuine compatibility review. Missing declarations/scripts, changed public defaults, unknown identities, stale provenance and snapshot mismatches remain failures. The review guard is unchanged.

Canonical per spec A18 (`specs/rebrand-qubrics/spec.md:31` in qubrics/qubrics), committed per-package pyproject metadata, and the SDK owner's real trace. Work remains in the named Skills sibling; no SDK source, registry or workflow changes.

## Tests

Added public CLI regression `canonical Python selectors retain legacy acceptance and bind renamed public paths and scripts`, covering all seven paths/five scripts, old and renamed immutable layouts, required review on renamed contracts, dirty working-tree metadata isolation and changed renamed script target rejection. It failed before the fix on missing canonical mailbox attachment source in the legacy fixture. Existing Python helper fixture now includes its real project identity; no assertion weakened or removed.

The new fixture's second review initially retained obsolete record hashes while overwriting its own record filenames. Resetting that fixture's review map before generating fresh fixture records corrected the setup; production records and review enforcement were untouched. Focused full suite `node --test scripts/skill-compatibility.test.mjs`: 24/24, zero skipped, exit 0. `git diff --check` clean. Logs: `sdk344-policy-selectors.red.log`, first fixture run `sdk344-policy-selectors.green.log`, final `sdk344-policy-suite.green.log` in Skills MAIN task artifacts. No full CI or SDK suite rerun locally.

## Genuine compatibility blocker, not an acceptance record

An independent read-only review compared published Skills `9d8059b10111943ce08860217a27222f43507686`, proposed v2.0.2 `ffc8c41d20eab56184d11476809a9f5f319c8781`, SDK baseline `8d3d7492dc83852906c163d0ce0c30cfdd0bc06f` and real candidate `a326bc923fff448470d908bb527afaaa35f6d739`. Six rows cannot honestly receive compatibility approval:

- Published sendmux-attachments lines 302/327 and proposed qubrics-attachments lines 301/304/329 teach `sendmux_mailbox`/`sendmux_sending`; candidate packages only `qubrics.mailbox`/`qubrics.sending`.
- Both getting-started bodies line 88 install `sendmux-mcp`; proposed line 91 explicitly retains that identity. Candidate distribution is `qubrics-mcp`.
- Both MCP-setup bodies lines 38/45–49 and client configurations teach five `sendmux-mcp*` executables; candidate pyproject lines 32–37 declares only `qubrics-mcp*`.

Candidate SDK evidence `evidence/rebrand-qubrics-sdk344-python-20261110.md:13` explicitly says old-name pointers and useful legacy imports are outstanding. Its README lines 60–74 distinguishes unpublished replacement distributions from published legacy packages. Older published packages remain real, but their existence is not proof that this candidate provides those imports/commands.

The other sixteen rows retain directly consumed TS/CLI/tool behaviour: SDK `packages/ts` is unchanged between baseline/candidate, MCP tools compare structurally equal, protocols/transports and the 150-name catalogue (92/46/12) remain. Their handoffs into the six affected rows are still blocked. No fabricated all-22 approval or compatibility record is added.

Changing only proposed Qubrics docs cannot supersede the immutable published legacy rows: `acceptSkill()` requires a SAME-NAME changed proposed replacement plus workflow evidence bound to the previous digest; legacy names are absent from the Qubrics-only proposed root. The selector fix must expose this real compatibility gap. A green fixture alone cannot satisfy the required exact acceptance.

## Merge/release hold

The new pinned real-candidate exact command, inspection and PR CI results are recorded in the task evidence/PR as they complete. No merge or v2.0.3 release unless exact acceptance PASS is measured without weakening the guard or asserting known-incompatible rows are compatible. Required next decision: SDK owner supplies genuine legacy imports/executables in a newly identified immutable candidate, or Ops authorises a tested Skills migration/supersession path. Changing the required candidate identity or historical supersession policy is not assumed here.

Ops standing release path, once unblocked: v2.0.3 latest non-prerelease GitHub release with NEW exact-main acceptance only; rollback `gh release edit v2.0.2 --repo qubrics/skills --latest` plus normal revert PR. No marketplace, npm or SDK workflow/source action. ClawHub/Cursor operator dependencies and four cleanup holds remain.
