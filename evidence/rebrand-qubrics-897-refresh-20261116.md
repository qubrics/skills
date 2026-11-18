# Held PR35 branch refresh

Source-only refresh for qubrics/qubrics#897. Merge `main` at `05e24366cebc2caf2b5c395727414e634ba7bf8c` into the existing PR35 branch at `251719ae51874c6f2a8bdeacc5c6493de7a79db8`. No rebase, force-push, PR merge, release, publication or deployment.

The nine conflicts originate in overlapping owner-link edits and the later Qubrics rename, plugin metadata and manifest version on main. Preserve main's README, skill body, eval expectations, test expectations and manifest; regenerate plugin metadata/copies with `node scripts/build-plugin-bundles.mjs`. Main already contains the original PR's live-reference replacements. The remaining PR delta contains the original hash-bound planning-evaluation records, their review-map entries and evidence, rather than new runtime or skill behaviour.

Validation before the merge commit:

- `node --test scripts/build-plugin-bundles.test.mjs scripts/workflow-boundaries.test.mjs`: exit 0, 19 passed, 0 failed, 0 skipped. Log: `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-897/skills35-refresh-tests.log`.
- `node scripts/check-workflow-path-filters.mjs`: exit 0 for pull_request and push.
- `node scripts/check-plugin-bundles.mjs`: exit 0.
- `git diff --check origin/main` and `git diff --cached --check origin/main`: exit 0.
- `git diff --exit-code origin/main -- . ':!evidence/**' ':!skill-compatibility.json'`: exit 0. All non-evidence source, workflows, manifests, tests and generated bundles match main byte-for-byte.
- `git diff --name-only --diff-filter=U`: empty; all conflicts resolved.

No tests added, removed or weakened. The conflicts require no new behaviour or assertions. Ordinary PR CI follows the normal push; publication is not a CI requirement for this source-only refresh.

Inherited historical evidence has whitespace warnings when compared with the old branch head: `evidence/skill-compatibility/evaluations/rebrand-qubrics-php4/sendmux-cli/eval-0-credential-precedence-candidate-catalogue/with_skill/run-1/outputs/response.md:3`, the analogous `sendmux-mcp-setup/eval-0-candidate-catalogue-resource/with_skill/run-1/outputs/response.md:3`, and `evidence/skill-compatibility/reviews/rebrand-qubrics-skills34/agent-email-inbox.json:29` plus sibling reviews and `source-review.md:47`. These bytes are already on main, outside this PR delta, and remain untouched to preserve historical hashes. Parked; no cleanup of unrelated evidence.

The released GitHub skill source is v2.0.5 at `05e24366`; main's `openclaw.skills.json:5` is **2.0.4**, and stays unchanged. The old PR's 1.8.0 manifest is superseded, not restored. No new version or marketplace identity is introduced. OpenClaw ClawHub workflow readback: `disabled_manually`; no enable or dispatch. PR35 must remain **unmerged** under the operator's explicit publication hold, even with green CI and no conflicts.

Production/browser journeys are not run: this refresh changes no runtime, public skill content or deployed surface. Task build caches are not created by the source checks; fixture processes report their own teardown in the test log. Existing worktree remains because the PR is held open; file claims release after commit.
