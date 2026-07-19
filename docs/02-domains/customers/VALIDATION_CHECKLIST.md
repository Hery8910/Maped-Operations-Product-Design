# Customers Validation Checklist

**Status:** PLANNED — acceptance evidence template.

## Product necessity and data evidence

- [ ] Every field, counter, filter, tab and action records operational need,
  source, fallback, freshness and authorization.
- [ ] Customers is tenant–customer relationship, not global identities; route is
  `/people/customers` and legacy `/people/users` handling is planned.
- [ ] Only operational relationships appear/count/search in normal Customers.
  Lifecycle, relationship grant, global Identity/Auth safety and tenant
  availability are independently represented; unknown is never treated as zero.
- [ ] `inactive` has no assumed product mapping. Restricted access, archived/
  removed relationship and tenant unavailability do not create Action required.
- [ ] Lifecycle/grant come only from the dedicated relationship authority;
  `UserClient.status`, email, Profile and Invitation acceptance are never used
  as legacy fallbacks. Tenant-scoped uniqueness, reconciliation and cutover
  evidence satisfy `CUSTOMER_RELATIONSHIP_DOMAIN_CHANGE_GATE.md`.
- [ ] Only authorized tenant admins (or explicitly audited super-admin scope)
  receive a tenant projection. Primary denial has no row/detail/count/search or
  resource-existence signal; secondary source denial is distinct restricted.
- [ ] Default Customers, Invitations and Action required are mutually exclusive
  views; summary cards are informative; no legacy All/Active/Inactive/Profile
  complete filter appears.
- [ ] Summary populations are tenant-wide and Action required is only
  delivery-failed/expired invitations.
- [ ] Profile result is exactly complete, incomplete or unknown. Complete requires
  customer-confirmed name and supported locale; phone/address/email are excluded
  inputs. Incomplete/unknown do not create Action required.
- [ ] Four tenant-wide counters follow their exact approved populations, never
  use cursor rows/search/filter state, distinguish zero from unknown/unavailable
  and never render Profiles complete greater than Customers as ready.

## Directory, detail and related work

- [ ] Search accepts name/email/telephone; Customers, Invitations and Action
  required filters produce distinguishable results.
- [ ] Initial, refresh, ready, true-empty, search-empty, filter-empty,
  error/retry, loading-more/end and selected load/error/stale all work.
- [ ] Overview shows authorized current-email projection, Profile, all addresses
  and deterministic completeness/reasons without tenant-admin editing.
- [ ] Customer rows contain only minimum references, label, email, completeness,
  lifecycle/access and read indicators; telephone/locale/addresses are excluded.
- [ ] Overview allows partial Profile/address blocks only after current primary
  authorization. Lifecycle/access/security/tenant context and addresses obey
  the documented never-stale rules.
- [ ] Each summary can load, refresh, retain permitted stale value, retry or fail
  independently without resetting directory context; primary denial removes all
  counters and no counter partial leaks.
- [ ] Search normalizes deterministically, requires two significant characters
  when nonempty, never performs fuzzy/global lookup and distinguishes short
  query/no-search/no-filter/true-empty/unavailable states.
- [ ] Cursor is opaque and scoped to actor/tenant/filter/query/order/review;
  mismatch/expiry is not empty, load-more retains valid pages, and selection
  reconciles safely across lifecycle/Invitation/authorization changes.
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
- [ ] Customer relationship eligibility, invitation acceptance, tenant access,
  Profile completeness and Request eligibility are evaluated independently;
  Request eligibility only comes from Service Requests.
- [ ] Accepted invitation reconciles to exactly one operational relationship;
  existing/archived relationship paths cannot create duplicates or a blind
  reinvitation.

## Frontend quality and configuration

- [ ] Directory/detail/form relationship works desktop, tablet and mobile;
  narrow Back restores useful query/filter/list/focus context.
- [ ] Every state is valid in light/dark and long localized content; focus,
  semantics, keyboard actions and status text are reviewable.
- [ ] Tenant customization is limited to approved branding/configuration;
  layouts, responsive behavior and semantic success/warning/error colors stay
  shared.
