# PHP4 Skills source alignment

Goal: unblock the source compatibility prerequisite for the PHP rename. This PR does not publish or qualify an SDK release.

## Immutable inputs and scope

Source-body commits: ten bodies and generated copies remain at `b4fab3ac920f038e0c9f0846ab1032cba8a349c2`; getting-started's approved revocation clarification is frozen at `e522c125b082394abf7c9941faee88f1bee09243`. Base `941e08b16488ba202b994f751bbccc774a3be6d3`. Later evidence/index commits do not change those bytes.

Current reviewed tuple: App `87ce115810ebcfa91655295603c27af52fcff96f`, Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`, SDK `73bedb8b0005e96e580e39cca4aac6bd030753a5`. Retain App87ce because it is current Skills main's calendar-scope source; do not replace it with historical App1485 or chase later SDK main.

Extra inbox tuple: App `1485e733571f795cddb896b5b1dc8c59bc6c7f78`, same Sending/SDK. Guard42157819552 selected that App from released Skillsf7da policy and substituted SDK `e3d54482ae198cbf68677338df439579e2c0a5f8`. Its missing published inbox binding was skill `74d2bc70ac8f182249bd78caec0dbd213ef7f9357541cbdacdc17167219abbf7`, contract `a1888741fffcf3c8a3ff751f756f63ca950c5e81d3b58799b701e677f013e13f`. Current App87ce's inbox contract digest is different; a current-only record cannot substitute for that historical binding.

No SDK runtime, publication guard, shared release file, acceptance.json, ClawHub setting, workflow, release version or tag changes. Skills#35 and rename#34 are untouched.

## Every body change

All bodies now require intended credential/endpoint selection before execution and returned-identity verification before content or mutations. Permission alone does not establish identity. Direct credentials remain unset for profile calls; unresolved identity stops task work. CLI/SDK examples clear both environment families in a child. Approval gates and operation examples remain unchanged except the false factual statements listed below.

| Body | Change beyond the common credential/identity condition |
| --- | --- |
| agent-email-inbox | Existing-profile branch explicitly isolated; intended credential/team/mailbox verified before content. |
| email-for-ai-agents | Apply condition before validation or send; message approval and Sending authority retained. |
| sendmux-attachments | Condition precedes every surface, including SDK examples and transfer capability creation. |
| sendmux-cli | Correct QUBRICS-before-SENDMUX credential/profile/base-URL precedence; root/mailbox credential kinds distinguished from three surfaces; candidate Mailbox count53→63; exact wrong-key error restored. |
| sendmux-email-for-agents | Existing configured OAuth profile cannot skip selection/identity protection when login is skipped. |
| sendmux-getting-started | Raw-key profile creation and existing-profile validation isolated; SDK endpoint established before transmitting credentials. Delete only the ambiguous `the owner link, ` from the revocation guarantee. |
| sendmux-mailbox-agent | Same condition on all credential paths; correct optional subject/default and total-recipient requirement. |
| sendmux-management | Raw-key, OAuth and SDK account identity verified before administrative work. |
| sendmux-mcp-setup | Preserve released facts; candidate catalogue150 names92/46/12 =75 tools+75 aliases. Add candidate canonical resource sentence with legacy primary retained. Isolate server/client credentials, endpoints, transport and surface selection. Correct accepted surface-selection alternatives/precedence. |
| sendmux-send-email | Condition before upload/send on every surface; message approval, Sending authority and idempotency retained. |
| sendmux-token-efficient-usage | Protect reused durable profiles and SDK endpoint selection; bounded-read and cheapest-call rules retained. |

Canonical sources for those changes:

- SDK73bed `packages/ts/cli/src/base-command.ts:53-91,130,139`: ambient direct credentials precede profiles; endpoint environment overrides saved profile endpoints. CLI `profiles:set` uses the preferred key. Direct key/token conflict remains enforced.
- SDK73bed `packages/ts/core/src/generated-client.ts:20-24,40-42`: SDK environment credential fallback and inherited endpoint override apply even with an explicit API key.
- SDK73bed `packages/ts/cli/src/base-command.ts:202-206` and `key-kind.ts:32-36`: exact literal is `Command requires a sending API key, but --api-key contains a root API key.` The inaccurate literal pre-existed this PR; requirement prose remains unchanged.
- App87ce `contracts/calendar-20261030/app-openapi.json:9389-9505`: `SendMailboxMessageBody` has no top-level required list; :9487 says subject defaults to empty; :9496 says 1–50 recipients in total across To/Cc/Bcc. The false required-field claim pre-existed this PR. Human message approval remains separate.
- App87ce `src/server/agent-auth/claims.ts:90-100` sets accepted-owner fields; `revocation.ts:141-159` revokes registration/access/claim handles without changing `claimedByUserId` or `claimedAt`. Ops explicitly approved deleting only getting-started's undefined “owner link” phrase after fresh review held it; no claim that accepted-owner association is removed remains.
- SDK73bed MCP `config.py:27-31,122-124,194-200`: prefix, transport, surface and per-surface-key precedence. `cli.py:20-25,80-88` requires an explicit selection and accepts `--surfaces`, `--surface`, then QUBRICS/SENDMUX environment alternatives.
- SDK73bed `packages/python/mcp/sendmux_mcp/mcp-contract.json:7-10`: candidate resource `https://mcp.qubrics.com/mcp`, legacy alias retained. Counts use actual by-surface names; counts are not publication proof.

Generated copies use only `node scripts/build-plugin-bundles.mjs`; all 11 match canonical bytes.

## Validator and assertion changes

PHP expected names are `qubrics/sdk`, `qubrics/sending`, `qubrics/mailbox`, `qubrics/management`, read from SDK73bed Composer manifests. The SDK pin and PHP expectation map change in the same source commit.

