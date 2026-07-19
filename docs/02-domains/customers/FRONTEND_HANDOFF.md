# Customers Frontend Handoff

**Status:** PLANNED — frontend contract verification required.  
**Authority:** Required composition, behavior and accessibility preservation.

## Route and composition

Implement Customers at `/people/customers`. Plan `/people/users` as a legacy
redirect during migration; do not maintain two independently evolving surfaces.
Use a wide directory/detail composition. The left header carries `Invite
customer`; selecting it renders the form in the top-aligned right panel, not a
modal. Right detail supports Customer, Invitation and Invite states.

## Required visible structure

- Summary: Customers, Profiles complete, Pending invitations, Action required.
- Search: name, email or telephone; filters: Customers, Invitations, Action
  required.
- Customer: Overview, Requests, Work orders, Notes; hide owner sections when
  their tenant module is disabled.
- Overview: current email projection, Profile, all addresses and deterministic
  `complete`/`incomplete`/`unknown` completeness with reasons; read-only.
- Requests/Work Orders: compact paginated read projections and navigation only.
- Notes: internal create/list/edit/archive only when the contract permits.

## State, URL and responsive behavior

Represent query, active filter, selected relationship and pagination/addressable
detail in URL state where the frontend architecture supports it; exact URL shape
is a gate. Preserve context through refresh and narrow focused detail/form Back.
Implement every documented loading/empty/error/stale/action/permission/module
state. Validation is field-local; pending blocks duplicates; local feedback
preserves input. Revoke uses proportionate confirmation and focus restoration.
Do not derive request eligibility from Profile completeness. Unknown Profile data
must not be styled or counted as incomplete.

## Accessibility and branding

Use semantic landmarks and controls, keyboard selection/actions, visible focus,
textual status meaning and correct focus on focused mobile views. Validate long
localized labels, light/dark themes and desktop/tablet/mobile. Tenant branding
may supply name/logo/approved brand colors/vocabulary/modules; it may not alter
layout, responsive behavior, component semantics or semantic success/warning/
error colors.

## Excluded implementation

No Profile editor, global-email editor, tenant-access editor, Activity, duplicate
Requests/Work Orders page, customer visible notes, generic access administration
or tenant-specific layout.
