# Maped Service Operations MVP — Technical Domain Map

**Status:** PROPOSED TECHNICAL DOMAIN ANALYSIS — no implementation authority  
**Documented:** 2026-07-30  
**Product authority:** Founder / Product Design  
**Technical authority required for implementation:** Backend and Frontend repositories  
**Reference tenant:** Perfect Service  
**Scope:** technical problem definition, domain responsibilities, ownership, relationships, minimum facts, consistency, security, and staged implementation direction

## 1. Purpose

This document translates the first Maped Service Operations MVP definition into a technical domain proposal.

It describes:

- the operational problem the system must solve;
- the backend domain boundaries required to solve it;
- the responsibility and ownership of each boundary;
- the relationships and permitted dependencies between boundaries;
- the minimum facts each boundary must understand or expose;
- the consistency, idempotency, security, audit, media, and document requirements;
- the relationship between the dashboard, worker application, canonical frontend modules, and the central backend;
- an implementation sequence that can prove the complete workflow incrementally.

It intentionally does **not** define:

- database schemas or collections;
- aggregates, classes, interfaces, repositories, or persistence models;
- endpoint paths or HTTP payloads;
- concrete events, queues, brokers, or transports;
- provider selection;
- exact frontend pages or visual composition;
- exact Perfect Service customer, worker, or object profile fields;
- final commercial scope or price justification.

The purpose is to make the technical solution and responsibility boundaries reviewable before backend contracts or product-detail documents are created.

## 2. Authority and governing constraints

This proposal follows the existing Maped Solutions architecture and domain rules.

### 2.1 One central modular backend

Maped Solutions operates one central backend containing separately authoritative modules. Perfect Service does not receive a private backend or a private copy of shared platform logic.

The first implementation may remain a modular monolith. This document does not require microservices.

### 2.2 Independent application surfaces

The operational product has two independently designed applications:

- the Perfect Service administrative dashboard;
- the Perfect Service cooperation-partner / worker application.

Both consume stable public backend contracts through canonical, centrally maintained frontend modules. They may have different routes, layouts, density, wording, and responsive behaviour without duplicating backend communication or security logic.

### 2.3 Platform Access is reused, not redefined

Identity, authentication, sessions, tenant membership, tenant lifecycle, roles, capabilities, invitations, access suspension, and tenant isolation belong to the existing Platform Access foundation.

Service Operations domains consume an authorised actor and tenant context. They do not create credentials, interpret sessions, infer permissions from profiles, or trust browser-supplied roles.

### 2.4 One canonical owner per mutable concept

Every mutable business concept has one canonical authority.

Another domain may retain only:

- a stable identifier reference;
- a current authorised result obtained through an explicit contract;
- a historical snapshot;
- a non-authoritative read projection;
- an immutable business or audit fact.

Domains must not:

- write another domain's storage;
- import another domain's persistence representation;
- share mutable models;
- use a projection as a source of truth;
- form circular ownership dependencies.

### 2.5 Technical capabilities are not automatically product domains

Media storage, document rendering, email delivery, audit persistence, logging, metrics, backups, search indexes, and queues support the product. They do not become independent business domains merely because they require infrastructure or code.

## 3. Problem statement

Perfect Service currently needs an office-controlled operational chain that connects work definition with field execution and monthly documentation.

The system must prevent the following failures:

- office work exists only in spreadsheets, messages, or individual memory;
- workers receive incomplete or inconsistent task instructions;
- task completion is declared without evidence;
- photographs are detached from the work they prove;
- the office cannot distinguish submitted work from accepted work;
- rejection and correction overwrite the original submission;
- monthly documents require reconstructing accepted work manually from several sources;
- a worker can see unrelated objects, workers, customers, or commercial information;
- a frontend state or shared login is treated as sufficient authority;
- partial technical failure creates duplicate work, duplicate submissions, lost images, or inconsistent monthly documents.

The required technical outcome is one traceable chain:

```text
current operational context
  -> plan or manual work requirement
  -> concrete work occurrence
  -> assignment to an eligible executor
  -> released worker-facing snapshot
  -> task execution and evidence
  -> versioned submission
  -> office review decision
  -> correction and resubmission when rejected
  -> immutable acceptance
  -> monthly consolidation snapshot
  -> generated, stored, downloadable document version
```

## 4. Proposed system shape

```text
Perfect Service dashboard                 Worker browser / PWA
          |                                        |
          | application-owned presentation         |
          v                                        v
       Canonical Maped frontend contracts, clients, schemas,
                  hooks, flow logic, and test support
                               |
                               v
                     One Maped Solutions backend
                               |
            +------------------+------------------+
            |                  |                  |
      Platform Access    Service Operations   Technical adapters
      existing authority  business domains     and capabilities
            |                  |                  |
            |                  |                  +-- media processing/storage
            |                  |                  +-- document rendering/storage
            |                  |                  +-- delivery adapters
            |                  |                  +-- immutable audit evidence
            |                  |                  +-- monitoring/backups
            |                  |
            |                  +-- Service Relationships and Work Locations
            |                  +-- Cooperation Partners and Workforce
            |                  +-- Work Planning and Assignment
            |                  +-- Work Execution, Evidence, and Review
            |                  +-- Monthly Consolidation and Documents
            |
            +-- trusted identity, tenant, membership, role, capabilities
```

