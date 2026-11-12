# SDK Mailbox successor compatibility renewal

Goal: qualify immutable SDK Mailbox candidate `7fe071f96bc23e52e8c0bb56d673d8c6a24aea7c` through the existing Skills compatibility mechanism for issue34/A13. This PR changes review evidence and the SDK input pin. Merge requires green CI and Ops approval. Any later Skills release/tag requires a separate ASK.

## Measured failure and origin

SDK owner's genuine default guard at Skills v2.0.3 failed `published/email-for-ai-agents` contract `c368054859d7f1bcbc26baa5de12670151aece1095c4c2e8f6ba4265172a979d` after live OpenAPI equality passed. Source diagnostic: SDK task `mailbox-independent-20261112.md`, raw `mailbox-main-refresh-20261112-default/exact-candidate.log:3`.

The existing checker at current Skills base `38bbf91ff7b69c086d7776c810e687b68b3e1aa6` failed with exit 1:

```text
Skill compatibility failed: published/email-for-ai-agents requires a compatibility review or workflow evidence for 2d1da8064b5556b044d00e436ac2774eb8926bb3c12e82dc86995321fb997ea3
```

Command: `node scripts/skill-compatibility.mjs --candidate BASE_CANDIDATE --receipt BASE_ACCEPTANCE`, using the existing `--prepare-candidate` descriptor with exact base and SDK SHA. No acceptance file was produced. The origin digest differs from the default-v2.0.3 digest because current main retains the already-reviewed Calendar App tuple `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e`. Default v2.0.3 retains App `87ce115810ebcfa91655295603c27af52fcff96f`. Neither source tuple is substituted for the other.

