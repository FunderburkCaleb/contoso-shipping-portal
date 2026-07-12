// In-memory shipment data. In a real system this would live in a database.
// Do not edit tracking numbers — the missions and tests reference them.

const shipments = [
  {
    trackingNumber: 'CS-1001-US',
    customer: 'Fabrikam Manufacturing',
    origin: 'Philadelphia, PA',
    destination: 'Columbus, OH',
    service: 'standard',
    weightKg: 12.5,
    zone: 'domestic',
    status: 'in_transit',
    shippedAt: '2026-07-06'
  },
  {
    trackingNumber: 'CS-1002-US',
    customer: 'Northwind Traders',
    origin: 'Philadelphia, PA',
    destination: 'Austin, TX',
    service: 'express',
    weightKg: 3.2,
    zone: 'domestic',
    status: 'delivered',
    shippedAt: '2026-07-02'
  },
  {
    trackingNumber: 'CS-1003-INT',
    customer: 'Adventure Works',
    origin: 'Philadelphia, PA',
    destination: 'Toronto, ON',
    service: 'express',
    weightKg: 8.0,
    zone: 'international',
    status: 'in_transit',
    shippedAt: '2026-07-08'
  },
  {
    trackingNumber: 'CS-1004-US',
    customer: 'Tailspin Toys',
    origin: 'Philadelphia, PA',
    destination: 'Seattle, WA',
    service: 'standard',
    weightKg: 45.0,
    zone: 'domestic',
    status: 'delayed',
    shippedAt: '2026-07-03'
  },
  {
    trackingNumber: 'CS-1005-INT',
    customer: 'Wide World Importers',
    origin: 'Philadelphia, PA',
    destination: 'London, UK',
    service: 'standard',
    weightKg: 22.75,
    zone: 'international',
    status: 'delivered',
    shippedAt: '2026-06-28'
  }
];

module.exports = { shipments };
