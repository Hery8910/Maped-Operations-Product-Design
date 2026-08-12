# SCN-REQ-005 — Alternative Visit date proposal

**Status:** REVIEWED DRAFT — awaiting final repository approval  
**Scope:** Service Requests customer date-decision behavior  
**Documented:** 2026-08-05  
**Authority:** Functional product definition only  
**Does not authorize:** Figma production, frontend implementation, backend contracts, scheduling algorithms, persistence changes, email HTML, deployment or tenant-specific configuration

## 1. Purpose

This flow defines the case in which a Service Request contains a customer Visit preference that cannot be confirmed and the company proposes another date and time.

The normal request intake should already use calculated availability. This recovery flow still exists for operational changes, assignment errors, duration mismatches, stale availability or another legitimate reason discovered during review.

The flow allows the customer to either:

1. accept the company proposal; or
2. return only to the Visit-date selection step and submit another available preference.

The second outcome does not end the scenario. It returns responsibility to the company and may begin another date-negotiation round.

The customer does not repeat the complete Service Request.

## 2. Relationship with other scenarios

This scenario shares a customer-action pattern with SCN-REQ-002:

```text
Company requests a customer decision
→ customer receives a secure link
→ customer responds in the platform
→ responsibility returns to the appropriate actor
```

Clarification and date negotiation remain separate scenarios because their meanings, response controls and completion conditions differ.

No reusable interaction component is established until both scenarios are visually and technically reviewed.

## 3. Initial condition

The Service Request is **In review** and preserves:

- the customer's original Visit preference;
- the calculated availability context used during intake, when available;
- the request-scoped service location;
- the service need and relevant operational information.

The original preference is never overwritten.

The administrator determines that the requested date cannot be confirmed.

## 4. Company action

The administrator chooses **Propose another date**.

The experience shows the original customer preference and allows the administrator to select an alternative from current calculated availability.

The administrator may include a short customer-facing explanation. A detailed internal operational reason is not required.

The proposed date may depend on:

- company opening hours for the specific day;
- required operational role;
- a specific worker when assignment is known;
- absences and time off;
- existing Visits and temporary reservations;
- Visit duration and required preparation or travel margins.

This flow consumes availability results. It does not define the Scheduling calculation algorithm.

## 5. Slot meaning

The initial product hypothesis may present approximately one-hour selectable slots.

A slot represents a selectable start or time window. It does not prove that every Visit lasts exactly one hour.

Scheduling must validate enough continuous capacity for the complete required duration and any configured margins.

Exact slot generation, duration rules, breaks, travel, worker combinations and daily working-hour variations remain Scheduling-domain work.

## 6. Temporary reservation

When the company sends a proposal, the proposed availability is temporarily reserved for that Service Request.

While active:

- the slot is not offered to another incompatible request;
- the reservation is linked to the specific proposal;
- no Visit exists yet;
- the customer may accept while the reservation remains valid.

### 6.1 Tenant-configurable reservation period

The core product does not fix 48 hours as a universal value.

The company may configure a proposal-reservation period appropriate to its operation. Examples may include 24 hours, 48 hours or multiple days.

A 48-hour period is an initial product reference, not a binding core rule.

The configuration must remain within product-supported minimum and maximum bounds to be defined during Scheduling analysis. Unlimited reservations are not supported.

### 6.2 Tenant-configurable minimum confirmation lead time

The company may configure how far before the proposed Visit a customer must confirm.

Examples may include 8, 12 or 24 hours, depending on operational preparation, travel, staffing and service needs.

The exact value may be company-wide or, if later evidence justifies it, service-specific. This document does not authorize worker-by-worker arbitrary policy.

### 6.3 Effective reservation deadline

The effective reservation deadline is the earlier of:

1. proposal creation time plus the configured reservation period; and
2. proposed Visit start minus the configured minimum confirmation lead time.

Therefore a proposal for the next day may remain valid for less than the configured general reservation period.

The customer must be shown the exact expiration date and time, not only a generic duration.

Required meaning:

> This date is reserved temporarily until [exact date and time]. If it is not confirmed before then, it becomes available for other requests.

