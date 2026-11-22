# Cursor logo correction — 22 November 2026

For reviewers of #34/A13: the Qubrics Cursor plugin selects the committed tiled-diamond emblem, matching the operator's publisher application. The old Sendmux asset remains available for the old listing.

## Cause and change

At base `bffdf0016d4b2793449aa9626ce47e1a9e4e838d`, `.cursor-plugin/plugin.json:12` selected `assets/sendmux-mark.svg`. `scripts/build-plugin-bundles.mjs:31` regenerated that value through `cursorPluginManifest`, and `buildPluginBundles` validated the same old asset. The tests expected the old path, so generation and drift checks accepted the wrong branding.

Change `CURSOR_LOGO` to `assets/qubrics-emblem.svg`, regenerate the manifest, and update the existing output and missing-asset tests. The fixture contains both logos: a missing Qubrics emblem must fail even when the legacy logo exists. Neither asset is edited or deleted. No skill text, version, contract, workflow, or other plugin metadata changes.

The existing `assets/**` filter covers the emblem in both `pull_request` and `push` events of `.github/workflows/plugin-bundles.yml`; no filter change is required.

## Measured validation

The updated existing tests ran before changing the generator. `node --test scripts/build-plugin-bundles.test.mjs` exited 1 with both relevant failures:

- Generated manifest: actual `logo: 'assets/sendmux-mark.svg'`, expected `logo: 'assets/qubrics-emblem.svg'`.
- Missing Qubrics emblem with the legacy logo present: `AssertionError [ERR_ASSERTION]: Missing expected exception.`

After changing the generator and regenerating the manifest, the same command exited 0: **11 tests passed, 0 failed, 0 skipped**. The repository has no `package.json` or named `check:fast` entry; this change's fast gate uses its existing commands:

```sh
node --test scripts/build-plugin-bundles.test.mjs
node scripts/check-workflow-path-filters.mjs
node scripts/check-plugin-bundles.mjs
```

All three exited 0. Full workflow safeguards remain in the existing Plugin bundles CI. Raw red/green and validator logs are retained under MAIN `.claude/artifacts/rebrand-qubrics-skills34/cursor-logo-{red,check-fast-tests,check-fast-filters,check-fast-drift}-20261122.log`. PR checks and the merge history provide the CI/merge receipts for this file.

## Cursor source and release boundary

[Cursor's plugin reference, Logos](https://cursor.com/docs/reference/plugins#logos), read on 22 November, says to commit logos and use a relative path. Cursor resolves the path to `raw.githubusercontent.com` using the **repository and commit SHA**. The logo is repository content, rather than a GitHub release asset.

[Keep plugins up to date](https://cursor.com/docs/plugins.md#keep-plugins-up-to-date), read on 22 November, documents GitHub imports refreshing from the **branch the marketplace tracks**, either through enabled Auto Refresh or manual Refresh. This section describes imported marketplaces; it does not prove the pending public publisher application's refresh settings or approval state. Repository metadata confirms `qubrics/skills` has default branch `main`, and the operator's recorded application supplied that repository URL without a tag.

No GitHub release or tag is required to make this corrected source available for indexing from `main`. Cursor must index the corrected commit before its public listing can prove the logo change. That external ingestion and approval remain unmeasured while Qubrics is absent from the public marketplace; this PR does not claim otherwise. Official HTML/Markdown responses and extracted citations are retained under MAIN `.claude/artifacts/rebrand-qubrics-skills34/cursor-logo-*20261122.*`.

Only the delegated normal PR merge is authorised. No release, tag, marketplace refresh, submission, SDK action, or package publication is performed. Rollback: a normal revert PR.
