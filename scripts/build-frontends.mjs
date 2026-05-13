import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const browserDist = resolve(root, "dist-browser");

const builds = [
  {
    from: resolve(root, "frontend"),
    to: resolve(dist, "control"),
    browserTo: resolve(browserDist, "control"),
  },
  {
    from: resolve(root, "frontend-messages"),
    to: resolve(dist, "messages"),
    browserTo: resolve(browserDist, "messages"),
  },
];

await rm(dist, { recursive: true, force: true });
await rm(browserDist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await mkdir(browserDist, { recursive: true });

for (const build of builds) {
  await cp(build.from, build.to, { recursive: true });
  await cp(build.from, build.browserTo, { recursive: true });
  await createBrowserBundle(build.from, build.browserTo);
}

console.log("Build completo:");
console.log("- dist/control");
console.log("- dist/messages");
console.log("- dist-browser/control");
console.log("- dist-browser/messages");

async function createBrowserBundle(sourceDir, targetDir) {
  const apiPath = resolve(sourceDir, "api.js");
  const appPath = resolve(sourceDir, "app.js");
  const indexPath = resolve(targetDir, "index.html");
  const bundlePath = resolve(targetDir, "browser.js");

  const api = await readFile(apiPath, "utf8");
  const app = await readFile(appPath, "utf8");
  const index = await readFile(indexPath, "utf8");

  const browserApi = api.replaceAll("export function", "function");
  const browserApp = app.replace(/import[\s\S]*?from "\.\/api\.js";\r?\n\r?\n/, "");
  const browserIndex = index.replace(
    '<script type="module" src="app.js"></script>',
    '<script src="browser.js"></script>',
  );

  await writeFile(bundlePath, `${browserApi}\n\n${browserApp}`);
  await writeFile(indexPath, browserIndex);
}
