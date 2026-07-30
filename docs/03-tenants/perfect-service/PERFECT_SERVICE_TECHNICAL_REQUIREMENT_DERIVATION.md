# Perfect Service — Technical Requirement Derivation

**Status:** WORKING INPUT — source-derived, not final MVP or implementation authority  
**Documented:** 2026-07-30  
**Scope:** Perfect Service tenant requirements and candidate reusable product capabilities  
**Authority:** Source evidence and founder constraints; final product authority requires the next reconciliation step

## Purpose

This document translates the supplied Perfect Service proposal, contract draft, client requirement paper, annual work-plan example, object-data templates, and monthly settlement example into technical product concepts.

It deliberately does not decide the final MVP, architecture, implementation sequence, or acceptance criteria. The next product interaction must reconcile this derivation with the current Maped Solutions MVP baseline and classify each requirement as:

- Core Product;
- Tenant Configuration;
- Perfect Service Specific Extension;
- unresolved;
- excluded by explicit decision.

The presented Perfect Service product description is treated as a committed Version 1 baseline that must be preserved in the later scope decision, even where a capability is not required for the first presentation milestone.

A confidential source-and-commitment register exists in the private Maped Solutions documentation repository. This public derivative contains no raw documents, personal contact data, access instructions, commercial prices, or customer operational records.

## Source-derived product surfaces

### 1. Public experience

Purpose:

- present Perfect Service;
- receive contact enquiries;
- receive structured cleaning-service requests;
- provide legal and company information.

Current source boundary:

- no public account;
- no public login;
- no appointment booking;
- no payment processing;
- complaint reporting with photo is optional and unresolved.

### 2. Perfect Service operational dashboard

Purpose:

- manage customers, objects, contractor organisations, people, plans, assignments, completion evidence, documents, and operational exceptions;
- preserve the office as the controlling and reviewing authority;
- reduce manual monthly consolidation and repeated document preparation.

### 3. Contractor / cooperation-partner experience

Purpose:

- show only assigned work and the object information required to execute it;
- guide weekly work;
- prevent secondary or infrequent tasks from being forgotten;
- capture completion, notes, timestamps, and photographic evidence;
- provide a simple field experience on smartphones without requiring a native app.

## Conceptual actors

These are product actors, not implementation role names.

### Perfect Service tenant administrator

- manages tenant-wide access and configuration;
- controls high-risk permissions;
- can manage office users and contractor relationships.

### Perfect Service office operator

- manages customers and objects;
- creates and changes plans;
- assigns work;
- reviews execution and evidence;
- prepares monthly operational documents.

### Perfect Service reviewer / manager

- reviews disputed or incomplete work;
- approves manual exceptions and settlement adjustments;
- may have authority distinct from day-to-day office editing.

### Contractor organisation

- commercial or operational cooperation partner responsible for assigned objects;
- may contain a leader and multiple individual executors.

### Contractor leader

- coordinates people inside the contractor organisation;
- may receive reminders and delegate or confirm execution responsibility.

### Individual executor

- performs assigned work;
- sees only relevant assignments and object instructions;
- records start, completion, notes, and required evidence.

### Temporary substitute

- a person authorised for a narrow period or assignment;
- must not silently become a permanent contractor member;
- requires explicit, expiring, auditable delegation if supported.

### Customer organisation and customer contact

- receives service and monthly work documentation;
- may have multiple objects and one or more operational or delivery contacts.

### Object-level contact

- caretaker, property manager, owner representative, or other on-site contact;
- may differ from the customer billing or contract contact.

### Maped platform operator

- operates the multi-tenant platform;
- remains separate from Perfect Service tenant roles and operational authority.

## Candidate domain map

### Identity and Access

Responsibilities:

- authentication;
- tenant membership;
- invitations;
- recovery;
- role and permission boundaries;
- temporary or delegated access;
- access suspension and expiry.

### Customers

Responsibilities:

- customer organisations;
- operational and document-delivery contacts;
- relationship to one or more objects;
- customer-specific document routing.

### Contractor Organisations and Workforce

Responsibilities:

- contractor organisations or teams;
- contractor leaders and executors;
- assignment eligibility;
- substitute authorisation;
- access boundaries;
- responsibility history.

### Objects / Work Locations

Responsibilities:

- object identity and code;
- address and location context;
- access, key, material, water, electricity, and safety instructions;
- object contacts;
- floor and cleaning-material requirements;
- general operational knowledge;
- relationship to customer and active service plan.

