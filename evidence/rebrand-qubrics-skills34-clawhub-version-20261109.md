# Skills #34: configured ClawHub publication version

Ops authorised this origin fix as a separate ordinary PR on 2026-11-09. Remaining rename/publication work stays held. This PR does not close #34.

## Cause and canonical fix

`openclaw.skills.json` owns the bundle version. The builder writes it into generated frontmatter, but the publisher previously loaded only owner/root and emitted `skill publish <dir> --owner <owner> --json`. No publication version crossed the CLI boundary.

The workflow pins `clawhub@0.23.3`. Its [published package](https://registry.npmjs.org/clawhub/0.23.3) contains `dist/cli/commands/publish.js`: `options.version` is read at line 29; line 89 chooses that explicit version or `resolveAutomaticVersion(latestVersion)`. Lines 234–240 default a new skill to `1.0.0`, then increment the latest patch for subsequent changes. Generated frontmatter does not select the registry version.

Canonical per the [official CLI guide](https://github.com/openclaw/clawhub/blob/main/docs/cli.md) and [publishing guide](https://github.com/openclaw/clawhub/blob/main/docs/publishing.md): pass `--version <version>` to select an exact publication version. These sources and the pinned package were investigated in the task's `independent-readiness-20261109.md` on 2026-11-09.

The fix carries `config.version` into publisher options and passes it to the existing shared command builder. Ordinary publication and dry-run now use the same explicit configured version. No additional process, request, retry or persistent output is introduced.

## Regression proof

The existing tests covered rate-limit parsing/planning and workflow routing, but never exercised the emitted publication command. Two regression cases now execute the real wrapper with its existing `--clawhub-bin echo` seam and the checked-in skill inventory, covering ordinary and dry-run modes. They read the expected version independently from `openclaw.skills.json` and check every emitted skill command.

Before the fix:

```text
node --test --test-name-pattern='publisher forwards the configured version' scripts/publish-openclaw-bundle.test.mjs
fail 2, pass 0, skipped 0
AssertionError [ERR_ASSERTION]: skill publish .../skills/agent-email-inbox --owner sendmux.ai --json
AssertionError [ERR_ASSERTION]: skill publish .../skills/agent-email-inbox --owner sendmux.ai --json --dry-run
```

Both failures were the missing `--version 1.8.2`, rather than a fixture or dependency failure.

After the fix: `node --test scripts/publish-openclaw-bundle.test.mjs` exited 0; 8 passed, 0 failed, 0 skipped. `git diff --check` exited 0. No tests removed or assertions weakened. No local `check:fast` script exists; the focused existing test file is the local gate, and existing Plugin bundles CI carries these tests.

PR #43's first [CI run 42559856586](https://github.com/qubrics/skills/actions/runs/42559856586) found one additional fixture dependency in `workflow-boundaries.test.mjs:349`: expected `["--owner", "sendmux.ai", "--json"]`, actual added `["--version", "undefined"]`. Its fixture configuration at line 69 omitted `version`; the old exact-argv expectation also omitted the newly required flag. All other 25 tests passed. Full failed-job log: `.claude/artifacts/rebrand-qubrics-skills34/clawhub-version-ci-42559856586.log` in MAIN.

The fixture now supplies version `1.8.2` and its exact command assertion requires that version. Existing credential, file-permission and teardown assertions remain intact. The previously failing case passed locally with `node --test --test-name-pattern='ClawHub publish reads an owner-only ephemeral config without secret argv' scripts/workflow-boundaries.test.mjs`: exit 0, 1 passed, 0 failed, 0 skipped; fixture processes and temporary credentials were verified gone by the existing test. This corrects the fixture to the approved CLI contract; no retry or threshold change. Independent Standards and Spec reviews of the initial code/evidence commit each reported 0 findings; the fixture correction is also reviewed in the final diff.

## Publication boundary and rollback

No real ClawHub command, login, upload, release, tag, marketplace update or SDK workflow was run. Workflow state was read through GitHub and remains `disabled_manually`; this PR does not change workflow configuration. No `skills/**` path or version metadata changes, so the Notify SITE path trigger is untouched.

Merge requires Ops approval after green PR CI. ClawHub publication remains a separate operator ASK with the exact owner, version and inventory named. Repository rollback is a normal revert through PR; this fix publishes nothing by itself.
