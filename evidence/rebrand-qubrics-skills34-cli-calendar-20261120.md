# Calendar-free CLI compatibility — Skills #34

Goal: qualify the final calendar-removal SDK source through the existing Skills origin review path. This is compatibility evidence, not SDK release approval or a marketplace publication.

## Immutable inputs and measured failure

Canonical SDK source is `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e`, public [SDK PR395](https://github.com/qubrics/qubrics-sdk/pull/395) head after the Go mail-model correction. Ops supplied that identity; GitHub commit readback confirms it. Its CLI tree is byte-identical to provisional `27c2cd1be5fcdcc5376be7a06223a0eca1e8a4ae`; genuine acceptance binds the final source, not the provisional one.

Published Skills remain `9d8059b10111943ce08860217a27222f43507686`. Initial proposed Skills are `b9f7740b704fd21be210ec47a404ab8cdb035d1f`. Producer inputs remain App `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e` and Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`; their committed exports and policies are unchanged.

The unchanged checker was run on the real final SDK commit with a descriptor produced by its normal `--prepare-candidate` entry point. Exit 1:

```text
Skill compatibility failed: published/sendmux-cli requires a compatibility review or workflow evidence for 46af45d935f17006bec9b7cd4745eeabdf192aa7e008357ba924cedc8ae93d51
```

## Cause and smallest change

[`scripts/skill-compatibility.mjs:128`](../scripts/skill-compatibility.mjs#L128) reads the immutable CLI operation manifest; lines 219–220 select its catalogue, line 271 hashes selected contracts, and lines 336–351 require exact skill/contract review evidence. Removal changes two CLI catalogue contracts and the two Management contracts selecting `management:list-delivery`. This is intended guard behaviour: the new contracts lacked origin review records.

Canonical per that checker: append genuine compatibility reviews for the four changed pairs, pin CI to the final public SDK source, and retain all existing dependencies, rename/workflow provenance, historical reviews, negative assertions and security checks. No checker, guard, skill body, runtime selector or workflow trigger changes are required.

Exact immutable operation comparison against previous pin `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577` proves 128 → 118 operations: ten calendar commands removed, zero additions. The only changed retained operation is `managementListDelivery`, whose `event_type` enum loses only `calendar.changed`. Auth, profile selection, registration/readiness, Sending token exchange, operation runner and operation flags are unchanged.

The [independent source review](skill-compatibility/reviews/cli-calendar-20261120/source-review.md) gives each pair's decision and limitations. No removed calendar command or enum is taught by the affected skill bodies. The legacy published CLI's advisory candidate count remains 63 mailbox operations rather than the new 53; all 31 concrete commands it teaches remain available, and it requires command-level help. Compatibility does not assert count equality. Proposed CLI count explicitly describes published `@qubrics/cli` 2.0.0. Old published versions remain untouched under operator rule 12.

| Lane / skill | New contract digest |
| --- | --- |
| published / sendmux-cli | `46af45d935f17006bec9b7cd4745eeabdf192aa7e008357ba924cedc8ae93d51` |
| proposed / qubrics-cli | `173d494f78667ca69a49f233e5fcbdb79a178f9df274ec537b67a9af52a878b3` |
| published / sendmux-management | `01fc2993735104063f2d3f3ce795470f10b827e9c68f9392aadab3cb2dcd674b` |
| proposed / qubrics-management | `caabd66f5a04178c964a749b672d8206f7d7a8c173890027a03c90d9a16dbff1` |

## Verification and release boundary

Five focused existing guard tests passed, zero failures or skips: exact-candidate receipt, renamed release receipt, changed catalogue review, read-only inspection-map boundary, and A13 tested supersession. No tests were added, removed or weakened.

Normal exact acceptance at committed Skills `2b04fe210b0eabf485b25cf54fbd2fcc4c32d224` exited 0 for final SDK `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e`: accepted=true, 4 reviewed, 15 no-impact and 3 tested supersessions, all 22 pairs. Candidate digest `accd485c6a9a158bc63cc0c1dc6bb90fb9db9682828900d0b91dcfc2f96b8abd`. `reviewed.candidate.json`, `reviewed.acceptance.json` and `reviewed-pass.log` are the checker's own outputs. The initial prepare invocation used an abbreviated Skills SHA and was rejected by immutable-SHA validation; corrected to the full commit before acceptance. No source, assertion or record changed in that correction.

The four appended records bind their exact bodies and independent source-review bytes. All 191 historical reviews, dependencies and the rename map compare equal to the previous committed values. CI now checks out the final public SDK SHA. No skill content or bundle metadata changes: OpenClaw/plugin versions remain 2.0.4; the prospective GitHub release carries compatibility evidence. PR/main CI and the sole actual-main artifact identity belong in the release ASK after their measured result.

Merge alone cannot change the SDK default selector. At the exact final SDK source, [`.github/actions/skill-release-checks/action.yml:25–35`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/.github/actions/skill-release-checks/action.yml#L25) selects the latest Skills release, downloads `acceptance.json`, and takes its proposed revision. [`scripts/publication-guard.mjs:70–88`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/scripts/publication-guard.mjs#L70) binds the immutable checker and recomputes exact publishing-source acceptance. Latest `v2.0.8` cannot see new main-only records. A separate exact `v2.0.9` GitHub release/tag ASK must name the actual-main CI artifact and its SHA-256; no release/tag is authorised by this PR.

Raw receipts: Skills MAIN `.claude/artifacts/rebrand-qubrics-skills34/cli-calendar-20261120/` contains `final-red.candidate.json`, `final-red.log`, `changed-pairs.jsonl`, `missing-pairs.jsonl`, `cli-operations.diff`, `operation-delta-proof.log` and `focused-guard-tests.log`. SDK owner handoff is MAIN SDK `.claude/tasks/rebrand-qubrics-sdk344/calendar-source-skills-cli-handoff-20261120.md` with its own red/green CLI regression and build receipts. No SDK writes, SDK workflow rerun, production fixture mutation, synthetic acceptance, stale source pin, package publication or marketplace action occurred.

Cursor public marketplace HTTP 200 and settled Qubrics search returned **No results found** at `2026-11-20T00:20:20.752Z` (11:20 AEDT). Owned tab closed and Playwriter session 62 deleted. Public listing/installability remains outside review and unproven; no submission or operator status request.

Status: genuine exact-source compatibility PASS on the committed origin records; PR/main gates pending, not released. Rollback is a normal revert PR; any latest-release selector change requires its separately approved release packet. Full #34 remains open for Cursor public listing/installability.
