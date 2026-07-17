# Design and code component inventory

- Collected: 2026-06-18
- Collector: Design Operations
- Authority: observed, not approved
- Coverage: exception list, exception detail, assignment, and resolution flows

## Figma observations

- Three button component sets are in active files: `Button`, `Button v2`, and
  `ActionButton`.
- Their default heights are 32, 36, and 40 pixels.
- The primary fill is `#1d4ed8` in the newest library, while older screens use
  `#2563eb`.
- Destructive confirmation uses either a red primary button or a neutral primary
  button with red warning copy.
- Table row components exist at 36, 44, and 48 pixels.
- The exception detail header has two incompatible variants: a compact title
  row and a large summary panel.
- Focus, loading, permission-denied, stale-state, and partial-success variants
  are missing from the shared library.

## Production-code observations

- `PrimaryButton`, `LegacyButton`, and raw `<button>` usage all remain active.
- Two table implementations exist: `DataTable` and `CompactGrid`.
- Confirmation behavior is implemented by three different dialog wrappers.
- Status badges accept free-form color props rather than a constrained semantic
  role.
- Empty and error states are composed locally in each route.

## Evidence limit

Frequency does not establish correctness. The inventory records what exists; it
does not select canonical components, values, or interaction behavior.
