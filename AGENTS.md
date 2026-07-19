# AGENTS.md

## Purpose

This repository is a product-definition and visual-prototype workspace for the Maped Solutions operational platform.

Work in this repository must preserve product reasoning, not merely reproduce existing production code.

The goal is to create reviewable product definitions and prototypes that can later guide real frontend and backend implementation without forcing future teams to rediscover why decisions were made.

---

## Authority Order

Use this hierarchy when sources disagree:

1. `docs/01-foundation/PRODUCT_PRINCIPLES.md`
2. `docs/01-foundation/PRODUCT_MAP.md` and relevant domain definitions
3. Relevant `FLOWS.md`, `STATES_AND_ACTIONS.md`, and explicit business rules
4. `PRODUCT_NOTES.md`
5. Approved prototype behavior
6. `HANDOFF.md`
7. Existing production implementation

Audits are evidence sources, not product authority.

Existing frontend routes, backend endpoints, components, fields, schemas, and historical behaviors may inform analysis but do not automatically define the future product.

A model, enum, route placeholder, or prepared contract does not establish
an available product capability.

Capabilities marked PREPARED or PARTIAL in audits must not be represented
as fully operational product behavior without explicit product analysis.

---

## Required Reading Before Product-Facing Work

Before changing a product-facing surface:

1. Read `README.md`.
2. Read this `AGENTS.md`.
3. Read the relevant documents in `docs/01-foundation/`.
4. Read all documents for the affected domain.
5. Read relevant audits only as evidence.
6. Inspect existing prototype and implementation files before editing them.

For cross-domain work, also read the domain definitions that own the related data or workflow.

Do not begin from component implementation alone.

---

## Product Classification

Before adding a feature, field, workflow, configuration option, or reusable pattern, determine whether it is:

- Core Product;
- Tenant Configuration;
- Specific Extension;
- unresolved and still requiring product analysis.

Do not make something configurable merely because variation is possible.

Do not promote a tenant-specific requirement into global product behavior without documented justification.

---

## Flow-First Rule

Pages are not only visual layouts.

Every meaningful interaction must be traceable to a documented flow.

Before implementing an asynchronous, consequential, destructive, or state-changing interaction:

1. Find the relevant flow in the domain `FLOWS.md`.
2. Verify actions and transitions in `STATES_AND_ACTIONS.md`.
3. Verify UX reasoning in `PRODUCT_NOTES.md`.
4. Verify implementation obligations in `HANDOFF.md`.
5. Identify missing product decisions before inventing behavior.

For each implemented flow, the prototype or handoff must make the following understandable:

- entry condition;
- user intent;
- action sequence;
- validation behavior;
- pending behavior;
- duplicate-action prevention when required;
- success outcome;
- conflict outcomes;
- recoverable error outcome;
- unrecoverable or permission outcome when relevant;
- effect on surrounding data;
- preserved user context;
- next available action;
- user-facing message meaning;
- feedback location;
- rationale for the feedback pattern.

---

## Feedback and Message Design

Do not use a generic Alert, toast, modal, banner, or blocking component by default.

Choose feedback according to the job it performs.

Default reasoning guidance:

- Field validation belongs with the affected field when the next action is correction.
- Submission progress should usually be visible in the triggering control and/or the local submitting region.
- A routine successful local action should usually confirm success near the changed context when the result is already visible there.
- A contextual recoverable error should preserve the current task and place recovery close to the failed action.
- Destructive or wide-scope consequences may justify confirmation that interrupts the flow.
- Global transient feedback is appropriate only when the event is not adequately represented by the changed local state or when the user may have changed context.

These are decision defaults, not universal component rules.

Do not show a blocking success state simply because a reusable success component exists.

Do not show a global loading alert when a button state or local region communicates progress more clearly.

Do not expose raw backend errors, codes, or technical reasons as primary user-facing content.

For non-obvious feedback decisions, document the reasoning in the relevant domain document or `DECISIONS_LOG.md`.

---

## Message Requirements

User-facing messages must explain product meaning.

Messages should answer, when relevant:

- what happened;
- whether the requested action completed;
- what did not happen;
- whether entered work was preserved;
- what the user can do next;
- whether retry is safe;
- whether another actor or support path is required.

Do not use generic messages such as `Something went wrong` when the product can distinguish a meaningful condition.

Do not invent exact business-policy promises that are not supported by product documentation.

---

## Prototype Role

The prototype exists to test and communicate product decisions.

It may simulate:

- navigation;
- selection;
- loading;
- refresh;
- success;
- validation;
- conflict;
- recoverable failure;
- destructive confirmation;
- theme changes;
- responsive transformations.

It must not become a second production application.

Unless the task explicitly requires otherwise, do not add:

