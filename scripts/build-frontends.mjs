import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const builds = [
  {
    from: resolve(root, "frontend"),
    to: resolve(dist, "control"),
  },
  {
    from: resolve(root, "frontend-messages"),
    to: resolve(dist, "messages"),
  },
];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const build of builds) {
  await cp(build.from, build.to, { recursive: true });
}

console.log("Build completo:");
console.log("- dist/control");
console.log("- dist/messages");
