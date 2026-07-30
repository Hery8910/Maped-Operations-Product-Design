# Maped Service Operations MVP — First Definition

**Status:** PROVISIONAL PRODUCT DEFINITION — founder-approved direction, detailed domain authority pending  
**Documented:** 2026-07-30  
**Product owner:** Founder / Product Design  
**Reference tenant:** Perfect Service  
**Intended reuse:** Havenova and future service-business tenants where product analysis confirms fit

## 1. Purpose

This document establishes the first coherent definition of the Maped Solutions Service Operations MVP.

It reconciles:

- the initial reusable Service Operations baseline;
- the Perfect Service source corpus;
- the founder-confirmed operational boundary discussed with Axel;
- the requirement for worker photographic evidence;
- the review and rejection workflow;
- the monthly document boundary;
- the distinction between standard product value and the Perfect Service commercial exception.

It defines product scope and acceptance direction. It does not prescribe backend schemas, API routes, persistence collections, frontend framework composition, infrastructure providers, or final visual design.

## 2. Product definition

The Maped Service Operations MVP is a connected operational system for service companies that coordinate recurring or one-off work through external cooperation partners or workers.

Its core job is to transform an office-defined service obligation into reviewed execution evidence and a monthly operational document.

The product succeeds through this closed loop:

```text
service context and work requirement
  -> work creation or generation
  -> assignment
  -> worker execution
  -> task confirmation
  -> photographic evidence
  -> submission for review
  -> acceptance or rejection
  -> correction and resubmission when required
  -> accepted-work consolidation
  -> monthly document generation and archive
```

The product is not defined by the number of pages it contains. It is defined by whether this complete operational loop can be executed reliably, securely, and traceably.

## 3. Core application surfaces

The operational MVP contains exactly two required application surfaces.

### 3.1 Administrative dashboard

Used by the service company's authorised office users to define, assign, supervise, review, accept, and consolidate work.

### 3.2 Worker application

A mobile-first browser/PWA experience used by authorised cooperation partners or individual workers to receive assigned work, understand tasks, confirm execution, attach evidence, and submit results.

### 3.3 Complementary public website

A public website may be included in a tenant delivery as complementary value.

It is not part of the operational MVP acceptance boundary and does not prove that the Service Operations product is complete.

## 4. Primary actors

### Tenant administrator

Manages tenant access, high-risk permissions, office users, worker relationships, and configuration authority.

### Office operator

Creates and maintains customers, objects, plans, work, assignments, and operational information.

### Reviewer / manager

Reviews worker submissions, accepts or rejects work, resolves corrections, and authorises monthly consolidation.

One person may perform all three office roles in a small company, but their responsibilities remain conceptually distinct.

### Cooperation partner organisation

An external company or team responsible for performing assigned service work.

### Individual worker / executor

The person who performs the work and records task completion and evidence.

The final access model must decide whether every executor requires an individual identity or whether organisational accounts are allowed. Shared credentials must not be assumed safe or acceptable.

### Maped platform operator

Operates the multi-tenant platform but does not automatically gain Perfect Service operational authority.

## 5. Minimum product domains

The MVP requires the following coherent domains or capability boundaries.

### 5.1 Platform Access

- identity and authentication;
- session restoration and logout;
- tenant membership;
- roles and capabilities;
- invitation and access lifecycle;
- tenant isolation;
- access suspension and revocation.

### 5.2 Customers and operational contacts

Only the customer information required to associate objects, work, and monthly documents belongs to the first MVP.

Minimum responsibilities:

- customer organisation or customer identity;
- operational contact;
- document or billing contact where required;
- relationship to one or more objects.

A complete CRM is not required.

### 5.3 Objects / service locations

Minimum responsibilities:

- object code or stable identifier;
- address and location context;
- relationship to customer;
- execution instructions;
- object contacts;
- access, material, safety, and cleaning information required by assigned workers;
- controlled visibility for sensitive access information.

The object is an operational knowledge container, not only an address.

### 5.4 Cooperation partners and workers

Minimum responsibilities:

- cooperation partner organisation or team;
- individual worker where required;
- active or inactive eligibility;
- tenant membership and role relationship;
- assignment visibility;
- responsibility history.