- real authentication;
- database access;
- production API integration;
- unnecessary routing infrastructure;
- unnecessary framework architecture;
- speculative backend contracts.

Prefer the simplest implementation that makes the product behavior reviewable.

Simulation states must be intentionally reachable so that screenshots and visual review can inspect them.

---

## Visual System Rules

Use semantic design tokens rather than direct component-specific color decisions.

Both light and dark themes are first-class requirements.

The visual direction should be:

- calm;
- precise;
- modern;
- approachable;
- trustworthy;
- appropriate for repeated operational use.

Avoid:

- decorative dashboard styling without product purpose;
- excessive gradients or glass effects;
- every information group becoming a raised card;
- color as the only status signal;
- tenant branding that damages hierarchy or accessibility.

Establish hierarchy through placement, spacing, grouping, typography, surface relationship, and emphasis.

Do not create a complete theoretical design system before validating real product problems.

Extract reusable patterns only after the relevant domain solution has been reviewed.

---

## Responsive and Interaction Rules

Responsive behavior must preserve the task, not merely compress the desktop layout.

Document and preserve:

- current domain;
- selected entity;
- query;
- filters;
- loaded list context;
- return path;
- useful scroll/focus context when feasible.

For master-detail work, narrow layouts may use a focused detail view, but returning must restore useful directory context.

Do not stack desktop list and detail vertically by default when that breaks the task relationship.

Primary actions must not depend on hover.

---

## Accessibility and Semantics

Accessibility is part of the interaction architecture.

Preserve:

- meaningful landmarks;
- correct heading hierarchy;
- button vs link semantics;
- keyboard reachability;
- visible focus in both themes;
- understandable selected/current state;
- focus behavior for dialogs and focused mobile views;
- distinguishable loading, empty, no-results, and error states;
- status meaning that does not depend on color alone.

When a validation error requires field correction, do not move focus to a global alert unnecessarily.

---

## Decision Integrity

Do not silently resolve unresolved product questions.

When documentation is incomplete:

- implement only low-risk visual scaffolding that does not commit the product to a business rule;
- clearly mark simulated data and behavior;
- report the unresolved decision;
- update product documentation only when the task explicitly includes product-definition work.

When a consequential decision is made, preserve:

- context;
- evidence;
- decision;
- rationale;
- accepted trade-offs;
- reconsideration condition.

Use `docs/01-foundation/DECISIONS_LOG.md` for consequential cross-domain or long-lived decisions.

---

## Implementation Process

For non-trivial tasks:

1. Inspect the repository and relevant documentation.
2. State a concise implementation plan.
3. Implement the smallest coherent reviewable unit.
4. Keep product scope within the requested unit.
5. Make important states inspectable.
6. Validate interaction, responsive behavior, both themes, semantics, and available tests.
7. Report conflicts, assumptions, and unresolved questions.

Do not stop after planning unless the task explicitly asks for planning only.

Do not refactor unrelated areas merely because improvement opportunities are visible.

---

## Completion Report

At the end of a task, report:

- files created or changed;
- what product behavior is now reviewable;
- which states can be simulated and how;
- validations run;
- known limitations;
- documentation conflicts or unresolved product questions;
- any implementation decision that should be considered for documentation.

The completion report should help the next person review the work without reconstructing the implementation process.

# Historical task note — superseded

The following historical baseline task describes the former Users prototype. It
is retained as implementation history only and is not current product authority.
The active authority is `docs/02-domains/customers/`, with the separate
`invitations/` and `internal-notes/` capability packages. Do not use the
historical task below to reintroduce Users scope, modal invitation form, or
deferred behavior.

# Codex Task — Establish the First Reviewable Product Baseline (historical)

## Objective

Create the first coherent, reviewable visual and interaction baseline for the Maped Solutions operational product prototype.

This task is **not** to finish the Users domain and **not** to build a production dashboard.

The goal is to create a strong base from which we can evaluate the product globally:

- application structure;
- component placement;
- information hierarchy;
- working-area relationships;
- density;
- semantic color system;
- light and dark themes;
- responsive behavior;
- feedback placement;
- visual consistency;
- accessibility-relevant interaction behavior.

The result must be concrete enough to review through screenshots and interaction, but simple enough to remain a prototype.

---

## Read Before Editing

Before making changes:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read every document in `docs/01-foundation/`.
4. Read every document in `docs/02-domains/users/`.
5. Inspect the existing `prototype/` implementation and reuse useful structure where appropriate.
6. Read audits only as evidence if they are present and relevant.

Treat product documentation as authority according to `AGENTS.md`.

Treat existing production implementation as evidence, not authority.

---

## First Step: Repository Analysis

Inspect the current repository and briefly identify:

