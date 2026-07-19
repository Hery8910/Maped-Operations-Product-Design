# Internal Notes Integration Contract

**Status:** PLANNED — contract gates open.

Provide tenant-isolated, association-scoped cursor or paginated read projection
and commands to create, edit and archive plain-text notes. Stable note and
association IDs, author, created/updated time, visibility/permission outcomes,
concurrency semantics and audit behavior are required. Backend and frontend
must distinguish loading, true empty, error/retry, action pending/success/error
and module/permission absence; no raw technical errors become primary copy.

Exact API/model names, edit/archive role matrix, audit retention, pagination and
conflict policy require verification before implementation readiness.