Per-surface environment names come from SDK73bed MCP `config.py:13` SURFACES and :197's finite template. Prefix/suffix must not overlap and must enclose a non-empty surface segment. Existing literal-source validation, allowlist and guard enforcement remain. No wildcard API-key exception, blanket QUBRICS twin rule, skip or guard relaxation was added. The existing QUBRICS corpus-scan gap is explicitly outside this PR.

Four additive tests in `scripts/check-skill-drift.test.mjs`: generic `SENDMUX_API_KEY` accepted; bogus key rejected even if SDK prose mentions it; removed surface rejected despite remaining prose; stale Composer name rejected. No old assertion changed. Three required rejection tests were seen red before the implementation and now pass with their strict target-error assertions. Local checker test receipt: 19/19, zero skipped; script logic unchanged since that receipt. Static claims and plugin-byte checks passed again at the settled body commit; full current-head tests belong to the single PR CI.

The only existing eval assertion changes are MCP case7's expected catalogue count and third expectation, updated from the obsolete candidate count to150 names/75 tools+75 aliases. Other case7 assertions and prompt remain unchanged. New final-batch MCP assertions are identical to the retained credential-case assertions, including certification limits.

## Historical failure remains failed

Earlier native task `/root/php4_credential_workflows` produced seven actual guide-only explanations. Their canonical receipts under `evaluations/rebrand-qubrics-php4/credential-isolation/` retain **29/30** passed assertions: inbox5/5, five other bodies4/4 each, MCP4/5. The MCP answer did not explain client-certification limits. Its wrapper disclaimer lies outside its hashed answer and cannot repair that omission. Assertions and failed output/grade remain unchanged.

Those historical hashes do not qualify subsequent body edits. Additional pre-freeze answers also remain historical; no answer is rebound to changed bytes. Final workflow records use only the settled final-batch evaluations and independent source review. Guide-only explanations execute no service commands, retrieve no credentials, read no real mailbox, mutate nothing and send nothing. Synthetic inbox fixture names `mbx_support`, credential source existing authorised profile `work`, with competing `mbx_sales` ambient credential. No live compatibility or statistical claim is made.

## Source-settling review

Fresh independent `/root/skills_final_all11_review` completed the pre-evaluation source audit: all11 reviewed, source-compatible11, incomplete0. This is body settling, not the required post-evaluation fresh qualification.

Historical inbox seven selected operation/schema closures are exactly equal across App1485/App87ce; independently computed audit digest `d904055870a6c504a261adfad4b472e0ac28357709efbc642f88885a0537de60`. That digest is not a guard contract digest. Durable-read fingerprints were independently reproduced: App1485 `03d947b0ae32b4edb4e4e59d11cf16acadc75e3e2adb7c00574338d6ab579539`; App87ce `0623607111959ff36f5477bc07de3ef421de8c67c68332baeb110fe74083691a`. Actual selected changes are team-lock ordering in App `revocation.ts:41-65` and calendar scopes in `metadata.ts:27-42`; mailbox.read, authentication/readiness validation and registration/expiry/revocation-state claims remain supported. No runtime policy read or deployment is claimed.

Post-evaluation fresh reviewers read all 11 whole bodies. Ten unchanged bodies are COMPATIBLE in `reviews/rebrand-qubrics-php4/fresh-body-review-inventory.md`; getting-started was initially held on its undefined “owner link”. Ops approved deleting only that phrase and regenerating its copy. Exactly one subsequent guide-only explanation was independently graded 6/6, and a new independent whole-body reviewer found the corrected bytes COMPATIBLE in `reviews/rebrand-qubrics-php4/owner-correction-fresh-review.md`. The current qualifying set is ten original final-batch cases (52/52) plus the new getting-started case (6/6): **58/58 across all 11 current bodies**. The original final-batch 57/57 remains historical for the superseded getting-started bytes.

Current compatibility evidence uses 11 workflow-tested replacements against App87ce/Sending2f42/SDK73bed, plus one historical App1485 inbox workflow binding. No compatibility record certifies the unchanged, unsafe inbox predecessor. Its published digest74d2bc70 is superseded by evaluated replacement956a19a3 under the existing replacement mechanism. Historical inbox selected contracta1888741 is equal at SDK73bed and e3d; the actual committed index inspection is a separate read-only proof, not a guard rerun or SDK release qualification.

Runtime policy qualification remains the supplied historical snapshot, not a fresh live read. The fresh getting-started reviewer read the existing September30 snapshot with durable registration enabled on its four recorded ready pods; its raw envelope is not claimed to match the later export's snapshot hash. Selected policy binding and source behaviour are distinct from current deployed configuration.

## Publication and remaining authority

Read-only preflight: ClawHub workflow306493143 remains `disabled_manually`; SITE notification307503190 remains active. A later approved merge can dispatch SITE sync; the existing SITE workflow reads the approved Skills release/acceptance and opens a PR, not source-main publication. Re-read settings before merge. No setting changed.

A later pin past PR350 alone needs no different resource text: the inspected MCP contract diff changes provenance hashes only. Broader future changes are unknown. This PR plus a future approved Skills release addresses the reviewed source/evidence prerequisite; no full SDK guard-green claim without its separate qualification authority.

Merge, new Skills release, guard qualification/rerun, tags, Packagist and deletion remain held. PHP SDK#9 stays OPEN/cause-unconfirmed. The held3.53 GiB download is untouched. Management3.0 removals remain `MailboxAppPasswordResultCredential` → `MailboxCredential` and `ProviderCreateBodyQuotasPerDayAnyOf` → `ProviderQuotaRange`; this PR does not alter them. The previously accepted PHP docstring warning remains unchanged.
