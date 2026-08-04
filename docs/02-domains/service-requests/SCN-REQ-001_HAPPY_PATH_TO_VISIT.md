# SCN-REQ-001 — Happy path from Service Request to Visit

**Status:** REVIEWED DRAFT — awaiting final repository approval  
**Scope:** Service Requests core product behavior  
**Documented:** 2026-08-04  
**Authority:** Functional product definition only  
**Does not authorize:** Figma production, frontend implementation, backend contracts, persistence changes, email HTML, deployment or tenant-specific configuration

## 1. Purpose

This flow defines the normal successful path in which a person submits a service need, the company reviews it without requiring clarification or an alternative date, and the platform creates and links one Visit.

The flow is intentionally described before visual or technical design. Its job is to establish what must happen, what must be communicated and which meanings must be preserved.

## 2. Domain boundary

Service Requests owns the initial service need and its processing until a Visit is created and linked successfully.

A Service Request contains or preserves:

- the requested service;
- the original description of the need;
- the request-scoped service location;
- customer name and contact information;
- the preferred visit date and time window;
- service-dependent images when enabled;
- source, creator and creation time;
- processing history.

Service Requests does not automatically create or complete:

- a reusable customer profile;
- a reusable service-location profile;
- an offer;
- a one-time service;
- a recurring plan;
- a work order.

The positive end of this flow occurs only after one Visit exists and is linked to the originating Service Request.

## 3. Core decisions

### 3.1 Visit terminology

This flow always uses **Visit**. It represents a physical visit to the customer's location.

The customer's preferred date is not a reservation. A Visit is not confirmed until the platform has created and linked it successfully.

### 3.2 Contact data

Email is required because it is the minimum supported channel for:

- receipt confirmation;
- clarification requests;
- date proposals;
- secure customer-response links;
- Visit confirmation.

Phone is optional in the product model.

The default frontend projection may show an explicitly optional phone field. A tenant may hide it completely. A tenant-specific decision to require phone is not established by this document and must not silently change the core model.

### 3.3 Images

Images are service-dependent.

A service configuration may define images as:

- unavailable;
- optional;
- required.

The general Service Request flow does not require images when the selected service does not justify them.

### 3.4 Review state

A newly created request enters **New**.

The first deliberate opening by an authorized administrator changes it to **In review** and records who opened it and when.

No separate Accept action is required. Opening begins internal review but does not confirm availability, a Visit or future work.

An authorized administrator may return an In review request to New when it should remain visibly unclaimed for another operator. This behaves like restoring an unread item; it does not erase the review-history event or alter the original submission.

No customer communication is sent for New → In review or In review → New.

### 3.5 Communication principle

The customer is contacted when:

- the platform confirms receipt;
- the customer must provide information or make a decision;
- a confirmed outcome affects the customer.

Purely internal processing changes do not create customer messages.

### 3.6 Original submission

The original submitted values remain preserved as an immutable snapshot.

Later clarification, corrections, operational decisions and Visit information are appended or linked. They do not overwrite what the customer originally submitted.

## 4. Functional narrative

### Step 1 — Customer starts the request

The customer enters from a service page or general service-request action.

The experience explains that the person is sending a request for review, not booking a confirmed Visit.

No Service Request exists yet and no account is required.

### Step 2 — Customer describes the service need

The selected service determines which service-specific questions are shown.

The customer provides enough information for the company to understand the initial need. The interface may explain that exact technical knowledge is not required and that the company can request clarification later.

Images appear only when the service configuration enables them.

### Step 3 — Customer provides the service location

The customer provides the address where the service or Visit would take place.

At this point the location belongs to the request. It is not automatically a reusable or verified service-location profile.

### Step 4 — Customer provides contact information

The customer provides:

- name;
- email;
- optional phone when the frontend projection exposes it.

The interface states that phone is optional.

### Step 5 — Customer provides a Visit preference

The customer provides a preferred date and time window.

The interface explicitly explains that this is a preference and remains unconfirmed until the company reviews it.

### Step 6 — Customer reviews and submits

The customer sees a review containing:

- selected service and description;
- request-scoped location;
- contact information;
- Visit preference;
- enabled image attachments.

The customer may correct the information before choosing **Send request**.

The review reiterates that the requested date is not yet confirmed.

### Step 7 — Platform validates and creates the Service Request

During submission, the experience communicates that the request is being sent. This document requires understandable progress feedback but does not prescribe a spinner, button animation or component implementation.

The platform validates the required information for the selected service.

On success, it creates one canonical Service Request, preserves the original snapshot and sets the current state to New.

### Step 8 — Customer receives confirmation of receipt

The customer-facing result explains:

- that the request was received;
- that the company will review it;
- that the requested date is still unconfirmed;
- the request reference;
- the email address used for communication.

The platform sends a receipt email only after canonical request creation succeeds.

