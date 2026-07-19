# Invitations — Shared Access Invitation Capability

**Status:** DEFINED — reusable capability; contract verification pending.  
**Authority:** Invitation lifecycle, delivery and acceptance boundary.

## Purpose and boundary

Invitations is a tenant-scoped shared capability for `customer_access`,
`worker_access` and `admin_access`. It owns recipient/proposed name/email/
language, opaque token, expiry, delivery, resend, renew-and-resend, cooldown/
rate limiting, revoke, acceptance and lifecycle audit. It does not own the
resulting Customer, Worker or Admin relationship.

Customer invitation requires proposed name, email and language. The recipient
reviews/corrects proposed data after acceptance; confirmed existing Profile data
is never silently overwritten. Phone and addresses are not tenant-admin input
for this invitation kind.

## Lifecycle

Visible states are `pending`, `delivery_failed`, `expired`, `accepted` and
`revoked`. Accepted reconciles with the target relationship and is not retained
as a duplicate normal operational row. Revoked leaves normal operational
directories. Internal concurrency/accepting states are not user-facing unless a
future product decision requires them.

## Ownership and authorization

The initiating domain determines whether its actor can create/manage a kind;
Invitations enforces tenant isolation, stable identity, lifecycle legality,
token security, cooldown/rate limiting and audit. Acceptance coordinates with
Identity/Auth and the target relationship but does not redefine their models.

## Contract gates

Verify final model/endpoint names, exact expiry/cooldown policy, token rotation
and invalidation, delivery provider semantics, audit retention, acceptance
transaction/retry semantics, idempotency and new/existing identity paths.
