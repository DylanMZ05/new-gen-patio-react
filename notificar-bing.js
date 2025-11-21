// notificar-bing.js
import https from 'https';

// CONFIGURACIÓN
const HOST = "www.newgenpatio.com/";
const KEY = "7b3a0962ae044841ab1868b11e470247"; // La misma que está en public
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// LISTA DE URLS (Pon aquí las rutas principales que cambiaron)
const urlList = [
  `https://${HOST}/`,
  `https://${HOST}/outdoor-living-services`,
  `https://${HOST}/aluminium-custom-pergola-cover-patio`,
  `https://${HOST}/attached-aluminium-pergola-covered-patio`,
  `https://${HOST}/free-standing-aluminium-pergola-covered-patio`,
  `https://${HOST}/cantilever-aluminium-pergola`,
  `https://${HOST}/custom-outdoor-kitchen`,
  `https://${HOST}/modern-outdoor-kitchens-houston`,
  `https://${HOST}/traditional-outdoor-kitchens-houston`,
  `https://${HOST}/concrete-and-turf-installation-houston`,
  `https://${HOST}/how-we-doit`,
  `https://${HOST}/our-promise`,
  `https://${HOST}/about-us`,
  `https://${HOST}/blog`,
  `https://${HOST}/contact-us`,
  `https://${HOST}/get-a-free-quote-houston`,
];

const data = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  console.log(`Estado: ${res.statusCode}`);
  res.on('data', d => process.stdout.write(d));
});

req.on('error', error => console.error(error));
req.write(data);
req.end();

console.log("Enviando notificación a Bing/IndexNow...");