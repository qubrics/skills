# Skills #34: Phase 1 source qualification

Goal: qualify SDK `3eb0997b379d94b99659112d3c263ae59db7b14c` through Skills origin compatibility evidence, retain dual-name contracts, merge only with Ops approval, and return the reviewed source identity. Phase 2 remains held until Ops word after SDK publication.

## Source review and change

Independent whole-body and selected-source review found all 11 unchanged skills compatible. [Source review](skill-compatibility/reviews/rebrand-qubrics-skills34/source-review.md) records per-skill findings, source locations, released/candidate boundaries and limits. Eleven compatibility-kind records bind the current skill bytes and exact new contracts, including inbox `ff9bbe9c4e919ceac5310b94e501b49902514a69be84d7e96666628da315693b`. Historical records and workflow evaluations remain unchanged.

`releaseInputs` now names the exact reviewed SDK source and actual latest approved Skills release commit `edc201aa0608a795f0aeddc14be25b6a641d57e8`. The downloaded v1.8.1 acceptance was independently verified with the existing `--verify-skills-receipt` command before adopting that published revision. Both candidate lanes therefore use the unchanged, actually released skill bodies.

The static drift checker accepts the exact `@sendmux/*` and `@qubrics/*` TypeScript identities. It requires `bin.sendmux` for compatibility and `bin.qubrics` for the renamed CLI, and rejects unrelated identities. This changes the source checker, not installed-package instructions or the exact-contract acceptance guard.

Proposed version metadata is 1.8.2. The bundle builder exposed four missing descriptions for inherited MCP overrides already cleared by the guide. Their descriptions now state their effect and require leaving them unset in this workflow. The independent metadata critic passed Truth for all four. One humanise pass retained precise technical wording, followed by a protected-name/claim check: four exact environment names preserved, em dashes 0, semicolons 0, curly quotes 0, hedges 0, banned terms 0, comparative framing 0. No secret, schema override or HTTP authentication opt-out was configured or executed.

## Measured checks

- Baseline exact acceptance failed with: `proposed/agent-email-inbox requires a compatibility review or workflow evidence for ff9bbe9c4e919ceac5310b94e501b49902514a69be84d7e96666628da315693b`.
- Baseline static drift failed with six diagnostics for five renamed TypeScript packages. The added public-checker test was seen red with those diagnostics, then green. It covers both known package identities, the two required renamed launchers and an unrelated package rejection.
- Related existing tests passed: `node --test scripts/check-skill-drift.test.mjs scripts/mailbox-draft-contract-drift.test.mjs scripts/skill-compatibility.test.mjs`, 49 passed, 0 failed, 0 skipped.
- Static drift passed against an immutable archive of the reviewed SDK source and the existing pinned producer exports.
- Plugin generation and drift check passed. OpenClaw generation initially failed on missing `SENDMUX_MCP_ALLOW_UNAUTHENTICATED_HTTP` metadata; inventory identified four missing descriptions. After the metadata correction, generation and bundle check passed for all 11 skills.
- Existing exact checker accepted committed Skills `f17c4b0b9f6f7a73147859fdc0683894227ce2a7` against SDK `3eb0997b379d94b99659112d3c263ae59db7b14c`: 22 reviewed results across published and proposed lanes. Candidate digest: `c244a4c5a6bd34ebbb0e4419460b81da4c485856f34a93b4121e944311eb8d99`. Both `--verify-receipt` for that SDK source and `--verify-skills-receipt` for that Skills source passed. Tree digest stays `d1f44a97309ab1353ec3560941e083584ad41327221744424c43174aa5b630f2`.
- PR CI and merge: pending at this checkpoint. Required CI generates the acceptance asset against its own immutable commit.

## Required release boundary

SDK [skill-release-checks/action.yml:25-35,63-66](https://github.com/qubrics/qubrics-sdk/blob/3eb0997b379d94b99659112d3c263ae59db7b14c/.github/actions/skill-release-checks/action.yml#L25) selects the latest Skills GitHub release and verifies its tag against its `acceptance.json`. [release-please.yml:72-81](https://github.com/qubrics/qubrics-sdk/blob/3eb0997b379d94b99659112d3c263ae59db7b14c/.github/workflows/release-please.yml#L72) supplies no revision override. A merged record alone cannot unblock the default SDK workflow. A separately approved Skills release and matching acceptance asset are required.

No Skills release/tag, marketplace publication, SDK modification/workflow rerun, npm publish or npm deprecation is authorised or performed. Version-final SDK candidates still require their own checks by the SDK owner. Runtime host equivalence and client certification remain unmeasured.

Status: coded, not merged or released. Ops approval required before merging the green PR, and explicit operator approval required before any Skills release/tag. No extra features parked.
