# Internal Notes — Shared Internal Annotation Capability

**Status:** DEFINED — MVP capability; contract verification pending.  
**Authority:** Internal note boundary and reusable association model.

## Purpose and boundary

Internal Notes is a tenant-scoped capability for internal operational context.
The MVP permits associations with a customer, worker or admin so future reuse
does not require redefining the data boundary. Only Customers integrates it now;
Worker/Admin experiences are not designed by this document.

MVP note fields/behavior: plain text, author, `createdAt`, `updatedAt`, create,
list, edit and archive. Notes are internal-only: never customer visible, no
attachments, mentions or rich text. Notes do not belong to Profile and do not
become profile/contact data.

## Authorization and gates

Least-necessary tenant-scoped visibility and mutation policy must be defined per
association/role. Verify author edit rights, privileged edit/archive rights,
archive reversibility/retention, concurrency, audit, pagination, text limits,
redaction/export and whether note metadata is visible in projections.
