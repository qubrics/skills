# MCP setup compatibility review

Reviewer: source reviewer `/root/ecosystem`; independent Spec reviewer and fresh reader `/root/docs`.

This review binds the changed Qubrics MCP setup examples to the existing immutable producer tuple. It is source-review evidence, not an evaluation run, acceptance receipt or publication approval.

## Exact scope

Reviewed skill bytes: SHA256 `6014d9ad6754bac2e23cdfa47c55c570b817a27e03affeeb7dee2b947fe6af6b`; skill digest `a7fff1672b889bf24f596f79c30b1498da7c0f5785ea630458d6064dfb677136`; selected contract digest `d13efb6edafdd6788d67cedc1fa44e24985396313f79601ffeeb24aa1d48878a`.

Source tuple: app `06a1d50eeb483e8a4c6aeb8da64832c5d3dc5a7e`, sending `2f4226655efc05f109b5feda50ed2ca1570aea91`, SDK `c8549be2099e5a2f6947262bbeaf6f5e8b678801`. These are the unchanged owning release inputs, not a new producer or a publication request.

## Compatibility trace

- Candidate SDK `packages/python/mcp/qubrics/mcp/config.py:27–31` looks up the equivalent `QUBRICS_` name before its `SENDMUX_` fallback. The file is byte-identical at the skill's cited `a326bc923fff448470d908bb527afaaa35f6d739`, the reviewed `c8549be2` input and the locally executed module: SHA256 `a69059776df6c5d980abdb3d5306a377e9820e23597616f41ed05b3219796230`.
- `config_from_env()` reads the generic key, surface selector, bearer and transport through `env_value()`. `surface_api_keys_from_env()` uses the same helper for Mailbox, Management and Sending keys. Renaming these fresh examples therefore selects the same values and authorisation surfaces.
- Executing that actual module in an isolated environment passed all three Qubrics surface keys, surface parsing, key-family validation, local HTTP bearer retention, legacy Sendmux fallback and Qubrics precedence. Values were non-secret fixtures; the check made no upstream request.
- `qubricsMailbox` and `qubricsLocalHttp` are user-chosen VS Code config entry names. Their commands, transport, URLs, headers and input selectors are unchanged. All 17 JSON/TOML samples parse.
- The separate released `sendmux-mcp` 2.2.0 compatibility paragraph retains its catalogue, executable and publication facts. Tag `python-mcp-v2.2.0`, `packages/python/mcp/sendmux_mcp/config.py:127`, reads `SENDMUX_MCP_HTTP_BEARER_TOKEN`; the explicit old-version bearer note is accurate.
- Hosted OAuth resource, candidate publication caveat, tool names, key prefixes, security boundaries, upload limits and verification operations are unchanged. The change introduces no endpoint, parameter, schema or runtime behaviour.

## Independent review and gates

`/root/docs` independently reviewed `origin/main...5fa86a91` against #1098 and the rebrand spec: zero source findings, no missing source requirement, scope creep or wrong implementation. The fresh-reader Truth/Protected set/Voice review also passed the released compatibility sentence after checking the exact old tag. No evaluator output or workflow benchmark is claimed by this record.

The exact PR CI source passed all 57 existing tests with zero failures and zero skips, plus the static claims checker. The following guard correctly stopped for the absent review of this changed skill digest. This explicit review documents compatibility; historical workflow records, assertions, checker and producer pins remain intact.

Verdict: compatible with the unchanged selected contract. The actual candidate guard additionally requires a genuine workflow-kind successor for the published `sendmux-mcp-setup` instructions: `published/sendmux-mcp-setup can only be superseded by its tested replacement`. This direct compatibility review does not satisfy that release gate. A new evaluation bound to these exact changed skill bytes, with the original published previous-skill binding, remains required before release.
