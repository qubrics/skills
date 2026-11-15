# Review correction compatibility addendum

Independent reviewer `/root/phase2_contract_review` reviewed Skills content commit `ef85090ca8b10d9ed23d4ec1acae7b64b041d8dc` against SDK `8d3d7492dc83852906c163d0ce0c30cfdd0bc06f`, comparing the two changed bodies with baseline `ad2930c80237b301d620377c18181b0cf5edc967`. Both are source-compatible; no outstanding finding remains. Original common source review and historical bindings remain unchanged.

| Skill | Evidence and disposition |
| --- | --- |
| `qubrics-send-email` | COMPATIBLE. Body lines 159-177 use supported `--body-file`, preserving the JSON schema at lines 64-76 and stable idempotency. SDK `packages/ts/cli/src/operation-flags.ts:47-49,175-224` documents and parses JSON files; `generated/operations.ts:5390-5436` defines single/batch JSON operations. Cleanup covers only task-created temporary files after send reconciliation, preserving user files and retry input. Truth and protected set PASS. |
| `qubrics-mcp-setup` | COMPATIBLE. Body line 67 requires connected-server discovery before choosing candidate tools. SDK `packages/python/mcp/sendmux_mcp/server.py:74-82,149-175` exposes aliases and selected surfaces; `permissions.py:109-152` restricts authorised tools. Body lines 41,75 retain the exact released-wheel/source-catalogue distinction. Truth and protected set PASS. |

Header names remain exact public inputs. Mailbox SDK `packages/ts/mailbox/src/generated/types.gen.ts:95,190,1733` publishes the case-insensitive rejection rules for `X-SES-TENANT`, `X-SES-CONFIGURATION-SET` and `X-SES-MESSAGE-TAGS`; removing those literal names would weaken the instructions. Sending SDK `packages/ts/sending/src/generated/types.gen.ts:390-396` and `sdk.gen.ts:41-48` accept `X-Sendmux-Upload-Token` alongside `X-Qubrics-Upload-Token`; if both are supplied, their values must match. No wire-name replacement is made by the branding change.

This supports two fresh compatibility-kind records. It is source review, not a workflow evaluation or acceptance receipt. No runtime file permissions, live MCP discovery, product action, credentials or marketplace publication was exercised. The existing checker must independently bind the new bytes and measure acceptance.
