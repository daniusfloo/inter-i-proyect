import { getMenuSections } from "./api.js";

const tabs = document.querySelectorAll(".menu-tab");
const contentPanel = document.querySelector("#contentPanel");
const sections = getMenuSections();

const activeTabClasses = ["bg-teal-700", "text-white", "border-teal-700"];
const inactiveTabClasses = [
  "bg-white",
  "text-slate-700",
  "border-slate-200",
  "hover:bg-slate-50",
];
const loginRoutes = {
  dada: {
    password: "123",
    buildPath: "../control/",
    sourcePath: "../frontend/index.html",
  },
  dandan: {
    password: "321",
    buildPath: "../route/",
    sourcePath: "../frontend-route/index.html",
  },
  nadnad: {
    password: "213",
    buildPath: "../messages/",
    sourcePath: "../frontend-messages/index.html",
  },
};

function setupTabs() {
  tabs.forEach((tab) => {
    tab.classList.add(
      "min-h-12",
      "rounded-lg",
      "border",
      "px-4",
      "text-sm",
      "font-bold",
      "transition",
    );

    tab.addEventListener("click", () => {
      renderSection(tab.dataset.section);
    });
  });
}

function renderSection(sectionId) {
  const section = sections[sectionId] ?? sections.configuraciones;

  tabs.forEach((tab) => {
    const isActive = tab.dataset.section === sectionId;
    tab.classList.remove(...activeTabClasses, ...inactiveTabClasses);
    tab.classList.add(...(isActive ? activeTabClasses : inactiveTabClasses));
  });

  if (section.type === "login") {
    renderLoginSection(section);
    return;
  }

  contentPanel.innerHTML = `
    <p class="text-sm font-bold uppercase text-teal-700">Seccion</p>
    <h2 class="mt-1 text-2xl font-bold text-slate-900">${section.title}</h2>
    <p class="mt-2 max-w-2xl text-slate-500">${section.intro}</p>

    <div class="mt-6 grid gap-3">
      ${section.items
        .map(
          (item) => `
            <article class="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p class="text-slate-700">${item}</p>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderLoginSection(section) {
  contentPanel.innerHTML = `
    <div class="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-center">
      <div>
        <p class="text-sm font-bold uppercase text-teal-700">Cuenta</p>
        <h2 class="mt-1 text-2xl font-bold text-slate-900">${section.title}</h2>
        <p class="mt-2 max-w-2xl text-slate-500">${section.intro}</p>

        <div class="mt-6 rounded-lg border border-teal-100 bg-teal-50 p-4">
          <p class="font-bold text-slate-900">Acceso por cuenta</p>
          <p class="mt-1 text-sm text-slate-600">
            Usa tu usuario y contrasena para entrar al panel asignado.
          </p>
        </div>
      </div>

      <form id="loginForm" class="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div class="grid gap-4">
          <label class="grid gap-2 text-sm font-bold text-slate-600">
            Usuario
            <input
              id="usernameInput"
              class="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              type="text"
              placeholder="usuario"
            />
          </label>

          <label class="grid gap-2 text-sm font-bold text-slate-600">
            Contrasena
            <input
              id="passwordInput"
              class="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              type="password"
              placeholder="********"
            />
          </label>

          <button
            class="min-h-11 rounded-md bg-teal-700 px-4 font-bold text-white"
            type="submit"
          >
            Iniciar sesion
          </button>

          <button
            class="min-h-11 rounded-md bg-white px-4 font-bold text-slate-700 ring-1 ring-slate-200"
            type="button"
          >
            Recuperar acceso
          </button>
          <p id="loginMessage" class="hidden text-sm font-bold text-rose-700"></p>
        </div>
      </form>
    </div>
  `;

  document.querySelector("#loginForm").addEventListener("submit", handleLogin);
}

function handleLogin(event) {
  event.preventDefault();

  const username = document.querySelector("#usernameInput").value.trim();
  const password = document.querySelector("#passwordInput").value;
  const message = document.querySelector("#loginMessage");
  const route = loginRoutes[username];

  if (!route || route.password !== password) {
    message.textContent = "Usuario o contrasena incorrectos.";
    message.classList.remove("hidden");
    return;
  }

  window.location.href = isSourceMenu() ? route.sourcePath : route.buildPath;
}

function isSourceMenu() {
  return window.location.pathname.includes("frontend-menu");
}

setupTabs();
renderSection("configuraciones");