- current prototype structure;
- existing reusable styles or scripts;
- what can be preserved;
- what should be simplified;
- any conflict between implementation and documentation;
- the smallest coherent implementation plan for this task.

Then continue with implementation in the same task.

Do not stop after analysis.

Do not ask for approval unless a genuine safety or access limitation prevents implementation.

---

## Scope

### 1. Establish the semantic visual foundation

Create or refine the prototype token system so that components use semantic tokens rather than scattered direct color values.

The baseline should cover at least:

- application background;
- primary surface;
- secondary surface;
- raised/overlay surface where necessary;
- interactive surface;
- selected surface;
- primary, secondary, muted, inverse, and disabled text;
- subtle and strong borders;
- interactive border;
- visible focus indicator;
- primary, secondary, quiet, and destructive actions;
- information, success, warning, error, and attention feedback.

Define real light and dark theme values.

Dark mode must not be implemented as simple inversion.

The two themes must preserve:

- hierarchy;
- readable text;
- surface separation;
- selected state;
- disabled state;
- status differentiation;
- visible focus;
- long-session comfort.

Do not create a giant theoretical design system. Create only what the current reviewable baseline needs.

---

### 2. Build the application shell

Create a coherent operational application shell that allows us to evaluate the global dashboard structure.

It should provide clear regions for:

- primary product navigation;
- current domain/page context;
- primary page objective;
- high-value summary or action region;
- main operational working area;
- contextual detail/inspector when relevant;
- global feedback only when truly appropriate.

Use the Users domain as the first reference surface.

Other domains may appear only as navigation context if already defined in `PRODUCT_MAP.md`.

Do not invent detailed pages or workflows for undocumented domains.

The shell should feel operational rather than marketing-oriented.

---

### 3. Create the first Users reference composition

Create a reviewable Users surface that lets us evaluate the global system before detailed refinement.

Include:

- Users page context and title;
- concise summary/action region;
- Invite Customer action;
- search;
- documented baseline filters;
- a directory containing representative users and invitations;
- clear user vs invitation distinction;
- selected state;
- attention state;
- an inspector shell;
- a useful first Overview composition;
- only documented contextual sections or placeholders that help evaluate structure without pretending unfinished product behavior is complete.

Use realistic demo content instead of lorem ipsum.

Do not dump every available field into the inspector.

The Overview should prioritize identity, access state, attention meaning, and useful relationship context according to `PRODUCT_NOTES.md`.

---

### 4. Implement one representative flow deeply enough to review feedback behavior

Use **Invite Customer** as the representative async flow.

The purpose is not backend integration. The purpose is to make the product flow visually reviewable.

Implement or simulate these states:

- idle;
- field validation failure;
- submitting/pending;
- invitation created successfully;
- existing account conflict;
- already-pending invitation conflict;
- delivery or service failure.

For every state, choose feedback placement intentionally.

Do not automatically use one generic Alert component for all states.

Follow `FLOWS.md`, `STATES_AND_ACTIONS.md`, `PRODUCT_NOTES.md`, `HANDOFF.md`, and the feedback rules in `AGENTS.md`.

Important review questions:

- Is pending state best communicated by the submit button, the form region, or both?
- Does success need to block the UI, or is a smaller contextual confirmation more appropriate because the directory state also changes?
- Should field validation remain local to fields?
- Where should conflict messages appear so the user understands what happened and what to do next?
- Does service failure preserve entered form data and provide safe recovery?

Use product language.

Do not expose raw technical codes.

After success, update the simulated directory and summary coherently enough that the result of the action is visible.

---

### 5. Make review states intentionally reachable

Provide a simple prototype/demo mechanism that lets reviewers inspect important states without a backend.

This may use the existing `demo.js` or the simplest equivalent already appropriate to the repository.

At minimum make it possible to review:

#### Users surface

- normal directory;
- selected user;
- selected invitation;
- requires-attention case;
- initial loading;
- refresh with existing content retained;
- true empty;
- no search results;
- filtered zero results;
- load failure.

#### Invite flow

- idle;
- validation error;
- pending;
- success;
- existing-account conflict;
- pending-invitation conflict;
- service failure.

Reviewer controls must not be confused with the product UI.

Keep them visually separate, easy to hide, or otherwise clearly marked as prototype-only tooling.

---

### 6. Responsive behavior

Implement the documented task-continuity model.

Desktop or wide layout may use:

```text
Directory | Inspector
```

Narrow layout should support:

```text
Directory
    ↓ select
Focused Detail
    ↓ back
Directory with context restored
```

Preserve when feasible:

- search query;
- active filter;
- selected relationship;
- useful list position/context;
- understandable return path.

Do not simply stack the full desktop directory above the inspector if that damages the working relationship.

Validate with longer German-style labels/content, not only short English text.