The applications do not coordinate business consistency themselves. The backend authorises and coordinates every consequential operation.

## 5. Proposed domain boundaries

The smallest coherent technical solution consists of five new Service Operations domains plus the existing Platform Access dependency.

The proposal deliberately groups strongly coupled responsibilities into internal partitions rather than creating many small domains with circular dependencies.

| Boundary | Product responsibility | Why it is a coherent boundary |
| --- | --- | --- |
| Platform Access | Trusted actor, tenant relationship, roles, capabilities, lifecycle, and isolation | Existing reusable platform authority; must not be reimplemented |
| Service Relationships and Work Locations | Current customer relationship, contacts, object/work-location context, instructions, and sensitive execution context | The MVP needs customer and object context together but does not need a complete CRM or property-management suite |
| Cooperation Partners and Workforce | Partner organisations, individual executors, operational eligibility, and responsibility context | Worker operational identity is distinct from login membership and from work assignment |
| Work Planning and Assignment | Service obligation, tasks, recurrence, concrete occurrences, release snapshot, and assignment | Plan, occurrence, assignment, and release require strong coordination and must not drift apart |
| Work Execution, Evidence, and Review | Worker task outcomes, media evidence, versioned submissions, review, rejection, correction, resubmission, and acceptance | Execution and review require separate actor authority but strong lifecycle coordination; one boundary avoids a dependency cycle |
| Monthly Consolidation and Documents | Monthly inclusion, consolidation snapshots, generated document versions, archive, and retrieval | Monthly output must remain independent from mutable execution state after generation |

## 6. Existing dependency — Platform Access

### 6.1 Purpose in Service Operations

Platform Access answers:

- who the actor is;
- whether the actor is authenticated;
- which tenant is being accessed;
- whether tenant and membership are operational;
- which role and capabilities apply;
- whether the operation must fail closed.

### 6.2 Minimum result consumed by Service Operations

Service Operations requires an authorised context sufficient to identify:

- tenant;
- identity;
- membership;
- current role or resolved capabilities;
- current access and tenant lifecycle validity;
- revisions or equivalent freshness evidence where required by a protected command.

This is a public access result, not a copy of identity, membership, session, or tenant persistence.

### 6.3 Prohibited assumptions

- A worker profile does not grant access.
- A cooperation-partner relationship does not grant access.
- A hidden button does not revoke backend authority.
- A client-supplied tenant, role, worker, or membership identifier does not prove scope.
- A shared organisational credential must not be assumed acceptable.

### 6.4 Suspension behaviour

When tenant or membership access is unavailable, all tenant-scoped Service Operations reads and mutations fail closed according to the applicable policy. Global identity and recovery flows remain Platform Access responsibilities.

## 7. Domain A — Service Relationships and Work Locations

### 7.1 Product purpose

Provide the current operational context required to plan, assign, execute, review, and document service work without creating a complete CRM or property-management system.

### 7.2 Internal responsibility partitions

#### Customer relationship partition

Owns:

- the tenant-scoped service-recipient organisation or customer relationship;
- operational and document-contact responsibilities;
- active, inactive, or archived relationship availability;
- the relationship between a customer and one or more work locations.

#### Work-location partition

Owns:

- the current object/work-location identity;
- current operational instructions;
- current access, safety, material, and service context;
- classification of sensitive versus general execution information;
- current object contacts and relationship to the customer.

These are internal partitions of one initial boundary, not two independent domains. They may be separated later only when independent product rules and lifecycles justify the split.

### 7.3 Explicit exclusions

This boundary does not own:

- global identities or tenant membership;
- full sales pipeline or CRM activity;
- work plans, tasks, occurrences, or assignments;
- worker organisations or eligibility;
- execution evidence;
- monthly document lifecycle;
- customer portal access;
- arbitrary custom fields or unrestricted form building.

### 7.4 Minimum facts required

Without defining a schema, the boundary must be able to provide:

- a stable tenant-scoped customer relationship reference;
- a stable tenant-scoped work-location reference;
- current relationship and location availability;
- the current customer-to-location relationship;
- role-labelled operational and document contacts where required;
- current worker-relevant instructions;
- current sensitive-access facts under stricter authorisation;
- current revision or equivalent change marker;
- actor and time evidence for consequential changes.

The exact profile fields and object form are later product-definition work.

### 7.5 Exposed results

It must expose authorised results sufficient for:

- planning to validate that a customer and location are usable;
- planning to capture a release snapshot;
- the worker application to receive only the execution context permitted by the assignment;
- monthly documents to resolve the configured customer/object grouping and display context;
- dashboard lists and details through non-authoritative projections.

### 7.6 Snapshot rule

When a work occurrence is released, normal task instructions and relevant object context are captured as a historical snapshot by Work Planning and Assignment.

Later edits to current customer or object data must not silently rewrite released, executed, reviewed, or accepted work.

Safety-critical or access-critical current information may require a separate current-fact query in addition to the snapshot. The exact override policy remains open and must not be invented in implementation.

### 7.7 Security

