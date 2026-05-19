# ADR 0001 — Facade Architecture with In-Memory Mock API

**Status:** Accepted  
**Date:** 2026-05-18

## Context

The Painel de Combustíveis requires two data-driven features (Dashboard, Consulta) consuming a mock API. The desafio mandates a Facade pattern between components and the HTTP layer, with data consumed via observables or signals. Three decisions cascade from this constraint:

1. Which mock API strategy best serves a 3-hour build window while keeping the Facade contract realistic?
2. How should facades surface async data — pure observables, pure signals, or a hybrid?
3. How should the project structure enforce the Facade boundary?

## Decision

### Mock API: Angular In-Memory Web API

We chose `angular-in-memory-web-api` over JSON Server. The In-Memory API runs inside Angular's HTTP interceptor chain — no separate process, no extra `npm` scripts. It supports pagination (`_page`, `_limit`) and filtering natively, so the Facade's HTTP calls look identical to production calls.

**Trade-off:** Lower production fidelity than JSON Server (no real network requests). Mitigation: the Facade is the contract. Swapping to a real API requires changing only the internal service, not the Facade's public API or any component.

### State management: Observables internally, Signals at the boundary

Each Facade uses RxJS internally for HTTP orchestration (`http.get().pipe(map(), ...)`) and exposes data as signals via `toSignal()` at the public boundary. Components read signals directly — no `async` pipe needed in templates.

**Trade-off:** Adds `toSignal()` boilerplate at each Facade boundary. Mitigation: components get simpler templates, the CLAUDE.md preference for signals is honored, and the async nature of HTTP calls is handled with the right tool (RxJS) internally.

### Project structure: Flat feature folders

```
src/app/
├── core/          (layout shell, gov-bar, header, breadcrumb, menu, mock data)
├── dashboard/
│   ├── dashboard.component.ts
│   ├── dashboard.facade.ts
│   └── components/
├── consulta/
│   ├── consulta.component.ts
│   ├── consulta.facade.ts
│   └── components/
├── shared/        (KPI card, pagination, UI primitives)
└── models/        (Abastecimento, KPI interfaces)
```

Each feature is a self-contained folder with its own Facade. `loadComponent` lazy-loads each route. No NgModules.

**Trade-off:** Two flat feature folders could become unwieldy with 10+ features. Mitigation: this is a 2-feature application. If it grows, nesting under `features/combustiveis/` is a low-cost refactor.

## Consequences

- Components never import `HttpClient` — only facades do
- Each feature's data contract is explicit in its Facade's public signals
- Tests (if added later) can mock the Facade, not HttpClient
- The In-Memory API provides realistic pagination/filtering query parameters