### Service and Cleaning Plan Definition

Responsibilities:

- object-specific task catalogue;
- grouped cleaning tasks;
- mandatory versus demand-based tasks;
- instructions and evidence requirements;
- recurrence rules;
- seasonal and calendar-week applicability.

### Scheduling and Occurrence Generation

Responsibilities:

- regular cleaning day;
- calendar-week schedule;
- monthly, quarterly, half-yearly, annual, and seasonal work;
- generation of concrete scheduled occurrences from plan rules;
- change propagation when the office adjusts a plan.

### Work Assignment

Responsibilities:

- connect scheduled occurrences with a contractor organisation or executor;
- preserve who was expected to perform the work;
- represent reassignment and substitution;
- expose only the necessary assignment context.

### Execution and Attendance

Responsibilities:

- start and end of execution;
- actor and timestamp evidence;
- optional location or object-presence verification if later approved;
- exception and retrospective legitimation;
- distinction between work responsibility and device/account identity.

### Task Completion and Evidence

Responsibilities:

- task-level completion;
- whole-assignment completion;
- required photo evidence;
- notes and issue reporting;
- review, rejection, correction, and final acceptance.

### Notifications and Attention

Responsibilities:

- upcoming secondary-task reminders;
- overdue work;
- missing evidence;
- exception use;
- monthly hygiene reminders;
- review or approval queues;
- distinction between passive information and action-required conditions.

### Rates and Settlement Preparation

Responsibilities:

- rate definitions;
- object and service line items;
- quantities;
- adjustments, deductions, provisions, or open items;
- monthly contractor aggregation;
- traceability from settlement lines back to accepted execution evidence.

### Customer Work Proofs

Responsibilities:

- monthly grouping by customer and object;
- inclusion of executed work and relevant evidence or summary;
- approval before delivery where required;
- customer-specific delivery routing;
- archive and later retrieval.

### Documents and Delivery

Responsibilities:

- generate, approve, download, archive, export, and send documents;
- record delivery status and failure;
- distinguish documents generated by the platform from externally created accounting documents;
- keep payment execution and accounting authority outside the product unless separately agreed.

### Complaints and Corrective Work

Status: unresolved optional extension.

Potential responsibilities:

- public complaint with photo;
- internal triage;
- assignment to responsible contractor;
- corrective action;
- closure evidence;
- controlled communication without exposing object-sensitive data.

### Audit and Manual Override

Responsibilities:

- immutable record of high-risk actions;
- who changed plans, assignments, completion, evidence status, settlement adjustments, or access;
- reason and authority for retrospective work legitimation;
- visibility into repeated exception use.

## Candidate conceptual data model

The source material supports these product concepts. Names are conceptual and must not be copied directly into persistence models without domain design.

### Access and people

- Identity;
- Tenant Membership;
- Person Profile;
- Role / Permission Grant;
- Invitation;
- Contractor Organisation;
- Contractor Membership;
- Temporary Authorisation.

### Customer and object

- Customer Organisation;
- Customer Contact;
- Document Delivery Address;
- Object / Building;
- Object Code;
- Object Contact;
- Object Access Instruction;
- Object Operational Note;
- Sensitive Access Detail.

### Plan and schedule

- Cleaning Plan;
- Task Group;
- Task Definition;
- Evidence Requirement;
- Recurrence Rule;
- Calendar-Week Rule;
- Seasonal Rule;
- Scheduled Task Occurrence;
- Work Assignment.

### Execution

- Execution Session;
- Check-In Evidence;
- Completion Record;
- Task Evidence;
- Photo Attachment;
- Execution Note;
- Exception / Override;
- Review Decision;
- Corrective Action.

### Finance-supporting documents

- Rate Rule;
- Settlement Line;
- Settlement Adjustment;
- Contractor Monthly Settlement;
- Customer Monthly Work Proof;
- Generated Document;
- External Document Reference;
- Delivery Attempt;
- Archive Entry.

### Attention and governance

- Reminder;
- Attention Item;
- Audit Event;
- Retention Policy;
- Export Request.

## Object information requirements

The object examples establish that an object is an operational knowledge container, not only an address.

The product must be capable of representing:

- stable object identifier or code;
- address, postal code, and district;
- service start context;
- number of entrances and floors;
- regular cleaning day;
- allowed schedule variation;
- location of cleaning materials;
- key and access information;
- water source and waste-water disposal;
- ladder and electricity availability;
- lighting-replacement responsibility;
- floor material and required cleaning method;
- on-site contact;
- property manager or owner contact;
- specific cleaning instructions;
- safety and material constraints;
- general object notes.

