# Contributing to the Contoso Shipping Portal

The portal is a small codebase, but we work on it like a real one.

## The workflow (no exceptions)

1. Every change starts from an **issue** describing what and why.
2. Work happens on a **branch**, never directly on `main`.
   Branch names: `fix/short-description` or `feature/short-description`.
3. Open a **pull request**. Fill in the description: what changed, why,
   and how you verified it.
4. CI must be **green** before merge (file check, lint, tests, build).
5. At least a self-review: read your own diff line by line before you
   ask anyone else to.

## Conventions

- API error responses always use the shape `{ "error": "message" }`.
- Tests use Jest, arranged as Arrange → Act → Assert.
- The Ops handbook (`docs/ops-handbook.md`) is the source of truth for
  business rules. If code and handbook disagree, the code is wrong.
- No new dependencies without a note in the PR explaining why.

## AI-assisted changes

Copilot is encouraged — that's the point of this repo. But:

- **You** own every line you merge, however it was written.
- Review AI output like you'd review a new teammate's PR: check scope,
  check tests, check it against the handbook.
- If Copilot's suggestion changes a business rule (pricing, delivery
  promises), stop. That's an Ops decision, not a code fix.
