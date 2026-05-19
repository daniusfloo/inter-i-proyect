import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve } from "node:path";

const root = resolve("dist-browser");
const port = 5180;
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://127.0.0.1:${port}`);
    if (url.pathname === "/") {
      response.writeHead(302, { Location: "/menu/" });
      response.end();
      return;
    }

    const requestPath = url.pathname.endsWith("/")
      ? `${url.pathname}index.html`
      : url.pathname;
    const filePath = resolve(root, `.${decodeURIComponent(requestPath)}`);

    if (!filePath.toLowerCase().startsWith(root.toLowerCase())) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mimeTypes[extname(filePath)] ?? "application/octet-stream",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(404);
    response.end("Not found");
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static server running at http://127.0.0.1:${port}`);
});
