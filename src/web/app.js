// Frontend logic for the Contoso Shipping Portal.

const STATUS_LABELS = {
  in_transit: 'In Transit',
  delivered: 'Delivered',
  delayed: 'Delayed'
};

function statusBadge(status) {
  // Renders the colored status pill for a shipment row.
  const label = STATUS_LABELS[status] || 'Unknown';
  const cssClass = STATUS_LABELS[status] ? `status-${status}` : 'status-unknown';
  // Delivered shipments should show a checkmark next to the label.
  const check = status === 'delivered' ? ' ✓' : '';
  return `<span class="status ${cssClass}">${label}${check}</span>`;
}

async function loadShipments() {
  const body = document.getElementById('shipments-body');
  try {
    const res = await fetch('/api/shipments');
    const shipments = await res.json();
    body.innerHTML = shipments
      .map(
        (s) => `
      <tr>
        <td><code>${s.trackingNumber}</code></td>
        <td>${s.customer}</td>
        <td>${s.origin} → ${s.destination}</td>
        <td>${s.service}</td>
        <td>${s.weightKg} kg</td>
        <td>$${s.rateUsd.toFixed(2)}</td>
        <td>${s.estimatedDelivery}</td>
        <td>${statusBadge(s.status)}</td>
      </tr>`
      )
      .join('');
  } catch (err) {
    body.innerHTML = `<tr><td colspan="8">Failed to load shipments: ${err.message}</td></tr>`;
  }
}

async function getQuote() {
  const weightKg = document.getElementById('quote-weight').value;
  const zone = document.getElementById('quote-zone').value;
  const service = document.getElementById('quote-service').value;
  const result = document.getElementById('quote-result');

  result.textContent = '…';
  try {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weightKg, zone, service })
    });
    const data = await res.json();
    if (!res.ok) {
      result.textContent = data.error;
      return;
    }
    result.textContent = `$${data.rateUsd.toFixed(2)}`;
  } catch (err) {
    result.textContent = `Error: ${err.message}`;
  }
}

document.getElementById('quote-button').addEventListener('click', getQuote);
loadShipments();
