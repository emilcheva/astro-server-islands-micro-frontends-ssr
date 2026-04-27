# Astro Microfrontends — Server Islands Demo

A luxury island getaway booking page built as a demonstration of [Astro Server Islands](https://astro.build/blog/future-of-astro-server-islands/) combined with a microfrontends architecture.

## About

This demo shows how to use Astro's `server:defer` directive (Server Islands) to combine fast static HTML with dynamic, personalized server-rendered components — and how microfrontends can be composed server-side within an Astro shell.

Each app is a pnpm/npm workspace package. In a real-world setup they could live in separate repositories owned by different teams.

### Code structure

1. `app-shell` — Astro app: the shell, main page, SSR API routes, Tailwind CSS
2. `app-cart` — React microfrontend: "Book now" button, fires `add-to-cart` custom event
3. `app-heading` — Astro microfrontend: cart count badge, reads from cookie and listens for events
4. `utils` — shared utilities library (workspace package)

### How microfrontend composition works

`app-shell` fetches rendered HTML from `app-cart` (port 7100) and `app-heading` (port 7200) at request time inside Astro components. Each microfrontend is built and served independently by a lightweight Express server.

`CartCount` and the `AddToCart` button are wrapped with `server:defer` so they load as Server Islands — the static shell renders immediately while the deferred components stream in.

### Cart state

- Clicking "Book now" POSTs to `/api/add-to-cart` and stores the count in a cookie
- `CartCount` reads the cookie on load and increments optimistically via the `add-to-cart` custom event

## Features

- Astro Server Islands (`server:defer`) for deferred, personalized content
- Server-side microfrontend composition via HTML fetching
- React microfrontend embedded inside an Astro shell
- Cart count persisted in cookies
- Shimmer skeleton and pulsing dot fallbacks while Server Islands load
- Shared React/React DOM externalised from the shell Rollup build
- pnpm workspaces monorepo

## Usage

Each app must be built and served independently. Open a separate terminal for each:

```bash
# Build & serve app-cart (port 7100)
cd app-cart && npm run build:preview

# Build & serve app-heading (port 7200)
cd app-heading && npm run dev

# Start app-shell (port 4321)
cd app-shell && npm run dev
```

After modifying a microfrontend, rebuild and restart its Express server. The shell does not need to restart unless you change shell code.

## Shared dependencies

React and React DOM are externalised from the `app-shell` Rollup build via the `importmap-externals` Astro integration to avoid shipping duplicate copies across microfrontends.
