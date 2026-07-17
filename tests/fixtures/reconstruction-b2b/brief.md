# RelayOps product brief

- Status: approved product direction
- Approved: 2025-10-12
- Owner: Head of Operations Product
- Scope: desktop Web product and the shipment-exception workflow

RelayOps is a three-year-old B2B operations product used by dispatchers,
operations managers, and compliance auditors to triage shipment exceptions,
assign responsibility, collect evidence, and resolve an exception.

The primary job is to understand which exception requires attention, why it is
blocked, who owns the next action, and what evidence is needed to resolve it.
The primary product outcome is shorter time to trustworthy triage without
increasing mistaken resolution.

Approved product constraints:

- only operations managers can reassign an exception marked as a compliance
  hold;
- a resolution requires a reason and at least one evidence reference;
- compliance holds cannot be bulk-resolved;
- audit history must preserve the actor, timestamp, previous value, new value,
  and reason;
- the product does not currently contain an AI assistant, autonomous action,
  generated UI, or conversational workflow.

Approved success measures:

- median time from first open to a triage decision;
- rate of resolutions reopened within 24 hours;
- rate of attempts blocked by missing permission or evidence.

No numerical targets are approved.

Known scope gaps:

- current product requirements say “desktop Web” but do not define a minimum
  supported viewport;
- tablet use has been reported but is not an approved platform;
- there is no approved brand guide, typography license record, or visual
  direction;
- no person currently owns a design-system approval decision.
