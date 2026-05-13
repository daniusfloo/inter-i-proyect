function getMenuSections() {
  return {
    configuraciones: {
      title: "Configuraciones",
      intro: "Opciones generales para preparar el uso del sistema.",
      items: [
        "configuraciones de alertas",
        "configuracion de rutas",
        "configuracion de maps",
      ],
    },
    ayuda: {
      title: "Ayuda",
      intro: "Guia rapida para entender las pantallas disponibles.",
      items: [
        "no se puede iniciar sesion",
        "atencion al cliente",
        "modo conducir",
      ],
    },
    registro: {
      title: "Acceso a cuenta",
      intro: "Formulario visual para iniciar sesion en el sistema.",
      type: "login",
      items: [],
    },
    informacion: {
      title: "Informacion",
      intro: "Datos generales de S.E.A.",
      items: [
        "S.E.A significa Servicio de Emergencia en Ambulancia.",
        "El sistema muestra ambulancias, hospitales y ubicaciones de emergencia.",
        "La vista de mensajes esta pensada para recibir informacion sin modificarla.",
      ],
    },
    numeros: {
      title: "Numeros de emergencia",
      intro: "Contactos utiles para situaciones criticas.",
      items: [
        "Emergencias Costa Rica: 9-1-1.",
        "Cruz Roja Costarricense: consulta local segun region.",
        "Bomberos: 9-1-1 para atencion inmediata.",
      ],
    },
  };
}


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
          <p class="font-bold text-slate-900">Acceso visual</p>
          <p class="mt-1 text-sm text-slate-600">
            Este formulario es solo una maqueta. No valida credenciales ni envia informacion.
          </p>
        </div>
      </div>

      <form class="rounded-lg border border-slate-200 bg-slate-50 p-5">
        <div class="grid gap-4">
          <label class="grid gap-2 text-sm font-bold text-slate-600">
            Usuario
            <input
              class="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              type="text"
              placeholder="usuario@sea.local"
            />
          </label>

          <label class="grid gap-2 text-sm font-bold text-slate-600">
            Contrasena
            <input
              class="min-h-11 rounded-md border border-slate-300 bg-white px-3 text-slate-900 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              type="password"
              placeholder="********"
            />
          </label>

          <button
            class="min-h-11 rounded-md bg-teal-700 px-4 font-bold text-white"
            type="button"
          >
            Iniciar sesion
          </button>

          <button
            class="min-h-11 rounded-md bg-white px-4 font-bold text-slate-700 ring-1 ring-slate-200"
            type="button"
          >
            Recuperar acceso
          </button>
        </div>
      </form>
    </div>
  `;
}

setupTabs();
renderSection("configuraciones");
