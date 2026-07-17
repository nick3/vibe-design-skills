# Representative UI observations

- Collected: 2026-06-20
- Collector: Product Design audit
- Authority: observed production behavior
- Coverage: six representative desktop views at 1440×900 and 1024×768

## Exception list

- The 1440-pixel view uses 44-pixel rows and exposes owner, lifecycle, SLA,
  location, carrier, and last update.
- The 1024-pixel view keeps every column and introduces horizontal scrolling;
  the bulk action bar can obscure the last two rows.
- SLA breach and destructive action both use the same red.
- Keyboard focus is visible on filters but absent from row action menus.
- The empty state says “No data,” without distinguishing no exceptions from
  filters that produce no results.

## Exception detail

- The route title uses `Shipment Exception`, but the activity panel uses the
  deprecated label `Issue`.
- The page shows `Working` while the API response and audit log use
  `Investigating`.
- The current owner appears in the summary, assignment card, and activity
  timeline with different labels.
- A dispatcher can see the reassign control for a compliance hold; the server
  rejects the action after confirmation.

## Resolution

- The form visually marks the reason as required but not the evidence
  reference; the server requires both.
- A failed request clears the reason and selected evidence.
- The success toast appears before the audit history refresh completes.
- A stale update is shown as a generic network error.

## Visual consistency

- The six views contain three primary blues, four row densities, two surface
  shadow styles, and five heading treatments.
- Inter is loaded in four routes; the remaining routes fall back to the system
  stack. No font license or product-wide typography decision was supplied.
- The audit did not include dark mode, high-contrast mode, screen-reader output,
  reduced motion, or browser zoom evidence.
