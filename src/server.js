'use strict';

const http = require('node:http');

const startedAt = new Date();
const version = process.env.APP_VERSION || 'local';
const environment = process.env.APP_ENV || process.env.NODE_ENV || 'development';
const port = Number(process.env.PORT || 3000);

function writeJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(body),
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function logRequest(req, statusCode, durationMs) {
  const entry = {
    level: statusCode >= 500 ? 'error' : 'info',
    message: 'request_completed',
    method: req.method,
    path: req.url,
    statusCode,
    durationMs,
    timestamp: new Date().toISOString()
  };
  console.log(JSON.stringify(entry));
}

function createServer() {
  return http.createServer((req, res) => {
    const started = process.hrtime.bigint();

    res.on('finish', () => {
      const elapsed = Number(process.hrtime.bigint() - started) / 1_000_000;
      logRequest(req, res.statusCode, Number(elapsed.toFixed(2)));
    });

    if (req.method !== 'GET') {
      writeJson(res, 405, { error: 'method_not_allowed' });
      return;
    }

    if (req.url === '/' || req.url === '/index.html') {
      writeJson(res, 200, {
        service: 'devops-practical-challenge',
        message: 'Service is running',
        version,
        environment,
        uptimeSeconds: Math.floor(process.uptime())
      });
      return;
    }

    if (req.url === '/health' || req.url === '/ready') {
      writeJson(res, 200, {
        status: 'ok',
        startedAt: startedAt.toISOString(),
        version
      });
      return;
    }

    writeJson(res, 404, { error: 'not_found' });
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(port, () => {
    console.log(JSON.stringify({
      level: 'info',
      message: 'server_started',
      port,
      environment,
      version,
      timestamp: new Date().toISOString()
    }));
  });
}


module.exports = { createServer };
