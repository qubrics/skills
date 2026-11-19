# MCP setup example names

Tracks qubrics/qubrics #1098. Canonical source prepared; site export and publication remain coordinated by the parent rebrand task.

## Cause and change

`skills/qubrics-mcp-setup/SKILL.md` already distinguishes unpublished `qubrics-mcp` candidate source from the released `sendmux-mcp` 2.2.0 distribution. Its fresh examples nevertheless used legacy environment names. The cited SDK source at `a326bc923fff448470d908bb527afaaa35f6d739`, `packages/python/mcp/qubrics/mcp/config.py:27–31`, prefers each `QUBRICS_` variable and falls back to `SENDMUX_`.

Use supported `QUBRICS_` names in current candidate examples, plus local aliases `qubricsMailbox` and `qubricsLocalHttp`. Retain the earlier released-distribution facts, compatibility warnings, identifiers and source publication caveat. Regenerate both plugin copies from the canonical skill. Add four required environment descriptions to `openclaw.skills.json`; release versions, producer pins, compatibility checker and marketplace state remain unchanged.

## Verification

- Before regeneration, `node scripts/check-plugin-bundles.mjs` reported stale copies for the two generated plugin skill files. Regeneration and the same check then passed.
- The first OpenClaw build rejected missing `QUBRICS_MAILBOX_API_KEY` metadata at `scripts/build-openclaw-bundle.mjs:162`. Adding the four matching descriptions allowed `node scripts/build-openclaw-bundle.mjs` and `node scripts/check-openclaw-bundle.mjs` to pass for all 11 skills.
- Executed the actual MCP configuration module with isolated, non-secret fixture values: all three Qubrics surface keys, HTTP bearer, legacy fallback and Qubrics precedence passed. The module bytes match the immutable source named in the skill. Proof is retained as `mcp-env-proof.log` under the SDK checkout's `.claude/artifacts/rebrand-audit-fixes-ecosystem/`.
- All 17 JSON/TOML configuration examples parsed. GitHub's ordinary GFM Markdown response renders the skill.
- Existing `quick_validate` passed. Existing `package_skill` produced a package; extracting and validating it passed, and extracted `SKILL.md` bytes match the source.
- The actual static drift checker passed with explicit source and pinned OpenAPI inputs. The two focused existing environment tests passed (2 passed, 0 failed, 0 skipped). Earlier broader runs exposed mutable local SDK inputs and the missing released HTTP bearer compatibility note; both causes are recorded in the local logs, and the released note is retained accurately.
- Fresh-reader critique passed without a rewrite. One humanize pass preserved exact technical names, contacts, URLs and claims. No executable logic or skill trigger changed; no permanent tests were added or removed. Full required CI remains the release gate.
- PR CI run `44517390511` passed all 57 tests with 0 failed and 0 skipped, then correctly required an exact compatibility review for the changed skill digest. The append-only review record and independent source-review evidence under `evidence/skill-compatibility/reviews/rebrand-audit-mcp-examples-20261119/` fill that requirement without changing historical reviews, checker or producer pins. Its next exact candidate result remains a required gate.

## Export and release

Canonical file SHA256: `6014d9ad6754bac2e23cdfa47c55c570b817a27e03affeeb7dee2b947fe6af6b`. Marketing owns the identical site export at `public/.well-known/agent-skills/qubrics-mcp-setup/SKILL.md`. The site skill-sync workflow reads the owning source; its normal release-pinned sync must preserve these bytes after the source release.

Normal skills lane: reviewed source merge, the owning release/version and exact acceptance-asset process, then verify the GitHub release and site response. Existing Skills34 external marketplace hold remains intact. This source PR creates no release, tag or submission. Rollback: revert this PR and restore the prior site export; public release anchor is v2.0.6 at `9e2659c9dba3efd943190f2541016d0548db7201`.
