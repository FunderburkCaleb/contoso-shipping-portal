const {
  calculateRate,
  estimateDelivery,
  DELIVERY_DAYS
} = require('../src/api/rateCalculator');

describe('calculateRate', () => {
  test('standard domestic: base + per-kg', () => {
    // 6.00 + 10 * 1.10 = 17.00
    expect(calculateRate(10, 'domestic', 'standard')).toBe(17.0);
  });

  test('express domestic applies 1.75x multiplier', () => {
    // (6.00 + 10 * 1.10) * 1.75 = 29.75
    expect(calculateRate(10, 'domestic', 'express')).toBe(29.75);
  });

  test('standard international: base + per-kg', () => {
    // 18.00 + 5 * 2.40 = 30.00
    expect(calculateRate(5, 'international', 'standard')).toBe(30.0);
  });

  test('throws on zero or negative weight', () => {
    expect(() => calculateRate(0, 'domestic', 'standard')).toThrow();
    expect(() => calculateRate(-4, 'domestic', 'standard')).toThrow();
  });

  test('throws on unknown zone', () => {
    expect(() => calculateRate(5, 'lunar', 'standard')).toThrow('Unknown zone');
  });
});

describe('delivery estimates', () => {
  test('express service promises 2 business days domestic, 4 international', () => {
    // The customer-facing SLA. Changing these numbers changes what
    // Contoso promises its customers — that is a business decision,
    // not a bug fix.
    expect(DELIVERY_DAYS.express.domestic).toBe(2);
    expect(DELIVERY_DAYS.express.international).toBe(4);
  });

  test('estimate lands after the ship date', () => {
    const eta = estimateDelivery('2026-07-06', 'domestic', 'standard');
    expect(eta > '2026-07-06').toBe(true);
  });

  test('throws for unknown service/zone combinations', () => {
    expect(() => estimateDelivery('2026-07-06', 'domestic', 'overnight')).toThrow();
  });
});

// Regression tests added in Mission 5 — each one would have caught a bug
// that shipped in this codebase. See docs/ops-handbook.md for the rules.
describe('Mission 5 regressions', () => {
  test('volume discount applies to express shipments too (handbook example)', () => {
    // (6.00 + 30 × 1.10) × 1.75 = 68.25, minus 10% = 61.43
    const { calculateRate } = require('../src/api/rateCalculator');
    expect(calculateRate(30, 'domestic', 'express')).toBe(61.43);
  });

  test('business days skip Saturdays as well as Sundays', () => {
    // Friday 2026-07-10 + 2 business days = Tuesday 2026-07-14
    const { addBusinessDays } = require('../src/api/rateCalculator');
    expect(addBusinessDays('2026-07-10', 2)).toBe('2026-07-14');
  });
});
