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

## A13 tested rename decision

Ops approved B: A18 requires native `qubrics` imports in the new Python major; A10 deprecates old npm packages with pointers. Requiring old exports inside new packages was the wrong recommendation. A13 requires renamed `qubrics-*` skills and a deprecated Sendmux plugin pointing at Qubrics, so the canonical fix is tested skill rename supersession. SDK stays exactly `a326bc923fff448470d908bb527afaaa35f6d739`.

Only three legacy names map to their canonical Qubrics counterparts. The checker rejects unknown names, noncanonical destinations and malformed maps. Existing same-name supersession, reviewed contract bindings, immutable source reads, previous-skill digest and genuine graded-workflow requirements remain. Public CLI regression was red on the old guard (`published/agent-email-inbox requires a compatibility review`), then focused 4/4 green including original same-name and prompt/skill evidence tests. Wrong previous digest and a compatibility-only statement cannot supersede a renamed skill. Logs: `sdk344-rename.red.log`, `sdk344-rename.green.log`.

Three Qubrics guides now teach only candidate namespace imports and console executables, with explicit pending-publication qualifications. Their six legacy/proposed rows will be accepted only through the actual evaluated replacements. Existing attachment/MCP eval expectations changed to the A13/A18 identities; all 22 runtime MCP tool literals retained exact occurrence counts. Fresh critique, one humanize pass and protected technical-token check completed; all three skill validators and official regenerated-plugin check passed. Both plugin identities and bundle metadata are 2.0.3; ClawHub publication remains disabled.

Pinning real candidate source also exposed the same stale-root assumptions in the static checker: missing contract/curation/config/hosted files caused false missing-tool and undocumented-env errors, while expected Python names and Go module still pinned old identities. Static root now follows the exact `[project].name`, unknown identities fail closed, and A18 distribution/module names are explicitly validated. Publication/count claims remain bound to their relevant candidate paragraphs rather than falsely requiring a released package claim. Original alias, runtime, env and negative predicates remain. Real static red then green; focused 7/7 and final substring/publishing-location negatives 3/3, zero skipped. Logs: `sdk344-static-real.red.log`, `sdk344-static-selector.red.log`, `sdk344-static-selector.green.log`, `sdk344-static-negative.green.log`, `sdk344-static-real.green.log`.

Per operator decision discipline in `/Users/rj/.claude/tasks/superset-drive/decisions.md:330`, the PR lists each changed stale identity assertion and its A13/A18 cite. That standing default-origin decision does not authorise deleting legacy/security assertions; none are removed. Actual model outputs, independent grading, exact candidate PASS, final CI and release readback remain required before completion.

Ops standing release path, once unblocked: v2.0.3 latest non-prerelease GitHub release with NEW exact-main acceptance only; rollback `gh release edit v2.0.2 --repo qubrics/skills --latest` plus normal revert PR. No marketplace, npm or SDK workflow/source action. ClawHub/Cursor operator dependencies and four cleanup holds remain.

## Review corrections

CodeRabbit identified that OpenClaw's install recipe still selected `sendmux-mcp` and four old executables while the guide selected the native candidate. Immutable SDK `a326bc92:packages/python/mcp/pyproject.toml:6,33–37` declares `qubrics-mcp` and the corresponding four `qubrics-mcp*` commands. The recipe now matches those declarations. A direct assertion against that immutable file failed on `/^name = "sendmux-mcp"$/m` before the correction and passed afterwards (`sdk344-b-openclaw.red.log`, `sdk344-b-openclaw.green.log`). The guide's existing pending-publication boundary remains; this prepares metadata only and does not enable or publish ClawHub.

The static project-name reader also accepted trailing garbage that the immutable checker rejected. Its parser and fixture reader now use the immutable checker's anchored, matching-quote rule, allowing valid inline comments. Extended existing public CLI regression failed pre-fix with `malformed project identity must fail closed` (actual 0, expected 1), then passed 1/1 with malformed rejection, valid-comment acceptance, legacy/renamed layouts and unknown-name rejection. Raw `sdk344-b-parser.red.log` and `sdk344-b-parser.green.log`. The first green probe had an incorrect newly authored diagnostic expectation: `readMcpRoot()` throws `Unsupported MCP project.name: null` before collected failures print. Only that new diagnostic assertion was corrected; the rejection expectation and every pre-existing assertion stayed intact.

Plugin-bundle validation passes without regeneration because no source body or plugin version changed in this review batch. The earlier genuine workflow evidence remains bound to unchanged skill bytes. New exact acceptance is required for the final commit; earlier `9c2a5ec` PASS is historical evidence only.

Full exact SDK publication-guard candidate command passed at Skills `a88f978d0760c9a61a314e002285c0625e6e3e65`: live OpenAPI equality and genuine acceptance exit 0, candidate digest `01d02f9e06820fa0c4f840dc05c0575819cda41936dada1e36db4bd57651b4d4`. Raw `sdk344-b-exact-a88f978.log`. The SDK owner's original worktree had advanced, correctly causing a checkout-identity rejection before evaluation. This proof uses a genuine, clean detached checkout of the unchanged `a326bc92` Git commit under this task's already-boarded `phase2-packages` cache; no SDK owner's files or Git metadata changed. Independent delta reviews: Spec zero implementation findings (citation corrected here), Standards zero findings. The evidence-only correction does not change checker, policy or skill bytes; final source still receives fresh exact acceptance before merge.