Worker-facing access returns only the minimum execution context required for the assigned work. It must not expose unrelated customer contacts, commercial information, internal office notes, or unrestricted sensitive access data.

## 8. Domain B — Cooperation Partners and Workforce

### 8.1 Product purpose

Represent who may operationally perform service work for the tenant and under which cooperation-partner relationship, while keeping operational eligibility separate from authentication and tenant membership.

### 8.2 Own responsibilities

The domain owns:

- cooperation-partner organisations or teams;
- individual executor operational profiles where applicable;
- relationship of an executor to a cooperation partner;
- active, inactive, suspended, or otherwise ineligible operational state;
- assignment eligibility facts;
- responsibility history relevant to later interpretation.

### 8.3 Explicit exclusions

It does not own:

- credentials, sessions, memberships, or access roles;
- work occurrence or assignment lifecycle;
- task completion or evidence;
- payment, payroll, or legal employment classification;
- arbitrary availability, leave, or time-tracking features unless later product evidence authorises them.

### 8.4 Minimum facts required

The boundary must be able to provide:

- cooperation-partner reference;
- executor reference;
- optional reference to the authorised identity/membership used by the worker application;
- current operational eligibility;
- current organisation-to-executor relationship;
- whether the executor may receive the intended class of assignment;
- revision/freshness evidence;
- responsibility history where reassignment or later dispute requires it.

### 8.5 Individual identity recommendation

The proposed technical baseline is:

- every person who confirms tasks and submits evidence uses an individual identity;
- a cooperation-partner organisation may have its own leader or coordinator role;
- an organisational profile or leader account must not become a shared executor credential;
- the final submission records the actual authenticated executor.

This recommendation is required for trustworthy audit, rejection, correction, and acceptance history. Axel must still confirm how cooperation partners currently organise workers.

### 8.6 Exposed result

Work Planning and Assignment consumes a current eligibility decision for the intended tenant, partner, executor, and assignment context. The Workforce domain remains authoritative when its state differs from a stale list projection.

## 9. Domain C — Work Planning and Assignment

### 9.1 Product purpose

Transform an office-defined service obligation into a concrete, duplicate-safe, worker-ready assignment with a stable execution snapshot.

### 9.2 Internal responsibility partitions

#### Service-plan partition

Owns:

- one-off or recurring service obligation;
- task and task-group definitions;
- instructions relevant to execution;
- evidence policy reference or configured requirement;
- recurrence, validity, and planning-horizon rules;
- relationship to customer and work location.

#### Work-occurrence partition

Owns:

- the concrete planned execution of a service obligation;
- source-plan reference and source revision;
- intended execution date, period, or calendar-week context;
- lifecycle before and after release;
- cancellation before completion where permitted;
- immutable release snapshot of tasks, instructions, evidence policy, and relevant context.

#### Assignment partition

Owns:

- the current accountable cooperation partner or executor assignment;
- assignment and reassignment history;
- worker visibility/release state;
- the relationship between the occurrence and the executor expected to perform it.

These partitions remain inside one domain because occurrence generation, release, and assignment must be strongly coherent.

### 9.3 Explicit exclusions

This boundary does not own:

- global access or worker credentials;
- current customer/object/workforce source data;
- task execution outcomes;
- uploaded media;
- review decisions or acceptance;
- monthly document inclusion;
- general calendar UI;
- route optimisation;
- unrestricted recurrence/workflow engines.

### 9.4 Minimum facts required

The boundary must retain or expose, conceptually:

- plan reference and current plan lifecycle;
- task and evidence requirements belonging to the plan;
- recurrence/occurrence intent;
- concrete occurrence reference;
- source plan/version used;
- customer and location references;
- assigned partner/executor references;
- planned timing or work period;
- released execution snapshot;
- current planning/assignment lifecycle;
- actor, reason, and timestamp for release, cancellation, and reassignment;
- revision or equivalent concurrency evidence.

### 9.5 Creation and generation

The domain must support:

- manual one-off work creation;
- recurring occurrence preparation within a bounded horizon;
- deterministic duplicate prevention for the same intended occurrence;
- office review or adjustment before worker release;
- controlled cancellation and reassignment.

Exact recurrence grammar is not decided here. The domain must not prebuild a generic scheduler merely because the historical annual plan contains many frequencies.

### 9.6 Release rule

A worker can execute only a released assignment.

Release strongly binds:

- one concrete occurrence;
- its task/instruction/evidence snapshot;
- the intended work period;
- the accountable partner/executor;
- current eligibility and access conditions.

A later plan edit must not alter that released snapshot.

### 9.7 Consistency and idempotency

- occurrence generation must be idempotent;
- assignment/reassignment must use current occurrence and eligibility facts;
- release must be strongly consistent inside this domain;
- duplicate worker-visible assignments for the same occurrence are prohibited;
- retry after partial failure must resume or safely return the existing result rather than create another occurrence or assignment.

### 9.8 Reassignment boundary

The first MVP may permit reassignment before execution or under a narrowly defined in-progress rule. Reassignment after a submission exists requires explicit later policy and must not silently rewrite the executor recorded by Work Execution, Evidence, and Review.

