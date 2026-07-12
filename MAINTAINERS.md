# Maintainer notes — Contoso Shipping Portal (lab repo)

One person should be able to maintain this. Here is everything you need to know.

## The seeded state (do not "fix" main)

`main` deliberately contains:

| Seed | Where | Found in |
|---|---|---|
| Wrong port (8080 vs 3000), nonexistent `npm run setup` step, dead `docs/maintenance.md` link | `README.md` | Mission 2 (discovered), Mission 3 (fixed) |
| Status typo `'deliverd'` — delivered checkmark never renders | `src/web/app.js` | Mission 5, bug 1 |
| Volume discount skipped for express shipments (handbook says it applies to the final price for all services) | `src/api/rateCalculator.js` | Mission 5, bug 2 |
| Saturday counted as a business day (only Sunday skipped) — estimates land a day early across weekends. The tempting wrong fix (lowering `DELIVERY_DAYS`) breaks the SLA test. | `src/api/rateCalculator.js` | Mission 5, bug 3 |

Tests and lint are green on `main` — the bugs are behavior gaps the tests
don't cover. That is the point.

## Checkpoint branches (learner recovery + reference solutions)

Each checkpoint contains the completed state after that mission, building on
the previous one. Learners who get stuck run, from their own copy:

```
git fetch origin
git checkout -b my-mission-N origin/checkpoint/mission-N-complete
```

| Branch | Contains |
|---|---|
| `checkpoint/mission-03-complete` | README fixes merged |
| `checkpoint/mission-05-complete` | + all three bugs fixed, two regression tests added (15 tests) |
| `checkpoint/mission-06-complete` | + copy-tracking-number button and toast |

Missions 1, 2, and 4 make no code changes, so they need no checkpoints.
When pushing this repo to GitHub the first time, push all branches:
`git push origin --all`.

## Verifying after any change

```
npm install && npm run lint && npm test          # main: 13 tests green
git checkout checkpoint/mission-06-complete
npm test                                          # checkpoints: 15 tests green
```

The CI workflow (`.github/workflows/ci.yml`) runs the same checks on every PR.

## Design rules (keep these when extending)

- No frameworks, no build step, no new dependencies without a reason.
- Business truth lives in `docs/ops-handbook.md`; bugs are code/handbook disagreements.
- Every seeded bug must be invisible to the existing test suite on `main`.
- Keep the app small enough to read in one sitting (~600 lines).