## 7. Review and send

Before sending, the administrator reviews:

- original customer preference;
- proposed date and time;
- relevant operational assignment context;
- effective reservation deadline;
- optional customer-facing explanation.

The action **Send date proposal** records the proposal, activates the temporary reservation and changes the Service Request to **Awaiting customer date decision**.

The proposal and reservation history record actor and time.

## 8. Customer communication

The customer receives an email explaining:

- that the original preference cannot be confirmed;
- the alternative date and time;
- the exact reservation deadline;
- that the slot will be released if not accepted in time;
- that the customer may accept or choose another available date.

One secure action link opens the customer decision page.

The email does not contain two competing direct-action links.

## 9. Customer decision page

The page displays:

- request reference;
- service context;
- original preference;
- company proposal;
- exact reservation deadline;
- optional explanation.

The primary actions are:

- **Accept this date**;
- **Choose another date**.

The customer does not return to the complete Service Request form.

## 10. Branch A — Customer accepts

Before acceptance, the platform revalidates that:

- the proposal is active;
- the reservation has not expired;
- the slot is still linked to this proposal;
- the Service Request remains active;
- no Visit already exists for this successful handoff;
- the scheduling constraints still permit the Visit.

The company proposal is prior authorization to create Visit if the customer accepts the exact proposed date.

On successful acceptance, the platform:

1. records the customer decision;
2. creates one Visit;
3. links it to the Service Request;
4. consumes the temporary reservation;
5. completes the Service Request positively;
6. presents and sends Visit confirmation.

The customer is not returned to the administrator merely to approve the same company-created proposal again.

## 11. Branch B — Customer chooses another date

The customer opens only the Visit-date selection section.

The calendar shows options currently calculated as available for this Service Request. It does not expose private worker or other-customer information.

The customer selects a new date and slot and submits it as a **new preference**, not as a confirmed Visit.

On successful submission:

- the previous proposal reservation is released;
- the previous proposal remains preserved in history;
- the new preference is appended to history and becomes the current customer preference for review;
- the Service Request returns to **In review**;
- responsibility returns to the company;
- the company is notified;
- no Visit is created automatically under this version of the flow.

The company may then:

- accept the exact new preference and create Visit after final revalidation;
- determine that it cannot confirm the preference and send another company proposal;
- resolve another operational issue;
- cancel or close the request through an approved flow.

Automatic confirmation of a customer-selected alternative may be reconsidered only after Scheduling reliability and authorization behavior are explicitly validated.

## 12. Repeatable date-negotiation cycle

Date negotiation is a repeatable sequence, not a one-time alternative branch.

```text
Company proposes a date
→ customer reviews the proposal
    → accepts the exact proposal
        → final availability revalidation
        → Visit is created and linked
    → or chooses another available date
        → new customer preference is recorded
        → Service Request returns to In review
        → company reviews the new preference
            → accepts it and creates Visit
            → or sends another company proposal
                → a new customer-decision round begins
```

Each round is an immutable historical unit. It preserves:

- the customer preference that existed when the round began;
- the company's proposed date;
- the administrator who created the proposal;
- the reservation deadline;
- the customer decision;
- creation and response times;
- the round outcome, such as accepted, replaced, expired, withdrawn or answered with another preference.

A previous round is not edited to represent the next one.

At any moment:

- only one company date proposal may be active for the Service Request;
- only one compatible temporary reservation may be associated with that active proposal;
- sending a replacement proposal invalidates the previous active proposal and releases its reservation;
- all prior preferences and proposals remain visible in history;
- the customer sees the current actionable round, not a mutable reconstruction of earlier communication.

A new company proposal creates a new secure customer-action context. A previous consumed, replaced, withdrawn or expired proposal must not become active again through silent editing.

The cycle may repeat until one of the following controlled outcomes occurs:

1. Visit is created and linked successfully;
2. the Service Request is cancelled through an approved cancellation flow;
3. the Service Request is closed through another explicitly defined product outcome.

The product must not impose an arbitrary number of rounds in this document. Whether later evidence justifies reminders, escalation, inactivity handling or a tenant-configurable operational limit remains separate analysis.

