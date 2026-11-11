# Qubrics logos and Skills README

Operator request, 12 November 2026: correct the old Sendmux logo in the Cursor operator step, add supplied Qubrics SVGs, and brand this repository's README without changing behaviour. Source repository is `qubrics/skills`; comparison base `861d30e87dcebe7e644325010f591dcd3a751b0e`. No other repository edited. Rollback: normal revert PR. No marketplace submission, tag or release.

## Supplied asset mapping

SVGs copied without modification from the operator's Downloads directories. Names describe the rendered layout and **background theme**, rather than relying on the reversed source folder names.

| Supplied source | Tracked asset | Variant / SHA256 |
| --- | --- | --- |
| `emblem-svg/1.svg`, `emblem-svg/2.svg` | `assets/qubrics-emblem.svg` | Identical square emblems, both themes; `73019d9f0f6fa8b48bbdff823129f9e075054aa47e8349a3f42060c947ab1f13` |
| `svg-vertical/1.svg` | `assets/qubrics-logo-horizontal-light.svg` | Horizontal 450×150, blue text on light background; `bc7a0775159e3369e50869145df750b0e4084c401ba8b418661b696396572fc4` |
| `svg-vertical/2.svg` | `assets/qubrics-logo-horizontal-dark.svg` | Horizontal 450×150, white text on dark background; `aab845dfcf995a084fad1951e3938a2ede96fd37092f4ecbb72f0dff5d352f74` |
| `svg-horizontal/1.svg` | `assets/qubrics-logo-stacked-light.svg` | Stacked 500×500, blue text on light background; `909ff718b612a90af984c58ac7eb81e97c2ca10cf797807f064985f434bbd2f6` |
| `svg-horizontal/2.svg` | `assets/qubrics-logo-stacked-dark.svg` | Stacked 500×500, white text on dark background; `b3e66f44c744e584d5aefa02720f8b8d52fed56dcf497ce27c71a7b1ba57f180` |

Inspection: wordmark `1.svg` final text fill `#3769e1`, `2.svg` text fill `#ffffff`; emblem colours unchanged. Both emblem inputs are byte-identical, so one canonical file retains both supplied variants without duplicate copies. Quick Look previews confirmed horizontal and stacked layouts. The supplied SVG metadata is retained. All five XML documents parse.

## README and Cursor fields

README uses horizontal `<picture>` with dark/light media sources, light fallback and `alt="Qubrics"`. Existing Qubrics name, `qubrics/skills` repository and all install commands remain. Intro links the existing manifest homepage. Removed the stale assertion that the Qubrics Cursor plugin has already been submitted; operator confirmed only the old Sendmux submission is pending. Marketplace approval requirement remains.

Legacy `assets/sendmux-mark.svg`, manifests, generator, skills and runtime commands are unchanged. The Cursor operator **Logotype URL field** will use `assets/qubrics-emblem.svg` pinned to this PR's actual merge SHA. No manifest regeneration, new release acceptance or distribution version is implied by this documentation/asset PR.

Cursor Description remains `Official Qubrics Agent Skills for email, mailbox, MCP, CLI, and SDK workflows.` Website remains `https://qubrics.com/docs/guides/agent-skills`. Both match `.cursor-plugin/plugin.json`. Live Website verification returned HTTP522 from Cloudflare, as did `https://qubrics.com/`: site availability, not an observed wrong-path404. Therefore the configured Website value is confirmed; live availability is not. No website source or infrastructure was changed.

## Validation and review

Local checks: `node scripts/check-plugin-bundles.mjs` exit0; `git diff --check` exit0. XML parse, unchanged README fenced commands and unchanged legacy logo assertions passed. No unit tests added for static SVG/documentation changes; existing CI owns the plugin/workflow regression suite.

Protected copy: Qubrics, Cursor, Claude, Codex, `/add-plugin`, all fenced commands, repository identifiers and link destinations stay exact. Technical documentation review and one polish pass apply only to changed prose. No broader README rewrite.

ClawHub workflow306493143 read back `disabled_manually`. This diff changes only README, new assets and this evidence: no `skills/**`, publisher config, release/tag or workflow mutation. Notify SITE triggers only on `skills/**`; ClawHub workflow path filters do not match these changed paths. Plugin bundles CI does match README/assets.

PR CI, settled review, merge identity and raw emblem HTTP/hash readback will be recorded in the task's persistent `readme-logos-20261112.md` receipt after the authorised merge. This slice does not close issue34's outstanding Cursor listing and ClawHub verification clauses.
