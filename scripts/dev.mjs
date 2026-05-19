import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(".");
const backendDir = resolve(root, "backend");
const venvPython = resolve(backendDir, ".venv", "Scripts", "python.exe");
const python = existsSync(venvPython) ? venvPython : "python";
const processes = [];

await runBuild();

start("backend", python, ["-m", "uvicorn", "main:app", "--reload", "--port", "8001"], {
  cwd: backendDir,
});

start("frontend", "node", ["scripts/serve-dist.mjs"], {
  cwd: root,
});

console.log("");
console.log("Frontend: http://127.0.0.1:5180/menu/");
console.log("Backend:  http://127.0.0.1:8001");
console.log("Presiona Ctrl+C para detener todo.");

process.on("SIGINT", stopAll);
process.on("SIGTERM", stopAll);

function runBuild() {
  return new Promise((resolveBuild, rejectBuild) => {
    const build = spawn("node", ["scripts/build-frontends.mjs"], {
      cwd: root,
      stdio: "inherit",
      windowsHide: true,
    });

    build.on("exit", (code) => {
      if (code === 0) {
        resolveBuild();
        return;
      }

      rejectBuild(new Error(`Build failed with exit code ${code}`));
    });
  });
}

function start(name, command, args, options = {}) {
  const child = spawn(command, args, {
    ...options,
    stdio: "inherit",
    windowsHide: true,
  });

  processes.push(child);

  child.on("exit", (code) => {
    if (code && code !== 0) {
      console.error(`${name} exited with code ${code}`);
      stopAll();
    }
  });
}

function stopAll() {
  for (const child of processes) {
    if (!child.killed) {
      child.kill();
    }
  }

  process.exit(0);
}