## 10. Domain D — Work Execution, Evidence, and Review

### 10.1 Product purpose

Own the complete evidence and office-verification chain after a released assignment reaches the worker.

The boundary must preserve the distinction between:

- worker execution;
- task outcome;
- photographic evidence;
- submission revision;
- office review decision;
- final operational acceptance.

### 10.2 Internal responsibility partitions

#### Worker-execution partition

Owns:

- the execution instance for a released assignment;
- task completion or blocked outcomes;
- worker notes;
- execution progress allowed by product policy;
- the authenticated actor responsible for each worker action.

#### Evidence and submission partition

Owns:

- references to verified media attachments;
- association of evidence with the work or task according to policy;
- evidence completeness state;
- immutable submission revisions;
- submitted-by and submitted-at facts;
- submission validation against the released evidence policy.

#### Administrative-review partition

Owns:

- review-required state;
- reviewer decision;
- accepted or rejected outcome;
- actionable rejection/correction reason;
- review timestamp and actor;
- the relationship between a review decision and one exact submission revision;
- final operational acceptance.

These partitions belong to one domain boundary because Review must inspect an exact immutable submission and a rejected execution must be able to create a corrected revision without a cross-domain ownership cycle.

### 10.3 Explicit exclusions

This domain does not own:

- plan or assignment mutation;
- worker eligibility;
- customer/object current data;
- monthly-period or document state;
- raw storage implementation;
- bookkeeping, payroll, or payment;
- GPS or QR attendance evidence in the first MVP.

### 10.4 Minimum facts required

Conceptually, the boundary must preserve:

- released assignment/occurrence reference;
- executing identity and workforce reference;
- task outcomes and blocking reason where applicable;
- execution notes;
- media attachment references and their verified readiness;
- evidence-policy result;
- submission revision identity;
- submission actor and time;
- review decision identity;
- reviewer actor and time;
- acceptance or rejection;
- actionable correction reason;
- relationship between original, rejected, and corrected revisions;
- immutable accepted-submission reference;
- revision/concurrency evidence.

### 10.5 Worker submission rule

A submission is permitted only when:

- the actor is authorised for the released assignment;
- the assignment remains executable under current policy;
- required task outcomes exist;
- required evidence attachments are successfully verified and associated;
- no conflicting final submission or acceptance already exists;
- the request is safe to retry without duplicate submission.

A frontend indication that files were selected or uploaded is not sufficient. The backend must know that the required media references are valid and ready.

### 10.6 Evidence policy

The reusable domain supports a configured evidence requirement, including conceptually:

- whether photos are required;
- work-level or task-level application;
- minimum and maximum count;
- accepted media types and size limits;
- replacement rules;
- metadata handling;
- whether incomplete upload prevents submission.

The Perfect Service configuration begins with the expected three-to-five-image range, but the technical domain must not hard-code those values globally.

### 10.7 Review and correction rule

The first MVP uses whole-submission review:

- the reviewer accepts one exact submission revision; or
- rejects that revision with an actionable reason;
- the rejected revision remains immutable;
- the worker creates a corrected revision that references the rejected revision;
- the reviewer evaluates the corrected revision independently.

Partial task or image acceptance is deferred unless Axel proves it is necessary.

### 10.8 Acceptance rule

Acceptance is a new immutable business decision. It does not overwrite the worker's completion claim.

Only an accepted submission revision is eligible for monthly consolidation.

Changing an accepted result later requires a separately authorised correction policy and audit reason; it must not be implemented as ordinary editing.

### 10.9 Consistency and idempotency

- task updates may be resumable while the execution remains editable;
- attachment activation and submission validation require current evidence state;
- submission is idempotent for the intended revision;
- review decision is idempotent for the exact submission revision;
- an accepted revision cannot also become rejected;
- rejection/correction cannot erase earlier revisions;
- retry after network failure must return or recover the existing submission/review result rather than duplicate it.

## 11. Domain E — Monthly Consolidation and Documents

### 11.1 Product purpose

Transform accepted operational work into a versioned monthly result that Perfect Service can review, download, retain, and continue processing manually.

### 11.2 Own responsibilities

The domain owns:

- monthly operational periods;
- eligibility and inclusion of accepted work;
- explicit exclusion or adjustment decisions where later authorised;
- consolidation snapshots;
- document-generation requests and status;
- generated document versions;
- document archive metadata and retrieval state;
- traceability from each document version to the accepted work and configuration used.

### 11.3 Explicit exclusions

It does not own:

- worker execution or acceptance decisions;
- customer/object current authority;
- payment execution;
- bookkeeping;
- legal invoice issuance;
- payroll;
- automatic email sending;
- external accounting-template editing performed by Perfect Service.

### 11.4 Minimum facts required

Conceptually, the domain must preserve:

- tenant and monthly-period reference, interpreted in the configured tenant timezone;
- accepted-work references and exact acceptance/submission revisions;
- configured grouping and calculation context required by the document;
- inclusion/exclusion decision and authorised reason where applicable;
- consolidation revision and snapshot time;
- document template/configuration version;
- document-generation actor and time;
- generation status and failure/retry state;
- immutable storage reference for every generated version;
- archive and retrieval metadata;
- traceability to source accepted work.

