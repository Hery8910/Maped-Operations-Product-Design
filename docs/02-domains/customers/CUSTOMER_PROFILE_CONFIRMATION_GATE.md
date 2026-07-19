# Customer Profile Confirmation — Domain Change Gate

**Classification:** AUTHORIZED WITH CONDITIONS
**Status:** CLOSED for product semantics; open for runtime evidence and delivery.
**Authority:** Persisted-change authorization for Profile confirmation evidence.
**Related:** `CUSTOMER_PROFILE_CONFIRMATION_CONTRACT.md` and
`CUSTOMERS_V1_CONVERGENCE_PLAN.md`.

## Decision

Customers v1 requires a persisted Profile-revision and customer-confirmation
evidence capability before any runtime projection may call Profile data
`confirmed` or calculate it as complete. The persisted change is authorized
with the conditions below. No document authorizes a schema, endpoint, migration,
public form, acceptance flow or runtime implementation.

## Gate assessment

| Gate | Decision / required condition |
| --- | --- |
| Model and ownership | Add only Profile-owned revision, field-provenance and customer-confirmation evidence; do not move Profile ownership to Customers or Invitations. |
| Existing Profiles / backfill | Treat without proof as `unknown`; no admin backfill and no initial migration. Technical backfill needs demonstrable equivalent evidence. |
| Invalidation | A changed revision, replaced proposal or changed confirmation contract invalidates the previous current confirmation; compare-and-save protects concurrent writes. |
| Tenant isolation | Profile evidence is not a global tenant directory. Tenant reads remain through the existing least-necessary authorized Customer projection. |
| Privacy and security | Store only evidence needed to prove confirmation; never expose credentials, raw history or unnecessary provenance in directory rows. Authorization precedes all source reads and denial remains opaque. |
| Auditability | Persist customer actor, timestamp, reviewed revision, contract version, explicit-action proof and invalidation/replacement cause. |
| Concurrency | A confirmation must bind to the revision the customer saw; conflicting writes cannot confirm unseen values. |
| Rollback | Deployment rollback must not reinterpret or delete durable evidence. A temporarily unreadable mapping returns unavailable/unknown, never false confirmed. |
| Invitation acceptance | Proposal/materialization and acceptance remain separate from confirmation; no acceptance path can synthesize evidence. |
| Client/Profile frontend | A customer-owned review/correct/save flow is required to create evidence, with recoverable conflict and resume behavior; tenant Customers remains read-only. |
| Customer/Profile projection | Projection must return the canonical confirmation result and degrade safely for legacy, restricted, unavailable and stale evidence. |

## Closure prerequisites for runtime work

Before the associated runtime unit closes, evidence must prove: field-provenance
and revision behavior; explicit customer review/save; no-change save;
third-party invalidation; contract-version invalidation; legacy `unknown`;
non-disclosing tenant authorization; concurrent save conflict; deletion/
anonymization behavior; and that Invitation acceptance/materialization cannot
produce `confirmed`.
