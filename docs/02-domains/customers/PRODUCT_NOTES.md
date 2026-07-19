# Customers Product Notes

**Status:** DEFINED — UX reasoning
**Authority:** Information hierarchy, feedback and exclusions rationale.

## Why Customers, not Users

The operational job is to work with a tenant–customer relationship. A platform
identity may exist before, after or independently of that relationship. Calling
the surface Users hides that distinction and encourages generic identity/access
administration that this product does not approve.

## Why the panel is master-detail

Administrators repeatedly find, inspect and act on a relationship. Directory
and detail remain visible together on wide layouts so the selection is legible.
The right panel begins at the top edge to make detail/form a primary working
context, not a subordinate floating card. On narrow layouts it becomes a focused
continuation of the same task—not a stacked desktop layout or a different flow.

## Why Invite customer is in the left header but opens on the right

Invitation starts from the directory job, so its CTA belongs beside that job.
Its form needs the same contextual detail space and should not interrupt the
operator with a modal. This preserves search/list context and makes the outcome
visible in the directory.

## Why Action required is narrow

Action required exists to surface a legitimate administrator recovery action.
Delivery failure and expiry qualify because Resend or Renew and resend exists.
Pending, incomplete Profile and absent optional/related information do not
become attention merely to create a visually busy dashboard.

## Why Overview is read-only and complete enough

Overview supports recognition and relationship context: identity, Profile, all
confirmed addresses and completeness meaning. It intentionally does not turn
Customers into Profile administration. The customer is the authority for
reviewing/correcting confirmed information.

## Why Profile completeness is narrow and not attention

The MVP needs a confirmed customer name to identify the person and a preferred
locale for understandable customer-facing communication. It does not demonstrate
a universal need for telephone or an address. Therefore only confirmed name and
supported locale define operational Profile completeness. The result helps
interpret context, but it is not Action required: the tenant admin cannot fix it
from Customers, and Request eligibility remains the Service Requests owner's
separate decision.

## Why related work is only a projection

Requests and Work Orders matter to understand customer context, but their
domains own their state and operations. A compact paginated read projection and
navigation preserve context without creating conflicting workflows.

## Why Notes are separate from Profile

An internal operational note is not customer-confirmed profile data. Defining a
small tenant-scoped notes capability now permits later Worker/Admin use without
pretending those experiences are already designed.

## Feedback rationale

Field errors remain next to fields. Pending is expressed in the submit/action
control and local region. Directory change is the normal invitation success
confirmation. Conflicts and recoverable failures remain near the invite form or
invitation action, preserving entered data and explaining the next safe action.
Only revoke's invalidation of an active credential warrants proportionate
confirmation.
