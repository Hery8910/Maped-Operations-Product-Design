# Invitations Flows

## Create

Authorized actor supplies kind-specific required proposals → local validation →
pending command → persisted invitation/delivery outcome. Distinguish existing
target relationship, existing pending invitation, pre-persistence failure,
persisted delivery failure, permission and unknown/unavailable. Persisted
delivery failure returns the invitation identity; resend, not blind creation,
is recovery.

## Resend, renew and revoke

Pending or delivery-failed → Resend → cooldown check → rotate/invalidate old
token, retain proposals, refresh expiry by policy → delivery outcome.

Expired → Renew and resend → same safety properties with renewal meaning.

Actionable invitation → Revoke → proportionate confirmation → credential
invalidated and normal operational-row reconciliation. Errors retain context.

## Accept and reconcile

Recipient opens opaque credential → authenticates/creates identity as needed
→ accepts authorized tenant access → target-domain required review/correction
and explicit confirmation → reconcile accepted invitation to target relationship.
Interruption after access acceptance must be resumable without silent data
materialization.
