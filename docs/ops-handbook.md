# Contoso Ops Handbook — Shipping Rates & Delivery (excerpt)

This is the business source of truth. When the code and this handbook
disagree, the handbook wins — that disagreement is called a bug.

## Pricing

| Rule | Value |
|---|---|
| Base rate, domestic | $6.00 |
| Base rate, international | $18.00 |
| Per-kg rate, domestic | $1.10/kg |
| Per-kg rate, international | $2.40/kg |
| Express multiplier | 1.75× applied to (base + weight cost) |
| Volume discount | 10% off the **final** price for shipments over 20 kg — final means *after* the express multiplier |

### Worked examples

- 10 kg, domestic, standard: `6.00 + 10 × 1.10 = $17.00`
- 10 kg, domestic, express: `(6.00 + 10 × 1.10) × 1.75 = $29.75`
- 30 kg, domestic, express: `(6.00 + 30 × 1.10) × 1.75 = $68.25`, minus 10% = **$61.43** (rounded)

## Delivery promises (business days, weekends excluded)

| Service / zone | Business days |
|---|---|
| Standard domestic | 5 |
| Express domestic | 2 |
| Standard international | 10 |
| Express international | 4 |

Business days exclude **Saturdays and Sundays**. A shipment sent Friday on
express domestic (2 business days) arrives Tuesday, not Sunday.

> These delivery numbers are customer-facing SLAs. Changing them requires
> a business decision by the Ops director — they are not a dial engineers
> turn to make dates look right.