### 11.5 Inclusion rule

By default, only accepted work belonging to the configured monthly period is eligible.

The monthly domain consumes an authorised accepted-work result. It does not infer acceptance from worker completion, a checklist, an uploaded image, or a dashboard projection.

### 11.6 Consolidation snapshot rule

A generation attempt operates on a frozen consolidation snapshot.

Later changes to customer names, object instructions, rates, templates, or accepted-work corrections do not mutate an already generated document.

Regeneration produces a new document version linked to a new consolidation revision. Older versions remain available according to retention policy.

### 11.7 Generation and failure

Document rendering may be asynchronous because rendering and storage can fail independently of business consolidation.

The business domain remains authoritative for:

- which work belongs in the snapshot;
- which template/configuration applies;
- whether generation is allowed;
- which generated version is current.

The renderer and storage adapters remain technical providers.

A failed render or storage attempt must leave a visible, retryable state and must not create a false generated result.

### 11.8 Period closing

The technical recommendation is:

- an open period may receive newly accepted work;
- generation freezes one versioned snapshot;
- a later generation creates another version;
- optional final period closure prevents ordinary changes;
- reopening, if allowed, requires explicit authority and audit reason.

The exact closing policy and final Perfect Service document meaning remain product decisions.

## 12. Cross-cutting technical capabilities

### 12.1 Media processing and storage

Media handling is a technical capability consumed by Work Execution, Evidence, and Review.

It must support:

- tenant-scoped ownership;
- controlled upload intent;
- authenticated/authorised association to an executable assignment;
- media-type and size validation;
- configurable compression and metadata policy;
- verified-ready state before submission;
- replacement without losing review history;
- safe retry and abandoned-upload cleanup;
- retention and deletion policy;
- storage references that do not expose provider internals as product authority.

### 12.2 Document rendering and storage

The monthly domain provides a frozen business snapshot and template/configuration reference. The technical capability renders, stores, and returns a safe technical result.

It does not decide which work is accepted, included, excluded, or financially meaningful.

### 12.3 Audit evidence

Consequential operations publish or persist immutable audit facts under the existing audit standard.

Required audit coverage includes at least:

- customer/object sensitive-context changes;
- workforce eligibility changes;
- work release, cancellation, assignment, and reassignment;
- worker submission;
- review acceptance and rejection;
- corrected resubmission;
- accepted-work correction if later allowed;
- monthly inclusion/exclusion adjustment;
- document generation, regeneration, closure, and reopening;
- access to highly sensitive object instructions where policy requires it.

Audit evidence is not automatically a user-visible timeline.

### 12.4 Notifications and delivery

The owning business domain decides why an actor needs attention and what semantic event occurred.

A delivery adapter may send an email or other notification later. Delivery failure does not silently reverse assignment, submission, rejection, acceptance, or document generation.

The first operational product may rely primarily on in-application attention states:

- assigned work available;
- submission awaiting review;
- rejected work requires correction;
- document generation failed or completed.

### 12.5 Search and read projections

Dashboard lists, worker worklists, review queues, and document indexes may use non-authoritative projections optimised for reading.

On discrepancy, the owning domain's current result prevails. Projections may be rebuilt and must never accept direct business writes.

## 13. Ownership matrix

| Mutable concept | Canonical authority | Readers / consumers | Retained outside owner | Prohibited foreign action |
| --- | --- | --- | --- | --- |
| Identity, session, tenant membership, role, capabilities | Platform Access | All protected Service Operations use cases | Authorised context/reference only | Service domains creating or changing credentials/membership |
| Customer relationship and current contacts | Service Relationships and Work Locations | Planning; monthly documents; dashboard projections | Identifier, current result, release/document snapshot | Planning or documents editing customer authority |
| Current work-location context and sensitivity classification | Service Relationships and Work Locations | Planning; worker execution; monthly documents | Identifier, authorised current result, historical snapshot | Worker/execution domain editing object authority |
| Cooperation partner, executor profile, operational eligibility | Cooperation Partners and Workforce | Planning and assignment | Identifier/current eligibility result | Assignment domain activating or editing worker authority |
| Service plan, tasks, recurrence | Work Planning and Assignment | Dashboard; occurrence generation | Plan identifier/version; released snapshot later | Execution changing plan/task authority |
| Work occurrence and assignment | Work Planning and Assignment | Worker execution; dashboard projections | Released immutable snapshot/reference | Execution reassigning or cancelling planning authority |
| Execution, task outcomes, media association, submission revisions | Work Execution, Evidence, and Review | Worker app; reviewer; monthly domain after acceptance | Exact submission/acceptance reference | Monthly domain changing execution evidence |
| Review decision and operational acceptance | Work Execution, Evidence, and Review | Monthly consolidation; dashboard/worker projections | Immutable acceptance result/reference | Monthly domain inferring or changing acceptance |
| Monthly period, inclusion, consolidation snapshot, document versions | Monthly Consolidation and Documents | Dashboard; archive/download consumers | Document reference/projection | Execution or rendering adapter changing inclusion authority |

## 14. Dependency and interaction matrix

