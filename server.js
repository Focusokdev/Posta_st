'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, 'public');
const DATA_DIR = path.resolve(__dirname, 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

// Asegurar que el directorio data existe
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readOrders() {
  try {
    if (!fs.existsSync(ORDERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(ORDERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.warn('Error leyendo órdenes:', error);
    return [];
  }
}

function writeOrders(orders) {
  try {
    ensureDataDir();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Error escribiendo órdenes:', error);
  }
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };
}

const server = http.createServer((request, response) => {
  Object.entries(corsHeaders()).forEach(([key, val]) => {
    response.setHeader(key, val);
  });

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url, 'http://localhost');
  const pathname = decodeURIComponent(url.pathname);

  // API: GET /api/orders
  if (pathname === '/api/orders' && request.method === 'GET') {
    const orders = readOrders();
    response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify(orders));
    return;
  }

  // API: POST /api/orders
  if (pathname === '/api/orders' && request.method === 'POST') {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk.toString();
    });
    request.on('end', () => {
      try {
        const payload = JSON.parse(body);
        const orders = readOrders();
        const orderId = `POSTA-${Date.now()}`;
        const order = {
          id: orderId,
          ...payload,
          status: 'pendiente',
          createdAt: new Date().toISOString()
        };
        orders.push(order);
        writeOrders(orders);
        response.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ ok: true, orderId }));
      } catch (error) {
        response.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        response.end(JSON.stringify({ error: 'Payload inválido' }));
      }
    });
    return;
  }

  // Servir archivos estáticos
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  const filePath = path.resolve(ROOT, relative);

  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      const status = error.code === 'ENOENT' ? 404 : 500;
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(status === 404 ? 'Not found' : 'Internal server error');
      return;
    }
    response.writeHead(200, {
      'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    response.end(content);
  });
});

const port = Number(process.env.PORT || 3000);
server.listen(port, '0.0.0.0', () => {
  console.log(`Posta design preview listening on 0.0.0.0:${port}`);
});
