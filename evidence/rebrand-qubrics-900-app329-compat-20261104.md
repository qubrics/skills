# Source compatibility for App329

Source-only prerequisite for qubrics/qubrics#900, owned by #904. Stacked on
skills#38 at `0373437d3fc145017d72a29a8e433275ef78c7d9`; parent #38 and #37
remain untouched. Hold this PR unmerged. No skill body, selector, checker,
historical evaluation, release input, build, publication or deployment changes.

## Exact inputs and red

| Input | Revision |
| --- | --- |
| App | `a7b11f3d980720f973b7ee615e7662f03e2a3ad7` |
| Sending | `2f4226655efc05f109b5feda50ed2ca1570aea91` |
| SDK | `1812300f1f30102ed0e624bc92cd92224cdf867d` |
| Published skills | `fc7c11647c3bb9f6ba80e0aa6679ad6895d94ce1` |
| Proposed baseline | `0373437d3fc145017d72a29a8e433275ef78c7d9` |

The immutable App export binds source tree
`080216f866ee5da6ad5fd78a63b3d14a700489fd`, lockfile SHA-256
`be149ac16aec55edfad51a4535fb06eb1ab52239a9cb963b29e931ee812f2463`,
OpenAPI SHA-256 `1d49dc00e00b86837041b76cdb0676d96c68317ec74354d6a5acf4cf2ff0e73c`
and policy SHA-256 `d2f1784301a1c849b994bbff4fc4885eef5e0fd2c75edeb92c855f0247ab9cbd`.
The unchanged official checker rejected the baseline with exit 1:

```text
Skill compatibility failed: published/agent-email-inbox requires a compatibility review or workflow evidence for 0a8e457146fd0dc54d9d265e20235c1d70e06683480580660e7c749ed4d91a56
```

All 22 lane tuples and 17 distinct body/contract tuples change because the
selected contract includes the global OpenAPI server
(`scripts/skill-compatibility.mjs:145`). Acceptance requires exact bindings or
tested workflow supersession (`:310-330`). This is missing review coverage,
not permission to bypass the gate or approve obsolete instructions.

## Source and policy review

Two independent reviewers examined the source/policy changes and all 11 skills
in both lanes. The coordinating reviewer adopts those findings. Compared with
App `597957b2d0f5f01c3dfd1204a17950473b60aff9`, nine OpenAPI leaves change:
global server, OAuth description/resource and authorisation/token/refresh URLs,
two attachment URL examples, mailbox server example and MX target example.
Operation shapes, request/response fields and security requirements are retained.

Eight selected policy declarations change. Registration resolves the approved
initiating host (`src/app/agent-auth/agent/identity/route.ts:39`), passes it into
new/replayed assertions (`src/server/agent-auth/registrations.ts:182`), emits
host-relative metadata (`src/server/agent-auth/metadata.ts:125`, including #905)
and accepts both permanent app resources for invitations
(`src/server/agent-auth/invites.ts:436`). Durable reads share that registration
change; token validation accepts both app aliases while retaining expiry,
revocation and registration-state checks (`access-tokens.ts:336`). Delegated
Sending accepts both approved resources and persists the requested audience
(`token-exchange.ts:75,160`); subject validation retains registration source,
non-expiring read-token, no-send-scope, revocation and active-team checks (`:503`).
Mailbox-storage selectors, scope declarations and runtime registration-value
fingerprint are unchanged. The selected policy config explicitly sets
`AGENT_AUTH_DURABLE_READ_REGISTRATION_ENABLED="true"`. Qubrics cutover flags OFF
are a separate boundary; they do not restore old advertised constants.
Owner approval, mailbox readiness and one-hour delegated Sending expiry remain
enforced (`token-exchange.ts:34,145-163`). No runtime flag was changed here.

App aliases remain explicit (`src/constants/agent-discovery.ts:5-23`). Old-host
discovery retains the old issuer; new-host discovery emits the new issuer
(`src/server/mcp/oauth-metadata.ts:64-88`). REST verification accepts approved
aliases while matching the persisted grant audience
(`src/server/mcp/rest-access-tokens.ts:31-44,73-79`). Assertion signing follows
the initiating host and verification accepts both approved aliases
(`src/server/agent-auth/identity-assertions.ts:48,87-88,109`).

## Complete-body disposition

Skill citations below refer to the proposed baseline's `skills/<name>/SKILL.md`.

| Skill | Retained instruction reviewed |
| --- | --- |
| agent-email-inbox | Legacy MCP, bounded reads and draft-only authority (`:16-57`). |
| email-for-ai-agents | Separate sending approval, idempotency and queued/delivered distinction (`:14-62`). |
| sendmux-attachments | Returned upload/download URLs, methods and headers, including metadata refresh (`:31-40,58-99`). |
| sendmux-cli | Default legacy OAuth path, profiles and candidate catalogue limits (`:34-51,124-135`). |
| sendmux-email-for-agents | REST/MCP separation, draft/send permissions and owner approval (`:29,54-62,84-99,119-150`). |
| sendmux-getting-started | Legacy aliases, connection checks and durable-profile lifecycle (`:55-63,129-168`). |
| sendmux-mailbox-agent | Mailbox selection, attachment capabilities, revision-bound draft approval and extraction (`:22-34,195-256`). |
| sendmux-management | Returned DNS records, scopes, confirmations and secret handling (`:14-22,74-140,201-224`). |
| sendmux-mcp-setup | Legacy MCP resource, REST separation and publication/client caveats (`:35,55-77`). |
| sendmux-send-email | Owner approval, delegated Sending, retries and retained legacy host (`:20-30,117-153,227-267`). |
| sendmux-token-efficient-usage | Surface validation, bounded reads, delta continuation, ETags and returned URLs (`:24-44,66-90,150-235`). |

Eleven supplemental records cover proposed bodies and five identical published
bodies. Six older published bodies remain superseded through existing workflow
records with their actual `previousSkillDigest`: CLI, router, getting started,
mailbox, MCP setup and sending. Existing benchmark, execution, grading, receipt
and output hashes remain unchanged. Historical outputs are not fresh App329
evaluations. The 17 distinct tuples therefore do not imply 17 direct approvals.

## Limits and verification

SDK `1812300f` still defaults to legacy app/Sending hosts and the old Sending
audience (`packages/ts/cli/src/agent-auth.ts:16-18,219-225`). Its OAuth discovery
requires the legacy REST resource (`oauth-http.ts:1-2,69-80`); explicit Qubrics
issuer migration is excluded. This review supports documented existing/default
host workflows, not arbitrary issuer migration, new SDK aliases or installed
package availability. Retain the prior mailbox required-field, illustrative
error wording, PHP empty-map clearing, client certification and historical
evaluation limits in
`evidence/skill-compatibility/row07-actualtuple-source-review-20261012.md:126-154`.

Run the unchanged official checker against the committed candidate and the
same immutable App export; require all 22 lanes accepted, with six published
supersessions. Native CI must pass on that exact PR head. These are source
proofs, not live-service, browser, delivery or publication claims. Rollback is
revert of this supplemental source commit.

Local red/green receipts:
`/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-904/app329-compat/`.
Exact App exports remain in #900's `app329-release-checks/skills-v1.8.329.pRMYyn/`.
