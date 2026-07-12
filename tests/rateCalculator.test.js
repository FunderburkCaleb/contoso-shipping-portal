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
