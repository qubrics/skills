# Attachment evaluation assertion correction

The first authored assertion incorrectly expected Mailbox `attachmentId` or `attachmentIds`. The genuine evaluator did not echo that error: its unchanged response correctly distinguishes outgoing Mailbox `blob_id`, outgoing Sending `attachment_id`, and Mailbox read arguments `message_id`/`attachment_id`.

Canonical at exact SDK `a326bc923fff448470d908bb527afaaa35f6d739`: `packages/python/mailbox/qubrics/mailbox/attachments.py:110,148,188` and `packages/python/sending/qubrics/sending/attachments.py:95`. The original assertion was false against that source. Correcting the newly authored assertion follows the cited-source rule; no existing security/negative assertion changed, and no product behaviour or evaluated response changed. The prompt bytes are unchanged, so the genuine execution receipt remains bound to the actual prompt and frozen skill.

No package install, import execution, server, content access or external call was performed. Grading assesses the actual offline source-migration response, without claiming live workflow execution.
