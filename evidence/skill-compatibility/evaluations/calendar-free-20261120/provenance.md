# Genuine offline workflow evaluations

Coordinator and independent grader: `/root`. Evaluators ran separately with
fresh contexts through collaboration tasks `/root/calendar_workflow_final`
and `/root/calendar_workflow_baseline`; each wrote its own actual responses
and transcripts. Neither evaluator read assertions, grading, the other arm or
the alternative source skill. Receipts were recorded after their completion
from the actual files and measured source/prompt/output hashes. The additional
five-executable case used `/root/calendar_workflow_final` and
`/root/calendar_five_scripts_baseline`; the baseline transcript records an
unsolicited context injection after its answer was already written.

The final arm used immutable Skills
`6751d3112af4fc0e78a223ba94cdbcea53bbdfe3` for both changed skills. MCP setup's
historical arm used the original published legacy Skills
`9d8059b10111943ce08860217a27222f43507686`; mailbox's historical arm used the
calendar-bearing v2.0.7 `8a7628e1118f7fad67dfaa631ff025ba73f3f596`.

The coordinator independently read all eight outputs and graded the concrete
behaviours against the unchanged public safety boundaries and the decided
calendar exclusion. Final setup passes 5/5 renamed-command and 4/4 compatibility
assertions, plus 5/5 five-executable assertions; legacy setup passes 2/5, 2/4
and 2/5 respectively. Final mailbox passes 4/4 calendar
boundary assertions; v2.0.7 passes 1/4, because it affirmatively teaches the
held calendar operations. These are instruction-following results, not runtime
or package-publication proof.

The repository's existing skill-creator `scripts.aggregate_benchmark` generated
both benchmarks from grading.json. Its delta is the first alphabetic arm minus
the second (`old_skill` minus `with_skill`), so negative deltas here mean the
final skill improved. Tool-generated zero timing/token fields mean unmeasured;
no timing, cost, model identity or client-certification claim is made.

All original workflow evaluations, negative/security assertions, historical
reviews and original published baselines remain unchanged. These are new runs,
not relabelled historical outputs. No credential, server launch, authentication,
message/calendar action, provider mutation or publication occurred.