| Origin | Destination | Reason and minimum information | Disposition | Authority on discrepancy | Consistency / recovery |
| --- | --- | --- | --- | --- | --- |
| Any Service Operations use case | Platform Access | Current actor, tenant, membership, capabilities, lifecycle | Synchronous for protected operations | Platform Access | Fail closed; no local role fallback |
| Work Planning and Assignment | Service Relationships and Work Locations | Current usable customer/location and current context revision | Synchronous at creation/release | Relationship/location domain | Fail safely; release stores snapshot |
| Work Planning and Assignment | Cooperation Partners and Workforce | Current assignment eligibility | Synchronous at assignment/release | Workforce domain | Fail safely; retry with current result |
| Work Execution, Evidence, and Review | Work Planning and Assignment | Released assignment and immutable execution snapshot | Synchronous when opening/mutating execution | Planning domain for assignment facts | Fail if cancelled/unavailable; retain reference/snapshot |
| Work Execution, Evidence, and Review | Media capability | Upload/validate/store evidence and return verified reference | Technical operation; completion may be asynchronous | Execution domain owns evidence association; adapter owns technical outcome | Resumable/idempotent upload; submission blocked until ready |
| Monthly Consolidation and Documents | Work Execution, Evidence, and Review | Accepted work and exact acceptance revision for period | Synchronous for snapshot preparation or controlled batch query | Execution/review domain | No inference from projections; retry snapshot preparation |
| Monthly Consolidation and Documents | Relationship/location domain | Current configured display/grouping context where policy requires it | Synchronous at snapshot preparation | Relationship/location domain for current facts; snapshot wins after generation | Freeze snapshot; later changes create new version |
| Monthly Consolidation and Documents | Renderer/storage capability | Frozen consolidation plus template/configuration reference | Asynchronous permitted | Monthly domain owns business snapshot; adapter owns render/storage result | Retryable generation; no false success |
| Any owning domain | Audit capability | Safe immutable action fact | Required disposition per audit policy | Producing domain for business meaning | Explicit failure policy; never silently omit high-risk evidence |
| Owning domain | Delivery adapter | Semantic attention/delivery intent | Asynchronous | Owning domain for business state | Delivery retry does not rewrite business state |

No permitted dependency writes the destination domain's storage.

## 15. Technical end-to-end flow

### Phase 1 — office work preparation

1. The dashboard restores Platform Access.
2. The backend resolves the office actor's current tenant capabilities.
3. The operator selects or establishes valid customer and work-location context.
4. The operator creates or uses a service plan.
5. Work Planning and Assignment creates one concrete occurrence manually or through duplicate-safe recurrence preparation.
6. The operator reviews the occurrence.
7. The domain queries current worker eligibility.
8. The domain assigns and releases the occurrence, creating an immutable worker-facing snapshot.

### Phase 2 — worker execution

1. The worker application restores Platform Access.
2. The backend proves the actor is the authorised executor for the released assignment.
3. The worker receives only the permitted released snapshot and any separately authorised current safety/access context.
4. The worker records task outcomes and notes.
5. Media uploads are validated and become verified evidence references.
6. The worker submits one immutable execution revision.
7. The submission becomes available to the review queue projection.

### Phase 3 — office review and correction

1. The reviewer restores current access and review capability.
2. The backend loads the exact immutable submission revision.
3. The reviewer accepts or rejects the full revision.
4. A rejection requires an actionable reason.
5. The worker sees the rejected decision and creates a corrected revision without overwriting the original.
6. The reviewer accepts one exact corrected revision.
7. The domain publishes or exposes an immutable accepted-work result.

### Phase 4 — monthly result

1. The office selects the monthly period.
2. Monthly Consolidation queries only accepted work for the tenant and period.
3. The domain prepares a versioned consolidation snapshot.
4. The office reviews allowed adjustments or exclusions, when configured and authorised.
5. The domain requests document rendering.
6. The renderer/storage capability returns a technical result.
7. The monthly domain records a generated document version only after successful storage.
8. The document becomes listed, retrievable, downloadable, and traceable to its source snapshot.
9. Perfect Service performs any later manual accounting validation and email sending outside the platform.

## 16. State and lifecycle authority

The product should not expose one global mutable `workStatus` as the authority for all phases.

Different boundaries own different state:

```text
Work Planning and Assignment
  draft -> prepared -> assigned -> released -> cancelled where allowed

Work Execution, Evidence, and Review
  editable execution
    -> submitted revision
    -> rejected / correction required
    -> corrected revision
    -> accepted revision

Monthly Consolidation and Documents
  open period
    -> consolidation draft/revision
    -> generation pending
    -> generated version
    -> archived/current
    -> optionally closed
```

A composed dashboard status may summarise these facts, but the projection does not become their authority.

## 17. Reference, snapshot, and projection rules

### Current reference

Used when an operation must consult current external authority, for example:

- current tenant access;
- current worker eligibility;
- current customer/location availability;
- current assignment cancellation state.

### Historical snapshot

Used when later interpretation must remain stable, for example:

- tasks and instructions released to the worker;
- evidence policy applied to the submission;
- accepted submission revision;
- customer/object/document context used in a generated monthly document.

### Read projection

Used to make operational reading efficient, for example:

