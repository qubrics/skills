# Calendar-only CLI source compatibility review

Reviewer: Codex independent source review, 2026-11-20. Evidence kind: `compatibility`.

Goal: review the four changed immutable skill/contract pairs against final SDK source without changing skills, assertions, workflows, pins, publication guards or release state.

## Immutable inputs

| Input | Revision |
| --- | --- |
| App | `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e` |
| Sending | `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| Prior SDK pin | `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577` |
| Preserved calendar SDK | `086e6c40d2d0fb349d06811120aca504555ab6c6` |
| Provisional SDK | `27c2cd1be5fcdcc5376be7a06223a0eca1e8a4ae` |
| Final reviewed SDK | `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e` |
| Published Skills | `9d8059b10111943ce08860217a27222f43507686` |
| Proposed Skills | `b9f7740b704fd21be210ec47a404ab8cdb035d1f` |

The reviewed records' `sourceRevisions` tuple is App `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e`, Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`, SDK `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e`.

I independently called the normal exported `inspectCandidate()` API on `.claude/artifacts/rebrand-qubrics-skills34/cli-calendar-20261120/baseline.candidate.json` and `final-red.candidate.json`, without an inspection-map override. Exactly four of 22 lane/name pairs changed contract digest; all skill digests and the other 18 contract digests stayed unchanged. Results agree with `changed-pairs.jsonl`.

Final inspection identity:

- Candidate digest: `d8c5b87d038a6f975bb647285ff8935eda32ac909ecf631e714cefdf030ac7e4`.
- Policy digest: `b6d364d0a8f3e4a3362a798f99604d26d8142be9f521fa856228fdd9071722da`.
- Checker digest: `f1f80dcac75bdd3f0415db5b5744314ef06bcc23e680c6b886fbd3aaa73e9499`.
- Published skill tree digest: `d1f44a97309ab1353ec3560941e083584ad41327221744424c43174aa5b630f2`.
- Proposed skill tree digest: `0af68429c0cd8ce4acc5dcd67198e84ece78bc05120f1cdd66de252b33e502eb`.