### 12.1 Availability question deferred to Scheduling

This document does not decide whether a new date selected by the customer receives a short temporary hold while the company reviews it.

That decision must be analyzed with Scheduling because it affects:

- whether the same slot may be offered elsewhere before company review;
- how long a customer-selected preference could be held;
- whether such a hold competes with company-authorized proposals;
- stale availability and concurrent selections;
- release and conflict behavior.

Until that analysis is approved, a customer-selected alternative is a preference requiring company review, not a confirmed Visit and not automatically equivalent to the temporary reservation created by a company proposal.

## 13. Expiration behavior

When the effective reservation deadline is reached without acceptance:

1. the reservation is released automatically;
2. the slot returns to normal availability calculation;
3. the proposal becomes expired;
4. the customer can no longer accept that proposal;
5. the secure page may remain usable while its separate link validity remains active;
6. the page offers available alternatives.

The Service Request may remain **Awaiting customer date decision** while the customer can still choose another date. The expired proposal condition must be visible separately.

No automatic expiration email is required for the initial version because the original proposal email already communicates the exact deadline and consequence.

A configurable reminder before expiration remains deferred Communication-domain work.

## 14. Secure-link validity

The secure response link and the slot reservation have separate lifetimes.

The response link follows the product rule established for customer-action links: a maximum initial validity of 14 calendar days, subject to invalidation on response, withdrawal, replacement, cancellation or renewal.

The slot may expire earlier while the link continues to open the page and offer another date.

## 15. Concurrent or last-moment acceptance

The platform must revalidate at acceptance time.

If the reservation expires or becomes invalid immediately before acceptance, the product must not create an unprotected Visit.

The customer receives an understandable explanation and can choose another available date.

This document establishes product behavior but does not prescribe transaction, locking or persistence architecture.

## 16. Withdrawal and replacement

A sent proposal is not edited silently.

The company may:

- withdraw it when no replacement is needed; or
- replace it with a new immutable proposal.

Withdrawal or replacement:

- invalidates acceptance of the previous proposal;
- releases its reservation;
- preserves history;
- communicates a correction to the customer when necessary.

Internal notes do not alter customer-facing proposals.

## 17. Configuration boundary

The following are legitimate tenant configuration candidates:

- default proposal-reservation period;
- minimum confirmation lead time;
- reminder policy when later authorized;
- supported business hours and operational resources.

Configuration must not permit:

- confirmation after the effective deadline;
- overlapping incompatible reservations;
- indefinite holds;
- silent changes to a proposal already communicated;
- bypassing final availability validation.

Exact configuration scopes, defaults, allowed ranges and precedence belong to the later Scheduling analysis.

## 18. Required feedback moments

The flow requires understandable feedback for:

1. company proposal preparation;
2. proposal sending;
3. active reservation and exact expiration;
4. customer acceptance in progress;
5. Visit creation success;
6. proposal expired;
7. alternative date selection;
8. new preference submission;
9. return of responsibility to the company;
10. creation of another negotiation round;
11. last-moment availability conflict.

Detailed visual controls remain deferred to interaction design and Figma.

## 19. Deferred decisions

The following remain intentionally deferred:

- Scheduling availability algorithm;
- whether and how a customer-selected preference receives a temporary hold;
- allowed minimum/maximum reservation durations;
- whether configuration is company-wide or service-specific;
- exact minimum lead-time defaults and limits;
- slot granularity and Visit duration mapping;
- travel, buffer and multi-worker rules;
- reminder, escalation and inactivity policy;
- exact calendar responsive behavior;
- technical concurrency, transactions and persistence;
- Figma representation and reusable component extraction.

## 20. Downstream sequence

After all Service Request scenarios are reviewed:

1. analyze Scheduling and calendar rules separately, including customer-selected preference holds;
2. create the Service Requests screen/state inventory;
3. represent approved flows in Figma;
4. validate responsive and accessibility behavior;
5. extract shared customer-action patterns only from reviewed evidence;
6. reconcile frontend, backend, communication and scheduling contracts;
7. authorize implementation separately.
