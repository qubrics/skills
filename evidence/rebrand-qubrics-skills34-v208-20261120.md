# Skills v2.0.8 release and v2.0.7 withdrawal

Measured 20 November 2026, 09:49 AEDT. Operator ask 14 **C supersedes B**. This records the approved GitHub-only release and withdrawal; #34 remains blocked on external Cursor marketplace review.

## Replacement release

- Latest, published, non-prerelease: [v2.0.8](https://github.com/qubrics/skills/releases/tag/v2.0.8), release ID `452020893`, published `2026-11-19T22:41:04Z`.
- Tag commit: `0b8a3bd407e2b96a06632a9ca20e4175bdb8d95b`, the approved PR53 merge.
- Sole uploaded asset: unmodified `acceptance.json`, ID `769544438`, 12,538 bytes, from actual-main artifact `14578515702` / run `44622450232`.
- SHA256: `69a6a7051599310c32e7ff062a86d6338919cdb5c1c03065bbf02016d35958a5`. Downloaded bytes equal the original artifact (`cmp`, exit 0); local checksum equals GitHub's asset digest.
- Official `scripts/skill-compatibility.mjs --verify-skills-receipt ... --revision 0b8a3bd407e2b96a06632a9ca20e4175bdb8d95b` passes, binding the genuine receipt to this source. Tree digest `0af68429c0cd8ce4acc5dcd67198e84ece78bc05120f1cdd66de252b33e502eb`; reviewed SDK source `ff61155fb25c77fa7794c68a4b9f3a6eaaba5577`.

The release was already published when this resumed verification read it; no duplicate create, asset replacement or retry was attempted. The SDK default selector reads the latest Skills release, so this release, rather than a merged record alone, supplies the corrected default checker: [SDK action:25–35](https://github.com/qubrics/qubrics-sdk/blob/ff61155fb25c77fa7794c68a4b9f3a6eaaba5577/.github/actions/skill-release-checks/action.yml#L25), [publication guard:70–88](https://github.com/qubrics/qubrics-sdk/blob/ff61155fb25c77fa7794c68a4b9f3a6eaaba5577/scripts/publication-guard.mjs#L70).

The source and built runtime review checksums remain those in the approved packet:

| File | SHA256 |
| --- | --- |
| Immutable source TAR | `6b8cf6d1a652deda964a462a9fbbc1fff2c19dff19ee6deae1359892217fac85` |
| Built runtime TAR | `f662235389bf2a4fb1b04470bdc327b6b75c6760df91860923c299294b067bab` |
| Runtime file checksum manifest | `c066f5fd21f9eb216beced59fe690e862e316189c0429b562a43b3e88344fa39` |

## Fresh public install

From an empty task-local project, the existing approved CLI completed exit 0:

```sh
DISABLE_TELEMETRY=1 DO_NOT_TRACK=1 npm_config_cache=/Users/rj/Desktop/GIT-REPOS/sendmux-skills/.claude/artifacts/rebrand-qubrics-skills34/calendar-free-20261120/v207-npm-cache npx --yes skills@1.7.6 add https://github.com/qubrics/skills/tree/v2.0.8 --skill '*' --agent codex --yes
```

All **41 installed files across 11 skills** equal immutable `git show 0b8a3bd4:skills/...` bytes; file lists also match. Runtime scan of every installed `SKILL.md`, references, scripts, agent declarations and assets finds **zero case-insensitive calendar occurrences** (`rg` exit 1, empty log). Historical negative evals remain and are not runtime calendar commands. No global installation, credentials, MCP launch or telemetry/security-audit requests.

## Approved v2.0.7 deletion

Before deletion, preserved the complete original release metadata, tag response, asset and checksums in [recovery evidence](skill-compatibility/release-backups/v2.0.7/README.md). Tag commit `8a7628e1118f7fad67dfaa631ff025ba73f3f596`; original sole asset SHA256 `1db9b03c49d54ae1336f1de75d985012c0ba14e7192bdb90a3af572225a25efb`. These matched live GitHub immediately before deletion; replacement latest/asset also matched the packet.

Executed once, exit 0:

```sh
gh release delete v2.0.7 --repo qubrics/skills --cleanup-tag --yes
```

Afterwards, `gh api --include repos/qubrics/skills/releases/tags/v2.0.7` returns **HTTP 404 Not Found**. `gh api --include repos/qubrics/skills/git/ref/tags/v2.0.7` also returns **HTTP 404 Not Found**. Both `gh` commands exit 1 because the named object is absent. Final latest API still returns v2.0.8, with the approved sole asset and exact tag commit.

The old release/tag could be recreated from preserved source and asset under new approval, but original IDs, timestamps and download history cannot be restored. Existing installations, clones, commit URLs and cached downloads remain possible. The old `gh release edit v2.0.7 --latest` rollback no longer exists after C.

## Marketplace readbacks and boundaries

After GitHub deletion, [skills.sh mailbox listing](https://www.skills.sh/qubrics/skills/qubrics-mailbox-agent) returns **HTTP 200** and still advertises `npx skills add https://github.com/qubrics/skills --skill qubrics-mailbox-agent`. It is a repository listing, not a separate v2.0.7 version listing; corrected main remains the unpinned source.

All **11 ClawHub listing endpoints return anonymous HTTP 200**, owner **roshanjonah**, `latestVersion.version` **2.0.4**. The affected [mailbox skill](https://clawhub.ai/roshanjonah/qubrics-mailbox-agent) and [MCP setup skill](https://clawhub.ai/roshanjonah/qubrics-mcp-setup) retain those independent 2.0.4 listings. No version-specific ClawHub 2.0.7 claim follows from these latest-listing readbacks; no registry version was removed or altered.

ClawHub workflow `306493143` remains `disabled_manually`. No workflow was created after the v2.0.8 publication timestamp in the current Actions readback. No Skills dispatch, SDK action, npm/PyPI publish, ClawHub mutation, skills.sh metadata edit, Codex update or Cursor submission occurred in this step. Cursor approval remains held; no fresh Cursor search was requested.

## Receipts and cleanup

Raw files are under MAIN `/Users/rj/Desktop/GIT-REPOS/sendmux-skills/.claude/artifacts/rebrand-qubrics-skills34/calendar-free-20261120/`:

- Release identity: `v208-final-latest.json`, `v208-final-tag.json`, `v208-release-readback/acceptance.json`, `v208-public-receipt-verifier.log`.
- Fresh install: `v208-pinned-install.log`, `v208-installed-source-hashes.log`, `v208-installed-calendar-grep.log`.
- Absence: `v207-deleted-release-readback.log`, `v207-deleted-tag-readback.log`.
- Marketplace: `skills-sh-after-delete.headers`, `skills-sh-after-delete.html`, eleven `clawhub-after-delete-*.json`, `clawhub-after-delete-summary.tsv`.
- Workflow boundary: `post-release-workflows.json` is an empty array.

Removed the new `v208-install-proof` project with ordinary `rm -r`, exit 0, and verified `test ! -e` exit 0. Reused the existing task npm cache, without creating a new cache. Four previously blocked review-cache paths remain under the existing operator cleanup step `MAIN/.claude/tasks/rebrand-qubrics-skills34/operator-cleanup-v208-review-20261120.md`; no retry or workaround. Working sibling stays under the Cursor hold. Recovery evidence is retained, not a build cache.

Goal: Fulfil qubrics/skills#34 / A13. Slice 16 shipped as v2.0.8; external Cursor public/installable listing remains the only open acceptance clause. Cleanup-only hold remains disclosed.
