# Customers Validation Checklist

**Status:** PLANNED — acceptance evidence template.

## Product necessity and data evidence

- [ ] Every field, counter, filter, tab and action records operational need,
  source, fallback, freshness and authorization.
- [ ] Customers is tenant–customer relationship, not global identities; route is
  `/people/customers` and legacy `/people/users` handling is planned.
- [ ] Summary populations are tenant-wide and Action required is only
  delivery-failed/expired invitations.
- [ ] Profile completeness is informational; it does not create Action required.

## Directory, detail and related work

- [ ] Search accepts name/email/telephone; Customers, Invitations and Action
  required filters produce distinguishable results.
- [ ] Initial, refresh, ready, true-empty, search-empty, filter-empty,
  error/retry, loading-more/end and selected load/error/stale all work.
- [ ] Overview shows identity, Profile, all addresses and completeness without
  tenant-admin editing.
- [ ] Requests/Work Orders are hidden when disabled and otherwise offer only
  authorized paginated read projection plus owner-domain navigation.
- [ ] Note list/create/edit/archive behavior satisfies internal-only access,
  author/timestamp/audit and preservation requirements.

## Invitations and Profile completion

- [ ] Invite panel validates required proposed name/email/language locally;
  phone/address are not requested from tenant admin.
- [ ] Pending, success, existing relationship, pending-invitation,
  pre-persistence, persisted-delivery, permission and unknown outcomes are
  distinguishable and preserve work where recoverable.
- [ ] Resend, renew-and-resend, cooldown and revoke match lifecycle contract;
  accepted/revoked rows reconcile/remove correctly.
- [ ] New/existing identity acceptance, explicit Profile correction/save and
  interrupted-resume never silently overwrite confirmed Profile data.

## Frontend quality and configuration

- [ ] Directory/detail/form relationship works desktop, tablet and mobile;
  narrow Back restores useful query/filter/list/focus context.
- [ ] Every state is valid in light/dark and long localized content; focus,
  semantics, keyboard actions and status text are reviewable.
- [ ] Tenant customization is limited to approved branding/configuration;
  layouts, responsive behavior and semantic success/warning/error colors stay
  shared.