- current-week worker assignments;
- dashboard planning list;
- review queue;
- rejected-work attention list;
- monthly document index.

A projection may be stale and can be rebuilt. It is never a write target for business decisions.

## 18. Concurrency, idempotency, and partial failure

Every consequential mutation requires explicit concurrency protection appropriate to its owner.

The technical contracts must prove at least:

- repeated occurrence generation does not create duplicates;
- repeated assignment/release returns or preserves one authoritative result;
- a worker cannot submit two competing revisions accidentally through double tap or retry;
- a review retry cannot create accepted and rejected decisions for the same revision;
- an accepted revision cannot be edited through ordinary execution commands;
- failed image upload preserves task and note input and allows safe retry;
- failed document rendering preserves the consolidation snapshot and allows safe retry;
- successful generation followed by a lost client response returns the existing document version rather than creating an unintended duplicate;
- cross-domain failure enters explicit retry, compensation, or manual-recovery state rather than hidden inconsistency.

No distributed transaction is assumed across all domains. Strong consistency remains inside the owning boundary; cross-domain coordination uses current queries, immutable references/snapshots, idempotent commands, and explicit recovery.

## 19. Security and privacy direction

### 19.1 Tenant isolation

Every domain concept is tenant-scoped except global identity. No browser-supplied identifier is sufficient authority.

### 19.2 Least privilege

A worker may access only:

- assigned work;
- required task and object context;
- own execution/submission history;
- review outcome and correction reason for own work.

A worker must not receive:

- unrelated customers or locations;
- other partners/workers and assignments;
- tenant-wide financial or document data;
- unrestricted sensitive access information;
- internal Perfect Service notes outside the assignment.

### 19.3 Sensitive object information

General instructions and sensitive access facts require distinguishable visibility policy. Access to highly sensitive information may require stronger audit and may be limited to the active work window.

### 19.4 Media and documents

Image and document storage must preserve tenant ownership, authorised retrieval, safe content handling, retention, and deletion rules. Raw provider URLs or storage keys must not become permanent public authority.

### 19.5 Frontend security

Frontend guards and local state improve user experience only. Every backend query and mutation independently resolves current access and business authority.

## 20. Frontend composition direction

### 20.1 Canonical shared modules

The dashboard and worker application should consume centrally maintained capability modules containing, where appropriate:

- public contracts and stable errors;
- runtime schemas and validation;
- API client functions;
- query/mutation hooks;
- headless flow state;
- test fixtures and smoke-test support.

Package boundaries should follow capability boundaries and must not become one unrestricted global package.

### 20.2 Application ownership

The dashboard owns presentation for:

- planning and assignment;
- operational context;
- review queue;
- acceptance/rejection;
- monthly consolidation and documents.

The worker application owns presentation for:

- assigned work;
- task execution;
- photo progress and retry;
- submission;
- awaiting-review, rejected, corrected, and accepted states.

Both applications must preserve the same backend semantics without requiring identical screens.

### 20.3 Failure meaning

The public contracts must distinguish meaningful recoverable conditions such as:

- assignment no longer available;
- worker no longer eligible;
- evidence incomplete;
- media upload still pending or failed;
- execution revision conflict;
- submission already exists;
- review already completed;
- monthly snapshot changed;
- document generation failed but can be retried;
- tenant or membership unavailable.

Raw persistence or provider errors must not become product messages.

## 21. Technical non-functional requirements

The first implementation contracts must address:

- supported current Android and iOS browsers;
- mobile photo capture/file selection behaviour;
- upload progress, cancellation, retry, and input preservation;
- expected image count, size, and storage envelope;
- responsive dashboard and worker application behaviour;
- accessibility for task completion, evidence, review, and failure recovery;
- tenant-aware logging and correlation without secrets or unrestricted personal data;
- audit retention;
- image/document backup and recovery;
- document reproducibility through stored snapshot/configuration versions;
- operational monitoring for failed uploads, stuck reviews, and failed generation;
- privacy and retention for photos, object access instructions, contacts, and documents;
- safe export and eventual tenant offboarding.

Exact service levels and provider selections belong to implementation and contract work.

## 22. Recommended implementation sequence

Implementation should advance through coherent vertical slices rather than building all master-data pages first.

### Slice 0 — consume Platform Access

- integrate current authorised tenant context into dashboard and worker test consumers;
- establish capability enforcement and cross-tenant denial;
- define no Service Operations business data yet.

### Slice 1 — minimum operational context

- create the minimum customer/location boundary;
- create the minimum partner/executor eligibility boundary;
- prove current facts and least-privilege queries.

### Slice 2 — manual work and assignment

- create a one-off plan/occurrence;
- assign and release it to one accountable executor;
- preserve the released snapshot;
- prove worker-only visibility.

### Slice 3 — execution and media evidence

- record task outcomes and notes;
- upload and verify configured photographic evidence;
- submit one immutable revision;
- prove idempotent retry and input preservation.

### Slice 4 — review loop

- show review-required work;
- reject with reason;
- create a corrected revision;
- accept one exact revision;
- prove immutable history and actor authority.

### Slice 5 — monthly document vertical

