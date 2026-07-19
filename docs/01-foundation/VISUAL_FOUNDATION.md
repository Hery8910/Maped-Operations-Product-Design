# Visual Foundation

## Purpose

This document defines the visual direction of the Maped Solutions operational product without freezing a final component library before domain solutions are validated.

The visual system should support clarity, trust, repeated use and tenant adaptation.

---

## Product Identity and Tenant Identity

The operational product should distinguish between:

### Product identity

Shared interaction and visual behavior such as:

- hierarchy;
- density;
- spacing logic;
- state communication;
- action emphasis;
- feedback semantics;
- surface relationships;
- focus behavior;
- component behavior.

### Tenant identity

Legitimate configurable expression such as:

- logo;
- selected brand colors within safe constraints;
- company name;
- public-facing imagery;
- tenant content.

Tenant branding must not break status meaning, focus visibility or operational hierarchy.

### MVP tenant customization policy

All tenants share the application shell, layout, components, responsive behavior
and interaction patterns. The MVP permits only tenant name, logo, approved brand
colors, visible modules, and authorized vocabulary/configuration. Tenant-specific
layouts are not permitted. Semantic success, warning and error colors are product
tokens, never tenant branding tokens.

---

## Dashboard Visual Direction

The operational dashboard should feel:

- calm;
- precise;
- modern;
- approachable;
- trustworthy;
- suitable for long sessions.

It should avoid:

- excessive decorative glass effects that reduce hierarchy;
- marketing-style hero composition in operational views;
- unnecessary gradients behind dense information;
- color as the only signal of status;
- every card appearing equally elevated or important;
- ornamental motion in repeated workflows.

---

## Visual Hierarchy

A page should make the following levels understandable:

1. current domain and page context;
2. primary operational objective;
3. high-value summary or action region;
4. primary working surface;
5. selected or contextual detail;
6. secondary metadata and optional detail.

Hierarchy should not depend only on font size.

Use combinations of:

- placement;
- spacing;
- surface relationship;
- typography;
- emphasis;
- grouping.

---

## Semantic Token Categories

The product should use semantic tokens rather than direct color values in component decisions.

Expected categories include:

### Surfaces

- application background;
- primary surface;
- secondary surface;
- raised surface;
- interactive surface;
- selected surface;
- overlay backdrop.

### Text

- primary;
- secondary;
- muted;
- inverse;
- disabled.

### Borders and focus

- subtle border;
- strong border;
- interactive border;
- focus indicator.

### Actions

- primary action;
- secondary action;
- quiet action;
- destructive action.

### Feedback

- information;
- success;
- warning;
- error;
- attention.

Tokens should be validated separately in light and dark themes.

---

## Color Use

Color should communicate meaning intentionally.

Rules:

- primary brand/action color should not also carry unrelated status meaning;
- warning and error should remain distinguishable from selection;
- selected state should remain understandable without relying on color alone;
- badges should use text and structure in addition to color;
- tenant brand configuration must operate within product-defined accessibility constraints.

---

## Typography

Operational typography should prioritize:

- scanning;
- label clarity;
- numeric readability;
- status legibility;
- localization resilience.

Define semantic roles such as:

- page title;
- section title;
- entity title;
- body;
- label;
- metadata;
- status text;
- control text.

Do not create a unique type style for every component.

---

## Spacing

Spacing should express relationship.

Use tighter spacing for:

- label/value pairs;
- compact metadata;
- related controls.

Use larger spacing for:

- domain sections;
- task transitions;
- independent groups.

Information density should be deliberate. More empty space is not automatically more usable in operational software.

---

## Surfaces and Elevation

Elevation should represent relationship or interaction state.

Use elevation sparingly for:

- overlays;
- floating menus;
- modals;
- inspectors when visual separation is needed.

Do not make every content group a raised card.

A flat grouped surface may communicate hierarchy more clearly than nested cards.

---

## Status and Badge System

A shared status system should only be extracted after domain statuses are compared.

Before extraction, define for each domain:

- status meaning;
- severity or attention relationship;
- available actions;
- whether the status is persistent or temporary.

Visually similar badges do not prove semantic equivalence.

---

## Light and Dark Themes

Both themes are first-class requirements.

Each theme must preserve:

- hierarchy;
- surface distinction;
- focus visibility;
- text readability;
- selected state;
- disabled state;
- status differentiation;
- long-session comfort.

Components should be designed with semantic tokens from the beginning.

---

## Pattern Extraction Rule

The repository should not create a complete visual design system before solving real domains.

The Customers reference domain should be used to validate candidates such as:

- application shell;
- summary region;
- directory item;
- filter control;
- inspector shell;
- contextual section;
- status treatment;
- feedback layer;
- modal layer.

Only validated behavior should be promoted to shared patterns.