Temporary substitutes and retrospective legitimisation are deferred unless later required to make the first real workflow usable.

### 5.5 Service plan and task definition

Minimum responsibilities:

- object-specific service obligation;
- one-off or recurring classification;
- task groups and tasks;
- instructions;
- evidence requirement;
- recurrence and calendar-week applicability;
- validity period;
- source for concrete work occurrences.

### 5.6 Scheduling and work occurrence

The MVP must distinguish a reusable plan from a concrete occurrence.

Minimum responsibilities:

- create a one-off work item manually;
- generate or prepare recurring work within a controlled planning horizon;
- prevent duplicate generation;
- preserve the source plan;
- allow authorised review, adjustment, cancellation, and assignment before worker execution;
- snapshot the relevant task and instruction state when work is released.

### 5.7 Work assignment

Minimum responsibilities:

- assign one work occurrence to an eligible cooperation partner or worker;
- make it visible in the worker application;
- preserve assignment history;
- prevent unrelated workers from viewing it;
- support reassignment before or during the permitted lifecycle.

### 5.8 Worker execution and evidence

Minimum responsibilities:

- show current and upcoming assigned work;
- show required object context and instructions;
- show the task checklist;
- mark tasks complete or blocked;
- add a note where required;
- attach photographic evidence from a mobile device;
- submit the work for review;
- preserve upload and submission state;
- retry failed uploads or submissions without losing valid entered work.

### 5.9 Administrative review

Minimum responsibilities:

- review task outcomes;
- review notes and images;
- accept the submitted work;
- reject it with an actionable reason;
- define the required correction;
- review a resubmission;
- preserve reviewer identity and decision history;
- prevent unreviewed worker completion from becoming financially accepted work.

### 5.10 Monthly consolidation and documents

Minimum responsibilities:

- select accepted work in a monthly period;
- group it according to the configured document structure;
- calculate or prepare agreed operational line items where the tenant configuration requires them;
- generate a monthly document;
- make the document downloadable;
- store, archive, retrieve, and version or regenerate it under controlled rules;
- preserve traceability to the accepted work used.

The MVP does not perform bookkeeping, payment processing, autonomous legal invoicing, or automatic email delivery.

### 5.11 Audit and operational attention

Minimum responsibilities:

- preserve actor and timestamp for consequential transitions;
- record assignment, submission, review, rejection, resubmission, acceptance, and document generation;
- surface work awaiting review;
- surface rejected work requiring correction;
- surface overdue or missing work only to the extent required for the first usable workflow;
- distinguish immutable history from current operational state.

## 6. Core work lifecycle

The first product lifecycle is:

```text
draft
  -> approved / ready for assignment
  -> assigned
  -> available to worker
  -> in progress
  -> submitted for review
  -> accepted
```

Required branches include:

```text
assigned / available
  -> cancelled

assigned / in progress
  -> reassigned, where permitted

submitted for review
  -> rejected / correction required
  -> resubmitted
  -> accepted
```

The following concepts must remain distinct:

- plan;
- scheduled occurrence;
- work assignment;
- worker execution;
- task completion;
- evidence submission;
- review decision;
- monthly-document inclusion.

A single boolean `completed` field cannot represent the product.

## 7. Evidence model

Photographic documentation is mandatory as a product capability for this MVP.

The initial tenant expectation for Perfect Service is approximately three to five images per submitted work item.

The reusable product should support a configurable evidence policy rather than hard-coding Perfect Service's exact number globally.

The policy must be able to define, at minimum:

- whether evidence is required;
- whether the rule applies to the full work item or selected tasks;
- minimum and maximum image count;
- allowed formats;
- maximum file size;
- compression and metadata policy;
- replacement rules;
- whether the submission can proceed when evidence upload is incomplete.

For the first Perfect Service configuration, the working rule is:

```text
photo evidence enabled
expected range: 3–5 images per submitted work item
mobile capture or mobile file selection supported
review required before acceptance
```

This remains subject to final validation of whether three and five are strict limits or a normal operating range.

## 8. Review and correction semantics

Worker submission does not close the work.

A reviewer must be able to understand:

- what the worker confirmed;
- which tasks were incomplete or blocked;
- which images belong to the submission;
- when and by whom the work was submitted;
- whether the evidence is sufficient;
- what correction is required when rejecting.