### Product implication

Object information needs at least two visibility levels:

1. general execution context visible to assigned contractor users;
2. sensitive access information visible only when necessary and only to authorised users.

A single unrestricted free-text field is insufficient for safe access control, filtering, validation, and later export. The final design should combine structured fields with controlled notes where structure would not represent the real instruction adequately.

## Cleaning-plan and recurrence requirements

The annual matrix is evidence of a calendar-week planning model with multiple recurrence categories.

The domain must support:

- weekly recurring tasks;
- monthly tasks;
- quarterly or multi-month tasks;
- half-yearly tasks;
- annual tasks;
- seasonal tasks;
- demand-based tasks;
- object-specific custom tasks;
- explicit weeks in which a task applies;
- required versus optional tasks;
- task-level completion and evidence.

### Product implication

The product cannot treat the cleaning plan as only a static checklist. It must distinguish:

- reusable task definition;
- recurrence or week rule;
- concrete scheduled occurrence;
- assignment;
- execution record;
- review outcome.

The historical spreadsheet may inform import and operator familiarity, but it does not automatically define the final UI.

## Candidate work lifecycle

The final lifecycle requires product validation, but the source material implies at least:

```text
planned
  -> upcoming
  -> due
  -> started
  -> completed
  -> submitted for review
  -> accepted
```

Exception outcomes include:

```text
overdue
missed
cancelled
reassigned
completed by substitute
manual retrospective legitimation
correction required
rejected evidence
settlement adjustment required
```

### Important distinction

A work assignment, an execution session, a task completion, and a review decision are different concepts. One boolean `completed` state cannot preserve the required operational history.

## Candidate evidence lifecycle

```text
not required
required and pending
uploaded
under review
accepted
rejected / replacement required
```

Evidence must be associated with the specific scheduled task occurrence or corrective action. Object-level photo storage alone would not support review, monthly proof, or dispute traceability.

## Candidate settlement lifecycle

```text
draft
  -> calculated
  -> reviewed
  -> adjusted
  -> approved
  -> generated
  -> delivered
  -> archived
```

The later scope analysis must decide:

- which execution states qualify for calculation;
- whether missing work is excluded automatically or requires review;
- how deductions and adjustments are represented;
- who can approve;
- whether delivery is automatic after approval;
- what constitutes a legal invoice versus an operational settlement document.

## Candidate customer work-proof lifecycle

```text
draft from accepted work
  -> reviewed
  -> approved
  -> generated
  -> delivered
  -> archived
```

Work proofs should be grouped according to the customer-object relationship and delivered to the correct customer contact. Delivery failure must remain visible and retryable.

## Permission boundaries

### Contractor-facing minimum

A contractor user may see:

- own assigned work;
- relevant weekly schedule;
- object information necessary to execute the assignment;
- own completion and evidence state;
- reminders and corrections related to own work.

A contractor user must not see:

- other contractors or their assignments;
- unrelated customers or objects;
- tenant-wide financial data;
- customer commercial information not needed for execution;
- unrestricted sensitive object-access data;
- internal Perfect Service notes outside the assignment context.

### Perfect Service operator

May require:

- customer, object, plan, assignment, execution, evidence, and document management;
- search and filtering across the tenant;
- review queues;
- schedule changes;
- controlled manual corrections.

### High-risk authority

The following actions need explicit permission and audit:

- grant temporary substitute access;
- retrospectively legitimise work;
- change accepted completion records;
- approve or reject evidence;
- adjust settlement lines;
- release monthly documents;
- access or change sensitive key information;
- export tenant data.

## Notifications and reminder semantics

The source material describes several different attention jobs that should not be collapsed into generic notifications.

### Upcoming obligation

Example meaning:

- a secondary task becomes due next week;
- the user should plan for it, but no failure has occurred.

### Due now

- the task belongs to the current work period;
- it should be visible inside the assignment, not only as a detached notification.

### Overdue or missing

- the expected work or evidence is incomplete;
- the user and office may need different messages and actions.

### Review required

- execution or evidence was submitted and now requires office action.

### Exception attention

- substitute work, retrospective legitimation, repeated override use, or settlement adjustment requires management awareness.

### Delivery failure

- a generated document was not delivered;
- the document remains intact and delivery can be retried safely.

## Mobile and field-operation implications

The contractor experience must prioritise:

