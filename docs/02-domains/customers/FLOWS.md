# Customers Flows

**Status:** DEFINED
**Authority:** Customer-relationship task sequences and local feedback.
**Related:** `DOMAIN.md`, `STATES_AND_ACTIONS.md`, `../invitations/DOMAIN.md`,
`../internal-notes/DOMAIN.md`.

## 1. Open and consult Customers

```text
Open /people/customers → initial directory/summary loading → ready
→ inspect tenant-wide summaries → select Customer or Invitation
```

Initial loading preserves orientation; refresh retains safe content. True empty,
search-empty, filter-empty and unavailable data have distinct explanations and
recovery. Selection loads in the right panel without replacing the directory.

## 2. Search, filter, paginate and select

```text
Enter name, email or telephone → refresh matching cursor projection
→ select Customers | Invitations | Action required → load more → end
→ select entry → detail loads in right panel
```

Search/filter does not silently clear the task context. `Action required` means
only delivery-failed or expired invitations. On small screens, detail becomes a
focused view; Back restores directory query, filters, cursor/list position and
focus near the origin item.

## 3. Consult Customer Overview

```text
Select Customer → Overview loading → identity + Profile + all addresses
→ inspect informational Profile completeness/reasons
```

Profile data is read-only in Customers. Its result is deterministically
complete, incomplete or unknown; unknown availability is never shown as
incomplete. Missing, restricted or unavailable data uses its own fallback. None
of those states is Action required because the tenant admin cannot correct
confirmed Profile data here.

## 4. Consult related Requests or Work Orders

```text
Select Customer → choose enabled Requests or Work orders section
→ tenant-scoped paginated read projection → select related entity
→ navigate to owning-domain page
```

When the module is disabled, its section is absent rather than empty. Customers
does not edit, transition, assign, cancel, reschedule or reproduce the owning
detail experience.

## 5. Create a customer invitation

```text
Choose Invite customer in left header → right panel shows form
→ enter required name, email, language → field validation
→ submit/pending → invitation persists → delivery outcome
→ select/inspect resulting invitation in directory
```

The form is not modal. Pending belongs in the submit control and local form,
blocks duplicate submission and preserves the rest of the page. Customer
invitation outcomes are defined by Invitations:

- **Existing tenant relationship:** retain entered values; explain that this
  customer already belongs to this tenant; no new invitation.
- **Pending invitation exists:** retain values; identify/direct to existing
  invitation; no duplicate invitation.
- **Pre-persistence failure:** retain values; local retry only when safe.
- **Persisted delivery failure:** invitation exists; input is preserved;
  creation retry is unsafe and recovery is Resend on that invitation.
- **Permission failure:** explain lack of permission without leaking data.
- **Unknown/unavailable:** retain values and use only contract-supported retry
  guidance.

Success is contextual: the updated summary/directory and invitation detail show
the outcome; it does not require a blocking success dialog.

## 6. Manage an invitation

```text
Select pending or delivery-failed invitation → Resend → cooldown check
→ pending → localized delivery outcome

Select expired invitation → Renew and resend → pending → renewed outcome

Select actionable invitation → Revoke → proportionate confirmation
→ pending → revoked and removed from normal directory
```

These actions target stable invitation identity and lifecycle. Resend preserves
proposals, rotates/invalidates the previous token and follows cooldown policy.
Details are in `../invitations/FLOWS.md`.

## 7. Acceptance, Profile completion and interruption

```text
Customer opens opaque credential → establishes/uses identity → accepts access
→ reviews/corrects proposal → explicitly saves Profile → relationship reconciles
```

Acceptance may use a new or existing identity. It never silently overwrites
confirmed Profile data. If interrupted after access acceptance, customer access
remains available; the customer gets a non-blocking resume path. Details and
gates are shared with Invitations and Profile dependencies.

## 8. Maintain Internal Notes

```text
Select Customer → Notes → create plain-text note → pending → list updates
→ edit or archive own/permitted note → pending → contextual result
```

Notes remain internal. Validation, pending, errors and retained draft content
stay local to the Notes section; archiving is proportionately confirmed where
the final policy requires it. See `../internal-notes/FLOWS.md`.
