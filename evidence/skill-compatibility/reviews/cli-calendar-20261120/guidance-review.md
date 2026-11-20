# Calendar-free CLI catalogue guidance review

Reviewer: `/root/cli_calendar_source_review`, 2026-11-20. Evidence kind: `compatibility`; immutable source review, not an evaluation execution or acceptance receipt.

Source status: SDK `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e` is held/provisional pending a separately owned PHP mail-history correction. This review binds only the actual inputs below; it does not qualify a final canonical source, acceptance or publication. A revised SDK revision requires the coordinator's normal candidate comparison and binding.

**Verdict: compatible.** The two-line correction in current `qubrics-cli` makes its catalogue describe the reviewed calendar-free candidate: Mailbox 53, Management 57 and Sending 8 generated operations. It replaces the released-2.0.0 qualifier with candidate-source wording and tells readers to verify the published version before relying on the commands. This corrects current guidance rather than weakening the source-count guard or claiming a release occurred.

## Exact binding

| Input | Identity |
| --- | --- |
| Proposed Skills revision | `c7ffd96a34a0657fc0675897626ab096fd2c8360` |
| Published Skills revision | `9d8059b10111943ce08860217a27222f43507686` |
| Skill | `qubrics-cli` |
| Skill digest | `0ebe390e7cccdb0291c739124a58d120623dd70c54f0662f42931a073a2844bb` |
| Body SHA-256 | `61184c673ac72af711af1100370eaa9a2f45ff83263492bef042ee1f0d08580d` |
| Contract digest | `173d494f78667ca69a49f233e5fcbdb79a178f9df274ec537b67a9af52a878b3` |
| Candidate digest | `40f7a697c63e03bd1d9dfa07c583039662bb75d462998c4f261263934e31eee9` |
| App source revision | `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e` |
| Sending source revision | `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| SDK source revision | `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e` |

I obtained these bindings through the normal exported `inspectCandidate()` API using `.claude/artifacts/rebrand-qubrics-skills34/cli-calendar-20261120/guidance.candidate.json`, without an inspection-map override. The SDK source and selected contract digest are unchanged from the original source review.

## Reviewed change and evidence

- [`skills/qubrics-cli/SKILL.md:130`](https://github.com/qubrics/skills/blob/c7ffd96a34a0657fc0675897626ab096fd2c8360/skills/qubrics-cli/SKILL.md#L130) now qualifies the catalogue as calendar-free candidate source; line 135 changes Mailbox 63 to 53.
- Comparing `592ce171..c7ffd96a34a0657fc0675897626ab096fd2c8360`, I verified that applying exactly those two line substitutions to the previous complete body produces the new complete body. All other instructions, including command-level help at line 141 and credential/identity, key-kind, OAuth, owner-approval and destructive-action boundaries, remain byte-for-byte unchanged.
- A read-only command-presence check found all 31 concrete command names taught by the body in reviewed SDK source, with none missing. Parsing its generated operation manifest independently yielded Mailbox 53, Management 57 and Sending 8. The wording does not teach any removed calendar command or the removed `calendar.changed` query value.
- Both committed CLI mirrors, `plugins/qubrics/skills/qubrics-cli/SKILL.md` and `plugins/sendmux/skills/qubrics-cli/SKILL.md`, exactly match the canonical corrected body. The remaining diff contains version metadata. No `scripts/` or `skills/qubrics-cli/evals/` file changed in that comparison.
- [`scripts/check-skill-drift.mjs:1336`](https://github.com/qubrics/skills/blob/c7ffd96a34a0657fc0675897626ab096fd2c8360/scripts/check-skill-drift.mjs#L1336) requires the current guide's counts to match generated source counts. I read the existing `static-count-red.log` and `static-count-green.log` under the same task artifacts: they respectively report `CLI Mailbox command count guidance drift` and `Qubrics skill drift check passed.` These are coordinator execution logs, not new executions by this reviewer.

## Preserved limits

The original `source-review.md` remains unchanged at SHA-256 `23a3ccd963f9beff8b94292e108e72c22d38f81330d929673e75c6125e0ccf4d`. Its published `sendmux-cli` aggregate-count limitation remains explicit: the old candidate Mailbox 63 figure is descriptive and stale against final source, while all its retained operational instructions remain supported. This follow-up changes only current guidance; it does not rewrite an old published skill or calendar package version.

No assertions were altered or newly evaluated. Existing negative/security assertions and the three existing tested legacy replacements retain their original provenance. This review introduces no new evaluation receipt, runtime/install proof, SDK edit, workflow change, acceptance retry, guard bypass, commit, release, tag or publication claim.
