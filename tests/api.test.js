const request = require('supertest');
const app = require('../src/api/server');

describe('GET /api/shipments', () => {
  test('returns all shipments with computed fields', async () => {
    const res = await request(app).get('/api/shipments');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(5);
    const first = res.body[0];
    expect(first).toHaveProperty('trackingNumber');
    expect(first).toHaveProperty('rateUsd');
    expect(first).toHaveProperty('estimatedDelivery');
  });
});

describe('GET /api/shipments/:trackingNumber', () => {
  test('returns a known shipment', async () => {
    const res = await request(app).get('/api/shipments/CS-1001-US');
    expect(res.status).toBe(200);
    expect(res.body.customer).toBe('Fabrikam Manufacturing');
  });

  test('404s on an unknown tracking number', async () => {
    const res = await request(app).get('/api/shipments/CS-9999-XX');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/quote', () => {
  test('quotes a valid shipment', async () => {
    const res = await request(app)
      .post('/api/quote')
      .send({ weightKg: 10, zone: 'domestic', service: 'standard' });
    expect(res.status).toBe(200);
    expect(res.body.rateUsd).toBe(17.0);
  });

  test('rejects invalid input with a 400', async () => {
    const res = await request(app)
      .post('/api/quote')
      .send({ weightKg: -2, zone: 'domestic', service: 'standard' });
    expect(res.status).toBe(400);
  });
});
