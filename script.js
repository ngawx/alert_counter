
const counterMap = {
  'Tornado Warning': 'tornado-warning',
  'Severe Thunderstorm Warning': 'severe-thunderstorm-warning',
  'Tornado Watch': 'severe-watch',
  'Severe Thunderstorm Watch': 'severe-watch',
  'Flood Warning': 'flood-alert',
  'Flash Flood Warning': 'flood-alert',
  'Flood Advisory': 'flood-alert',
  'Flood Watch': 'flood-watch'
};

async function updateAlertCounts() {
  const res = await fetch('https://api.weather.gov/alerts/active?office=FFC');
  const data = await res.json();
  const counts = {
    'tornado-warning': 0,
    'severe-thunderstorm-warning': 0,
    'severe-watch': 0,
    'flood-alert': 0,
    'flood-watch': 0
  };

  for (const alert of data.features) {
    const event = alert.properties.event;
    const category = counterMap[event];
    if (category) counts[category]++;
  }

  for (const [key, value] of Object.entries(counts)) {
    const box = document.querySelector(`.${key}`);
    if (box) {
      if (key === 'tornado-warning') box.textContent = `Tornado Warnings: ${value}`;
      if (key === 'severe-thunderstorm-warning') box.textContent = `Severe Thunderstorm Warnings: ${value}`;
      if (key === 'severe-watch') box.textContent = `Severe Watches: ${value}`;
      if (key === 'flood-alert') box.textContent = `Flood Alerts: ${value}`;
      if (key === 'flood-watch') box.textContent = `Flood Watches: ${value}`;
    }
  }
}

updateAlertCounts();
setInterval(updateAlertCounts, 60000); // every 60 seconds