Root cause: [SDK PR377](https://github.com/qubrics/qubrics-sdk/pull/377) changes selected declarations `resolveAgentSendingToken` and `waitForMailbox` so response-body reads use the same bounded abort signal as the request. The checker hashes full selected declarations (`scripts/skill-compatibility.mjs:233–236,268–270`) and requires exact skill/contract evidence (`:334–354`). Nine affected skill/contract pairs in each lane therefore require renewed evidence, even though the skill bytes did not change. This missing-review failure does not establish an SDK runtime defect.

Public source anchor: [agent-auth.ts at immutable SDK main 57435acb](https://github.com/qubrics/qubrics-sdk/blob/57435acb6517ece3a78a3f1774f37dcce6985935/packages/ts/cli/src/agent-auth.ts#L205). This source is present in the local Mailbox merge 7fe071f9. Official checker inspection measured all 22 lane/name/skill/contract bindings identical between these candidates. CI can pin the fetchable public main commit while exact local qualification still targets 7fe071f9. The candidate source stays unchanged.

## Review and preservation

The independent [whole-body source review](skill-compatibility/reviews/mailbox-sdk344-20261112/source-review.md) supplies all 18 pair verdicts and immutable source bindings. The two affected legacy setup bodies prescribe obsolete Python distribution or console names and must continue through their genuine tested Qubrics replacements. A compatibility record must not approve those instructions. Existing workflow evaluation bytes and their exact prior-skill binding remain unchanged. Revalidation checks those actual outputs against the source delta and claims no new workflow execution, package install or runtime proof.

All historical mappings/reviews, dual-name contracts, canonical rename restrictions and negative/security assertions remain. No guard bypass, synthetic accepted receipt, release-input fallback or SDK workflow rerun.

Focused existing compatibility controls: `node --test scripts/skill-compatibility.test.mjs`, exit 0, **25 passed, 0 failed, 0 skipped**, duration 44.0s. No implementation or test harness was added for review-record data.

## Default consumer and later release gate

**A merged record alone cannot satisfy the default guard.** At exact SDK 7fe071f9, [`.github/actions/skill-release-checks/action.yml:25–35`](https://github.com/qubrics/qubrics-sdk/blob/57435acb6517ece3a78a3f1774f37dcce6985935/.github/actions/skill-release-checks/action.yml#L25) selects the latest Skills release, downloads `acceptance.json`, and derives the Skills source revision from that receipt. It then checks out that revision. [`scripts/publication-guard.mjs:70–87`](https://github.com/qubrics/qubrics-sdk/blob/57435acb6517ece3a78a3f1774f37dcce6985935/scripts/publication-guard.mjs#L70) binds the checker to that immutable revision and recomputes acceptance for the exact SDK candidate.

Latest remains v2.0.3 at `ed0e59a35755980f7f78f81488b324af9878ac00`, asset 731453436 SHA256 `755b700043599c056e15e3d23ed65db75edbe08bd8ac0b383e18893bbbb3ba63`. v2.0.4 already exists but is not latest and has the previously reported receipt-binding defect. It is not reused or replaced. A later new release needs its own Ops GO and unmodified exact-main CI acceptance asset. Rollback of this PR is a normal revert. A later latest-selector change can return to v2.0.3, which intentionally leaves this SDK candidate blocked.

No `skills/**`, plugin/marketplace version, generated bundle, workflow or release/tag changes. Evidence/policy paths trigger existing Skill drift CI. Notify SITE only matches `skills/**`, and ClawHub workflow 306493143 remains `disabled_manually`. No marketplace publication follows from this PR. Cursor review remains held for the 13 Nov 09:00 Melbourne read-only check.

## Measured exact-candidate PASS

The unchanged checker exited 0 at committed Skills `996f2f600b15e42edb2692839b74ed560474102c`, using the same origin App and Sending inputs and exact SDK `7fe071f96bc23e52e8c0bb56d673d8c6a24aea7c`. Its genuine receipt reports `accepted: true`, 16 reviewed results, two tested legacy supersessions and four unchanged no-impact results. Candidate digest: `fa2812616bc34abc86c1d14ea6057c2afa4cd47af6a61b5780b85f036737cdbe`.

Commands, run from the named Skills sibling:

```sh
node scripts/skill-compatibility.mjs --prepare-candidate /Users/rj/Desktop/GIT-REPOS/sendmux-skills/.claude/artifacts/rebrand-qubrics-skills34/mailbox-sdk344-20261112/reviewed-candidate.json --skills-root /Users/rj/Desktop/GIT-REPOS/sendmux-skills-rebrand-qubrics-skills34 --revision 996f2f600b15e42edb2692839b74ed560474102c --sdk-root /Users/rj/Desktop/GIT-REPOS/sendmux-sdk --sdk-revision 7fe071f96bc23e52e8c0bb56d673d8c6a24aea7c
node scripts/skill-compatibility.mjs --candidate /Users/rj/Desktop/GIT-REPOS/sendmux-skills/.claude/artifacts/rebrand-qubrics-skills34/mailbox-sdk344-20261112/reviewed-candidate.json --receipt /Users/rj/Desktop/GIT-REPOS/sendmux-skills/.claude/artifacts/rebrand-qubrics-skills34/mailbox-sdk344-20261112/reviewed-acceptance.json --source sdk --revision 7fe071f96bc23e52e8c0bb56d673d8c6a24aea7c
```

The command's own `reviewed-exact-candidate.log` and unmodified `reviewed-acceptance.json` have identical SHA-256 `18216fb21841b58f769635b86a665c43db7199f28ad89d40305fc1c64dd36208`. No acceptance file was hand-authored. The 16 new map entries preserve all 153 historical entries, every dependency/rename and both producer inputs. `git diff --check` and JSON/evidence-hash checks passed. The checker, tests and existing evaluation bytes are unchanged.

Raw preparation, inspection, PASS and control receipts remain under MAIN `.claude/artifacts/rebrand-qubrics-skills34/mailbox-sdk344-20261112/`. Final-head exact acceptance and PR/main CI are separate remaining gates. No merge, release or tag is claimed.