A rejection must never be a silent state change. It requires an actionable reason visible to the worker.

The first MVP may reject the entire submitted work item while preserving all submitted data and allowing a corrected revision. Partial task- or image-level acceptance should be treated as a later refinement unless Axel confirms it is operationally essential.

This provisional choice minimises lifecycle complexity while preserving the real review loop.

## 9. Monthly document semantics

Only accepted work is eligible by default for monthly consolidation.

The product must distinguish:

- operational acceptance;
- inclusion in a monthly period;
- generated document state;
- external accounting, sending, and payment actions.

A provisional lifecycle is:

```text
open monthly period
  -> accepted work accumulated
  -> draft consolidation
  -> office review
  -> document generated
  -> document archived
```

The next domain analysis must define:

- whether a period can be closed and reopened;
- who may exclude or adjust accepted work;
- whether regeneration creates a new version;
- the exact Perfect Service template fields and grouping;
- whether the generated document is final for manual sending or a source for the existing office template.

The mandatory outcome is fixed: the monthly result must exist as a stored and downloadable document.

## 10. MVP dashboard capability map

The first dashboard definition includes:

### Access and people

- office-user access;
- cooperation-partner and worker access management;
- role-appropriate permissions.

### Operational master data

- customer list and customer detail sufficient for work and documents;
- object list and object detail;
- cooperation-partner / worker list and detail;
- service-plan and task definitions.

### Planning and work

- current planning period;
- generated and manually created work;
- work detail;
- assignment;
- status and exception visibility;
- controlled editing before execution.

### Review

- submitted-work queue;
- task and evidence inspection;
- accept action;
- reject action with reason;
- resubmission history.

### Monthly documents

- monthly period selection;
- accepted-work preview;
- document generation;
- generated-document list;
- download and retrieval.

A separate analytics dashboard, advanced KPI system, or general-purpose report builder is not required.

## 11. MVP worker-application capability map

The first worker experience includes:

- login and session continuity;
- current-week / current-assignment view;
- assigned-work detail;
- object address and operational instructions;
- task checklist;
- task completion and blocked state;
- note entry;
- mobile photo capture or selection;
- upload progress and failure recovery;
- submission for review;
- awaiting-review state;
- accepted state;
- rejected state with reason;
- corrected resubmission.

The experience must be designed for low technical complexity and field use.

Offline execution is not part of the first accepted scope unless testing demonstrates that normal connectivity is insufficient for the target buildings and Axel confirms offline support is necessary.

## 12. Reusable core, tenant configuration, and extension classification

### 12.1 Reusable core product

The following are provisionally part of the reusable Maped Service Operations core:

- Platform Access;
- tenant isolation and roles;
- customers and operational contacts;
- objects / service locations;
- cooperation partners and workers;
- service plans and tasks;
- recurrence and controlled occurrence generation;
- work orders and assignment;
- worker execution;
- configurable evidence capture;
- submission and administrative review;
- rejection, correction, and resubmission;
- monthly accepted-work consolidation;
- configurable document generation and archive;
- audit and operational attention.

### 12.2 Tenant configuration

The following are provisional configuration:

- tenant terminology;
- enabled task categories;
- object fields and instructions;
- recurrence rules and planning horizon;
- evidence requirement and image limits;
- roles and permitted actions within the supported model;
- reminder timing;
- document branding and template;
- document grouping and delivery metadata;
- enabled optional capabilities;
- capacity envelope.

### 12.3 Perfect Service-specific configuration or extension

The following remain Perfect Service-specific unless later evidence justifies reuse:

- exact historical cleaning categories and labels;
- exact annual calendar-week matrix import or presentation;
- exact Abrechnung line categories and wording;
- Perfect Service-specific adjustment or provision rules;
- specific document layout;
- unusual object-information labels;
- later GPS, QR, substitute-legitimation, or complaint workflows if adopted.

## 13. Explicit MVP exclusions

The first Maped Service Operations MVP excludes:

- public customer account or customer portal;
- public booking and payment;
- native iOS or Android apps;
- GPS or QR attendance verification;
- route optimisation;
- AI features;
- digital signatures;
- advanced inventory;
- complete CRM;
- payroll;
- bookkeeping;
- legal invoice issuance;
- payment execution;
- automatic email sending of monthly documents;
- general workflow builder;
- unrestricted report builder;
- public complaint system;
- large historical migration;
- advanced analytics.

These exclusions prevent the MVP from becoming an undefined enterprise-management suite.

## 14. Commercial reference

The current Maped Solutions standard reference price for this defined product is:

- EUR 3,500 net initial implementation;
- EUR 350 net monthly platform licence and managed service.

Perfect Service receives a customer-specific initial-price exception:

- EUR 2,000 net initial implementation;
- EUR 350 net monthly platform licence and managed service.

The discount does not redefine the product's standard reference value.

Product scope and commercial price remain separate authorities: this document defines the product; company documentation defines pricing, discount, capacity, and contract terms.

## 15. First acceptance journey

The first coherent acceptance scenario should demonstrate:

1. an authorised office operator logs into the dashboard;
2. a customer and object exist;
3. an object-specific recurring or one-off work requirement exists;
4. a concrete work occurrence is created or generated;
5. its tasks and evidence policy are visible;
6. it is assigned to an authorised worker;
7. the worker logs into the mobile application;
8. the worker sees only the assigned work and required object context;
9. the worker confirms the tasks;
10. the worker attaches the configured photographic evidence;
11. the worker submits the work;
12. the dashboard shows the submission in the review queue;
13. the reviewer rejects it with a reason;
14. the worker sees the reason and resubmits a correction;
15. the reviewer accepts the work;
16. the accepted work appears in the correct monthly consolidation;
17. the platform generates the configured monthly document;
18. the document is stored, listed, downloadable, and traceable to the accepted work;
19. an unrelated worker or tenant cannot access the data.

The MVP is not accepted if any critical step requires manual database changes, hidden administrator intervention, or an external spreadsheet to preserve the operational state.

## 16. Non-functional acceptance direction

The product must also demonstrate:

- tenant isolation;
- least-privilege worker access;
- secure handling of object access information;
- reliable mobile photo upload;
- understandable pending, error, and retry states;
- preservation of worker input after recoverable failure;
- auditability of consequential actions;
- scalable storage of images and documents;
- backup and recovery policy;
- responsive dashboard and mobile worker experience;
- accessibility appropriate to both surfaces;
- supported-browser behaviour on current Android and iOS browsers.

Exact technical service levels remain implementation and contract work.

## 17. Required next product documents

This first definition should now be decomposed into authoritative domain work in this order:

1. `SERVICE_OPERATIONS_DOMAIN_MAP.md`;
2. `WORK_AND_ASSIGNMENT_DOMAIN.md`;
3. `WORK_EXECUTION_AND_EVIDENCE_DOMAIN.md`;
4. `WORK_REVIEW_AND_ACCEPTANCE_DOMAIN.md`;
5. `MONTHLY_CONSOLIDATION_AND_DOCUMENTS_DOMAIN.md`;
6. supporting Customer, Object, Workforce, Planning, and Notification contracts;
7. cross-domain flows and state machines;
8. acceptance matrix;
9. staged implementation handoff.

Platform Access should be consumed as the existing reusable foundation rather than redefined inside these domains.

## 18. Open decisions

The first definition retains these decisions for the next analysis:

- individual worker accounts versus limited organisational access;
- multi-worker assignments;
- strict versus typical three-to-five-image limits;
- task-level versus work-level evidence rules;
- whole-submission versus partial rejection;
- recurrence scope required for initial launch;
- exact monthly document type and fields;
- period closing, correction, and regeneration rules;
- pricing and adjustment data required inside the product;
- initial capacity limits for users, workers, objects, work orders, images, documents, and support;
- which subset must be complete for the end-of-August demonstration versus complete first customer delivery.

## 19. Current decision

The Maped Service Operations MVP is provisionally defined as the smallest reusable product that lets a service company create or generate work, assign it, receive mobile task and photographic evidence, review and correct execution, accept work, and generate a stored monthly operational document.

Any proposed feature must justify its place by supporting this loop, protecting it, or making it commercially operable. Features that do not do so are deferred until evidence proves they belong in the product.