#### Receipt email purpose

The email confirms receipt and explains the next step. It does not ask the customer to act.

#### Required meaning

- The Service Request exists.
- The company has not yet confirmed the Visit.
- The customer will be contacted only when action or confirmed information is available.

### Step 9 — Company sees the New request

The Service Request becomes visible in the tenant-scoped operational workspace.

The company can inspect:

- the preserved submission;
- contact information;
- request-scoped location;
- Visit preference;
- images when present;
- reference and creation time.

The company receives the configured internal notification. Whether this uses in-app notification, operational email or both is tenant/communication configuration and does not change the flow meaning.

### Step 10 — First administrator opens the request

The deliberate opening changes the current state from New to In review and records actor and time.

The customer is not notified.

The administrator may return it to New when another operator should discover and review it. This action does not undo history.

### Step 11 — Company validates the requested Visit time

In this happy path:

- the service need is understandable;
- the location is usable;
- no clarification is necessary;
- the preferred date and time can be accepted.

The administrator prepares the Visit transition using the agreed purpose, location, date and time.

No Visit-confirmation email is sent yet.

### Step 12 — Administrator explicitly authorizes Visit creation

Before the transition, the administrator reviews the handoff information and chooses an explicit action such as **Create Visit**.

The interface explains that success will create and link the Visit and then communicate confirmation to the customer.

### Step 13 — Platform creates and links Visit

The platform attempts one controlled Visit transition.

While it is in progress, the administrator receives understandable progress feedback and must not be encouraged to repeat the action.

A positive outcome requires both:

1. one Visit is created;
2. that Visit is linked to the originating Service Request.

The Service Request remains authoritative and active until both conditions succeed.

Failure and retry behavior belong to SCN-REQ-009 and are not defined by this happy path.

### Step 14 — Administrator sees successful handoff

After successful creation and linking, the administrator sees that:

- the Visit exists;
- it is linked to the correct Service Request;
- normal Service Request processing has ended;
- customer confirmation will be or has been sent according to the communication outcome.

Visit becomes authoritative for later Visit organization and information collection.

### Step 15 — Customer receives Visit confirmation

The platform sends the Visit-confirmation message only after successful creation and linking.

The message communicates:

- that the Visit is confirmed;
- service or Visit purpose;
- date;
- time or time window;
- location;
- what the customer should expect next;
- the supported channel for communicating a change.

The exact change, cancellation and rescheduling behavior belongs to the Visit domain and is not completed by this document.

## 5. Required product feedback moments

The flow requires meaningful feedback at these transitions without prescribing detailed component states:

1. request submission is in progress;
2. request creation succeeded;
3. request is visible as New;
4. request is In review after deliberate opening;
5. Visit creation is in progress;
6. Visit creation and linking succeeded.

Detailed control-level loading, disabled, hover and animation behavior will be derived during interaction and visual design.

## 6. Communication matrix

| Event | Customer-facing application | Customer email | Company surface |
|---|---|---|---|
| Request created | Receipt confirmation | Required | New request visible and configured notification |
| Request opened | No message | No | State becomes In review; actor/time recorded |
| Request returned to New | No message | No | State becomes New; history preserved |
| Preferred time accepted internally | No message yet | No | Visit handoff becomes available |
| Visit created and linked | Visit confirmation where relevant | Required | Successful handoff confirmation |

## 7. Visit completion relationship

This document creates Visit but does not define the complete Visit workflow.

The future Visit domain may use configurable required objectives such as:

- verifying customer information;
- establishing or updating reusable location information;
- collecting measurements, images or observations;
- completing tenant/service-specific checks;
- recording the Visit conclusion and next step.

A Visit should be considered complete when its required objectives for that Visit type have been fulfilled or explicitly resolved and the outcome has been recorded. It should not depend on a universal, undefined idea that every possible profile field is complete.

## 8. Deferred decisions

The following remain intentionally deferred:

- tenant/service rules that may require phone;
- service-specific question sets;
- image count, type, size and validation;
- exact internal notification channels;
- exact wording and visual treatment of progress/success feedback;
- secure change/cancellation behavior after Visit confirmation;
- Visit objectives and completion contract;
- technical APIs, persistence, permissions, concurrency and email-delivery contracts;
- responsive Figma representation and reusable component extraction.

## 9. Downstream sequence

This document establishes functional product meaning only.

After all Service Request scenarios are reviewed:

1. create the screen/state inventory;
2. define how the flows are represented in Figma;
3. review responsive and accessibility behavior;
4. derive the minimum reusable components;
5. reconcile the visual result with frontend, backend, persistence, permissions, concurrency and communication boundaries;
6. create bounded implementation handoff documents;
7. authorize implementation separately.

No later artifact may silently change the meanings established here. A conflict must return to product analysis and be resolved explicitly.
