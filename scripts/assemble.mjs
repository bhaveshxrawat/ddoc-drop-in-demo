// Puts both built apps under one static site: /latest/ and /drop-in/.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const version = (app) =>
  JSON.parse(
    readFileSync(`${app}/node_modules/@fileverse-dev/ddoc/package.json`, 'utf8'),
  ).version;

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
cpSync('latest/dist', 'dist/latest', { recursive: true });
cpSync('drop-in/dist', 'dist/drop-in', { recursive: true });

writeFileSync(
  'dist/index.html',
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>dDoc drop-in demo</title>
    <style>
      body { margin: 0; min-height: 100vh; display: grid; place-items: center; font: 16px/1.5 system-ui, sans-serif; background: #f1f5f9; color: #0f172a; }
      main { max-width: 720px; padding: 24px; }
      h1 { font-size: 24px; margin: 0 0 8px; }
      p { margin: 0 0 24px; color: #475569; }
      .apps { display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); }
      a { display: block; padding: 20px; border-radius: 12px; background: #fff; border: 1px solid #cbd5e1; color: inherit; text-decoration: none; }
      a:hover { border-color: #0f172a; }
      strong { display: block; font-size: 18px; }
      span { color: #475569; font-size: 14px; }
    </style>
  </head>
  <body>
    <main>
      <h1>dDoc drop-in demo</h1>
      <p>The same host app around two versions of <code>@fileverse-dev/ddoc</code>. Open both and switch scenarios from the bar at the bottom.</p>
      <div class="apps">
        <a href="/latest/"><strong>Before: ${version('latest')}</strong><span>The editor sizes itself from the window.</span></a>
        <a href="/drop-in/"><strong>After: ${version('drop-in')}</strong><span>The editor fills whatever box the host gives it.</span></a>
      </div>
    </main>
  </body>
</html>
`,
);
