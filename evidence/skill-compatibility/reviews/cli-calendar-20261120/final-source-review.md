# Final SDK source binding

Reviewer: coordinating Codex reviewer `/root`, 20 November 2026. Evidence kind: compatibility source review; no new evaluation or acceptance receipt authored here.

Ops superseded held source `4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e` with final public [SDK PR395](https://github.com/qubrics/qubrics-sdk/pull/395) source **`d481266dd8f4c3f3791c4627a05c49d8eee53374`**. GitHub's commit API confirms that exact revision. This note supersedes the held-source limitation in the preceding source and guidance reviews for the selected Skills contracts only.

## Immutable comparison

`git diff --exit-code 4416e3cec4e5cff2440f7aff8cbd6e5cd4b70c5e d481266dd8f4c3f3791c4627a05c49d8eee53374 -- packages/ts/cli` exited 0, with no output. The CLI source, command catalogues, selected Management delivery enum and all credential/authentication implementations are unchanged from the independently reviewed source.

Normal `--prepare-candidate` produced `d481266d.candidate.json` against committed Skills `b0482b4d5c52140d574a6ccac3db465a77121cc5`. Calling the unchanged exported `inspectCandidate()` API without an inspection-map override and comparing against `guidance.candidate.json` proves equality of **all 22 published/proposed skill and contract entries**, not only the first CLI failure. The current guide and both plugin mirrors remain the independently reviewed calendar-free candidate wording with Mailbox 53.

SDK snapshot hashes are also identical:

- `openapi-app.json`: `ba45a5411d151e2e74497d859c5967d12f601a5ec25a4e1da66ec2e8a5bfb23c`.
- `openapi-sending.json`: `d2c32e1371929ab99e49c5a92a09800373dc07839a0be8926ba91ef6a14b57f4`.

Original inspection candidate digest before final record renewal: `2bc1561df4c9acde36bafbd812db2ae445e201e7f16acbcd64efdeb88516bbf0`. Adding this review and binding changes candidate identity; this inspection digest is not a final acceptance receipt.

The SDK delta contains PHP mail-history restoration, Go/history and coverage corrections, Ruby release documentation/version and evidence. Those changes do not alter the selected contracts, as measured across every lane entry. This is not a whole-SDK release approval or a claim to have rerun sdk344's consumer tests.

## Four compatibility decisions retained

The independent [source review](source-review.md) and [current-guidance review](guidance-review.md) remain valid for the exact unchanged contracts. Bind their four direct records to final SDK `d481266dd8f4c3f3791c4627a05c49d8eee53374`, preserving App `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e` and Sending `2f4226655efc05f109b5feda50ed2ca1570aea91`.

- Published `sendmux-cli`: contract `46af45d935f17006bec9b7cd4745eeabdf192aa7e008357ba924cedc8ae93d51`; all 31 concrete commands remain. Historical aggregate-count limitation remains explicit, not count-equality approval.
- Proposed `qubrics-cli`: contract `173d494f78667ca69a49f233e5fcbdb79a178f9df274ec537b67a9af52a878b3`; corrected candidate-source count 53 and published-version verification remain supported.
- Published `sendmux-management`: contract `01fc2993735104063f2d3f3ce795470f10b827e9c68f9392aadab3cb2dcd674b`; retained delivery/payload workflows teach no removed calendar filter.
- Proposed `qubrics-management`: contract `caabd66f5a04178c964a749b672d8206f7d7a8c173890027a03c90d9a16dbff1`; same retained Management semantics and boundaries.

All 191 historical reviews, dependency selectors, negative/security assertions and three genuine legacy tested replacements remain unchanged. No synthetic tree, inspection override, stale source pin, guard bypass, new evaluator output or SDK modification was used. Final acceptance must be the unchanged checker's own output from a committed Skills tree with these bindings.

Raw comparison: Skills MAIN `.claude/artifacts/rebrand-qubrics-skills34/cli-calendar-20261120/d481266d-inspection-proof.log`. Historical source review and guidance review bytes are retained unchanged; this addendum records the genuine final-source comparison.