---

### 7. Interaction and accessibility baseline

Implement enough behavior to review:

- keyboard-reachable navigation and primary controls;
- visible focus in both themes;
- semantic page regions;
- understandable selected state;
- clear distinction between loading, empty, no-results, and failure;
- appropriate button/link semantics;
- modal/dialog focus behavior if a dialog is used;
- focus restoration after closing the invite surface where feasible;
- status meaning not dependent on color alone.

Do not add unnecessary complex widgets.

---

## Visual Direction

Use the documented direction:

- calm;
- precise;
- modern;
- approachable;
- trustworthy;
- comfortable for repeated operational use.

Avoid:

- excessive glass effects;
- decorative dashboard gradients;
- marketing-style hero sections;
- excessive card nesting;
- every block appearing equally elevated;
- color-only status communication;
- exaggerated animation.

Use spacing, grouping, typography, surfaces, and placement to create hierarchy.

The goal is not maximum visual novelty.

The goal is a coherent operational product that we can critique intelligently.

---

## Constraints

Do not implement:

- real authentication;
- real API calls;
- database access;
- production routing infrastructure unless already necessary in the existing prototype;
- speculative backend contracts;
- complete Requests workflow;
- complete Communication workflow;
- complete Notes workflow;
- unrelated domain pages;
- a large component library for hypothetical future needs.

Keep the prototype simple.

Prefer improving the current structure over replacing it with unnecessary architecture.

Do not silently change product documentation to match implementation convenience.

If documentation conflicts or a business rule is unresolved, report it instead of inventing a permanent answer.

---

## Validation

Before finishing:

1. Run the prototype using the repository's existing workflow.
2. Check for console errors.
3. Verify both light and dark themes.
4. Verify wide and narrow layouts.
5. Verify keyboard access for primary interactions.
6. Verify the Users directory/inspector relationship.
7. Verify mobile detail and return behavior.
8. Verify all required demo states are reachable.
9. Verify the Invite flow preserves form input on recoverable service failure.
10. Run any existing relevant tests or static checks.

Fix issues found during validation when they are within this task's scope.

---

## Completion Report

At the end, provide:

1. Files changed or created.
2. Brief explanation of the visual system established.
3. Shell structure implemented.
4. Users states that can be reviewed.
5. Invite-flow states that can be reviewed.
6. Exact way to switch demo states.
7. Validation commands run and their results.
8. Known limitations.
9. Documentation conflicts or unresolved product questions.
10. Recommended screenshot set for the visual review.

The final result should leave us with a stable base for the next phase: visual review through screenshots, followed by focused corrections and then deeper domain work.

ChatGPT Plus

Captura desde 2026-07-11 04-53-37.png
Ya la estructura esta mucho mejor lograda y considero que es buen punto de inicio, ya hay mas balance en la estructura y quite el estilo card que tenia el children que no sentia que correspondiera a la estructura, la apriencia de card enorme en un layout tan definido y estructurado no correspondia. Un punto que tambien quiero tocar es la implementacion ahora de Astro, que en realidad nos esta brindando la modularidad que necesitamos, pero no entiendo como funciona, parece que los archivos .astro son un compilado y para nada legibles, lo que provoca que cualquier cambio debe hacerse a travez de Codex, que no es la idea, no puedo usar a Codex cada vez que necesite corregir un espacio o un color. El proceso de trabajo que estamos siguiendo me parece perfecto, pero el maquetado es el que me parece todavia muy complejo, para poder hacer un cambio necesito 20 min y eso no va bien.

45s nachgedacht
Sí, Heri. Aquí creo que hay dos temas distintos, y en ambos coincido bastante contigo.

Primero: el layout ya está mucho mejor. Segundo: el problema que describes con Astro no debería existir, al menos no de esa manera. Astro no es el culpable directo; el problema parece ser cómo estamos usando Astro y cuánto hemos abstraído el prototipo.

Sobre el layout
Mi opinión sincera: este es el primer estado que veo como una base realmente aprovechable, no simplemente como otra variante que habrá que reconstruir.

Quitar el gran contenedor tipo card del children fue una buena decisión. Ahora existe una jerarquía más natural:

shell → contexto de página → resumen → superficie de trabajo

Eso se lee claramente en la captura.

También veo mejor equilibrio entre:

navegación lateral;

encabezado;

métricas;

directorio;

inspector.

No intenta ser raro, pero tampoco se siente como el típico dashboard construido colocando diez cards dentro de otras cards. Eso era precisamente lo que queríamos evitar.

Mi única advertencia visual por ahora sería no tomar decisiones fuertes sobre la columna derecha basándonos en el estado vacío. Ahora parece excesivamente vacía, pero necesitamos juzgarla con un usuario seleccionado y contenido real antes de tocar la proporción. El estado vacío no debe definir la arquitectura de la superficie de trabajo.

