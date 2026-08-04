# SCN-REQ-002 — Service Request clarification cycle

**Status:** REVIEWED DRAFT — awaiting final repository approval  
**Scope:** Service Requests core product behavior  
**Documented:** 2026-08-04  
**Authority:** Functional product definition only  
**Does not authorize:** Figma production, frontend implementation, backend contracts, persistence changes, email HTML, deployment or tenant-specific configuration

## 1. Purpose

This flow defines how a company requests missing information from a customer while reviewing an existing Service Request.

The request remains active. It is not rejected or cancelled. Review is temporarily blocked until the customer responds or the clarification is withdrawn.

## 2. Relationship to other flows

Clarification and alternative Visit-date proposals share a reusable interaction pattern:

```text
Company creates one structured customer action
        ↓
Customer receives a secure link
        ↓
Customer reviews context and responds
        ↓
Responsibility returns to the company
```

They remain separate product scenarios because their meaning and valid responses differ:

- clarification asks for missing information and may allow text or images;
- a Visit-date proposal asks the customer to accept, reject or request another alternative.

A shared component or technical abstraction must not be established until both scenarios have been reviewed independently.

## 3. Starting condition

The Service Request exists and is **In review**.

The company can inspect the immutable original submission and determines that one or more related details are missing or unclear.

The missing information prevents safe continuation toward Visit creation.

## 4. Create a clarification round

An authorized administrator chooses **Request clarification**.

The administrator defines:

- one clear question or a small set of closely related points;
- an optional explanation of why the information is needed;
- whether images are unavailable, optional or required for this round, within the capability enabled by the selected service.

The action review explains that sending the clarification will move the request into **Awaiting customer clarification**.

## 5. Persist and communicate the clarification

On success, the platform:

- preserves the original Service Request unchanged;
- creates one immutable clarification round;
- records the author and time;
- stores the question, explanation and image requirement;
- changes the current request state to **Awaiting customer clarification**;
- creates one secure customer-response capability;
- sends the customer notification only after the round and response capability exist.

The customer email explains:

- the Service Request remains active;
- what information is missing;
- why it is needed when an explanation exists;
- whether images are expected;
- that the request has not been rejected or cancelled;
- how to open the secure response page.

Direct email reply is not the authoritative response channel in this version. The official response is submitted through the platform so it can be linked to the correct request and round.

## 6. Secure response-link validity

The response link is valid for a maximum of **14 calendar days** from issuance and only while that exact clarification round remains active.

The link becomes invalid immediately when any of the following occurs:

- the customer submits the response successfully;
- the company withdraws the clarification;
- the clarification is superseded by a corrected round;
- the Service Request is cancelled or otherwise leaves a state in which the response remains meaningful;
- a newer link is issued for the same active round.

The 14-day limit balances customer convenience with the risk of old links remaining usable after operational context has changed.

If the clarification is still active after expiry, an authorized administrator may choose **Resend clarification**. Resend issues a new secure link, invalidates the previous link and preserves the same clarification round and history.

The expired-link page must not expose sensitive request information. It explains that the link can no longer be used and instructs the customer to contact the company or use a newly issued message.

The exact credential format, token storage, replay protection and authorization contract are deferred to backend/security design.

## 7. Customer response page

The secure page shows only the context required to complete the task:

- Service Request reference;
- service name;
- active clarification question;
- optional explanation;
- response field;
- image control only when enabled for the service and requested for this round;
- clear indication of whether images are optional or required.

The page explains that the original request is not being overwritten.

The customer may edit the draft before submission. After successful submission, the response becomes part of the immutable history and cannot be edited in place.

## 8. Submit the customer response

On success, the platform:

- stores one response linked to the active clarification round;
- stores permitted images linked to that response;
- records submission time;
- marks the round as answered;
- invalidates its secure link;
- returns the Service Request to **In review**;
- notifies the company that action is pending again.

The customer sees an immediate confirmation that the response was received and that review will continue.

A second customer email confirming submission is not required in this version because the page already provides authoritative immediate feedback.

## 9. Further clarification

A clarification is a structured round, not an open-ended chat.

If the response remains insufficient, the company creates a new round. Previous questions and responses remain unchanged and visible in chronological history.

## 10. Internal notes

An administrator may add an internal note to the Service Request or clarification context when the future Notes capability authorizes it.

An internal note:

- is visible only to authorized company operators;
- does not change the customer-visible question;
- does not correct an email already sent;
- does not withdraw or resolve the clarification;
- must not be used as a substitute for customer communication.

This flow records the product distinction but does not authorize a complete Notes domain or component.

## 11. Clarification sent by mistake

The original question and sent communication must never be silently edited after dispatch.

The company uses one of two explicit outcomes.

### 11.1 Withdraw clarification

Use this when no customer response is needed.

The platform:

- marks the round as withdrawn;
- records who withdrew it, when and an optional internal reason;
- invalidates the secure link immediately;
- returns the Service Request to **In review**;
- sends a short customer correction because the original email already requested action.

Required customer meaning:

> You no longer need to respond to the previous clarification request. Havenova will continue reviewing your Service Request.

The withdrawn question remains in history and is clearly marked as withdrawn.

### 11.2 Replace with a corrected clarification

Use this when information is still required but the original question was incorrect or incomplete.

The platform:

- marks the original round as superseded;
- invalidates its link;
- creates a new clarification round;
- links the replacement to the superseded round;
- keeps the Service Request in **Awaiting customer clarification**;
- sends a new customer message explaining that the previous request was replaced and presenting the corrected question.

The corrected round is a new immutable event. The original round is never overwritten.

## 12. Communication matrix

| Event | Customer-facing application | Customer email | Company surface |
|---|---|---|---|
| Clarification created | No immediate customer page | Required | Awaiting customer clarification; round visible |
| Customer opens active link | Secure response page | No | No state change |
| Customer responds | Submission confirmation | Not required | In review; response notification |
| Link expires | Safe expired-link explanation | No automatic email | Resend available while round remains active |
| Clarification withdrawn | Old link invalid | Required correction | In review; withdrawal preserved |
| Clarification replaced | New link serves corrected round | Required replacement message | Awaiting customer clarification; both rounds preserved |

## 13. Required product feedback moments

This flow requires meaningful feedback for:

1. clarification creation in progress;
2. clarification created and customer notification initiated;
3. customer response submission in progress;
4. response received;
5. link expired or invalid;
6. clarification withdrawn;
7. clarification replaced;
8. resend completed or failed.

The document does not prescribe spinner, animation or control-level visual behavior.

## 14. Deferred decisions

The following remain deferred:

- reminder cadence before link expiry;
- automatic request closure or escalation after prolonged silence;
- exact file limits, formats and image security controls;
- email HTML and final copy;
- Notes-domain implementation;
- exact permissions for withdraw, replace and resend;
- token and replay-protection implementation;
- concurrency behavior when customer and administrator act simultaneously;
- Figma representation and reusable component extraction.

## 15. Downstream sequence

After all Service Request scenarios are reviewed:

1. compare clarification and Visit-date proposal behavior;
2. identify the validated shared customer-action pattern;
3. create the screen/state inventory;
4. define the Figma representation;
5. derive frontend, backend, security and communication handoff requirements;
6. authorize implementation separately.

No shared abstraction may erase the distinct business meaning of clarification and date negotiation.
