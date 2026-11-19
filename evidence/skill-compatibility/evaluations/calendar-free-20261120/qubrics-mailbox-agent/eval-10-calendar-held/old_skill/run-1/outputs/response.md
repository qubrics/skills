Yes. This skill explicitly supports private calendars and non-sending calendar events. Its events do not support participants, recurrence, alerts, invitations or scheduling messages, so the documented calendar workflow does not send invitations.

No calls will be executed. The documented sequence would be:

1. Use an `smx_mbx_` key, scoped `smx_agent_` token or Mailbox OAuth grant. Validate the connection and verify the intended account and authorised mailbox first. An existing OAuth CLI profile uses `mailbox:get-connection --profile <profile> --json` with no mailbox selector. If several mailboxes are authorised, select a returned `data.mailboxes[].id` and provide it as `mailbox_id` on subsequent operations.
2. Require `calendar.write` for creation; calendar reads require `calendar.read`. Create the calendar with MCP `mailbox_create_calendar`, CLI `mailbox:create-calendar` or TypeScript SDK `mailboxCreateCalendar`, retaining one stable `Idempotency-Key` for that exact create. The skill names the operation but does not supply its calendar-create body, so I cannot provide a verified body from this source alone.
3. Use the returned calendar ID with MCP `mailbox_create_calendar_event`, CLI `mailbox:create-calendar-event` or SDK `mailboxCreateCalendarEvent`. Retain a stable `Idempotency-Key` for this exact event create and retain its `uid` before dispatch. Supply the intended title, start, time zone and duration; none were specified for this appointment.

The skill's illustrative event-create command is:

```bash
qubrics mailbox:create-calendar-event \
  --idempotency-key appointment-2026-11-20-v1 \
  --body '{"calendar_id":"calendar_123","uid":"appointment-2026-11-20@example.com","title":"Appointment","start":"2026-11-20T10:00:00","time_zone":"Australia/Melbourne","duration":"PT1H"}' \
  --json
```

Those calendar and appointment values are the skill's example, not a created calendar or an agreed appointment. For multiple authorised mailboxes, CLI selection adds `--query mailbox_id=<id>`; MCP uses its declared top-level `mailbox_id` argument.

If an event-create result is uncertain, reconcile with `mailbox_list_calendar_events` using the exact UID. Lookup is eventually consistent; an empty immediate result never authorises another create. Do not simulate recurrence with guessed copies.

No calendar or appointment created; no invitations sent. Installed-client support and the missing calendar-create body remain unchecked.
