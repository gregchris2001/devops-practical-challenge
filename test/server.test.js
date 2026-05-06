'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');
const { createServer } = require('../src/server');

async function startTestServer() {
  const server = createServer();

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));

  const { port } = server.address();
  const close = () => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });

  return {
    baseUrl: `http://127.0.0.1:${port}`,
    close
  };
}

test('GET /health returns service health', async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, 'ok');
    assert.ok(body.startedAt);
  } finally {
    await server.close();
  }
});

test('GET / returns status page', async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^text\/html/);
    assert.match(body, /DevOps Practical Challenge/);
    assert.match(body, /Service is running/);
  } finally {
    await server.close();
  }
});

test('unknown routes return 404', async () => {
  const server = await startTestServer();

  try {
    const response = await fetch(`${server.baseUrl}/missing`);
    const body = await response.json();

    assert.equal(response.status, 404);
    assert.equal(body.error, 'not_found');
  } finally {
    await server.close();
  }
});