- fast authentication and session continuity;
- clear current-week work;
- large, direct actions usable on site;
- low cognitive load;
- readable object instructions;
- reliable photo capture/upload;
- local pending and retry feedback;
- preservation of entered notes when a request fails;
- clear distinction between saved locally, uploaded, submitted, and accepted.

### Unresolved field constraints

- offline work is not yet a confirmed requirement;
- GPS presence verification is requested but not yet accepted product scope;
- QR fallback is requested but not yet designed;
- browser and PWA limitations must be tested before promising device-level behaviour;
- location and photo retention require privacy decisions.

## Candidate reusable-core signals

These requirements appear likely to solve recurring service-business problems, but classification remains provisional:

- tenant identity and access;
- customers and contacts;
- properties / work locations;
- contractor or workforce organisation;
- plans, recurrence, schedule, assignment, and execution;
- task completion and evidence;
- operational notes;
- notifications and attention;
- document generation and delivery;
- audit and controlled override.

## Candidate tenant-configuration signals

Likely configuration candidates include:

- enabled task categories;
- task catalogue and instructions;
- recurrence schedules;
- evidence requirements;
- object information fields that are legitimately variable;
- contractor terminology;
- reminder timing within safe product limits;
- document templates and customer-facing branding;
- delivery recipients;
- enabled optional modules.

Configuration must not become an unrestricted form builder or workflow engine without product evidence.

## Candidate Perfect Service-specific extension signals

The following may remain tenant-specific unless later evidence proves reuse:

- the exact historical cleaning-plan categories and labels;
- exact settlement line categories and calculation conventions;
- Perfect Service-specific deduction or provision rules;
- precise customer reference-number format;
- externally prepared invoice-folder delivery workflow;
- special monthly hygiene reminders;
- the exact retrospective substitute-legitimation policy;
- complaint remediation flow as currently described.

## Conflicts that the next MVP analysis must resolve

1. The product description promises automatic monthly contractor settlements and customer work proofs, while the contract draft uses broader exclusions around billing. Document generation, approval, sending, accounting, and payment must be separated.
2. The client requirement asks for GPS or QR evidence; the proposal and contract draft do not clearly commit to it.
3. The complaint workflow is optional in one source and absent from the contract functionality annex.
4. Temporary helpers and retrospective legitimation are operationally important but not represented in the high-level proposal.
5. The annual spreadsheet shows richer recurrence than the contract's short weekly-plan wording.
6. Object information contains sensitive access details, but no source defines role-specific visibility or retention.
7. Automatic document delivery is requested but approval, failure, retry, and delivery evidence are undefined.
8. The proposal's historical dates are not a current delivery plan.
9. Broad acceptance wording must later be replaced by testable capability and workflow criteria.

## Questions for Perfect Service validation

- Is the contractor account assigned to a company, a team leader, every individual executor, or a mixture?
- Can one assignment be performed by multiple people?
- Must every weekly visit be checked in and checked out, or only selected work?
- Is GPS mandatory, preferred, or only a possible control?
- What is the acceptable fallback when location evidence fails?
- Who may authorise a substitute, for how long, and for which objects?
- Which tasks always require a photo?
- Can an object have multiple active cleaning plans?
- Can the regular cleaning day vary by week without becoming an exception?
- Which missed tasks may be completed later, and within what window?
- Which accepted execution records may be changed, by whom, and with what audit reason?
- What exact document is a contractor settlement: calculation preview, credit note, invoice basis, or legal accounting document?
- Does Perfect Service want automatic sending immediately after calculation, or only after office approval?
- Are customer work proofs sent per object, per customer, or both?
- Must documents be generated in PDF only, and are spreadsheet exports also required?
- What historical data must be imported beyond customers and objects?
- Is offline execution required in buildings with poor connectivity?
- What are the photo and location-data retention periods?
- Which languages are required for office and contractor users?
- Is the complaint workflow part of the first contracted Version 1 or a later extension?

## Required next deliverables

The next interaction should use this document together with the current Maped Solutions MVP baseline to produce:

1. a source-to-requirement traceability matrix;
2. a confirmed Perfect Service actor model;
3. core / tenant configuration / specific extension classification;
4. presentation milestone scope versus complete promised Version 1 scope;
5. dependency-aware domain sequence;
6. user journeys and state transitions;
7. acceptance criteria per capability;
8. explicit exclusions and unresolved decisions;
9. implementation slices that preserve a coherent operational workflow rather than a list of disconnected pages.
