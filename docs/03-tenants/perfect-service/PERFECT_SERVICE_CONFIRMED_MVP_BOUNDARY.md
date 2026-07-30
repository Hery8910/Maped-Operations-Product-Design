# Perfect Service — Confirmed MVP Boundary

**Status:** CONFIRMED PRODUCT-ANALYSIS INPUT — not final implementation authority  
**Documented:** 2026-07-30  
**Scope:** Perfect Service operational MVP  
**Authority:** Founder clarification of the scope defined with Axel; must be reconciled with final signed commercial documents

## Decision summary

The Perfect Service MVP is the coherent operational workflow shared by two authenticated surfaces:

1. the Perfect Service dashboard;
2. the mobile-friendly cooperation-partner / worker application.

The public website is a complementary deliverable and added value. It is not part of the operational MVP acceptance boundary.

The MVP is complete only when work can travel through this end-to-end lifecycle:

```text
dashboard creates and assigns work
  -> worker receives assigned work
  -> worker confirms required tasks
  -> worker uploads approximately 3–5 photos from a mobile device
  -> worker submits the work for review
  -> Perfect Service reviews tasks and evidence
  -> Perfect Service accepts or rejects the submission
  -> rejected work can be corrected and resubmitted
  -> accepted work contributes to the monthly operational summary
  -> the platform generates, stores, archives, and exposes the monthly document for download
```

Disconnected pages or CRUD functionality do not satisfy this MVP unless they support this complete workflow.

## Core product surfaces

### Perfect Service dashboard

The dashboard must support the office-side responsibilities required to:

- manage the minimum customer and object context needed by work;
- create work and its required tasks;
- assign work to a cooperation partner or worker;
- publish the assignment to the worker application;
- track assignment and submission state;
- review task confirmations and photographic evidence;
- accept a submitted service;
- reject it with an actionable correction reason;
- review a corrected resubmission;
- preserve reviewer, worker, timestamps, evidence, and outcome history;
- consolidate accepted work by monthly period;
- generate the agreed monthly operational document;
- download, archive, retrieve, and preserve generated documents.

### Cooperation-partner / worker application

The mobile-friendly worker surface must support:

- authentication and session continuity;
- visibility only into authorised assigned work;
- display of the object and instructions necessary to execute the assignment;
- display of the required tasks;
- task-completion confirmation;
- capture or selection and upload of approximately three to five images from a mobile device;
- local, understandable upload progress and retry behaviour;
- submission for review;
- visible review state;
- rejection reason and correction expectations;
- permitted resubmission of corrected work.

## Required workflow distinction

Worker completion and Perfect Service acceptance are distinct facts.

A minimum lifecycle must preserve:

```text
planned / assigned
  -> available to worker
  -> in progress
  -> submitted for review
  -> accepted
```

with at least:

```text
submitted for review
  -> rejected / correction required
  -> resubmitted
  -> accepted
```

The later domain design must determine whether rejection targets the full assignment, individual tasks, individual images, or a combination. It must not collapse all operational history into a single `completed` boolean.

## Photo-evidence requirement

The agreed operational need includes worker-submitted photographic documentation.

Current confirmed expectation:

- the worker can attach approximately three to five images to the submitted work from a mobile device;
- Axel / an authorised reviewer receives and inspects those images together with the task confirmations;
- the evidence remains attached to the reviewed work and its decision.

The next analysis must close:

- whether three is a hard minimum;
- whether five is a hard maximum or normal target;
- allowed formats and file size;
- compression and metadata handling;
- whether every work item requires photos;
- whether specific tasks define their own evidence requirement;
- replacement and deletion rules;
- retention and export behaviour;
- failure and retry semantics.

## Monthly operational document boundary

The platform's responsibility ends after it has prepared the monthly operational result as a generated, stored, downloadable document.

The product must:

- select the accepted work belonging to the monthly period;
- consolidate it according to the agreed Perfect Service document structure;
- generate the monthly Abrechnung or agreed preparation document;
- store it;
- archive it;
- make it downloadable and retrievable;
- preserve sufficient traceability to the accepted work used to generate it.

Perfect Service remains responsible for its existing manual office process after that point, including as applicable:

- transferring or adapting information in its current accounting template;
- final accounting or legal validation;
- final issuance;
- sending by email;
- bookkeeping;
- payment processing.

Automatic email sending, payment execution, and bookkeeping integration are outside the confirmed MVP.

An open analysis question remains: whether the platform's generated file is itself the final operational Abrechnung ready for Perfect Service to send manually, or a prepared monthly source document used to complete the existing template. The required outcome is not open: monthly accepted work must be consolidated into a stored and downloadable document.

## Public website boundary

The website is not part of the operational MVP.

It may include the promised public company presence and forms as a complementary delivery stream, but:

- it must not be counted as evidence that the operational MVP is complete;
- its delivery priority must not displace the dashboard-to-worker workflow;
- its acceptance and scheduling should be tracked separately;
- earlier proposal commitments must still be reconciled and honoured in the complete customer delivery plan.

## Initial exclusions

Unless explicitly re-authorised, the confirmed MVP does not require:

- GPS check-in or check-out;
- QR attendance fallback;
- native iOS or Android apps;
- automatic email sending of monthly documents;
- legal invoice creation or autonomous accounting issuance;
- bookkeeping or payment processing;
- automatic delivery of externally created invoices;
- public complaint and corrective-work workflow;
- public accounts, appointment booking, or public payments;
- unrestricted workflow or form-builder capability.

These features may later be classified as deferred Version 1 scope, tenant-specific extensions, or change requests. Historical source material alone does not place them in the confirmed MVP.

## Product capabilities to analyse next

The next MVP analysis must define the exact minimum coherent behaviour for:

1. identity, authentication, tenant access, and roles;
2. cooperation-partner organisations and individual workers;
3. customers and objects only as required by assignments and monthly documents;
4. work definitions and task lists;
5. assignment and worker visibility;
6. mobile photo evidence;
7. review queues and review decisions;
8. rejection, correction, and resubmission;
9. monthly period consolidation;
10. document generation, storage, archive, and retrieval;
11. permission boundaries, tenant isolation, and audit;
12. operational notifications required to keep this workflow usable.

## Questions retained for Axel or explicit product decision

- Does every worker need an individual account, or may a cooperation partner use a shared organisational account?
- Can several workers execute one assignment?
- Which assignments or tasks require photos?
- Are three and five strict limits or a normal operating range?
- Can a reviewer reject only one task or image while accepting the rest?
- Does a correction reopen the original submission or create a new revision?
- What information must appear in the monthly document?
- Is the platform-generated document final for manual sending, or input for the current template?
- What freezes a monthly period and prevents later changes?
- Which accepted work may later be corrected, by whom, and with what audit reason?
- Which recurrence and plan capabilities are necessary for the first usable MVP rather than later optimisation?

## Commercial context

The founder recalls justifying the system with an initial value / payment of EUR 3,500 and EUR 350 per month for platform use, with the public website delivered as added value.

Because earlier documents contain a different initial setup price, this commercial recollection must be preserved but not treated as the final contractual price until the current written agreement is reconciled.

## Relationship to prior derivation

This document narrows and clarifies `PERFECT_SERVICE_TECHNICAL_REQUIREMENT_DERIVATION.md`.

The earlier derivation remains useful as the complete source-derived requirement inventory. This document defines the confirmed operational MVP boundary that must guide the next classification, journeys, state machines, acceptance criteria, and staged implementation analysis.