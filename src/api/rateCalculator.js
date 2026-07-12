// Shipping rate and delivery estimate logic for Contoso Shipping.
//
// Pricing rules (from the Contoso Ops handbook):
//   - Base rate: $6.00 domestic, $18.00 international
//   - Per-kg rate: $1.10/kg domestic, $2.40/kg international
//   - Express service: 1.75x multiplier applied to (base + weight cost)
//   - Volume discount: orders over 20kg get 10% off the FINAL price
//     (i.e. after the express multiplier, not before)
//
// Delivery estimates (business days from ship date):
//   - standard domestic: 5 business days
//   - express domestic: 2 business days
//   - standard international: 10 business days
//   - express international: 4 business days

const BASE_RATE = { domestic: 6.0, international: 18.0 };
const PER_KG = { domestic: 1.1, international: 2.4 };
const EXPRESS_MULTIPLIER = 1.75;
const VOLUME_DISCOUNT_THRESHOLD_KG = 20;
const VOLUME_DISCOUNT = 0.1;

const DELIVERY_DAYS = {
  standard: { domestic: 5, international: 10 },
  express: { domestic: 2, international: 4 }
};

function calculateRate(weightKg, zone, service) {
  if (weightKg <= 0) {
    throw new Error('Weight must be greater than zero');
  }
  if (!BASE_RATE[zone]) {
    throw new Error(`Unknown zone: ${zone}`);
  }

  let price = BASE_RATE[zone] + weightKg * PER_KG[zone];

  if (service === 'express') {
    price = price * EXPRESS_MULTIPLIER;
  }

  if (weightKg > VOLUME_DISCOUNT_THRESHOLD_KG) {
    price = price * (1 - VOLUME_DISCOUNT);
  }

  return Math.round(price * 100) / 100;
}

// Adds business days to a date, skipping non-business days.
function addBusinessDays(startDate, days) {
  const result = new Date(startDate + 'T12:00:00Z');
  let added = 0;
  while (added < days) {
    result.setUTCDate(result.getUTCDate() + 1);
    const day = result.getUTCDay();
    if (day !== 0 && day !== 6) {
      added++;
    }
  }
  return result.toISOString().slice(0, 10);
}

function estimateDelivery(shippedAt, zone, service) {
  const days = DELIVERY_DAYS[service] && DELIVERY_DAYS[service][zone];
  if (!days) {
    throw new Error(`No delivery estimate for ${service}/${zone}`);
  }
  return addBusinessDays(shippedAt, days);
}

module.exports = {
  calculateRate,
  estimateDelivery,
  addBusinessDays,
  DELIVERY_DAYS,
  EXPRESS_MULTIPLIER
};
