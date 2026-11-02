# GitHub live references — skills

Part of qubrics/qubrics#897, spec A15. Source-only PR; no merge, publication, deployment, repository rename/transfer or settings change.

Live references now use `qubrics/skills`, `qubrics/qubrics-sdk` and `qubrics/SITE_qubrics.ai`. Install examples, eval expectations and generated plugin repository metadata follow those identities. Existing plugin/skill/package names, versions, service hosts and historical design records remain unchanged.

Generation: `node scripts/build-plugin-bundles.mjs`; canonical metadata is `openclaw.skills.json:4` and canonical skill content stays under `skills/`.

Existing SITE notification shell test was changed to expect the current dispatch destination before implementation. Red: expected `https://api.github.com/repos/qubrics/SITE_qubrics.ai/dispatches`, actual old `Sendmux/SITE_sendmux.ai` URL. Green after the workflow destination and success message changed. Existing secret-header/fallback assertions remain intact.

Local checks passed:

- `node --test scripts/build-plugin-bundles.test.mjs scripts/agent-storage-floor.test.mjs scripts/publish-openclaw-bundle.test.mjs scripts/workflow-boundaries.test.mjs`: 24 passed, 0 skipped.
- `node scripts/check-workflow-path-filters.mjs`: pull_request and push filters passed.
- `node scripts/check-plugin-bundles.mjs`: passed.
- `git diff --check` and live GitHub-reference scan: passed; historical design/evidence files excluded.

Local logs: control-plane MAIN `.claude/artifacts/rebrand-qubrics-897/skills-{red,green-seam,generate,check}.log`.

GitHub CI is required on the PR. ClawHub workflow is disabled at preparation time; its existing guarded publication logic was left unchanged and unexecuted. No release/version bump is part of this PR. Independent review is coordinated across the batch; no review-settled claim is made here.
