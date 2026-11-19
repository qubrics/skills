# Calendar-free MCP compatibility correction

Status: source PR preparation, not merged or released. Refs #34 and SDK #344.

## Cause and release attribution

The exact default Skills v2.0.7 checker fails SDK candidate
`ff61155fb25c77fa7794c68a4b9f3a6eaaba5577` with
`Skill compatibility failed: Missing MCP tool: mailbox_create_calendar`.
This was reproduced through the unchanged public checker, using the genuine
SDK owner's immutable candidate descriptor. No synthetic SDK tree or acceptance
receipt was supplied.

Calendar teaching and selectors entered through [PR48](https://github.com/qubrics/skills/pull/48),
commit `3c71cfd73d7266d9b8590496710db8f23ab6b980`. The failing selector remains in
[v2.0.7 policy line 1764](https://github.com/qubrics/skills/blob/8a7628e1118f7fad67dfaa631ff025ba73f3f596/skill-compatibility.json#L1764),
and its matching instruction is in
[the mailbox skill line 286](https://github.com/qubrics/skills/blob/8a7628e1118f7fad67dfaa631ff025ba73f3f596/skills/qubrics-mailbox-agent/SKILL.md#L286).
The operator's 17 November calendar exclusion is recorded in the local Ops
decision log at `/Users/rj/.claude/tasks/superset-drive/decisions.md:557`.
It holds new public calendar work while existing live endpoints stay unchanged.
That decision had not reached this Skills teaching or dependency map.

[PR52](https://github.com/qubrics/skills/pull/52) then changed MCP setup branding,
not the mailbox calendar requirements. Its inherited release input still pins
calendar-bearing SDK `c8549be2099e5a2f6947262bbeaf6f5e8b678801`, explaining why
its 57 tests and actual-main acceptance passed while the calendar-free source
failed. This is a source/pin coverage gap, not a broken receipt or disabled guard.

GitHub [release v2.0.7](https://github.com/qubrics/skills/releases/tag/v2.0.7)
was published at `2026-11-19T12:37:50Z` by account `roshanjonah`, at exact
`8a7628e1118f7fad67dfaa631ff025ba73f3f596`. Sole asset `767640558` has SHA256
`1db9b03c49d54ae1336f1de75d985012c0ba14e7192bdb90a3af572225a25efb`.
The `rebrand-audit-fixes` lane records performing it in its
`skills-v207-proof.md` and Ops ping at epoch `1795091906`. Its recorded authority
is the audit's standing merge/deploy approval (Ops decision 689 and audit
directives, 19 November 22:23). The reviewed files contain no separate exact
v2.0.7 release GO. Attribution is to the agent lane using that account, not proof
of a human click. No repository workflow has a release/tag trigger.

## Minimal source correction

- Remove calendar instructions, calendar trigger matches and OpenClaw calendar
  description from the public mailbox skill; regenerate both plugin copies.
- Remove the ten calendar selectors from each affected mailbox App, MCP, CLI
  and TypeScript-public selection. Keep every non-calendar selector and all
  historical evidence. No MCP runtime selector changes.
- Pin existing CI to genuine calendar-free SDK `ff61155f`. Update the setup
  guide and its compatibility eval to that source's unpublished 3.0.0 package
  and 130-tool catalogue (72 Mailbox, 46 Management, 12 Sending; 65 aliases).
  Preserve released Sendmux 2.2.0 guidance and all security boundaries.
- Review changed pairs through the existing compatibility/workflow evidence
  mechanism. Existing checker and SDK guard remain unchanged.

Canonical approach: `docs/regen-update-playbook.md` requires affected skills,
evals and metadata to follow verified source facts, then pass the drift checker.
The already-decided calendar hold supplies the product direction.

## Verification and limits

Original red command and its exit 1 are retained under MAIN
`.claude/artifacts/rebrand-qubrics-skills34/calendar-free-20261120/baseline-red.log`.
It runs v2.0.7 `scripts/skill-compatibility.mjs --candidate` on the original
SDK owner's `ff61155f` descriptor, without overrides.

Local static claims pass with the exact calendar-free SDK and the unchanged
producer exports. The existing compatibility tests pass 25/25, zero skipped.
Both changed skills pass the existing quick validator; plugin bundles match.
Five focused MCP drift cases pass, zero skipped. Both local packages contain
three files in total, byte-identical to source; the task-owned package cache
was deleted and verified absent after comparison.

[Genuine separate-arm evaluations](skill-compatibility/evaluations/calendar-free-20261120/provenance.md)
pass 14/14 setup and 4/4 calendar-boundary assertions, versus historical
6/14 and 1/4. The [independent source review](skill-compatibility/reviews/calendar-free-20261120/source-review.md)
supports six exact direct records and the new exact-body MCP workflow. Existing
attachment and getting-started workflows retain their three-way legacy
supersession path alongside MCP setup; historical records remain unchanged.
The unchanged public checker accepts committed Skills
`700917ed5fe586f78c9010af0c18f6fae5387ec4` against exact SDK `ff61155f`: 22/22
pairs accepted (7 reviewed, 12 no-impact, 3 tested legacy supersessions), exit 0.
The genuine descriptor, acceptance.json and command output are retained under
MAIN `.claude/artifacts/rebrand-qubrics-skills34/calendar-free-20261120/` as
`final-candidate.json`, `final-acceptance.json` and `final-acceptance.log`.
Checker SHA256 remains `f1f80dcac75bdd3f0415db5b5744314ef06bcc23e680c6b886fbd3aaa73e9499`.
Full CI is not yet claimed. No new test harness or dependency was added:
the exact calendar-free CI pin makes the existing acceptance gate the permanent
regression boundary. The checker and all its negative/security tests remain.

Changed public snippets received a fresh-reader critique (all applicable rubric
items pass), one humanize pass with no further edits, and protected-set check.
Source versions, protocol dates, catalogue figures, source identity and existing
authentication/alias boundaries are exact. This source correction does not
claim a new description-optimisation run or installed-client certification.

## Following release boundary

A merged record alone cannot satisfy the default SDK selector:
[`.github/actions/skill-release-checks/action.yml:25-35`](https://github.com/qubrics/qubrics-sdk/blob/ff61155fb25c77fa7794c68a4b9f3a6eaaba5577/.github/actions/skill-release-checks/action.yml#L25)
downloads latest Skills release's acceptance.json and selects its bound revision.
[`scripts/publication-guard.mjs:70-88`](https://github.com/qubrics/qubrics-sdk/blob/ff61155fb25c77fa7794c68a4b9f3a6eaaba5577/scripts/publication-guard.mjs#L70)
then recomputes acceptance against the exact SDK source and snapshots.

After separate merge approval and successful actual-main CI, the next step is
an exact ASK for GitHub `v2.0.8`, latest/non-prerelease, at that merge commit,
with only its unmodified actual-main acceptance.json artifact. No release/tag
is authorised now. Selector rollback would mark v2.0.7 latest; source rollback
is a normal revert PR. Neither recalls downloaded source or tags. ClawHub stays
disabled; no marketplace, SDK, npm or live calendar action belongs to this PR.

## Completion boundary

Source correction and genuine exact-candidate acceptance are local and committed;
PR checks and review remain the current slice's gate. Merge, main CI and release
are separate Ops decisions. Current marketplace/package metadata stays at 2.0.4;
the proposed GitHub acceptance release would not republish those distributions.
No browser, provider process or new dependency was used. Task package cache was
removed; the unmerged working sibling and cited evidence remain for review.
