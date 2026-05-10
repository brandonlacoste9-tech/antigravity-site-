export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>CRITICAL_ERROR | PROTOCOL_INTERRUPTED</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { 
        font: 14px/1.5 ui-monospace, 'JetBrains Mono', monospace; 
        background: #060608; 
        color: #00F2FF; 
        display: grid; 
        place-items: center; 
        min-height: 100vh; 
        margin: 0; 
        padding: 1.5rem; 
      }
      .card { 
        max-width: 32rem; 
        width: 100%; 
        border: 1px solid #00F2FF44;
        padding: 2.5rem; 
        background: #ffffff05;
        backdrop-filter: blur(10px);
      }
      h1 { font-size: 1.5rem; margin: 0 0 1rem; letter-spacing: -0.05em; font-weight: 900; color: #fff; }
      p { color: #00F2FF88; margin: 0 0 2rem; }
      .actions { display: flex; gap: 1rem; }
      a, button { 
        padding: 0.75rem 1.5rem; 
        font-weight: 900;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        font-size: 10px;
        cursor: pointer; 
        text-decoration: none; 
        border: 1px solid #00F2FF44; 
        transition: all 0.2s;
      }
      .primary { background: #00F2FF; color: #060608; border-color: #00F2FF; }
      .primary:hover { background: #fff; border-color: #fff; }
      .secondary { background: transparent; color: #00F2FF; }
      .secondary:hover { background: #00F2FF11; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>[SYSTEM_EXCEPTION]</h1>
      <p>The Antigravity protocol has encountered an unexpected interrupt. Connection to neural node lost.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Re-Sync</button>
        <a class="secondary" href="/">Return to Root</a>
      </div>
    </div>
  </body>
</html>`;
}
