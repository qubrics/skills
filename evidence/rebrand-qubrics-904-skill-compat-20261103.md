# Webhook compatibility for exact App 597957b2

Source-only prerequisite for qubrics/qubrics#904 and the domain verification
release. This branch starts at skills#37 commit
`5e9e4b651415d3a3b1d66124101d1b8017846840`; that PR and its branch are untouched.
Hold this PR unmerged until cutover #902. No build, publish or deployment.

## Reviewed tuple and rejection

| Input | Immutable identity |
| --- | --- |
| App | `597957b2d0f5f01c3dfd1204a17950473b60aff9` |
| Sending | `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| SDK | `1812300f1f30102ed0e624bc92cd92224cdf867d` |
| Published skills | `fc7c11647c3bb9f6ba80e0aa6679ad6895d94ce1` |
| Proposed baseline | `5e9e4b651415d3a3b1d66124101d1b8017846840` |

The exact App export receipt binds source tree
`d28c4b8f8a98e0c388ccb55b26eb3ee34098d2df`, lockfile SHA-256
`be149ac16aec55edfad51a4535fb06eb1ab52239a9cb963b29e931ee812f2463`,
OpenAPI SHA-256 `28f2fc773b1470057b5ff5bab9c4e00f6d4a34925dbee91e3b57bc0057355656`
and policy SHA-256 `c4c2ce35effd8a55ad3eb4880c77cefdf554e3b7778285d457ff8ec162519d1e`.
The unchanged full candidate checker rejected this tuple before the new records:

```text
Skill compatibility failed: proposed/sendmux-cli requires a compatibility review or workflow evidence for 16c749378304a289b72a3b8646262364fe92c4e6c45c4fc6a4f31eeb60b52793
```

The real checker is the red/green seam; no new harness or assertion is needed.
Its referenced-schema traversal at `scripts/skill-compatibility.mjs:145-169`
includes the webhook schemas. `acceptSkill()` at lines 313-330 requires an exact
body/contract binding and preserves workflow supersession for older bodies.

## Complete-body source review

The independent source reviewer read the three complete proposed skill bodies
and their relevant workflow references. The coordinating reviewer adopts that
review and verified the exact exported-source comparison. Against the preceding
App `e0462ea3569e381218fb402eadca1acd824bd020`, there are nine changed leaves:
seven descriptions, one example addition and one optional correlation property.
They affect six webhook schemas and `POST /webhooks/{public_id}/test`.
Existing required arrays, operation inputs, scopes/security, API servers and
selected policy fingerprints/runtime values retain their values.

`WebhookEventData.qubrics_message_id` is optional and nullable; it equals the
retained `sendmux_message_id`. Historical retained or queued payloads may omit
the alias (`src/app/api/v1/_lib/schemas/webhooks.ts:46-55`). Header descriptions
pair the Qubrics and Sendmux event/signature/timestamp names. Exact-body HMAC,
timestamp-prefixed V2 signing, freshness and constant-time comparison remain;
secret disclosure still occurs only on create/rotate (`webhooks.ts:298`).

| Skill | Affected selected contract and retained instruction |
| --- | --- |
| sendmux-cli | `managementCreateWebhook` reaches the changed `WebhookSubscriptionWithSecret` description. Profiles, root/mailbox key classification, owner-approved sending and flags remain correct (`skills/sendmux-cli/SKILL.md:14-23,99-169`). |
| sendmux-management | Create/rotate reach that secret schema; get-delivery-payload reaches the mail/calendar webhook union and data; test reaches `WebhookTestResponse`. Scope mapping, confirmation, idempotency and one-time secret handling remain correct (`skills/sendmux-management/SKILL.md:14-22,201-224`). |
| sendmux-mcp-setup | `managementCreateWebhook` reaches the changed secret description. Setup, transports, endpoint, credentials and the existing canonical tool names remain valid (`skills/sendmux-mcp-setup/SKILL.md:14-27,35-77,431-446`). |

The App proxy accepts canonical registered tools and their single `qubrics_`
alias through the same surface, permission, grant and mailbox checks
(`src/server/mcp/proxy.ts:338-375,393-403,497-507`). The fixed SDK still supports
the existing `SENDMUX_*` instructions. This review does not claim SDK
`1812300f` implements new `QUBRICS_*` settings, nor qualify the later SDK345
release for distribution. Legacy contracts remain supported; no instruction
replacement is required for this exact tuple.

## Binding and verification boundary

Three supplemental records append to the existing map. CLI and MCP reuse their
unchanged exact-body workflow records, retaining `previousSkillDigest` and all
historical benchmark, execution, grading, receipt and output hashes. The current
review is additional source evidence; those artifacts are not fresh evaluations
of App `597957b2`. Management uses one compatibility record for its identical
published/proposed body. Older CLI/MCP catalogue text remains superseded, not
newly approved. Existing review limitations remain, including unqualified
illustrative error wording and earlier catalogue exclusions.

No skill bytes, dependency selectors, existing records, pinned release inputs,
checker or publication manifest changes. Source records bind the three measured
contract digests; the full unchanged checker must accept all 22 lane entries
from the committed candidate. Native CI and acceptance receipts are reported
on the PR. Rollback is revert of this source commit.

Local receipt directory:
`/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-904/skills-compat/`.
`red.log` records exit 1; `source-comparison.log` records nine leaves and unchanged
policy/runtime values, exit 0. Exact exports remain in the domain verification
packet's `skills-597957b2/` directory. These source proofs do not establish
installed-client, live-service or published-artifact compatibility.
