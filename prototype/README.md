# Maped Solutions prototype workbench

This directory is an Astro static prototype workbench for reviewing product
decisions. Astro is used for composition only: it gives the prototype a shared
application shell, locally owned components, and independent pages without
turning this repository into a production frontend.

It is not an implementation of the platform. It has no authentication, API
client, database, application store, production routing, or backend contract.
The existing Users interactions use intentionally local simulated state. They
are historical prototype evidence only: the current product authority is the
Customers, Invitations and Internal Notes documentation. A later prototype task
will align this workbench without treating its current routes or behavior as
implementation authority.

## Run it

From this directory:

```bash
pnpm install
pnpm dev
pnpm build
```

`pnpm dev` currently serves the historical Users reference page at `/` and
`/users`. `pnpm build`
produces a static prototype in `dist/`.

## Shell baseline

`/` and `/users` use the accepted framed operational workspace: a stable
application frame and navigation region contain one continuous workspace plane.
The context header and scrolling task region belong to that same plane; the
workspace is not a large floating card or a separate product workflow.

## Ownership map

- `src/styles/tokens.css` holds semantic light and dark theme tokens.
- `src/styles/base.css` holds reset, typography foundation, and global focus
  behavior.
- `src/styles/shell.css` owns the application frame, navigation, topbar, main
  scroll region, and shell responsive behavior.
- `src/styles/components.css` owns validated shared controls, status/feedback,
  dialog, and review-control styling.
- `src/styles/domains/users.css` owns the Users layout, directory, inspector,
  and Users responsive behavior.
- `src/layouts/AppShell.astro` composes those style layers in the explicit order
  tokens → base → shell → shared components → Users.
- `src/components/shell/` owns navigation and the header.
- `src/components/prototype/` owns clearly separated review-only tooling.
- `src/data/navigation.ts` is the single plain-data source for sidebar groups,
  real destinations, and planned destinations.
- `src/domains/users/` owns the Users composition, directory, summary,
  inspector, and invitation surface.
- `scripts/` contains the deliberately small browser behavior for theme,
  shell menus, selection, dialog, and simulated review states.

Create a shared component only when a real, already-validated behavior is used
outside its domain. Similar-looking markup alone is not enough. In particular,
do not promote the Users directory or inspector into generic systems until a
second domain validates the same task and behavior.
