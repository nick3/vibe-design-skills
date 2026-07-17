# Shipment-exception domain glossary

- Status: approved domain source
- Approved: 2026-02-03
- Owner: Operations Policy Lead

## Entities

- **Shipment**: the tracked movement of goods under one carrier reference.
- **Shipment Exception**: an event that prevents the shipment from following
  its expected plan and requires a triage decision.
- **Evidence Reference**: an immutable link to a document, scan, message, or
  system event used to support a resolution.
- **Compliance Hold**: a policy-controlled exception that restricts reassignment
  and resolution.
- **Owner**: the person accountable for the next action. This is not the same as
  the person who created or last edited the exception.

## Canonical lifecycle

1. `Open`
2. `Investigating`
3. `Resolved`
4. `Reopened` when a prior resolution becomes invalid

`New`, `Working`, and `Done` are deprecated labels. They are not synonyms in
new product work and must not appear in newly approved interface copy.

## Permissions

- Dispatchers may claim an unowned ordinary exception and add evidence.
- Operations managers may assign or reassign ordinary exceptions.
- Only operations managers may reassign a compliance hold.
- Compliance auditors may add policy findings but may not resolve an exception.
- No role may bulk-resolve compliance holds.

## Resolution invariants

- reason and evidence reference are required;
- stale updates must return the current owner and lifecycle state;
- a failed resolution must preserve the user's entered reason and evidence
  selection;
- the audit event is authoritative only after the resolution succeeds.