Sobre Astro: aquí sí cambiaría nuestra forma de trabajar
Un .astro no es un archivo compilado. El archivo fuente debería ser bastante legible: HTML, una sección opcional de JavaScript/TypeScript en el frontmatter y componentes. Astro describe sus componentes precisamente como plantillas HTML sin runtime obligatorio en el cliente.

Por ejemplo, algo perfectamente razonable debería verse así:

---

import UserDirectory from '../components/users/UserDirectory.astro';
import UserInspector from '../components/users/UserInspector.astro';

---

<section class="users-workspace">
  <UserDirectory />
  <UserInspector />
</section>
Eso es absolutamente editable a mano.

Cuando ves cosas como:

data-astro-cid-hhnqfkh6
o selectores transformados similares, eso es el resultado compilado en el navegador, porque Astro transforma automáticamente los estilos scoped. No es lo que deberíamos editar.

Pero incluso dejando eso claro, creo que tu crítica sigue siendo válida: aunque técnicamente los archivos sean editables, una arquitectura demasiado fragmentada puede convertir una corrección de 20 segundos en una búsqueda de 20 minutos.

Y eso es exactamente lo contrario de lo que necesita nuestro repositorio de Product Design.

Mi conclusión
No abandonaría Astro. Cambiaría radicalmente las reglas con las que Codex debe usarlo.

Para este repositorio, Astro debe ser una capa de composición, no el dueño del diseño.

Yo establecería esta arquitectura:

src/
├── layouts/
│ └── AppShell.astro
│
├── pages/
│ └── users.astro
│
├── components/
│ ├── shell/
│ │ ├── Sidebar.astro
│ │ └── Topbar.astro
│ │
│ └── users/
│ ├── UsersHeader.astro
│ ├── UsersSummary.astro
│ ├── UserDirectory.astro
│ └── UserInspector.astro
│
└── styles/
├── tokens.css
├── base.css
├── shell.css
├── components.css
└── domains/
└── users.css
La diferencia fundamental sería esta:

Para cambiar colores
/_ tokens.css _/

--surface-page: ...;
--surface-panel: ...;
--border-subtle: ...;
--text-primary: ...;
Para cambiar el ancho del sidebar o el padding general
/_ shell.css _/

.app-shell { ... }

.app-main { ... }

.sidebar { ... }
Para corregir exactamente esta pantalla
/_ domains/users.css _/

.users-page { ... }

.users-page\_\_header { ... }

.users-summary { ... }

.users-workspace { ... }

.user-directory { ... }

.user-inspector { ... }
Y listo.

Astro admite explícitamente tanto estilos dentro del componente como hojas CSS externas importadas. No estamos obligados a esconder los estilos dentro de cada .astro.

Yo iría incluso un poco más lejos
Para nuestro prototipo, yo prohibiría como norma general:

CSS dentro de .astro, salvo una excepción realmente aislada;

estilos inline;

nombres de clases generados;

abstracciones CSS creadas solamente porque dos elementos comparten tres propiedades;

componentes para cada wrapper;

pasar class, variant, tone, size, density y seis props más a cada componente visual;

convertir una simple fila del directorio en cinco componentes diferentes.

Astro permite una granularidad enorme: un componente puede representar desde un pequeño fragmento hasta un layout entero.
Que algo pueda ser un componente no significa que deba serlo.

Para nuestro caso, mi regla sería:

Un componente existe porque tiene significado propio, comportamiento propio, estado propio o reutilización real. No porque podemos extraer 12 líneas de HTML.

Por ejemplo:

UserDirectory.astro ✅
UserInspector.astro ✅
InviteCustomerDialog.astro ✅

UserName.astro ❌
UserEmail.astro ❌
DirectorySeparator.astro ❌
MetricLabel.astro ❌
Ese tipo de microfragmentación funciona muy bien para inflar la apariencia de una arquitectura sofisticada, pero es pésima para nuestro proceso actual.

Lo más importante: tenemos que optimizar para ti, no para Codex
Este es el punto en el que creo que debemos hacer una corrección consciente de dirección.

Nuestro ciclo es:

definimos
↓
Codex implementa
↓
tú observas
↓
tocamos espacios, proporciones, contraste
↓
volvemos a observar
↓
validamos
En ese ciclo, que puedas hacer:

.users-workspace {
grid-template-columns: 46% 54%;
}
guardar y mirar el navegador tiene muchísimo valor.

No tiene sentido que para cambiar una proporción tengas que preguntarte:

¿Esto viene de AppShell, Workspace, SplitPane, DirectoryLayout o de una prop enviada desde users.astro?

