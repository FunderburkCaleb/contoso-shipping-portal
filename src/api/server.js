const path = require('path');
const express = require('express');
const { shipments } = require('./data');
const { calculateRate, estimateDelivery } = require('./rateCalculator');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'web')));

// List all shipments (with computed rate + delivery estimate)
app.get('/api/shipments', (_req, res) => {
  const enriched = shipments.map((s) => ({
    ...s,
    rateUsd: calculateRate(s.weightKg, s.zone, s.service),
    estimatedDelivery: estimateDelivery(s.shippedAt, s.zone, s.service)
  }));
  res.json(enriched);
});

// Look up a single shipment by tracking number
app.get('/api/shipments/:trackingNumber', (req, res) => {
  const shipment = shipments.find(
    (s) => s.trackingNumber === req.params.trackingNumber
  );
  if (!shipment) {
    return res.status(404).json({ error: 'Shipment not found' });
  }
  res.json({
    ...shipment,
    rateUsd: calculateRate(shipment.weightKg, shipment.zone, shipment.service),
    estimatedDelivery: estimateDelivery(
      shipment.shippedAt,
      shipment.zone,
      shipment.service
    )
  });
});

// Quote a hypothetical shipment
app.post('/api/quote', (req, res) => {
  const { weightKg, zone, service } = req.body || {};
  try {
    const rateUsd = calculateRate(Number(weightKg), zone, service);
    res.json({ weightKg: Number(weightKg), zone, service, rateUsd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Contoso Shipping Portal running at http://localhost:${PORT}`);
  });
}

module.exports = app;