- select accepted work for one period;
- create a consolidation snapshot;
- render, store, list, download, and retrieve one document version;
- prove retry and traceability.

### Slice 6 — recurring planning

- introduce the minimum recurrence language required by Perfect Service;
- generate within a controlled horizon;
- prevent duplicates;
- preserve variation by occurrence and release snapshot.

### Slice 7 — operational hardening

- attention projections;
- cancellation/reassignment rules;
- period closing/regeneration;
- retention, export, monitoring, backup, and recovery evidence;
- capacity controls required by the commercial contract.

The full MVP is not complete until recurrence and the monthly document outcome are included, even if a one-off vertical is demonstrated earlier.

## 23. Technical acceptance criteria

The technical domain design is ready for implementation contracts only when all of the following are explicit:

1. Every mutable concept has one owner.
2. Platform Access remains the only access authority.
3. No domain writes foreign storage or imports foreign persistence models.
4. Customer/location, workforce, planning, execution/review, and monthly boundaries expose only minimum public results.
5. Released work preserves an immutable execution snapshot.
6. Worker identity and assignment authority are independently proven.
7. Task/evidence submission is versioned and retry-safe.
8. Rejection preserves the rejected revision and requires a reason.
9. Acceptance targets one exact immutable submission revision.
10. Only accepted work enters monthly consolidation.
11. Document generation uses a frozen consolidation snapshot and creates immutable versions.
12. Media and rendering adapters cannot redefine business state.
13. Dashboard and worker apps consume stable contracts through canonical frontend modules.
14. Cross-tenant and unrelated-worker denial are testable.
15. Consequential actions produce safe audit evidence.
16. Partial failure has an explicit retry, compensation, or manual-recovery path.
17. No external spreadsheet or manual database edit is required to preserve the authoritative workflow state.
18. Deferred features are not hidden inside generic configuration or workflow engines.

## 24. Proposed technical decisions

The following are recommended as the initial implementation direction:

1. Use one modular backend deployment, not a Perfect Service-specific backend.
2. Reuse Platform Access unchanged as the security foundation.
3. Use five Service Operations domain boundaries with internal partitions as defined above.
4. Require individual executor identities for task confirmation and evidence submission; prohibit shared worker credentials.
5. Use one accountable executor per assignment in the first MVP; multi-worker participation is deferred.
6. Capture an immutable released-work snapshot.
7. Treat photo count and evidence scope as tenant configuration, not hard-coded global rules.
8. Use whole-submission rejection and corrected immutable revisions in the first MVP.
9. Treat acceptance as a separate immutable office decision.
10. Generate monthly documents from frozen accepted-work snapshots and preserve every generated version.
11. Keep notifications, media storage, rendering, audit, and read projections as supporting capabilities rather than new business domains.
12. Add recurrence only after the one-off vertical works, but require recurrence before declaring the Perfect Service MVP complete.

## 25. Open decisions and blockers

The following questions remain before detailed domain contracts or implementation authority:

- Does Axel confirm individual executor accounts for every person who submits work?
- Is one accountable executor sufficient for the first customer delivery?
- Which current object changes must override a released snapshot for safety or access reasons?
- Are three and five strict photo limits or a normal target range?
- Is evidence required for every work item or selected tasks/occurrences?
- What is the minimum recurrence language required by the real annual plan?
- Which assignment states permit cancellation or reassignment?
- What happens when a worker loses eligibility after assignment but before submission?
- Can an accepted submission ever be corrected, and under what exceptional authority?
- Which data is required to calculate or group the monthly result?
- Is the generated file the final operational Abrechnung or a prepared source document?
- What closes a monthly period, and may it be reopened?
- Which notifications are essential for usability rather than optional convenience?
- What initial capacity envelope applies to workers, objects, work occurrences, images, documents, and storage?
- Which technical subset must be demonstrable at the end-of-August meeting?

## 26. Required follow-up documents

After founder review of this technical map, the next technical/product authorities should be created in this order:

1. `WORK_AND_ASSIGNMENT_DOMAIN.md`;
2. `WORK_EXECUTION_AND_EVIDENCE_DOMAIN.md`;
3. `WORK_REVIEW_AND_ACCEPTANCE_DOMAIN.md` as the review partition contract within the execution boundary;
4. `MONTHLY_CONSOLIDATION_AND_DOCUMENTS_DOMAIN.md`;
5. supporting relationship/location and workforce contracts;
6. cross-domain flow and state-transition authority;
7. public contract and stable error specifications;
8. backend implementation authorities per vertical slice;
9. canonical frontend module specifications;
10. product analysis covering value, packaging, price justification, monthly licence, capacity, support, and commercial boundaries.

## 27. Current conclusion

The technical solution is not a collection of CRUD modules.

It is a controlled chain of separately owned authorities:

```text
Platform Access proves the actor
  -> Relationships/Locations prove current service context
  -> Workforce proves executor eligibility
  -> Planning/Assignment creates and releases stable work
  -> Execution/Evidence/Review proves what was submitted and accepted
  -> Monthly Consolidation/Documents freezes and publishes the operational result
```

This chain is the minimum technical architecture capable of supporting the Perfect Service need while remaining reusable for other Maped Solutions service-business tenants.