# Released-install compatibility sweep

Goal: audit all eleven canonical skill bodies for instructions that install a released package but rely on unpublished SDK candidate `73bedb8` behaviour.

Tally: 11/11 complete bodies read; 7 PASS, 4 FINDING, 0 UNKNOWN. Three skills contain release/candidate boundary findings; the fourth contains the separately requested environment-source ambiguity. No skill bodies changed by this review.

Scope: `skills/*/SKILL.md` only, initially clean at skills commit `27b3f256e19af3c5d504c0a734900e8e7be03a70`. All eleven Markdown files under `skills/` are these bodies; no referenced local detail files needed review. Registry metadata and actual published archives were read, without installing packages, running their code, retrieving credentials, calling a product endpoint, reading mailbox content, or writing live state. Candidate source read through `git show 73bedb8:<path>`; app tuple `87ce115` unchanged. Findings below refer to the audited bodies before the parent's concurrent corrections.

## Published artifacts

Registry `latest` metadata and archive bytes checked on 2026-11-06. npm archive SHA1 matched registry `dist.shasum`; Python archive SHA256 matched PyPI metadata. All archives below are under 10 MiB.

| Ref | Published artifact | Bytes | SHA256 |
| --- | --- | ---: | --- |
| C | [`@sendmux/cli` 1.7.2](https://registry.npmjs.org/@sendmux/cli/-/cli-1.7.2.tgz) | 82,205 | `8081332265be59b562aaf92c3653cf5d6d058189e3f17fde9ce03d04bc9ffe19` |
| M | [`sendmux-mcp` 2.2.0](https://files.pythonhosted.org/packages/52/22/0e45005289de9044dcd218cf20ce94c41228f0c4db90a83b8a7775649c50/sendmux_mcp-2.2.0-py3-none-any.whl) | 150,956 | `0f23f8ecdf46edb958f4fba677d14d79811d9e01ae22421e5083d0dd2401d697` |
| K | [`@sendmux/core` 1.2.0](https://registry.npmjs.org/@sendmux/core/-/core-1.2.0.tgz) | 8,780 | `c49e510ca02386eb88335e1fb89c70f4ce5b158016480212772b4f88755a1c10` |
| B | [`@sendmux/mailbox` 2.0.2](https://registry.npmjs.org/@sendmux/mailbox/-/mailbox-2.0.2.tgz) | 51,428 | `b3d3f786e991539806c7c04f2c3e5156d6b783bb74e40a9d45d00070b00d9aa0` |
| G | [`@sendmux/management` 2.0.2](https://registry.npmjs.org/@sendmux/management/-/management-2.0.2.tgz) | 55,485 | `e3f1fc7b284386ff17c0d3a4017e7d80dc9a275c09bd033060dfb2ec89e9e7ea` |
| S | [`@sendmux/sending` 1.6.0](https://registry.npmjs.org/@sendmux/sending/-/sending-1.6.0.tgz) | 30,589 | `e01907fb775cd320792260266730fabe0edb8379c58d03a7e965c7e203e35d88` |
| U | [`@sendmux/sdk` 2.0.2](https://registry.npmjs.org/@sendmux/sdk/-/sdk-2.0.2.tgz) | 3,993 | `bd501c66a70e1bc71b7fca8efcfe2d84ae74f8061af857d3ad0132ffe6b2a474` |
| PB | [`sendmux-mailbox` 2.0.2](https://files.pythonhosted.org/packages/16/32/b19fc128ccfdff12e0f0432a343278d6684e9c02d11e4c865ddea8ff5ac8/sendmux_mailbox-2.0.2-py3-none-any.whl) | 248,033 | `7f3035ce339446ad1ad2c0ea51215ef9095d7722d9be84fa69a2db5adfc3f54b` |
| PS | [`sendmux-sending` 1.6.0](https://files.pythonhosted.org/packages/e2/e4/d58fbf0a8fafab22287095f05dde186251ac28197f2f6beaf393dcd5da31/sendmux_sending-1.6.0-py3-none-any.whl) | 81,733 | `29b8a05fc6aa656105bd5912db5ef20ede43e04f17b96d484ad3bbb4cd63da33` |

Metadata endpoints: `https://registry.npmjs.org/@sendmux%2f<package>/latest` for each npm package, `https://pypi.org/pypi/sendmux-mcp/json`, `https://pypi.org/pypi/sendmux-mailbox/json`, and `https://pypi.org/pypi/sendmux-sending/json`. C and M retained by parent at `/Users/rj/Desktop/GIT-REPOS/sendmux/.claude/artifacts/rebrand-qubrics-php4-sync/released-contracts/`; SDK archives inspected in memory only.

## Per-skill disposition

PASS means no occurrence of the specified release/candidate cause found; it is not certification of live services or third-party client configurations.

| Canonical body | Result | Evidence and disposition |
| --- | --- | --- |
| `skills/agent-email-inbox/SKILL.md` | PASS | All named MCP tools and CLI equivalents at 20–24, 30–47 and 57 exist in M's `tools.by_surface` and C's manifest. Line 18 clears QUBRICS variables; it does not teach the release to consume them. |
| `skills/email-for-ai-agents/SKILL.md` | PASS | Connection/send tools at 24 and 34 and CLI send/attachment flags at 49–56 exist in M/C. Line 22 clears aliases only. |
| `skills/sendmux-attachments/SKILL.md` | PASS | All named upload/read MCP tools at 42–140 and CLI commands at 147–198 exist in M/C. TS imports/helpers at 248–295 and Python imports/helpers at 302–340 exist in B/S/U/PB/PS, including Node subpath exports. Line 14 clears aliases only. |
| `skills/sendmux-cli/SKILL.md` | FINDING | F1: lines 92–107 teach candidate-only QUBRICS credential/profile/base-URL behaviour after unpinned released install at 32. Explicit candidate catalogue at 130–139 accepted. |
| `skills/sendmux-email-for-agents/SKILL.md` | PASS | Named ordinary calls at 79, 95–115 and 135–136 exist in M/C. Draft and extraction entries at 26–28, 51 and 126 route to the owning skill rather than asserting new installed method names. Line 14 clears aliases only. |
| `skills/sendmux-getting-started/SKILL.md` | FINDING | A1: line 22's preference for existing environment variables conflicts with isolation/loading instruction at 16. No candidate-only package/command/method used in runnable examples at 82–225; names exist in C/M/B/G/S. |
| `skills/sendmux-mailbox-agent/SKILL.md` | FINDING | F4: line 50 recommends candidate-only attachment-text tools without the installed-support caveat used by adjacent row 49. Explicit candidate qualification at 226 covers the new draft/scheduling/extraction names below, including 244–260; those guarded tables are accepted. Ordinary CLI/MCP/TS calls elsewhere exist in C/M/B. |
| `skills/sendmux-management/SKILL.md` | PASS | Every named CLI/MCP command and TS helper exists in C/M/G; SDK `accessToken` provider claim at 42 matches K `dist/types.d.ts:42–43`. Line 16 clears aliases only. |
| `skills/sendmux-mcp-setup/SKILL.md` | FINDING | F2: lines 16 and 45 teach unsupported release QUBRICS precedence/selection. F3: lines 41 and 73 identify the installed release boundary using historical 2.1.3 rather than currently installed 2.2.0. Explicit candidate resource/catalogue at 33 and 65–73 accepted. SENDMUX examples at 90–120 and client configurations use release-supported variables/scripts. |
| `skills/sendmux-send-email/SKILL.md` | PASS | All MCP names and CLI send/upload flags exist in M/C; TS methods at 190–228 exist in S. SDK token-provider claim at 60 matches K `dist/types.d.ts:43`. Line 16 clears aliases only. |
| `skills/sendmux-token-efficient-usage/SKILL.md` | PASS | Every named ordinary CLI/MCP/TS operation exists in C/M/B/G/S. Node helpers at 77 exist in B/S; core helpers at 208 and 260–265 exist in K. Line 16 clears aliases only. |

## Findings and smallest corrections

### F1 — CLI profile setup and precedence copied from unpublished candidate

Affected: `skills/sendmux-cli/SKILL.md:92–94`, `:99`, `:103`, `:105–107`; released install at `:32`.

Published C `package/dist/commands/profiles/set.js:27–29` reads only `flags["api-key"] ?? process.env.SENDMUX_API_KEY`; absent both, error is `Pass --api-key or set SENDMUX_API_KEY.` The member's SHA256 is `0c6c5b593052010d215f0bb78614fcd6ac6db9eb215eb61aa2f6f266c5afb31f`.

Published C `package/dist/base-command.js:24–29` reads `SENDMUX_API_KEY`, `SENDMUX_ACCESS_TOKEN`, `SENDMUX_BASE_URL` and `SENDMUX_PROFILE`, with the API-key/token conflict check based only on those values and `--api-key`. Profile selection is at `:57`; profile base URL fallback at `:99`. Member SHA256 `765fad9e7c8b95f9e61d0e76b74bc781f6e3795d64975aca3fabee4801676516`. No C `.js` member contains `QUBRICS`.

Candidate origin: SDK `73bedb8:packages/ts/cli/src/commands/profiles/set.ts:30–32` and `packages/ts/cli/src/base-command.ts:53–59` add QUBRICS-first lookup. That candidate has not become C merely because the guide installs C's package name.

Symptom: with the stated isolated process and only `QUBRICS_API_KEY` set, each line 92–94 profile command exits before saving its profile. QUBRICS token/profile/base-URL values in the precedence prose are ignored by C, rather than taking the advertised precedence. No product request was executed by this audit.

Minimal correction: use `SENDMUX_API_KEY` in the three released-package setup commands. Describe released SENDMUX lookup in the surrounding prose; put QUBRICS-first behaviour in an explicitly unpublished `73bedb8` note if retained. Keep the instruction to clear both namespaces.

### F2 — MCP release has no QUBRICS environment lookup

Affected: `skills/sendmux-mcp-setup/SKILL.md:16` sentence claiming QUBRICS precedence, and `:45` QUBRICS surface selector; released install at `:38`.

Published M `sendmux_mcp/cli.py:80–88` resolves `--surfaces`, then `--surface`, then only `SENDMUX_MCP_SURFACES`; `:22–24` exits if no surface was selected. Member SHA256 `ed2b48ed6ee9a081ac40a1e8c5c29d032bb356eaee1f0a31713092a0558f1539`.

Published M `sendmux_mcp/config.py:107–134` reads only SENDMUX environment names for transport, generic credential, API origins, bearer token and configuration; `:179–184` reads `SENDMUX_<SURFACE>_API_KEY`. Member SHA256 `28f9fe9f396d707562fb119a75f3a92a27db78ade735cf3bf2f5d3039c6583df`. No M `.py` member contains `QUBRICS`.

Candidate origin: SDK `73bedb8:packages/python/mcp/sendmux_mcp/config.py:27–31` introduces QUBRICS-first `env_value()`, used at `:122–148` and `:194–199`; candidate `cli.py:85` uses it for surface selection.

Symptom: setting only `QUBRICS_MCP_SURFACES` for released `sendmux-mcp` does not select a surface and reaches the required-surface error. QUBRICS-only API keys or HTTP bearer/config values are ignored; they do not have the advertised precedence. An inherited SENDMUX per-surface key can still override the generic SENDMUX key; that separate warning is correct.

Minimal correction: teach `SENDMUX_MCP_SURFACES` and SENDMUX credential/config inputs for the published install; qualify QUBRICS lookup as unpublished candidate behaviour. Continue clearing both namespaces before loading the intended release-supported values.

### F3 — MCP version string does not identify the candidate catalogue

Affected: `skills/sendmux-mcp-setup/SKILL.md:41` and `:73`.

Published M `sendmux_mcp-2.2.0.dist-info/METADATA:3` is version `2.2.0`. M `sendmux_mcp/mcp-contract.json` has `package.version=2.2.0`, `tools.count=54`, and surface lengths Mailbox 26 / Management 22 / Sending 6, with zero `qubrics_` names. Contract member SHA256 `d3cb6468e9cbe0f27ffc88f15f27107561e5ae421f2f834aa7c1bbcfd95268ae`.

Candidate `73bedb8:packages/python/mcp/sendmux_mcp/mcp-contract.json` has 150 names: Mailbox 92 / Management 46 / Sending 12. Its 75 aliases comprise Mailbox 46 / Management 23 / Sending 6. Candidate and release both use version string 2.2.0 but have different bytes and catalogues.

Symptom: an unpinned install produces released 2.2.0 while the guide calls 2.1.3 its released reference and identifies 2.2.0 as candidate. The explicit candidate label prevents treating the 150-name table as a runnable release catalogue, but the version boundary is stale and cannot distinguish the two 2.2.0 artifacts. The 54/26/22/6 released counts themselves remain correct.

Minimal correction: identify current published 2.2.0 as the 54-name release and identify the 150-name source catalogue by unpublished SDK commit `73bedb8`, irrespective of its same version string. Keep credential-visible subsets separate from total counts.

### F4 — attachment-text preferred-call row lacks the candidate boundary

Affected: `skills/sendmux-mailbox-agent/SKILL.md:50`.

Published M's complete `tools.by_surface.mailbox` has neither `mailbox_request_attachment_text` nor `mailbox_get_attachment_text`. Published C's manifest has neither `mailbox:request-attachment-text` nor `mailbox:get-attachment-text`; published B's complete exported declarations have neither `mailboxRequestAttachmentText` nor `mailboxGetAttachmentText`. These names exist only in the candidate section of the audited body; line 226 explicitly says its qualification covers names **below**, so it does not qualify preferred-call row 50. Adjacent draft row 49 already says to verify installed support.

Symptom: an agent following preferred row 50 against M cannot discover either recommended tool. The later candidate-qualified method table is not itself an execution defect.

Minimal correction: add the same candidate/installed-support check to row 50, or route that row to the explicitly candidate-qualified attachment-text section. Do not replace the guarded tables or invent release equivalents.

### A1 — existing-environment preference versus isolation

Affected: `skills/sendmux-getting-started/SKILL.md:22` versus `:16`.

Line 16 requires clearing inherited credentials and overrides in an isolated process, then loading only the intended key from the user's secret store. Line 22 says to prefer existing environment variables without that qualification. This is an instruction ambiguity, separate from whether either package accepts QUBRICS names.

Minimal correction: prefer the authorised existing profile or secret store; allow existing environment values only after establishing the intended credential and explicitly loading that value into the isolated process. Preserve the clearing and identity checks.

## Accepted candidate boundaries and release-supported names

- `skills/sendmux-cli/SKILL.md:130–139`: explicitly unpublished command catalogue; no finding. C's actual `package/oclif.manifest.json` contains 111 commands: Mailbox 42 / Management 54 / Sending 8 / OAuth 2 / Profiles 3 / Agent 2; no aliases. Manifest member SHA256 `1cac601ecfe7556f1834c729c2ce0b1dc2b87e64387e203b829208d02157cecc`. Candidate command sources total Mailbox 63 / Management 57 / Sending 8 / OAuth 2 / Profiles 3 / Agent 2, matching the candidate table.
- `skills/sendmux-mcp-setup/SKILL.md:33`, `:65–73`: explicitly candidate resource and 150-name catalogue; no execution finding. The historical release identification in F3 still needs updating.
- `skills/sendmux-mailbox-agent/SKILL.md:226`, `:244–260`: candidate qualification covers five draft/schedule names and two attachment-text names across MCP/CLI/TypeScript. Those seven names are absent from M/C/B, as expected; the guarded table is accepted.
- All other literal CLI commands matched C manifest keys and all other literal MCP names matched M contract names. All ordinary TypeScript method names matched actual exported declarations in K/B/G/S; `@sendmux/*` package names remain valid released names, and B/S/U expose their documented `./node` entry points.
- Example published declaration anchors: B `package/dist/generated/sdk.gen.d.ts:39` connection, `:119` get-me, `:137` batch read, `:185` count, `:191` query changes, `:197` snippet search; B `package/dist/node.d.ts:45–49` attachment helpers. G `package/dist/generated/sdk.gen.d.ts:105` delivery-log detail, `:211` connection. S `package/dist/generated/sdk.gen.d.ts:45–63` send, batch, connection and OpenAPI; S `package/dist/node.d.ts:29–30` file upload/send helpers. K `package/dist/headers.d.ts:2–4` conditional/idempotency/ETag helpers, `package/dist/pagination.d.ts:2` pagination and `package/dist/types.d.ts:42–43` credential providers.
- Python import anchors: PB `sendmux_mailbox/__init__.py:322–330`, `sendmux_mailbox/client.py:66`, `sendmux_mailbox/attachments.py:144` and `:164`; PS `sendmux_sending/__init__.py:116–121`, `sendmux_sending/client.py:66`, `sendmux_sending/attachments.py:66`. Module/export/helper names in `sendmux-attachments` are release-supported.
- Clearing inherited QUBRICS values in all eleven skills is safe on the legacy release. A clearing instruction is not evidence of teaching that release to consume those values.

## Limits

Static published-artifact verification only. No package installation, service execution, live identity validation, mailbox access, send, CI, commit, push, release, deployment or source-body edit performed. Third-party client configuration and hosted-runtime compatibility remain outside this one-cause audit. Parent owns implementation and behavioural proof of the CLI correction.
