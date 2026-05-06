'use strict';

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[character]));
}

function renderHomePage(metadata) {
  const safeEnvironment = escapeHtml(metadata.environment);
  const safeVersion = escapeHtml(metadata.version);
  const safeUptime = escapeHtml(`${metadata.uptimeSeconds}s`);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevOps Practical Challenge</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      min-height: 100vh;
      font-family: Arial, Helvetica, sans-serif;
      background: #f6f8fb;
      color: #162033;
      display: grid;
      place-items: center;
      padding: 24px;
    }

    main {
      width: min(720px, 100%);
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 8px;
      box-shadow: 0 16px 40px rgba(22, 32, 51, 0.08);
      overflow: hidden;
    }

    header {
      padding: 28px 32px;
      border-bottom: 1px solid #dbe3ef;
      background: #0f766e;
      color: #ffffff;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 1.75rem;
      line-height: 1.2;
      letter-spacing: 0;
    }

    .subtitle {
      margin: 0;
      color: #d7fffb;
    }

    .content {
      padding: 28px 32px 32px;
    }

    .status {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid #9de8d9;
      border-radius: 999px;
      background: #ecfdf5;
      color: #047857;
      font-weight: 700;
      margin-bottom: 24px;
    }

    .status-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #10b981;
    }

    dl {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      margin: 0;
    }

    .metric {
      border: 1px solid #dbe3ef;
      border-radius: 8px;
      padding: 16px;
      min-width: 0;
      background: #fbfdff;
    }

    dt {
      margin: 0 0 8px;
      color: #667085;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0;
    }

    dd {
      margin: 0;
      color: #162033;
      font-size: 1rem;
      font-weight: 700;
      overflow-wrap: anywhere;
    }

    @media (max-width: 640px) {
      main {
        border-radius: 8px;
      }

      header,
      .content {
        padding: 22px;
      }

      dl {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <main>
    <header>
      <h1>DevOps Practical Challenge</h1>
      <p class="subtitle">Production ECS Fargate deployment status</p>
    </header>
    <section class="content">
      <div class="status"><span class="status-dot"></span>Service is running</div>
      <dl>
        <div class="metric">
          <dt>Environment</dt>
          <dd>${safeEnvironment}</dd>
        </div>
        <div class="metric">
          <dt>Version</dt>
          <dd>${safeVersion}</dd>
        </div>
        <div class="metric">
          <dt>Uptime</dt>
          <dd>${safeUptime}</dd>
        </div>
      </dl>
    </section>
  </main>
</body>
</html>`;
}

module.exports = { renderHomePage };
