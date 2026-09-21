// Foreground static server for dist/ so Playwright's webServer can own the
// process (astro preview daemonises in this environment). Mirrors astro
// preview's routing: /x/ → /x/index.html, unknown → 404.html.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL("../../dist/", import.meta.url).pathname;
const port = Number(process.env.PORT || 4321);
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".json": "application/json" };

async function resolve(url) {
  let p = normalize(decodeURIComponent(url.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  if (p.endsWith("/")) p += "index.html";
  const file = join(root, p);
  try { if ((await stat(file)).isFile()) return [200, file]; } catch {}
  try { const dir = join(root, p, "index.html"); if ((await stat(dir)).isFile()) return [200, dir]; } catch {}
  return [404, join(root, "404.html")];
}

createServer(async (req, res) => {
  const [status, file] = await resolve(req.url || "/");
  try {
    const body = await readFile(file);
    res.writeHead(status, { "content-type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404); res.end("not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`serving dist/ at http://127.0.0.1:${port}`));
