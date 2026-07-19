# Customers Implementation Handoff

**Status:** PLANNED — not implementation-ready.
**Authority:** Entry point to the scoped handoffs; it does not duplicate them.

Customers requires two coordinated implementation handoffs:

- [Backend handoff](BACKEND_HANDOFF.md): tenant-scoped projections, ownership,
  authorization, lifecycle/outcomes, consistency and verification gates.
- [Frontend handoff](FRONTEND_HANDOFF.md): route, master-detail/form
  composition, states, URL context, responsive behavior, accessibility and
  permitted branding.

Implementers must also use the shared [Invitations contract](../invitations/INTEGRATION_CONTRACT.md)
and [Internal Notes contract](../internal-notes/INTEGRATION_CONTRACT.md), plus
the [Customer ↔ Profile contract](PROFILE_CONTRACT.md) and owner-domain
contracts for Service Requests and Work Orders when they are defined. This
package does not authorize implementation until the gates in
`IMPLEMENTATION_PLAN.md` are verified.
