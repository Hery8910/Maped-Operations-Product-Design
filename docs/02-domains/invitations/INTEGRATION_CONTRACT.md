# Invitations Integration Contract

**Status:** PLANNED — contract gates open.

`CUSTOMER_ACCESS_LIFECYCLE_CONTRACT.md` fixes product semantics for the
customer-access variant. Backend/frontend must map it without treating legacy
Tenant Users delivery, attention or Profile materialization as authority.

Backend must provide tenant-scoped invitation identity/projection, kind,
recipient/proposal fields, opaque non-PII credential, expiry, delivery result,
cooldown eligibility, lifecycle/audit and semantic outcomes. Commands support
create, resend, renew-and-resend, revoke and acceptance/reconciliation with
authorization and idempotency guarantees. Verify delivery persistence identity,
token rotation/invalidation, transactional behavior, rate limits, expiry policy,
history retention and new/existing identity handling.

For `customer_access`, proposal materialization and acceptance must preserve the
source boundary in `../customers/CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md`:
they may create an unconfirmed Profile revision with provenance, but may never
create customer-confirmation evidence.

Frontend must render lifecycle meaning and only the action legal for the state;
pending blocks duplicate action, field errors are local, recoverable outcomes
preserve input/context and revoke has confirmation/focus restoration. Initiating
domains define their page composition; Invitations does not require a universal
invitation screen.
