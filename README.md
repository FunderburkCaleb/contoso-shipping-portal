# Contoso Shipping Portal

Internal freight tracking and rate-quoting tool for Contoso Shipping's
operations team. Tracks active shipments, computes shipping rates, and
estimates delivery dates.

> **Academy note:** this repository is the persistent lab environment for the
> GitHub Copilot Academy Navigator path. You will work in your own copy of it
> for all six missions. Follow the missions on the Academy site — they tell
> you exactly what to do here.

## What's inside

| Path | What it is |
|---|---|
| `src/api/` | Express REST API: shipments, lookups, quotes |
| `src/web/` | The portal web page (plain HTML/CSS/JS) |
| `tests/` | Jest test suites for the rate logic and the API |
| `.github/workflows/ci.yml` | The CI safety net: file checks, lint, tests, build |
| `.devcontainer/` | One-click Codespaces configuration |
| `docs/` | The Contoso Ops handbook excerpts |

## Getting started

1. Open this repository in a GitHub Codespace (green **Code** button →
   **Codespaces** → **Create codespace on main**). Dependencies install
   automatically.
2. Run the database migration before your first start: `npm run setup`
3. Start the app: `npm start`
4. Open the portal in your browser at **http://localhost:8080**

## Useful commands

| Command | What it does |
|---|---|
| `npm start` | Start the portal |
| `npm test` | Run the test suite |
| `npm run lint` | Check code style |

## API quick reference

- `GET /api/shipments` — all shipments with computed rate + delivery estimate
- `GET /api/shipments/:trackingNumber` — one shipment
- `POST /api/quote` — rate quote for `{ weightKg, zone, service }`

## Pricing rules

Full pricing rules live in the [Contoso Ops handbook](docs/ops-handbook.md)
and the maintenance schedule in [docs/maintenance.md](docs/maintenance.md).

## Support

Questions go to the `#contoso-portal` channel, or open an issue in this
repository.