Eso significa que hemos optimizado la arquitectura equivocada.

El Product Design repo no es todavía el frontend de producción. Su prioridad es permitir pensar, comparar, corregir y validar rápidamente. La implementación final podrá tener decisiones de arquitectura diferentes cuando corresponda.

Hay además una posibilidad interesante
Astro tiene actualmente una integración experimental con Chrome DevTools Workspace que permite modificar determinados archivos desde DevTools y guardar los cambios directamente en el código fuente local.

No basaría nuestro workflow principal en una característica experimental, pero conceptualmente confirma algo importante: el propio ecosistema reconoce el valor de una iteración visual directa.

Yo haría primero lo más simple y estable:

DevTools para experimentar → identificas el valor correcto → editas el CSS fuente claramente localizado.

Eso debería tomar 30 segundos, no 20 minutos.

Mi opinión final es bastante clara: Astro sí me parece correcto para este proyecto, pero la implementación debe simplificarse ahora, antes de continuar creando dominios. Si seguimos construyendo encima de una arquitectura difícil de editar manualmente, dentro de cuatro dominios tendremos un prototipo que solo Codex entiende. Y eso sería una dependencia muy peligrosa precisamente para el repositorio que pretende convertirse en nuestra fuente de verdad de producto.

El siguiente paso que yo haría sería preparar una regla de arquitectura de prototipado para AGENTS.md y un prompt de refactor para Codex, de modo que simplifique la implementación actual sin modificar el diseño que ya logramos.

Si, vamos a haer eso, porque actualmente la arquitectura de los archivos es bastante rara, este es el navbar:

<header class="topbar"><p class="crumb">Operations <span aria-hidden="true">/</span> People access</p><div class="topbar-actions"><button class="icon-button" id="theme-toggle" type="button" aria-label="Switch to dark theme">◐</button><button class="avatar-button" type="button" aria-label="Open operator menu">LK</button></div></header>
<style>.topbar{height:4.2rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;padding:0 clamp(1rem,3vw,3rem);background:var(--surface)}.crumb{margin:0;font-size:.85rem}.topbar-actions{display:flex;gap:.5rem}@media(max-width:520px){.topbar{padding:0 1rem}}</style>

1m 46s nachgedacht
Sí, Heri. Y este ejemplo confirma exactamente el problema.

El código del Topbar no está técnicamente mal, pero está organizado de una forma poco adecuada para nuestro proceso de diseño:

<header class="topbar">
  ...
</header>

<style>
  .topbar { ... }
  .crumb { ... }
  .topbar-actions { ... }
</style>

Además, tener el CSS comprimido en una sola línea empeora todavía más la experiencia. Una modificación tan simple como ajustar el padding exige localizar el componente, abrirlo, encontrar el bloque y leer una línea enorme.

Para producción podría tolerarse como una decisión de encapsulación. Para nuestro Product Design repo, no.

Cómo quiero que quede
El componente:

<header class="topbar">
  <p class="crumb">
    Operations <span aria-hidden="true">/</span> People access
  </p>

  <div class="topbar-actions">
    <button
      class="icon-button"
      id="theme-toggle"
      type="button"
      aria-label="Switch to dark theme"
    >
      ◐
    </button>

    <button
      class="avatar-button"
      type="button"
      aria-label="Open operator menu"
    >
      LK
    </button>

  </div>
</header>
Y en shell.css:

.topbar {
height: 4.2rem;
border-bottom: 1px solid var(--border);
display: flex;
justify-content: space-between;
align-items: center;
padding-inline: clamp(1rem, 3vw, 3rem);
background: var(--surface);
}

.crumb {
margin: 0;
font-size: 0.85rem;
}

.topbar-actions {
display: flex;
gap: 0.5rem;
}

@media (max-width: 520px) {
.topbar {
padding-inline: 1rem;
}
}
Entonces el mapa mental se vuelve inmediato:

quiero cambiar el header → shell.css
quiero cambiar el sidebar → shell.css
quiero cambiar un botón → components.css
quiero cambiar un color → tokens.css
quiero cambiar Users → domains/users.css
Eso es exactamente lo que necesitamos.

He preparado los dos documentos

1. Reglas para incorporar a AGENTS.md
   Aquí definí:

propósito específico del prototipo;

Astro como capa de composición;

CSS como capa principal de edición visual;

prohibición por defecto de <style> dentro de .astro;

criterios para decidir cuándo algo merece ser componente;

ownership claro de cada archivo CSS;

reglas de responsive;

reglas contra sobreabstracción;

test de editabilidad manual;

el Topbar actual como ejemplo concreto de la estructura deseada.

AGENTS_PROTOTYPE_ARCHITECTURE_SECTION.md

2. Prompt completo para Codex
   No le dice simplemente «mueve el CSS». Eso sería peligroso.