Canonical review boundary: the checker selects generated command names and command modules at [`scripts/skill-compatibility.mjs:219`](https://github.com/qubrics/skills/blob/b9f7740b704fd21be210ec47a404ab8cdb035d1f/scripts/skill-compatibility.mjs#L219), computes selected-contract digests at line 271, and requires an exact review or a genuinely tested replacement at [line 336](https://github.com/qubrics/skills/blob/b9f7740b704fd21be210ec47a404ab8cdb035d1f/scripts/skill-compatibility.mjs#L336). This note supplies source-review reasoning, not an acceptance receipt.

## Source delta inspected

Read-only Git comparisons independently established:

- The prior pin and preserved SDK have identical parsed generated CLI operation objects: 128 operations, comprising Mailbox 63, Management 57 and Sending 8.
- Final SDK has 118 operations: Mailbox 53, Management 57 and Sending 8. There are no additions.
- Exactly ten operations and their ten CLI command modules disappear: `mailboxCreateCalendar` / `mailbox:create-calendar`, `mailboxCreateCalendarEvent` / `mailbox:create-calendar-event`, `mailboxDeleteCalendar` / `mailbox:delete-calendar`, `mailboxDeleteCalendarEvent` / `mailbox:delete-calendar-event`, `mailboxGetCalendar` / `mailbox:get-calendar`, `mailboxGetCalendarEvent` / `mailbox:get-calendar-event`, `mailboxGetCalendarEventChanges` / `mailbox:get-calendar-event-changes`, `mailboxListCalendarEvents` / `mailbox:list-calendar-events`, `mailboxListCalendars` / `mailbox:list-calendars`, and `mailboxUpdateCalendarEvent` / `mailbox:update-calendar-event`.
- Of retained operations, only `managementListDelivery` metadata changes: `calendar.changed` leaves its `event_type` query enum. Method, path, other parameters, key kind and JSON response kind are unchanged. See final [`operations.ts:3953`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/packages/ts/cli/src/generated/operations.ts#L3953).
- `git diff --exit-code 27c2cd1be5fcdcc5376be7a06223a0eca1e8a4ae 4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e -- packages/ts/cli` exited 0 with no output.

The selected CLI public implementation files are unchanged. The selected Mailbox generated SDK file loses calendar functions and their imports; its mapped non-calendar declarations remain. The Management selected generated functions are unchanged. Consequently, CLI contract-digest movement comes from `cliCatalog`; Management contract-digest movement comes from selected `management:list-delivery` metadata.

The enum remains enforced by [`operation-flags.ts:304`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/packages/ts/cli/src/operation-flags.ts#L304). This review does not permit `--query event_type=calendar.changed` against the final source. Historical JSON results remain opaque to the CLI: [`operation-runner.ts:104`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/packages/ts/cli/src/operation-runner.ts#L104) passes data to rendering and [`rawResponseData:590`](https://github.com/qubrics/qubrics-sdk/blob/4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e/packages/ts/cli/src/operation-runner.ts#L590) unwraps `data` without validating a calendar event discriminator. This establishes CLI handling only, not server-side historical-data availability.

## Exact changed pairs

| Lane / skill | Skill digest | Prior contract digest | Final contract digest |
| --- | --- | --- | --- |
| published / `sendmux-cli` | `79f22216d882af6ffa0c246f01204e4f4537065368e15027f7a9f08c931db929` | `4b942f8c64f1b75c7a8d8333eb0253a682b45d538282f3649c38ee972b0083af` | `46af45d935f17006bec9b7cd4745eeabdf192aa7e008357ba924cedc8ae93d51` |
| published / `sendmux-management` | `a82945bdb1521932eef71cfe05264e006ebffd52fde7859c0cc4cfedef72abea` | `3e30984aaeda70b25ed29f680aa2d5fc111905161bb4699c3290338ed1c4a378` | `01fc2993735104063f2d3f3ce795470f10b827e9c68f9392aadab3cb2dcd674b` |
| proposed / `qubrics-cli` | `c7b4ac5db8aef06326e3209d37f7116619cc4778ea5964ca0ac041de09799107` | `19c847f58c6b9346f942cc93d1d08c73f637841fa84ae59c3ab035b381b92f93` | `173d494f78667ca69a49f233e5fcbdb79a178f9df274ec537b67a9af52a878b3` |
| proposed / `qubrics-management` | `ec55108500cd59654717c8d8102088d495e8b923525e8b391e76650a66b00103` | `b66478a9d3191242b95f0c7a0213011a515240a12498b9c063dfd6f42fb3977f` | `caabd66f5a04178c964a749b672d8206f7d7a8c173890027a03c90d9a16dbff1` |

### Published `sendmux-cli`: compatible for retained workflows; catalogue limitation

I read the complete immutable 304-line body and scanned all five files contributing to this skill digest. They contain no calendar instruction, removed operation, removed command or `calendar.changed` value. All 31 concrete CLI command names used in the body still exist. Its examples teach connection checks, registration, profiles, domains, messages, Sending, attachments and logs; none depends on the removed capabilities. Its [command-level help instruction at line 141](https://github.com/qubrics/skills/blob/9d8059b10111943ce08860217a27222f43507686/skills/sendmux-cli/SKILL.md#L141) remains applicable.

Limitation: [lines 130–136](https://github.com/qubrics/skills/blob/9d8059b10111943ce08860217a27222f43507686/skills/sendmux-cli/SKILL.md#L130) describe an unpublished candidate with Mailbox 63. That aggregate is stale when interpreted as this final source, which has Mailbox 53. I do not approve count equality. The count is descriptive catalogue size: it neither selects a command nor supplies an argument nor authorises a calendar workflow. It therefore invalidates no retained operational instruction. This bounded functional-compatibility verdict preserves the immutable published body and explicitly records its historical count limitation.

### Proposed `qubrics-cli`: compatible

I read the complete immutable 304-line body and scanned all five files contributing to its digest. No calendar instruction or removed enum value appears; all 31 concrete commands remain available. [Line 130](https://github.com/qubrics/skills/blob/b9f7740b704fd21be210ec47a404ab8cdb035d1f/skills/qubrics-cli/SKILL.md#L130) explicitly scopes its Mailbox 63 count to published `@qubrics/cli` 2.0.0. Removing calendar from later source does not alter that released version. This is not a claim that final source still has 128 generated commands. The retained examples and help guidance remain supported.

### Published `sendmux-management`: compatible

I read its complete immutable 269-line body and scanned all three digest files. All 32 concrete CLI command names remain present. Its [webhook lifecycle table at line 219](https://github.com/qubrics/skills/blob/9d8059b10111943ce08860217a27222f43507686/skills/sendmux-management/SKILL.md#L219) teaches `management:list-delivery` and `management:get-delivery-payload`, but supplies no calendar filter or calendar event workflow. Removing the untaught `calendar.changed` query option invalidates no documented call. The small-limit, selected-record, root/OAuth permission and secret-handling instructions remain applicable.

### Proposed `qubrics-management`: compatible

I read its complete immutable 269-line body and scanned all three digest files. All 32 concrete CLI command names remain present. Its [webhook table at line 219](https://github.com/qubrics/skills/blob/b9f7740b704fd21be210ec47a404ab8cdb035d1f/skills/qubrics-management/SKILL.md#L219) likewise names delivery and payload reads without teaching `calendar.changed`. Selected Management commands retain their operation metadata apart from that untaught filter value. No instruction needs changing for this source delta.

## Security assertions and existing supersessions

Credential isolation, intended-identity checks, no secrets in arguments/output, key-kind preflight, owner approval before agent sending, OAuth transport boundaries and destructive-action confirmation remain in the reviewed bodies. Existing CLI eval assertions still require wrong-key rejection before network, secret-backed profile setup, protected token storage, retryable failed logout and no OAuth-for-SMTP claim. Management evals retain root/OAuth scope separation and the no-root-key self-registration route. No body, eval, negative assertion, receipt or grading file was edited or newly executed by this review.

The three other published pairs listed in `missing-pairs.jsonl` are not newly changed CLI contracts. Their existing tested replacements remain necessary; this review does not directly approve obsolete imports or executable/setup instructions in those published bodies:

| Published skill / previous digest | Tested replacement / existing workflow record |
| --- | --- |
| `sendmux-attachments` / `f06e0579bf0f3ee52dcffcc23393b323c5fe9050b939e2694b28731d30ca9a5e` | `qubrics-attachments`; `evidence/skill-compatibility/reviews/producer-sync-20261119/qubrics-attachments.json` |
| `sendmux-getting-started` / `aec42bf3c8c21038749fbef5d3753bd689bf74edfcabd79c56b500ea6bf2e21b` | `qubrics-getting-started`; `evidence/skill-compatibility/reviews/mailbox-sdk344-20261112/qubrics-getting-started.json` |
| `sendmux-mcp-setup` / `cabb71c6b068c8223d53e0ea5e0a39c788e1bff606b5fdfb48b141e6c530c224` | `qubrics-mcp-setup`; `evidence/skill-compatibility/reviews/calendar-free-20261120/qubrics-mcp-setup.json` |

The pinned policy resolves each replacement to an existing `kind: workflow` record whose `previousSkillDigest` exactly equals the published digest above. Their proposed skill/contract digests are unchanged by final SDK source. Preserve their existing evidence and assertions; do not replace these workflow records with direct compatibility approval of the legacy bodies. The checker explicitly requires that tested-replacement provenance at lines 340–346.

## Verification limits

This is a genuine immutable source review. Normal `inspectCandidate()` comparisons, generated-object comparisons, complete affected-body reads, skill-tree calendar scans, concrete command-presence checks and Git diffs were performed read-only. No SDK edits, live API calls, installation, runtime CLI execution, new eval execution, acceptance retry, synthetic acceptance, workflow change, stale pin, guard bypass, commit, PR, release, tag or publication occurred. Earlier handoff test/build claims were not rerun and are not promoted to new execution evidence here. Published calendar versions remain unchanged.
