# Management compatibility for API916/917

Source-only prerequisite for qubrics/qubrics#897. Hold this PR unmerged until
cutover #902. No skill instructions, dependency selectors, pinned release inputs,
checker code or publication manifests change. Rollback is a revert of this commit.

## Reviewed tuple

| Input | Immutable identity |
| --- | --- |
| App | `e0462ea3569e381218fb402eadca1acd824bd020` |
| Sending | `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| SDK | `1812300f1f30102ed0e624bc92cd92224cdf867d` |
| Skills baseline | `100dd51541aa790b30ec3b72025c6075c342e76e` |
| Published skills | `fc7c11647c3bb9f6ba80e0aa6679ad6895d94ce1` |
| Management skill digest | `497f5468ad5a842c9d26e2580851df58e25a24a4465f08a0ddac1b4b3cc6c30f` |
| New selected contract | `321ab22736f5e977ceb61a6bc6b9a943f30fa5b0953525ea10ba87b1c0903caa` |

The builder's App export receipt binds source tree
`a20235e11b549a6b61d12da4877baa10d8eac324`, lockfile SHA-256
`be149ac16aec55edfad51a4535fb06eb1ab52239a9cb963b29e931ee812f2463`,
OpenAPI SHA-256 `a2e51172a77475009a355060de64a2ecb93dbbbf590bee5de817a32564a08ced`
and policy SHA-256 `12f3f3a79cf1a5248cdba0f9b585f9e8134ea48898ebad0ed88ac7e612eb9f94`.

## Rejection and origin

The unchanged full checker, `node scripts/check-skill-drift.mjs --candidate
<descriptor> --receipt <acceptance>`, exits 1 on the baseline tuple:

```text
Skill compatibility failed: published/sendmux-management requires a compatibility review or workflow evidence for 321ab22736f5e977ceb61a6bc6b9a943f30fa5b0953525ea10ba87b1c0903caa
```

`scripts/skill-compatibility.mjs:145-169` retains referenced schemas in each
selected contract. App API917 names the two existing webhook payload schemas
and emits their explicit discriminator mapping at
`src/app/api/v1/_lib/schemas/webhooks.ts:124-139`. These schema references change
the contract digest from `9eaed72398dc82ebdcbfa32a887a70255c38b7887c37585e56f3e9aea62aff7b`.
The skill body has the same digest in published and proposed lanes, so it has no
different-body replacement fallback. `acceptSkill()` correctly requires a new
committed, hash-bound compatibility review; no gate is bypassed.

## Source review

The coordinating Codex reviewer read the complete unchanged management skill.
Compared with the accepted App `4d48b8dfee6bd2c63d7e0a8e324edd2ec8c5b814` export:

- All 43 selected management operation objects, paths and methods are identical.
- `MailWebhookEventPayload` equals the former first inline union member.
- `CalendarWebhookEventPayload` equals the former second inline union member.
- The discriminator uses `type`, maps exactly the existing nine event values,
  and directs each value to the schema whose existing enum contains it.
- Policy fingerprints and runtime values are unchanged. The snapshot hash
  changes with the source revision; it does not change the runtime-value hash.
- Calendar DELETE and Calendar GET JSON `data.etag` are outside the management
  selectors. No Calendar operation is selected by this skill.

The management webhook instructions still use the same operations, scopes,
idempotency headers and one-time secret handling. Root-key/OAuth authority,
confirmation before destructive calls, mailbox-runtime handoff and all public
identifiers remain valid. The prior review's workflow evidence and limitations
remain applicable; this record makes no claim about newer SDK releases or skill
publication. The existing record for the previous contract remains untouched.

## Verification and release boundary

The real full candidate CLI is the red/green seam; no new test or harness is
needed for this data-only binding. It checks both skill lanes and verifies the
committed map, record hash, evidence hashes and producer receipts. The final
acceptance log and native PR CI are linked from the PR.

Local evidence directory:
`/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-897/management-compat/`.
`red.log` records exit 1; `source-comparison.log` records the assertions above,
exit 0. The exported candidate inputs remain under the sibling
`release-v324-build/skills-v1.8.324.gvVKzV/` directory.

This PR authorises neither merge nor publication. Image-less v1.8.324 remains
immutable. Its one authorised builder retry waits for the literal `SLOT: 897`;
app-only deployment retains its separate live-at-cut rollback and slot gates.