Le obliga a:

auditar primero la arquitectura existente;

identificar todos los <style>, inline styles, duplicaciones y wrappers triviales;

refactorizar primero el shell;

después componentes compartidos;

después consolidar Users;

revisar la granularidad de componentes;

ejecutar build y checks;

verificar los estados del prototipo;

informar qué estilos locales permanecieron y por qué;

detenerse sin aprovechar el refactor para rediseñar.

CODEX_ASTRO_PROTOTYPE_REFACTOR_PROMPT.md

Una decisión que tomé conscientemente
Las reglas son más estrictas de lo que recomendaría para una aplicación Astro normal.

Lo hice a propósito.

En una aplicación de producción puedo defender perfectamente esto:

Topbar.astro
├── markup
├── lógica
└── estilos scoped
Pero nuestro repositorio tiene otra función. Aquí tú vas a estar constantemente haciendo cosas como:

«Este panel necesita 40 px más.»

«El contenido está demasiado separado del header.»

«Quiero probar 44/56 en vez de 50/50.»

«Este contraste está demasiado alto.»

En ese contexto, la encapsulación extrema tiene menos valor que la localización inmediata de las decisiones visuales.

Y hay otra cosa que considero importante: no quiero que Codex convierta ahora el problema actual en el problema contrario. Es decir, pasar de 25 componentes con CSS encapsulado a un gigantesco styles.css de 4.000 líneas. Por eso la división que propuse es por responsabilidad visual:

tokens.css
base.css
shell.css
components.css
domains/
└── users.css
Creo sinceramente que esa estructura encaja mucho mejor con el proceso que estamos construyendo. Una vez hecho este refactor, el siguiente paso no debería ser crear otro dominio todavía: primero deberíamos comprobar juntos que tú puedes tocar manualmente el layout actual con facilidad real.

Bibliothek
/
Havenova
/
AGENTS_PROTOTYPE_ARCHITECTURE_SECTION.md

# Prototype architecture and editability rules

## Purpose of the prototype codebase

The prototype exists to support rapid product definition, visual iteration, UX validation, and handoff.

Its architecture must optimize for:

1. fast manual editing;
2. obvious file ownership;
3. predictable CSS location;
4. low cognitive overhead;
5. semantic and accessible markup;
6. enough modularity to avoid duplication without recreating production complexity.

The prototype is not a production frontend and must not imitate production architecture by default.

## Core rule

Astro is the composition layer. CSS is the visual editing layer.

A developer must be able to answer these questions quickly:

- Where do I change this page's layout?
- Where do I change the shell dimensions?
- Where do I change a shared button, badge, field, dialog, or alert?
- Where do I change a global color, radius, spacing scale, or typography token?

If answering any of these requires tracing component props, opening several files, or searching through scoped styles, the implementation is too fragmented.

## Astro component rules

Use `.astro` files for:

- semantic document structure;
- page composition;
- meaningful reusable UI regions;
- components with their own state, behavior, or true reuse;
- accessible interaction markup.

Do not create components only to reduce line count.

Good component boundaries:

- `AppShell.astro`
- `Sidebar.astro`
- `Topbar.astro`
- `UsersHeader.astro`
- `UsersSummary.astro`
- `UserDirectory.astro`
- `UserInspector.astro`
- `InviteCustomerDialog.astro`

Avoid micro-components such as:

- `UserName.astro`
- `UserEmail.astro`
- `MetricLabel.astro`
- `DirectorySeparator.astro`
- wrappers that only forward classes or props.

A component should normally exist because it has at least one of these properties:

- independent semantic meaning;
- independent behavior or state;
- real reuse across more than one place;
- enough internal structure to make the parent materially easier to understand.

## Styling rules

### Default rule: no component-scoped `<style>` blocks

Do not place ordinary layout or visual styling inside `.astro` files.

The default implementation pattern is:

```astro
---
// imports and data only
---

<header class="topbar">
  ...
</header>
```

with styles in the appropriate external stylesheet:

```css
.topbar { ... }
.topbar-actions { ... }
```

A `<style>` block inside an Astro component is allowed only for a genuinely isolated exception that would be misleading in the shared stylesheet structure. Such exceptions must be rare and documented with a brief comment explaining why the style is intentionally local.

### No inline styles

Do not use `style="..."` for visual tuning, layout, spacing, color, typography, or responsive behavior.

### Stable semantic class names

Use readable classes that describe the UI region or role:

```text
.topbar
.topbar-actions
.users-page
.users-summary
.users-workspace
.user-directory
.user-inspector
.status-badge
```

Avoid generated naming schemes, deeply nested selectors, or class APIs driven by many visual props.

## Stylesheet ownership

Use this ownership model:

