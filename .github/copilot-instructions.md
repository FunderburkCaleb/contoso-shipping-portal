# Copilot instructions for the Contoso Shipping Portal

- This is a plain Node.js + Express app with a static vanilla-JS frontend.
  Do not introduce frameworks, build steps, or new dependencies.
- API error responses use the shape `{ "error": "message" }`.
- Tests use Jest with the Arrange → Act → Assert pattern; put them in `tests/`.
- Business rules for pricing and delivery live in `docs/ops-handbook.md` —
  treat that file as the source of truth, not the current code.
- Match the existing code style: CommonJS modules, 2-space indent,
  single quotes.
