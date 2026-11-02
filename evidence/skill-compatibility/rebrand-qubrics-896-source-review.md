# App rebrand supplemental source review

This review covers App `404f52ee1eb02858a0d3e9e082ab2afd64586948`
against the preceding reviewed App `87ce115810ebcfa91655295603c27af52fcff96f`.
Sending remains `2f4226655efc05f109b5feda50ed2ca1570aea91`; SDK remains
`1812300f1f30102ed0e624bc92cd92224cdf867d`. Skills source is the unchanged
`0d7dcbb051206025d66db354d074dc604bb5aa21` tree, with published predecessor
`fc7c11647c3bb9f6ba80e0aa6679ad6895d94ce1`.

This source-only prerequisite for qubrics/qubrics#896 follows qubrics/skills#32.
It adds evidence and supplemental review bindings without modifying skill
instructions, prior records, selectors or pinned release inputs. Rollback is
revert. It does not authorise or certify publication or an app deployment.

## Observed rejection and cause

The canonical app release check rejected the exact merged source:
`published/agent-email-inbox requires a compatibility review or workflow evidence for 2340d4ea27464cd766ddd9a35e05b5d1c1d9a95b8b2bb549f677993fb24f97f9`.
The same candidate with the previous App source was accepted. Descriptions and
selected source declarations are deliberately included in contract digests;
this review does not weaken that policy.

`evaluations/rebrand-qubrics-896/release-skill-openapi-leaf-proof.json` records
all eight changed OpenAPI leaves. Every change is a product title or description
rename. Paths, methods, parameters, schemas, required fields, scopes, credentials,
hosts and compatibility identifiers retain their values. In particular,
`sendmux_message_id` remains the field name.

`contracts/rebrand-qubrics-896/app-export.json` binds the exact source tree,
lockfile, exporter, OpenAPI and policy artifact hashes. The policy comparison
records an unchanged registration runtime fingerprint and unchanged durable-read,
storage and delegated-sending groups. Only the registration code fingerprint
changes: the invitation sender display label changes from `Sendmux` to `Qubrics`.
Source review at the exact App revision confirms that this is the only selected
registration declaration change. Resource display labels also change without
changing resource URLs or scopes; those labels are outside the policy selectors.

## Coverage and prior workflow evidence

Two independent source reviewers read all nine affected complete skill bodies
and their published predecessors. The coordinating reviewer adopts those
findings. Proposed bodies remain compatible with these copy changes:

| Skill | Retained instruction boundary |
| --- | --- |
| agent-email-inbox | Bounded read-only triage and untrusted message content |
| sendmux-attachments | Separate attachment flows and byte limits |
| sendmux-cli | Pinned command catalogue, profiles and credential selection |
| sendmux-email-for-agents | Registration, owner acceptance and separate sending approval |
| sendmux-getting-started | Setup authority, scoped credentials and owner approval |
| sendmux-mailbox-agent | Existing mailbox operations and credential restrictions |
| sendmux-management | Root-key administration and unchanged public identifiers |
| sendmux-mcp-setup | Existing released tool catalogue and setup boundaries |
| sendmux-token-efficient-usage | Bounded reads, compact results and unchanged operations |

The raw missing-review inventory contains 14 distinct affected tuples after
deduplicating shared lanes and excluding the already-superseded Sending tuple.
Nine supplemental proposed-body records cover them: four also match identical
published bodies; five retain `kind: workflow` and their exact published
predecessor digests, so those published bodies remain superseded. Do not create
compatibility approvals for the five unsupported predecessors. This is the
existing `acceptSkill` mechanism at `scripts/skill-compatibility.mjs:313-328`.

The CLI, mailbox, MCP, router and getting-started records retain genuine
historical workflow artifacts for their unchanged exact bodies. Historical
outputs, grades, benchmark results and execution receipts keep their original
paths and hashes. They are not new evaluations of App `404f52ee`. Fresh evidence
here is the complete-body source review, exact App export and measured contract
comparison. No skill bytes changed, so no synthetic new model scores are claimed.

The original calendar source review's limits remain: superseded catalogue and
credential guidance is not approved again; illustrative CLI error wording and
the previously excluded mailbox required-field copy are not qualified here.
This review does not qualify new Calendar clients, installed SDKs or MCP tools,
live registration, credential exchange, mailbox mutations, sends or delivery.

## Validation boundary

The review index appends only nine supplemental entries. Every prior entry,
its order, the selectors and the release inputs remain unchanged. Ops approved
this shared-index exception for #35; its owner will rebase at cutover. All other
changes are new evidence files. Exact candidate acceptance and CI provide the
qualification receipt separately from this source review.

ClawHub workflow `306493143` was read back as `disabled_manually`; its environment
has no approval protection, and its source publishes on main pushes including
evidence changes. Preserve its disabled state and verify it again before merge.
No workflow or repository setting was changed. No version, tag or release was
created; publication and production writes remain prohibited while calendar-api
holds the rollout slot.