```text
src/styles/
├── tokens.css
├── base.css
├── shell.css
├── components.css
└── domains/
    └── users.css
```

### `tokens.css`

Contains shared design decisions only:

- semantic colors;
- surface colors;
- border colors;
- text colors;
- typography scale;
- spacing scale where useful;
- radii;
- shadows;
- shell dimensions that are true global tokens.

Do not put component selectors here.

### `base.css`

Contains:

- reset/normalization;
- body defaults;
- typography defaults;
- focus treatment;
- basic element behavior.

Do not put domain layout here.

### `shell.css`

Contains the application frame and global workspace structure:

- app shell;
- sidebar;
- topbar;
- main content region;
- shell responsive behavior;
- global page container behavior.

Example ownership:

```css
.topbar { ... }
.topbar-actions { ... }
.sidebar { ... }
.app-main { ... }
```

### `components.css`

Contains genuinely shared UI primitives and patterns:

- buttons;
- icon buttons;
- fields;
- tabs;
- badges;
- alerts;
- dialogs;
- loading states;
- empty-state primitives when reused.

Do not move page-specific layout here merely because the selector could be reused someday.

### `domains/users.css`

Contains everything specific to the Users domain and its page composition:

- users page header composition;
- metrics layout;
- directory/inspector split;
- directory rows;
- users-specific empty states;
- users-specific responsive transformations.

Example ownership:

```css
.users-page { ... }
.users-page__header { ... }
.users-summary { ... }
.users-workspace { ... }
.user-directory { ... }
.user-directory__row { ... }
.user-inspector { ... }
```

Future domains must get their own domain stylesheet rather than expanding one global file indefinitely.

## CSS editing locality

Visual changes should normally have one obvious destination:

| Change                            | File                |
| --------------------------------- | ------------------- |
| Brand or semantic color           | `tokens.css`        |
| Global typography/base behavior   | `base.css`          |
| Sidebar/topbar/main workspace     | `shell.css`         |
| Shared button/badge/dialog/field  | `components.css`    |
| Users page proportions and layout | `domains/users.css` |

Do not split one visual concern across multiple component files without a strong reason.

## Responsive rules

Responsive behavior belongs with the stylesheet that owns the layout.

Examples:

- topbar mobile behavior → `shell.css`;
- directory/inspector collapse → `domains/users.css`;
- shared dialog mobile behavior → `components.css`.

Do not centralize all media queries into a separate responsive file.

## Abstraction rules

Do not introduce abstraction before there is evidence of reuse or complexity.

Avoid:

- generic `Stack`, `Cluster`, `Pane`, `Surface`, or `Layout` components for simple prototype markup;
- components whose only purpose is to accept `variant`, `tone`, `density`, `size`, and similar visual props;
- CSS utilities that hide the location of important layout decisions;
- wrapper components that make DOM structure difficult to inspect;
- one-file-per-small-element decomposition.

Prefer direct markup and explicit classes while the product is still being designed.

## Visual preservation during refactors

Architecture refactors must not redesign the interface.

When simplifying prototype code:

- preserve visible spacing, proportions, typography, color, borders, and states;
- preserve responsive behavior unless the task explicitly asks to change it;
- preserve accessibility semantics and keyboard behavior;
- preserve prototype state controls and demo behavior;
- move styles before changing styles.

Any visual change discovered as desirable during an architecture refactor must be reported separately instead of silently included.

## Manual editability acceptance test

Before considering a page complete, verify that a developer unfamiliar with the implementation can make these changes in under a few minutes:

1. change the topbar height;
2. change the sidebar width;
3. change the page horizontal padding;
4. change the directory/inspector ratio;
5. change a semantic surface color;
6. change a shared badge style;
7. change Users page mobile behavior.

If any task requires tracing several Astro components or finding scoped style blocks, simplify the architecture.

## Preferred source shape example

`Topbar.astro`:

```astro
<header class="topbar">
  <p class="crumb">
    Operations <span aria-hidden="true">/</span> People access
  </p>

  <div class="topbar-actions">
    <button
      class="icon-button"
      id="theme-toggle"
      type="button"
      aria-label="Switch to dark theme"
    >
      ◐
    </button>

    <button class="avatar-button" type="button" aria-label="Open operator menu">
      LK
    </button>
  </div>
</header>
```

`shell.css`:

```css
.topbar {
  height: 4.2rem;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: clamp(1rem, 3vw, 3rem);
  background: var(--surface);
}

.crumb {
  margin: 0;
  font-size: 0.85rem;
}

.topbar-actions {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 520px) {
  .topbar {
    padding-inline: 1rem;
  }
}
```

The important property of this structure is not the exact filename. It is that the markup remains readable and the visual rule has one predictable owner.
