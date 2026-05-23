const API_URL = "http://127.0.0.1:8001";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

function askHealthAi(message, agent) {
  return request("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message, agent }),
  });
}

function getAmbulances() {
  return request("/api/ambulances");
}

function createAmbulance(ambulance) {
  return request("/api/ambulances", {
    method: "POST",
    body: JSON.stringify(ambulance),
  });
}

function getMenuSections() {
  return {
    inicio: {
      title: "Inicio",
      intro: "Mapa abierto para rastrear rutas y puntos de referencia en Costa Rica.",
      type: "home",
    },
    configuraciones: {
      title: "Ajustes",
      intro: "Opciones generales para preparar el uso del sistema.",
      type: "settings",
    },
    tracking: {
      title: "Ambulancias S.E.A.",
      intro: "Flota operativa del Servicio de Emergencia en Ambulancia.",
      type: "tracking",
    },
    personas: {
      title: "Personas",
      intro: "Personal operativo registrado para apoyar ambulancias y emergencias.",
      type: "people",
    },
    directorio: {
      title: "Directorio",
      intro: "Telefonos de hospitales, clinicas y contactos medicos de Costa Rica.",
      type: "directory",
    },
  };
}


const tabs = document.querySelectorAll(".menu-tab");
const contentPanel = document.querySelector("#contentPanel");
const signupScreen = document.querySelector("#signupScreen");
const signupForm = document.querySelector("#signupForm");
const createAccountBtn = document.querySelector("#createAccountBtn");
const signupModal = document.querySelector("#signupModal");
const signupModalBackdrop = document.querySelector("#signupModalBackdrop");
const closeSignupModal = document.querySelector("#closeSignupModal");
const createAccountForm = document.querySelector("#createAccountForm");
const modalPassword = document.querySelector("#modalPassword");
const toggleModalPassword = document.querySelector("#toggleModalPassword");
const signinFromModal = document.querySelector("#signinFromModal");
const topLogoutBtn = document.querySelector("#topLogoutBtn");
const topNav = document.querySelector("#topNav");
const homeLogoBtn = document.querySelector("#homeLogoBtn");
const ambulanceIconBtn = document.querySelector("#ambulanceIconBtn");
const settingsIconBtn = document.querySelector("#settingsIconBtn");
const menuHero = document.querySelector("#menuHero");
const menuTabs = document.querySelector("#menuTabs");
const systemContent = document.querySelector("#systemContent");
const helpWidget = document.querySelector("#helpWidget");
const helpToggleBtn = document.querySelector("#helpToggleBtn");
const helpCloseBtn = document.querySelector("#helpCloseBtn");
const helpOpenIcon = document.querySelector("#helpOpenIcon");
const helpCloseIcon = document.querySelector("#helpCloseIcon");
const helpAgentSelect = document.querySelector("#helpAgentSelect");
const helpAgentAvatar = document.querySelector("#helpAgentAvatar");
const helpAgentStatus = document.querySelector("#helpAgentStatus");
const helpAgentName = document.querySelector("#helpAgentName");
const helpAgentRole = document.querySelector("#helpAgentRole");
const helpWidgetGlow = document.querySelector("#helpWidgetGlow");
const helpMessages = document.querySelector("#helpMessages");
const helpEmptyState = document.querySelector("#helpEmptyState");
const helpForm = document.querySelector("#helpForm");
const helpInput = document.querySelector("#helpInput");
const helpSendBtn = document.querySelector("#helpSendBtn");
const sections = getMenuSections();
const translations = {
  es: {
    navHome: "Inicio",
    navTracking: "Ambulancias",
    navPeople: "Personas",
    navDirectory: "Directorio",
    navSettings: "Ajustes",
    emergency: "EMERGENCIA 911",
    heroTitle: "S.E.A: Servicio de Emergencia en Ambulancia",
    heroSubtitle: "Sistema para coordinar ambulancias, personal y mensajes de emergencia.",
    coverageTitle: "Cobertura",
    coverageText: "San Jose y Alajuela",
    reliableTitle: "Confiable",
    reliableText: "Datos operativos",
    updatedTitle: "Actualizado",
    updatedText: "Panel 24/7",
    supportTitle: "Soporte",
    supportText: "Equipo profesional",
    settingsTitle: "Ajustes",
    settingsSubtitle: "Personaliza tu experiencia y la configuracion del sistema.",
    settingsGeneral: "Configuracion general",
    settingsGeneralIntro: "Administra las opciones generales del sistema.",
    settingsLanguage: "Idioma",
    settingsLanguageIntro: "Selecciona el idioma de la interfaz.",
    pageTheme: "Tema de la pagina",
    pageThemeIntro: "Elige el tema de visualizacion que prefieras.",
    light: "Claro",
    dark: "Oscuro",
    safe: "Seguro",
    safeText: "Tus datos estan protegidos",
    realtime: "En tiempo real",
    realtimeText: "Informacion actualizada",
    customizable: "Personalizable",
    customizableText: "Ajusta alertas y rutas",
    notifications: "Notificaciones",
    notificationsText: "Alertas y avisos",
    routes: "Rutas",
    routesText: "Preferencias de ruta",
    languageRegion: "Idioma y region",
    languageRegionText: "Idioma y formato",
    appearance: "Apariencia",
    appearanceText: "Tema y visualizacion",
    pushNotifications: "Notificaciones push",
    pushNotificationsText: "Recibe alertas importantes en tiempo real.",
    realtimeUpdate: "Actualizacion en tiempo real",
    realtimeUpdateText: "Manten la informacion del mapa y rutas actualizadas.",
    routeOptimization: "Optimizacion de rutas",
    routeOptimizationText: "Usa el motor de rutas optimizadas automaticamente.",
  },
  en: {
    navHome: "Home",
    navTracking: "Ambulances",
    navPeople: "People",
    navDirectory: "Directory",
    navSettings: "Settings",
    emergency: "EMERGENCY 911",
    heroTitle: "S.E.A: Ambulance Emergency Service",
    heroSubtitle: "System for coordinating ambulances, staff, and emergency messages.",
    coverageTitle: "Coverage",
    coverageText: "San Jose and Alajuela",
    reliableTitle: "Reliable",
    reliableText: "Operational data",
    updatedTitle: "Updated",
    updatedText: "24/7 panel",
    supportTitle: "Support",
    supportText: "Professional team",
    settingsTitle: "Settings",
    settingsSubtitle: "Personalize your experience and system configuration.",
    settingsGeneral: "General configuration",
    settingsGeneralIntro: "Manage the system's general options.",
    settingsLanguage: "Language",
    settingsLanguageIntro: "Select the interface language.",
    pageTheme: "Page theme",
    pageThemeIntro: "Choose your preferred visual theme.",
    light: "Light",
    dark: "Dark",
    safe: "Secure",
    safeText: "Your data is protected",
    realtime: "Real time",
    realtimeText: "Updated information",
    customizable: "Customizable",
    customizableText: "Adjust alerts and routes",
    notifications: "Notifications",
    notificationsText: "Alerts and notices",
    routes: "Routes",
    routesText: "Route preferences",
    languageRegion: "Language and region",
    languageRegionText: "Language and format",
    appearance: "Appearance",
    appearanceText: "Theme and display",
    pushNotifications: "Push notifications",
    pushNotificationsText: "Receive important alerts in real time.",
    realtimeUpdate: "Real-time updates",
    realtimeUpdateText: "Keep map and route information updated.",
    routeOptimization: "Route optimization",
    routeOptimizationText: "Use the optimized route engine automatically.",
  },
};
let currentLanguage = localStorage.getItem("seaLanguage") || "es";
let currentTheme = localStorage.getItem("seaTheme") || "light";
let isHelpOpen = false;
let homeTrackingMap = null;
let homeTrackingRouteLayer = null;
let homeTrackingMarkerLayer = null;
const costaRicaBounds = [
  [8.03, -85.95],
  [11.22, -82.45],
];
const knownCostaRicaPlaces = [
  { keywords: ["hospital mexico", "mexico"], label: "Hospital Mexico, San Jose, Costa Rica", latitude: 9.9616, longitude: -84.1149 },
  { keywords: ["hospital calderon guardia", "calderon"], label: "Hospital Calderon Guardia, San Jose, Costa Rica", latitude: 9.9367, longitude: -84.0667 },
  { keywords: ["hospital san juan de dios", "san juan"], label: "Hospital San Juan de Dios, San Jose, Costa Rica", latitude: 9.9342, longitude: -84.0869 },
  { keywords: ["hospital san rafael", "san rafael"], label: "Hospital San Rafael, Alajuela, Costa Rica", latitude: 10.0162, longitude: -84.2144 },
  { keywords: ["hospital nacional de ninos", "hospital de ninos", "ninos"], label: "Hospital Nacional de Ninos, San Jose, Costa Rica", latitude: 9.9339, longitude: -84.0858 },
  { keywords: ["clinica biblica", "biblica"], label: "Clinica Biblica, San Jose, Costa Rica", latitude: 9.9289, longitude: -84.0758 },
  { keywords: ["san jose", "san jose centro"], label: "San Jose, Costa Rica", latitude: 9.9281, longitude: -84.0907 },
  { keywords: ["alajuela"], label: "Alajuela, Costa Rica", latitude: 10.0162, longitude: -84.2116 },
  { keywords: ["cartago"], label: "Cartago, Costa Rica", latitude: 9.8644, longitude: -83.9194 },
  { keywords: ["heredia"], label: "Heredia, Costa Rica", latitude: 9.9981, longitude: -84.1198 },
  { keywords: ["limon", "puerto limon"], label: "Limon, Costa Rica", latitude: 9.9911, longitude: -83.0350 },
  { keywords: ["puntarenas"], label: "Puntarenas, Costa Rica", latitude: 9.9763, longitude: -84.8384 },
  { keywords: ["guanacaste", "liberia"], label: "Liberia, Guanacaste, Costa Rica", latitude: 10.6346, longitude: -85.4407 },
  { keywords: ["san carlos", "ciudad quesada"], label: "Ciudad Quesada, San Carlos, Costa Rica", latitude: 10.3238, longitude: -84.4271 },
  { keywords: ["perez zeledon", "san isidro"], label: "San Isidro de El General, Costa Rica", latitude: 9.3721, longitude: -83.7039 },
];
const helpAgents = {
  salud: {
    name: "IA S.E.A",
    role: "Asistente abierto",
    avatar: "OS",
    status: "online",
    gradient: "from-emerald-500/20 to-blue-500/20",
    color: "bg-emerald-600",
  },
  emergencias: {
    name: "Emergencias",
    role: "Orientacion rapida",
    avatar: "911",
    status: "online",
    gradient: "from-red-500/20 to-orange-500/20",
    color: "bg-red-600",
  },
  directorio: {
    name: "Directorio",
    role: "Contactos y busqueda",
    avatar: "DR",
    status: "busy",
    gradient: "from-blue-500/20 to-cyan-500/20",
    color: "bg-blue-600",
  },
  protocolos: {
    name: "Operacion",
    role: "Guia operativa",
    avatar: "CC",
    status: "online",
    gradient: "from-violet-500/20 to-blue-500/20",
    color: "bg-violet-600",
  },
};
let directoryEntries = [
  { title: "Emergencias Costa Rica", phone: "911", category: "Emergencia" },
  { title: "Hospital Mexico", phone: "2242-6700 / 2242-6817", category: "Hospital nacional" },
  { title: "Hospital Rafael Angel Calderon Guardia", phone: "2212-1000 / 2212-1200", category: "Hospital nacional" },
  { title: "Hospital San Juan de Dios", phone: "2547-8000 / 2547-8210", category: "Hospital nacional" },
  { title: "Centro Nacional de Rehabilitacion Humberto Araya Rojas", phone: "2232-8233 / 2220-1336", category: "Hospital especializado" },
  { title: "Hospital de las Mujeres Adolfo Carit Eva", phone: "2523-5900 / 2523-5902", category: "Hospital especializado" },
  { title: "Hospital Nacional de Geriatria y Gerontologia Raul Blanco Cervantes", phone: "2542-2100 / 2522-7700", category: "Hospital especializado" },
  { title: "Hospital Nacional de Ninos Carlos Saenz Herrera", phone: "2523-3600 / 2223-1601", category: "Hospital especializado" },
  { title: "Hospital Nacional de Salud Mental Manuel Antonio Chapui y Torres", phone: "2242-6300 / 2232-2155", category: "Hospital especializado" },
  { title: "Hospital Psiquiatrico Roberto Chacon Paut", phone: "2216-6400", category: "Hospital especializado" },
  { title: "Hospital de San Carlos", phone: "2401-1200 / 2401-1325", category: "Hospital regional" },
  { title: "Hospital Enrique Baltodano Briceno", phone: "2690-2300 / 2690-2302", category: "Hospital regional" },
  { title: "Hospital Fernando Escalante Pradilla", phone: "2785-0700 / 2771-0874", category: "Hospital regional" },
  { title: "Hospital Maximiliano Peralta Jimenez", phone: "2550-1999 / 2550-1993", category: "Hospital regional" },
  { title: "Hospital San Rafael", phone: "2436-1001 / 2436-1543", category: "Hospital regional" },
  { title: "Hospital San Vicente de Paul", phone: "2562-8100 / 2563-8352", category: "Hospital regional" },
  { title: "Hospital Tony Facio Castro", phone: "2758-2222 / 2758-0970", category: "Hospital regional" },
  { title: "Hospital Victor Manuel Sanabria Martinez", phone: "2630-8000 / 2630-8025", category: "Hospital regional" },
  { title: "Hospital Los Chiles", phone: "2471-2000", category: "Hospital periferico" },
  { title: "Hospital Manuel Mora Valverde", phone: "2702-2157", category: "Hospital periferico" },
  { title: "Hospital Max Teran Valls", phone: "2774-9500", category: "Hospital periferico" },
  { title: "Hospital Tomas Casas Casajus", phone: "2786-8148 / 2786-4317", category: "Hospital periferico" },
  { title: "Hospital Upala", phone: "2470-0058 / 2480-0011", category: "Hospital periferico" },
  { title: "Hospital de Ciudad Neily", phone: "2785-9600 / 2539-0000 / 2785-9698", category: "Hospital periferico" },
  { title: "Hospital Juana Pirola", phone: "2773-1100", category: "Hospital periferico" },
  { title: "Hospital San Francisco de Asis", phone: "2437-9500 / 2437-9757", category: "Hospital periferico" },
  { title: "Hospital Carlos Luis Valverde Vega", phone: "2456-9700 / 2456-9751", category: "Hospital periferico" },
  { title: "Hospital de Guapiles", phone: "2710-6801 / 2710-2002", category: "Hospital periferico" },
  { title: "Hospital de La Anexion", phone: "2685-8400 / 2685-8473", category: "Hospital periferico" },
  { title: "Hospital William Allen Taylor", phone: "2558-1300 / 2556-1663", category: "Hospital periferico" },
  { title: "Ministerio de Salud", phone: "4003-5000", category: "Institucion" },
  { title: "A.R.S. Carmen-Merced-Uruca", phone: "4003-6900", category: "Clinica / area de salud" },
  { title: "A.R.S. Coronado", phone: "4003-6930", category: "Clinica / area de salud" },
  { title: "A.R.S. Curridabat", phone: "4003-6960", category: "Clinica / area de salud" },
  { title: "A.R.S. Desamparados", phone: "4003-7000", category: "Clinica / area de salud" },
  { title: "A.R.S. Escazu", phone: "4003-7040", category: "Clinica / area de salud" },
  { title: "A.R.S. Goicoechea", phone: "4003-7070", category: "Clinica / area de salud" },
  { title: "A.R.S. Hatillo", phone: "4003-7100", category: "Clinica / area de salud" },
  { title: "A.R.S. Hospital Mata Redonda", phone: "4003-7130", category: "Clinica / area de salud" },
  { title: "A.R.S. Montes de Oca", phone: "4003-7160", category: "Clinica / area de salud" },
];
let peopleEntries = [
  {
    name: "Ana Perez",
    role: "Paramedica",
    zone: "Base Norte",
    phone: "8888-0101",
    status: "Disponible",
    condition: "Sin enfermedad registrada",
    emergencyContact: "Mario Perez - 8999-0101",
    shift: "Diurno",
    company: "S.E.A",
    latitude: 9.9629,
    longitude: -84.0879,
  },
  {
    name: "Luis Rojas",
    role: "Conductor",
    zone: "Base Sur",
    phone: "8888-0202",
    status: "En turno",
    condition: "Hipertension controlada",
    emergencyContact: "Carolina Rojas - 8999-0202",
    shift: "Nocturno",
    company: "S.E.A",
    latitude: 9.8728,
    longitude: -84.0719,
  },
  {
    name: "Mariana Solis",
    role: "Coordinadora",
    zone: "Central",
    phone: "8888-0303",
    status: "Disponible",
    condition: "Sin enfermedad registrada",
    emergencyContact: "Andres Solis - 8999-0303",
    shift: "Mixto",
    company: "S.E.A",
    latitude: 9.9325,
    longitude: -84.08,
  },
];
let criticalPeopleEntries = [
  {
    fullName: "Carlos Mendez Vargas",
    idNumber: "1-1234-0567",
    phone: "8888-1100",
    residence: "San Jose, Hospital, Barrio Mexico",
    emergencyContact: "Laura Vargas - 8999-1100",
    condition: "Diabetes tipo 1",
    insurance: "CCSS activo",
    preferredHospital: "Hospital Mexico",
    latitude: 9.9402,
    longitude: -84.0966,
  },
  {
    fullName: "Sofia Rojas Alfaro",
    idNumber: "2-0987-0456",
    phone: "8888-2200",
    residence: "Alajuela, Centro, El Carmen",
    emergencyContact: "Mario Rojas - 8999-2200",
    condition: "Asma severa",
    insurance: "INS privado",
    preferredHospital: "Hospital San Rafael",
    latitude: 10.0162,
    longitude: -84.2144,
  },
];
let currentPeopleDirectoryTab = "staff";

const activeTabClasses = [
  "border-blue-600",
  "text-blue-700",
];
const inactiveTabClasses = [
  "border-transparent",
  "text-[#071836]",
];

function setupTabs() {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      renderSection(tab.dataset.section);
    });
  });
}

function t(key) {
  return translations[currentLanguage][key] ?? translations.es[key] ?? key;
}

function applyPreferences() {
  currentLanguage = currentLanguage === "en" ? "en" : "es";
  currentTheme = currentTheme === "dark" ? "dark" : "light";
  localStorage.setItem("seaLanguage", currentLanguage);
  localStorage.setItem("seaTheme", currentTheme);
  document.documentElement.dataset.language = currentLanguage;
  document.documentElement.dataset.theme = currentTheme;
  document.body.classList.toggle("sea-dark", currentTheme === "dark");
  document.documentElement.style.colorScheme = currentTheme === "dark" ? "dark" : "light";

  const navLabels = [
    ["inicio", t("navHome")],
    ["tracking", t("navTracking")],
    ["personas", t("navPeople")],
    ["directorio", t("navDirectory")],
    ["configuraciones", t("navSettings")],
  ];
  tabs.forEach((tab, index) => {
    tab.textContent = navLabels[index]?.[1] ?? tab.textContent;
  });

  const emergencyLink = document.querySelector('a[href="tel:911"]');
  if (emergencyLink) {
    const svg = emergencyLink.querySelector("svg")?.outerHTML ?? "";
    emergencyLink.innerHTML = `${svg}${t("emergency")}`;
  }

  const heroTitle = document.querySelector("#menuHero h1");
  const heroSubtitle = document.querySelector("#menuHero p");
  if (heroTitle) heroTitle.textContent = t("heroTitle");
  if (heroSubtitle) heroSubtitle.textContent = t("heroSubtitle");
  updatePreferenceControls();
}

window.setSeaLanguage = (language) => {
  currentLanguage = language === "en" ? "en" : "es";
  localStorage.setItem("seaLanguage", currentLanguage);
  localStorage.setItem("seaSessionActive", "true");
  localStorage.setItem("seaSection", "configuraciones");
  window.location.reload();
};

window.setSeaTheme = (theme) => {
  currentTheme = theme === "dark" ? "dark" : "light";
  localStorage.setItem("seaTheme", currentTheme);
  localStorage.setItem("seaSessionActive", "true");
  localStorage.setItem("seaSection", "configuraciones");
  document.body.classList.toggle("sea-dark", currentTheme === "dark");
  document.documentElement.dataset.theme = currentTheme;
  document.documentElement.style.colorScheme = currentTheme === "dark" ? "dark" : "light";
  window.location.reload();
};

function updatePreferenceControls() {
  const languageSelect = document.querySelector("#languageSelect");
  const lightThemeBtn = document.querySelector("#lightThemeBtn");
  const darkThemeBtn = document.querySelector("#darkThemeBtn");

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }

  lightThemeBtn?.classList.toggle("bg-blue-600", currentTheme === "light");
  lightThemeBtn?.classList.toggle("text-white", currentTheme === "light");
  lightThemeBtn?.classList.toggle("shadow-sm", currentTheme === "light");
  darkThemeBtn?.classList.toggle("bg-blue-600", currentTheme === "dark");
  darkThemeBtn?.classList.toggle("text-white", currentTheme === "dark");
  darkThemeBtn?.classList.toggle("shadow-sm", currentTheme === "dark");
}

function renderSection(sectionId) {
  const section = sections[sectionId] ?? sections.configuraciones;
  if (!signupScreen || signupScreen.classList.contains("hidden")) {
    localStorage.setItem("seaSection", sectionId);
  }
  menuHero.classList.add("hidden");

  tabs.forEach((tab) => {
    const isActive = tab.dataset.section === sectionId;
    tab.classList.remove(...activeTabClasses, ...inactiveTabClasses);
    tab.classList.add(...(isActive ? activeTabClasses : inactiveTabClasses));
  });

  if (section.type === "home") {
    contentPanel.innerHTML = `
      <div class="grid gap-7">
        <section class="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#071836_0%,#0b2a5b_52%,#e21d2d_100%)] p-7 text-white shadow-2xl shadow-blue-950/20">
          <p class="text-sm font-black uppercase text-red-100">Rastreador abierto</p>
          <h1 class="mt-2 text-4xl font-black leading-tight md:text-5xl">Inicio</h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-blue-50">
            Mapa de Costa Rica para revisar rutas entre origen y destino usando herramientas abiertas.
          </p>
        </section>

        <div class="grid gap-5 lg:grid-cols-[360px_1fr]">
          <aside class="grid content-start gap-4">
            <form id="homeRouteForm" class="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
              <p class="text-xs font-black uppercase text-red-600">Calcular ruta</p>
              <h2 class="mt-2 text-2xl font-black text-[#071836]">Rastreador de mapa</h2>
              <p class="mt-3 text-sm leading-6 text-slate-600">Escribe un punto de origen y destino para dibujar la ruta.</p>
              <label class="mt-6 grid gap-2 text-sm font-bold text-[#071836]">
                Origen
                <input id="homeRouteStartInput" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" value="Hospital Mexico" required />
              </label>
              <label class="mt-4 grid gap-2 text-sm font-bold text-[#071836]">
                Destino
                <input id="homeRouteEndInput" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" value="Hospital Calderon Guardia" required />
              </label>
              <button class="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]" type="submit">
                Calcular ruta
              </button>
            </form>
            <p id="homeRouteStatus" class="rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm font-bold leading-6 text-slate-700 shadow-sm">
              Mapa con OpenStreetMap, Leaflet y OSRM.
            </p>
          </aside>
          <section class="overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div class="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <p class="text-sm font-black uppercase text-blue-700">Mapa de Costa Rica</p>
              <span class="rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700">Codigo abierto</span>
            </div>
            <div class="overflow-hidden rounded-md border border-slate-100 bg-slate-50">
              <div id="homeTrackingMap"></div>
            </div>
          </section>
        </div>
      </div>
    `;
    requestAnimationFrame(setupHomeTrackingMap);
    return;
  }

  if (section.type === "tracking") {
    contentPanel.innerHTML = `
      <div class="grid gap-7">
        <section class="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#071836_0%,#0b2a5b_52%,#e21d2d_100%)] p-7 text-white shadow-2xl shadow-blue-950/20">
          <div class="grid gap-7 lg:grid-cols-[1fr_340px] lg:items-end">
            <div>
              <p class="text-sm font-black uppercase text-red-100">Servicio de Emergencia en Ambulancia</p>
              <h1 class="mt-2 text-4xl font-black leading-tight md:text-5xl">Ambulancias S.E.A.</h1>
              <p class="mt-4 max-w-2xl text-base leading-7 text-blue-50">
                Panel de flota para revisar unidades, conductores y disponibilidad operativa de la empresa.
              </p>
            </div>
            <div class="grid gap-3 rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
              <p class="text-sm font-bold text-blue-50">Estado general</p>
              <div class="grid grid-cols-2 gap-3">
                <article class="rounded-lg bg-white/12 p-4">
                  <p id="ambulanceAvailableCount" class="text-3xl font-black">--</p>
                  <p class="mt-1 text-xs font-bold uppercase text-blue-50">Disponibles</p>
                </article>
                <article class="rounded-lg bg-white/12 p-4">
                  <p id="ambulanceActiveCount" class="text-3xl font-black">--</p>
                  <p class="mt-1 text-xs font-bold uppercase text-blue-50">En servicio</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p class="text-sm font-black uppercase text-red-600">Registro</p>
              <h2 class="mt-1 text-2xl font-black text-[#071836]">Agregar ambulancia</h2>
            </div>
            <button id="toggleAmbulanceFormBtn" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[.98]" type="button">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              Agregar ambulancia
            </button>
          </div>

          <form id="ambulanceForm" class="mt-6 hidden grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            ${renderAmbulanceInput("ambulanceNameInput", "Nombre", "Unidad S.E.A-03")}
            ${renderAmbulanceInput("ambulanceModelInput", "Modelo", "Toyota Hiace")}
            ${renderAmbulanceInput("ambulanceZoneInput", "Zona", "Base Este")}
            ${renderAmbulanceInput("ambulanceProvinceInput", "Provincia", "San Jose")}
            ${renderAmbulanceInput("ambulanceStaffInput", "Cantidad de personal", "3", "number")}
            ${renderAmbulanceInput("ambulanceHospitalInput", "Hospital de preferencia", "Hospital Mexico")}
            ${renderAmbulanceInput("ambulanceCompanyInput", "Compania", "S.E.A")}
            <button class="self-end rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]" type="submit">
              Guardar ambulancia
            </button>
          </form>
        </section>

        <div class="grid gap-5">
          <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div class="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p class="text-sm font-black uppercase text-blue-700">Flota</p>
                <h2 class="mt-1 text-3xl font-black text-[#071836]">Ambulancias registradas</h2>
                <p class="mt-2 text-sm text-slate-500">Unidades con nombre, modelo, zona, provincia, personal, hospital y compania.</p>
              </div>
            </div>
            <div id="ambulanceFleetList" class="mt-6 grid gap-4 md:grid-cols-2"></div>
          </section>
        </div>

      </div>
    `;
    setupAmbulancePage();
    return;
  }

  if (section.type === "people") {
    contentPanel.innerHTML = `
      <section class="grid gap-6">
        <div class="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#071836_0%,#0b2a5b_56%,#2563eb_100%)] p-7 text-white shadow-2xl shadow-blue-950/20">
          <p class="text-sm font-black uppercase text-blue-100">Directorio</p>
          <h1 class="mt-2 text-4xl font-black leading-tight md:text-5xl">Personas</h1>
          <p class="mt-4 max-w-2xl text-base leading-7 text-blue-50">
            Directorio interno para personal operativo y personas registradas con salud critica.
          </p>
        </div>

        <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
          <div class="grid min-h-12 grid-cols-3 rounded-md bg-slate-100 p-1 text-sm font-black text-slate-600 md:w-[620px]">
            <button class="people-directory-tab rounded px-4 transition" data-people-tab="staff" type="button">Personal</button>
            <button class="people-directory-tab rounded px-4 transition" data-people-tab="critical" type="button">Salud critica</button>
            <button class="people-directory-tab rounded px-4 transition" data-people-tab="map" type="button">Mapa</button>
          </div>

          <div id="peopleDirectoryContent" class="mt-6"></div>
        </section>
      </section>
    `;
    setupPeoplePage();
    return;
  }

  if (section.type === "directory") {
    contentPanel.innerHTML = `
      <section class="grid gap-6">
        <div class="rounded-lg border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/70">
          <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p class="text-sm font-black uppercase text-red-600">Directorio medico</p>
              <h2 class="mt-1 text-3xl font-black text-[#071836]">${section.title}</h2>
              <p class="mt-2 max-w-3xl text-slate-500">${section.intro}</p>
            </div>
            <label class="grid min-w-[min(100%,360px)] gap-2 text-sm font-bold text-[#071836]">
              Buscar contacto
              <input id="directorySearch" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Hospital, clinica o telefono" type="search" />
            </label>
          </div>

          <form id="directoryForm" class="mt-6 grid gap-3 rounded-lg border border-blue-100 bg-blue-50/70 p-4 md:grid-cols-[1fr_220px_auto]">
            <label class="grid gap-2 text-sm font-bold text-[#071836]">
              Titulo
              <input id="directoryTitleInput" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Ej: Clinica local" required />
            </label>
            <label class="grid gap-2 text-sm font-bold text-[#071836]">
              Numero
              <input id="directoryPhoneInput" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="Ej: 2222-2222" required />
            </label>
            <button class="self-end rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]" type="submit">
              Agregar
            </button>
          </form>
        </div>

        <div id="directoryList" class="grid gap-4 md:grid-cols-2 xl:grid-cols-3"></div>
      </section>
    `;
    setupDirectory();
    return;
  }

  if (section.type === "settings") {
    contentPanel.innerHTML = `
      <section class="grid gap-6">
        <div class="overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(90deg,rgba(7,24,54,.98),rgba(11,42,91,.84)_48%,rgba(226,29,45,.72)),url('https://images.unsplash.com/photo-1600959907703-125ba1374a12?auto=format&fit=crop&w=1800&q=86')] bg-cover bg-center p-7 text-white shadow-2xl shadow-blue-950/20">
          <h1 class="text-3xl font-black leading-tight md:text-4xl">${t("settingsTitle")}</h1>
          <p class="mt-3 max-w-2xl text-blue-50">${t("settingsSubtitle")}</p>
          <div class="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            ${renderSettingsStat(t("safe"), t("safeText"), "shield")}
            ${renderSettingsStat(t("realtime"), t("realtimeText"), "clock")}
            ${renderSettingsStat(t("customizable"), t("customizableText"), "bell")}
            ${renderSettingsStat(t("supportTitle"), t("supportText"), "users", "blue")}
          </div>
        </div>

        <div class="grid gap-5 lg:grid-cols-[280px_1fr]">
          <aside class="rounded-lg border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70">
            <div class="grid gap-2">
              ${renderSettingsNav("General", t("settingsGeneralIntro"), "gear", true)}
              ${renderSettingsNav(t("notifications"), t("notificationsText"), "bell")}
              ${renderSettingsNav(t("routes"), t("routesText"), "route")}
              ${renderSettingsNav(t("languageRegion"), t("languageRegionText"), "globe")}
              ${renderSettingsNav(t("appearance"), t("appearanceText"), "palette")}
            </div>
          </aside>

          <section class="rounded-lg border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
            <div>
              <h2 class="text-2xl font-black text-[#071836]">${t("settingsGeneral")}</h2>
              <p class="mt-2 text-sm text-slate-500">${t("settingsGeneralIntro")}</p>
            </div>

            <div class="mt-6 overflow-hidden rounded-lg border border-slate-200">
              ${renderSettingsToggle(t("pushNotifications"), t("pushNotificationsText"), "bell", true)}
              ${renderSettingsToggle(t("realtimeUpdate"), t("realtimeUpdateText"), "pin", true)}
              ${renderSettingsToggle(t("routeOptimization"), t("routeOptimizationText"), "route", true)}
            </div>

            <div class="mt-6 overflow-hidden rounded-lg border border-slate-200">
              <div class="flex flex-col gap-4 border-b border-slate-100 p-4 md:flex-row md:items-center md:justify-between">
                <div class="flex items-center gap-4">
                  <span class="grid h-11 w-11 place-items-center rounded-lg bg-violet-50 text-violet-600">
                    ${settingsIcon("globe")}
                  </span>
                  <div>
                    <h3 class="font-black text-[#071836]">${t("settingsLanguage")}</h3>
                    <p class="mt-1 text-sm text-slate-500">${t("settingsLanguageIntro")}</p>
                  </div>
                </div>
                <select id="languageSelect" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm font-bold text-[#071836] shadow-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 md:min-w-64" onchange="window.setSeaLanguage(this.value)">
                  <option value="es" ${currentLanguage === "es" ? "selected" : ""}>Español (ES)</option>
                  <option value="en" ${currentLanguage === "en" ? "selected" : ""}>English (EN)</option>
                </select>
              </div>

              <div class="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                <div class="flex items-center gap-4">
                  <span class="grid h-11 w-11 place-items-center rounded-lg bg-slate-100 text-slate-600">
                    ${settingsIcon("moon")}
                  </span>
                  <div>
                    <h3 class="font-black text-[#071836]">${t("pageTheme")}</h3>
                    <p class="mt-1 text-sm text-slate-500">${t("pageThemeIntro")}</p>
                  </div>
                </div>
                <div class="grid min-h-11 grid-cols-2 rounded-md bg-slate-100 p-1 text-sm font-bold text-slate-600 md:min-w-64">
                  <button id="lightThemeBtn" data-theme-option="light" class="rounded px-4 ${currentTheme === "light" ? "bg-blue-600 text-white shadow-sm" : ""}" type="button" onclick="window.setSeaTheme('light')">${t("light")}</button>
                  <button id="darkThemeBtn" data-theme-option="dark" class="rounded px-4 ${currentTheme === "dark" ? "bg-blue-600 text-white shadow-sm" : ""}" type="button" onclick="window.setSeaTheme('dark')">${t("dark")}</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    `;
    return;
  }

  renderSection("inicio");
}

function setupHomeTrackingMap() {
  const mapElement = document.querySelector("#homeTrackingMap");
  const form = document.querySelector("#homeRouteForm");
  const status = document.querySelector("#homeRouteStatus");
  const startInput = document.querySelector("#homeRouteStartInput");
  const endInput = document.querySelector("#homeRouteEndInput");

  if (!mapElement) {
    return;
  }

  if (mapElement.clientWidth === 0 || mapElement.clientHeight === 0) {
    setTimeout(setupHomeTrackingMap, 80);
    return;
  }

  if (typeof L === "undefined") {
    mapElement.innerHTML = `<p class="p-6 text-sm font-bold text-slate-600">No se pudo cargar Leaflet.</p>`;
    return;
  }

  if (homeTrackingMap) {
    homeTrackingMap.off();
    homeTrackingMap.remove();
    homeTrackingMap = null;
  }

  homeTrackingMap = L.map(mapElement, {
    attributionControl: false,
    maxBounds: costaRicaBounds,
    maxBoundsViscosity: 0.75,
    preferCanvas: false,
    scrollWheelZoom: true,
    zoomControl: true,
  });

  homeTrackingMap.createPane("seaRoutePane");
  homeTrackingMap.getPane("seaRoutePane").classList.add("sea-route-pane");
  homeTrackingMap.getPane("seaRoutePane").style.zIndex = "650";
  homeTrackingMap.createPane("seaMarkerPane");
  homeTrackingMap.getPane("seaMarkerPane").classList.add("sea-marker-pane");
  homeTrackingMap.getPane("seaMarkerPane").style.zIndex = "700";

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    minZoom: 7,
    subdomains: "abcd",
    attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
    crossOrigin: true,
  }).addTo(homeTrackingMap);

  homeTrackingMap.fitBounds(costaRicaBounds, { padding: [22, 22] });
  mapElement.dataset.leafletReady = "true";

  const calculateRoute = async () => {
    status.textContent = "Buscando ubicaciones y calculando ruta...";
    try {
      const start = await geocodeCostaRica(startInput.value);
      const end = await geocodeCostaRica(endInput.value);
      const localRoute = getFallbackRoute(start, end);
      renderHomeTrackingRoute(start, end, localRoute);
      status.textContent = `Ruta estimada con respaldo local: ${(localRoute.distance / 1000).toFixed(1)} km, ${(localRoute.duration / 60).toFixed(0)} min aprox.`;

      const route = await getOsrmRoute(start, end);
      renderHomeTrackingRoute(start, end, route);
      const isEstimated = route.fallback || start.estimated || end.estimated;
      status.textContent = isEstimated
        ? `Ruta estimada con respaldo local: ${(route.distance / 1000).toFixed(1)} km, ${(route.duration / 60).toFixed(0)} min aprox.`
        : `Ruta calculada: ${(route.distance / 1000).toFixed(1)} km, ${(route.duration / 60).toFixed(0)} min aprox.`;
    } catch (error) {
      status.textContent = "No se pudo ubicar ese punto. Prueba con hospital, canton o provincia de Costa Rica.";
    }
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    await calculateRoute();
  });

  fitHomeTrackingMap();
  setTimeout(fitHomeTrackingMap, 120);
  setTimeout(fitHomeTrackingMap, 350);
  setTimeout(fitHomeTrackingMap, 800);
  setTimeout(calculateRoute, 900);
}

function fitHomeTrackingMap() {
  if (!homeTrackingMap) {
    return;
  }

  homeTrackingMap.invalidateSize(true);
  if (!homeTrackingRouteLayer) {
    homeTrackingMap.fitBounds(costaRicaBounds, { padding: [22, 22] });
  }
}

async function geocodeCostaRica(query) {
  const cleanQuery = String(query || "").trim();
  if (!cleanQuery) {
    throw new Error("Empty location");
  }

  const knownPlace = findKnownCostaRicaPlace(query);
  if (knownPlace) {
    return knownPlace;
  }

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("countrycodes", "cr");
  url.searchParams.set("q", `${query}, Costa Rica`);

  try {
    const response = await fetchWithTimeout(url.toString(), {}, 5500);
    if (!response.ok) {
      throw new Error("Geocoding failed");
    }

    const results = await response.json();
    if (!results.length) {
      throw new Error("Location not found");
    }

    return {
      label: results[0].display_name,
      latitude: Number(results[0].lat),
      longitude: Number(results[0].lon),
    };
  } catch (error) {
    return getFallbackCostaRicaPlace(cleanQuery);
  }
}

function findKnownCostaRicaPlace(query) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery) {
    return null;
  }

  return (
    knownCostaRicaPlaces.find((place) =>
      place.keywords.some((keyword) => doesSearchMatchPlace(normalizedQuery, keyword)),
    ) || null
  );
}

function doesSearchMatchPlace(normalizedQuery, keyword) {
  const normalizedKeyword = normalizeSearchText(keyword);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);
  const keywordTokens = normalizedKeyword.split(/\s+/).filter(Boolean);

  return (
    normalizedQuery.includes(normalizedKeyword) ||
    normalizedKeyword.includes(normalizedQuery) ||
    keywordTokens.every((token) => queryTokens.includes(token))
  );
}

function getFallbackCostaRicaPlace(query) {
  const normalizedQuery = normalizeSearchText(query);
  const provinceFallbacks = [
    { keywords: ["san jose", "sj"], label: "San Jose, Costa Rica", latitude: 9.9281, longitude: -84.0907 },
    { keywords: ["alajuela"], label: "Alajuela, Costa Rica", latitude: 10.0162, longitude: -84.2116 },
    { keywords: ["cartago"], label: "Cartago, Costa Rica", latitude: 9.8644, longitude: -83.9194 },
    { keywords: ["heredia"], label: "Heredia, Costa Rica", latitude: 9.9981, longitude: -84.1198 },
    { keywords: ["guanacaste"], label: "Guanacaste, Costa Rica", latitude: 10.6267, longitude: -85.4437 },
    { keywords: ["puntarenas"], label: "Puntarenas, Costa Rica", latitude: 9.9763, longitude: -84.8384 },
    { keywords: ["limon"], label: "Limon, Costa Rica", latitude: 9.9911, longitude: -83.0350 },
  ];
  const province = provinceFallbacks.find((place) =>
    place.keywords.some((keyword) => doesSearchMatchPlace(normalizedQuery, keyword)),
  );

  if (province) {
    return {
      ...province,
      label: `${query} - ubicacion estimada cerca de ${province.label}`,
      estimated: true,
    };
  }

  const hash = [...normalizedQuery].reduce((total, character) => total + character.charCodeAt(0), 0);
  return {
    label: `${query} - ubicacion estimada en Costa Rica`,
    latitude: 9.84 + ((hash % 46) - 23) / 100,
    longitude: -84.12 + (((hash * 7) % 54) - 27) / 100,
    estimated: true,
  };
}

async function getOsrmRoute(start, end) {
  const coordinates = `${start.longitude},${start.latitude};${end.longitude},${end.latitude}`;
  const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson`;

  try {
    const response = await fetchWithTimeout(url, {}, 5500);

    if (!response.ok) {
      throw new Error("Route failed");
    }

    const data = await response.json();
    if (!data.routes?.[0]) {
      throw new Error("Route not found");
    }

    return data.routes[0];
  } catch (error) {
    return getFallbackRoute(start, end);
  }
}

function getFallbackRoute(start, end) {
  const directDistance = getDistanceMeters(start, end);
  const roadDistance = directDistance * 1.32;
  const duration = roadDistance / (42 * 1000 / 3600);

  return {
    fallback: true,
    distance: roadDistance,
    duration,
    geometry: {
      coordinates: buildFallbackRouteCoordinates(start, end),
    },
  };
}

function buildFallbackRouteCoordinates(start, end) {
  const midLatitude = (start.latitude + end.latitude) / 2 + 0.045;
  const midLongitude = (start.longitude + end.longitude) / 2 - 0.035;

  return [
    [start.longitude, start.latitude],
    [midLongitude, midLatitude],
    [end.longitude, end.latitude],
  ];
}

function getDistanceMeters(start, end) {
  const earthRadiusMeters = 6371000;
  const startLatitude = toRadians(start.latitude);
  const endLatitude = toRadians(end.latitude);
  const latitudeDelta = toRadians(end.latitude - start.latitude);
  const longitudeDelta = toRadians(end.longitude - start.longitude);
  const haversine =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusMeters * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function toRadians(value) {
  return (value * Math.PI) / 180;
}

function normalizeSearchText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

function renderHomeTrackingRoute(start, end, route) {
  if (homeTrackingRouteLayer) {
    homeTrackingRouteLayer.remove();
  }
  if (homeTrackingMarkerLayer) {
    homeTrackingMarkerLayer.remove();
  }

  const points = route.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude]);
  const routeOutline = L.polyline(points, {
    color: "#ffffff",
    opacity: 0.98,
    pane: "seaRoutePane",
    weight: 12,
  });
  const routeLine = L.polyline(points, {
    color: route.fallback ? "#e21d2d" : "#2563eb",
    dashArray: route.fallback ? "14 10" : null,
    lineCap: "round",
    lineJoin: "round",
    opacity: 1,
    pane: "seaRoutePane",
    weight: 6,
  });
  homeTrackingRouteLayer = L.featureGroup([routeOutline, routeLine]).addTo(homeTrackingMap);

  homeTrackingMarkerLayer = L.layerGroup([
    L.marker([start.latitude, start.longitude], { icon: createMapMarkerIcon("#2563eb"), pane: "seaMarkerPane" }).bindPopup(`Origen: ${start.label}`),
    L.marker([end.latitude, end.longitude], { icon: createMapMarkerIcon("#dc2626"), pane: "seaMarkerPane" }).bindPopup(`Destino: ${end.label}`),
  ]).addTo(homeTrackingMap);

  homeTrackingMap.fitBounds(homeTrackingRouteLayer.getBounds(), { padding: [34, 34] });
}

function createMapMarkerIcon(color) {
  return L.divIcon({
    className: "sea-map-marker",
    html: `
      <svg width="34" height="42" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M17 41C17 41 31 26.6 31 15.8C31 7.6 24.7 1 17 1C9.3 1 3 7.6 3 15.8C3 26.6 17 41 17 41Z" fill="${color}" stroke="white" stroke-width="3"/>
        <circle cx="17" cy="16" r="5.5" fill="white"/>
      </svg>
    `,
    iconAnchor: [17, 41],
    iconSize: [34, 42],
    popupAnchor: [0, -38],
  });
}

function renderAmbulanceInput(id, label, placeholder, type = "text") {
  return `
    <label class="grid gap-2 text-sm font-bold text-[#071836]">
      ${label}
      <input id="${id}" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" min="1" placeholder="${placeholder}" required type="${type}" />
    </label>
  `;
}

function renderPeopleInput(id, label, placeholder, type = "text") {
  return `
    <label class="grid gap-2 text-sm font-bold text-[#071836]">
      ${label}
      <input id="${id}" class="min-h-11 rounded-md border border-slate-200 bg-white px-4 text-sm shadow-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" placeholder="${placeholder}" required type="${type}" />
    </label>
  `;
}

function setupPeoplePage() {
  renderPeopleDirectory();
}

function handlePeopleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  peopleEntries = [
    {
      name: document.querySelector("#personNameInput").value.trim(),
      role: document.querySelector("#personRoleInput").value.trim(),
      zone: document.querySelector("#personZoneInput").value.trim(),
      phone: document.querySelector("#personPhoneInput").value.trim(),
      status: "Disponible",
      condition: "Sin enfermedad registrada",
      emergencyContact: "No registrado",
      shift: "Sin turno asignado",
      company: "S.E.A",
      latitude: 9.9325,
      longitude: -84.08,
    },
    ...peopleEntries,
  ];
  form.reset();
  form.classList.add("hidden");
  renderPeopleDirectory();
}

function renderPeopleDirectory() {
  const content = document.querySelector("#peopleDirectoryContent");
  if (!content) {
    return;
  }

  document.querySelectorAll(".people-directory-tab").forEach((tab) => {
    const isActive = tab.dataset.peopleTab === currentPeopleDirectoryTab;
    tab.classList.toggle("bg-blue-600", isActive);
    tab.classList.toggle("text-white", isActive);
    tab.classList.toggle("shadow-sm", isActive);
    tab.classList.toggle("text-slate-600", !isActive);
  });

  if (currentPeopleDirectoryTab === "map") {
    content.innerHTML = `
      <div>
        <div>
          <p class="text-sm font-black uppercase text-blue-700">Rastreador</p>
          <h2 class="mt-1 text-3xl font-black text-[#071836]">Mapa de personas en Costa Rica</h2>
          <p class="mt-2 text-sm text-slate-500">Puntos por persona segun la zona registrada.</p>
        </div>
        <div class="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div id="peopleMap"></div>
        </div>
      </div>
    `;
    requestAnimationFrame(setupPeopleMap);
    return;
  }

  if (currentPeopleDirectoryTab === "critical") {
    content.innerHTML = `
      <div>
        <div>
          <p class="text-sm font-black uppercase text-red-600">Personas registradas</p>
          <h2 class="mt-1 text-3xl font-black text-[#071836]">Salud critica o problemas de salud</h2>
        </div>
        <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          ${criticalPeopleEntries.map(renderCriticalPersonCard).join("")}
        </div>
      </div>
    `;
    return;
  }

  content.innerHTML = `
    <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p class="text-sm font-black uppercase text-blue-700">Personal</p>
        <h2 class="mt-1 text-3xl font-black text-[#071836]">Personal registrado</h2>
      </div>
      <button id="togglePeopleFormBtn" class="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-blue-600 px-5 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 active:scale-[.98]" type="button">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
        Agregar persona
      </button>
    </div>

    <form id="peopleForm" class="mt-6 hidden grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      ${renderPeopleInput("personNameInput", "Nombre", "Nombre completo")}
      ${renderPeopleInput("personRoleInput", "Cargo", "Paramedico")}
      ${renderPeopleInput("personZoneInput", "Zona", "Base Norte")}
      ${renderPeopleInput("personPhoneInput", "Telefono", "8888-0000", "tel")}
      <button class="self-end rounded-md bg-red-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 active:scale-[.98]" type="submit">
        Guardar persona
      </button>
    </form>

    <div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      ${peopleEntries
    .map((person, index) => `
      <button class="rounded-lg border border-slate-200 bg-white p-5 text-left shadow-lg shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-xl" data-staff-person-index="${index}" type="button">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-black uppercase text-blue-700">${person.role}</p>
            <h3 class="mt-2 text-xl font-black text-[#071836]">${person.name}</h3>
            <p class="mt-2 text-sm font-bold text-slate-600">${person.zone}</p>
          </div>
          <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black uppercase text-emerald-700">${person.status}</span>
        </div>
        <a class="mt-5 inline-flex min-h-10 items-center justify-center rounded-md border border-slate-200 px-4 text-sm font-black text-[#071836] transition hover:bg-slate-50" href="tel:${person.phone.replace(/[^\d+]/g, "")}">
          ${person.phone}
        </a>
      </button>
    `)
    .join("")}
    </div>
  `;
}

function getPeopleMapEntries() {
  return [
    ...peopleEntries.map((person) => ({
      name: person.name,
      label: person.role,
      phone: person.phone,
      latitude: person.latitude,
      longitude: person.longitude,
      tone: "#2563eb",
    })),
    ...criticalPeopleEntries.map((person) => ({
      name: person.fullName,
      label: "Salud critica",
      phone: person.phone,
      latitude: person.latitude,
      longitude: person.longitude,
      tone: "#dc2626",
    })),
  ].filter((person) => Number.isFinite(person.latitude) && Number.isFinite(person.longitude));
}

function setupPeopleMap() {
  const mapElement = document.querySelector("#peopleMap");
  if (!mapElement) {
    return;
  }

  const entries = getPeopleMapEntries();
  mapElement.className = "sea-static-map rounded-lg";
  mapElement.innerHTML = `
    <svg class="sea-static-map-outline" viewBox="0 0 900 560" fill="none" aria-hidden="true">
      <path d="M68 252C138 214 191 177 267 181C334 184 382 220 433 247C497 281 561 276 622 304C678 330 716 381 806 397C823 400 830 423 814 434C759 472 686 462 618 437C553 413 505 383 445 378C380 373 334 404 272 384C215 366 192 319 136 307C91 297 43 289 68 252Z" fill="#dbeafe" stroke="#0b2a5b" stroke-width="8" stroke-linejoin="round"/>
      <path d="M126 278C189 239 242 226 304 242C378 261 427 321 504 318C571 316 629 345 694 386" stroke="#2563eb" stroke-width="5" stroke-linecap="round" stroke-dasharray="12 14" opacity=".45"/>
      <circle cx="262" cy="248" r="7" fill="#0b2a5b" opacity=".3"/>
      <circle cx="510" cy="318" r="7" fill="#0b2a5b" opacity=".3"/>
      <circle cx="694" cy="386" r="7" fill="#0b2a5b" opacity=".3"/>
    </svg>
    ${entries.map(renderStaticMapPoint).join("")}
    <div class="absolute bottom-4 left-4 grid gap-2 rounded-lg border border-white/80 bg-white/90 p-4 text-sm font-bold text-[#071836] shadow-lg">
      <span class="inline-flex items-center gap-2"><span class="h-3 w-3 rounded-full bg-blue-600"></span>Personal</span>
      <span class="inline-flex items-center gap-2"><span class="h-3 w-3 rounded-full bg-red-600"></span>Salud critica</span>
    </div>
  `;
}

function renderStaticMapPoint(person) {
  const position = getStaticMapPosition(person.latitude, person.longitude);
  return `
    <button
      class="sea-static-map-point group h-5 w-5 rounded-full"
      style="left:${position.x}%; top:${position.y}%; background:${person.tone};"
      type="button"
      aria-label="${person.name}"
    >
      <span class="pointer-events-none absolute bottom-7 left-1/2 hidden min-w-48 -translate-x-1/2 rounded-md bg-white px-3 py-2 text-left text-xs font-bold text-[#071836] shadow-xl group-hover:block">
        <strong class="block text-sm">${person.name}</strong>
        <span class="mt-1 block text-slate-600">${person.label}</span>
        <span class="mt-1 block text-slate-600">${person.phone}</span>
      </span>
    </button>
  `;
}

function getStaticMapPosition(latitude, longitude) {
  const minLatitude = 8.03;
  const maxLatitude = 11.22;
  const minLongitude = -85.95;
  const maxLongitude = -82.45;
  const x = ((longitude - minLongitude) / (maxLongitude - minLongitude)) * 78 + 11;
  const y = (1 - ((latitude - minLatitude) / (maxLatitude - minLatitude))) * 68 + 14;
  return {
    x: Math.max(8, Math.min(92, x)),
    y: Math.max(10, Math.min(90, y)),
  };
}

function renderCriticalPersonCard(person, index) {
  return `
    <button class="rounded-lg border border-slate-200 bg-white p-5 text-left shadow-lg shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-xl" data-critical-person-index="${index}" type="button">
      <p class="text-xs font-black uppercase text-red-600">Registro de salud</p>
      <h3 class="mt-2 text-xl font-black text-[#071836]">${person.fullName}</h3>
      <div class="mt-5 grid gap-3 text-sm">
        <p class="rounded-md bg-slate-50 px-4 py-3">
          <span class="block text-xs font-black uppercase text-blue-700">Cedula</span>
          <span class="mt-1 block font-bold text-[#071836]">${person.idNumber}</span>
        </p>
        <p class="rounded-md bg-slate-50 px-4 py-3">
          <span class="block text-xs font-black uppercase text-blue-700">Telefono</span>
          <span class="mt-1 block font-bold text-[#071836]">${person.phone}</span>
        </p>
      </div>
    </button>
  `;
}

function openStaffPersonModal(index) {
  const person = peopleEntries[index];
  if (!person) {
    return;
  }

  const modal = document.createElement("div");
  modal.id = "staffPersonModal";
  modal.className = "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4";
  modal.innerHTML = `
    <section class="w-[min(620px,100%)] rounded-lg border border-slate-200 bg-white p-6 shadow-2xl">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-black uppercase text-blue-700">Detalle de personal</p>
          <h2 class="mt-1 text-3xl font-black text-[#071836]">${person.name}</h2>
          <p class="mt-2 text-sm font-bold text-slate-600">${person.phone} · ${person.zone}</p>
        </div>
        <button class="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-200 text-[#071836] transition hover:bg-slate-50" data-close-staff-modal type="button" aria-label="Cerrar">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="mt-6 grid gap-3 text-sm md:grid-cols-2">
        ${renderCriticalDetail("Enfermedad", person.condition)}
        ${renderCriticalDetail("Puesto", person.role)}
        ${renderCriticalDetail("Contacto de emergencia", person.emergencyContact)}
        ${renderCriticalDetail("Turno", person.shift)}
        ${renderCriticalDetail("Empresa", person.company)}
      </div>
    </section>
  `;
  document.body.append(modal);
}

function closeStaffPersonModal() {
  document.querySelector("#staffPersonModal")?.remove();
}

function openCriticalPersonModal(index) {
  const person = criticalPeopleEntries[index];
  if (!person) {
    return;
  }

  const modal = document.createElement("div");
  modal.id = "criticalPersonModal";
  modal.className = "fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 p-4";
  modal.innerHTML = `
    <section class="w-[min(620px,100%)] rounded-lg border border-slate-200 bg-white p-6 shadow-2xl">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-sm font-black uppercase text-red-600">Detalle de salud</p>
          <h2 class="mt-1 text-3xl font-black text-[#071836]">${person.fullName}</h2>
          <p class="mt-2 text-sm font-bold text-slate-600">Cedula ${person.idNumber} · ${person.phone}</p>
        </div>
        <button class="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-slate-200 text-[#071836] transition hover:bg-slate-50" data-close-critical-modal type="button" aria-label="Cerrar">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      <div class="mt-6 grid gap-3 text-sm md:grid-cols-2">
        ${renderCriticalDetail("Residencia", person.residence)}
        ${renderCriticalDetail("Contacto de emergencia", person.emergencyContact)}
        ${renderCriticalDetail("Enfermedad", person.condition)}
        ${renderCriticalDetail("Seguro", person.insurance)}
        ${renderCriticalDetail("Hospital de preferencia", person.preferredHospital)}
      </div>
    </section>
  `;
  document.body.append(modal);
}

function closeCriticalPersonModal() {
  document.querySelector("#criticalPersonModal")?.remove();
}

function renderCriticalDetail(label, value) {
  return `
    <p class="rounded-md bg-slate-50 px-4 py-3">
      <span class="block text-xs font-black uppercase text-blue-700">${label}</span>
      <span class="mt-1 block font-bold text-[#071836]">${value}</span>
    </p>
  `;
}

const fallbackAmbulances = [
  {
    id: 1,
    name: "Unidad S.E.A-01",
    model: "Toyota Hiace",
    zone: "Base Norte",
    province: "San Jose",
    staff_count: 3,
    preferred_hospital: "Hospital Mexico",
    company: "S.E.A",
    driver: "Ana Perez",
    location: "Base Norte",
    priority: "medium",
    active: false,
  },
  {
    id: 2,
    name: "Unidad S.E.A-02",
    model: "Mercedes-Benz Sprinter",
    zone: "Base Sur",
    province: "San Jose",
    staff_count: 2,
    preferred_hospital: "Hospital San Juan de Dios",
    company: "S.E.A",
    driver: "Luis Rojas",
    location: "Base Sur",
    priority: "low",
    active: false,
  },
];
let localAmbulances = [...fallbackAmbulances];
let usingLocalAmbulances = false;
let remoteAmbulances = [...fallbackAmbulances];

async function setupAmbulancePage() {
  const list = document.querySelector("#ambulanceFleetList");

  if (!list) {
    return;
  }

  try {
    const ambulances = await getAmbulances();
    usingLocalAmbulances = false;
    remoteAmbulances = ambulances;
    renderAmbulanceFleet(ambulances);
  } catch (error) {
    usingLocalAmbulances = true;
    renderAmbulanceFleet(localAmbulances);
  }
}

async function handleAmbulanceFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const list = usingLocalAmbulances ? localAmbulances : remoteAmbulances;
  const ambulance = {
    id: Math.max(0, ...list.map((item) => Number(item.id) || 0)) + 1,
    name: document.querySelector("#ambulanceNameInput").value.trim(),
    model: document.querySelector("#ambulanceModelInput").value.trim(),
    zone: document.querySelector("#ambulanceZoneInput").value.trim(),
    province: document.querySelector("#ambulanceProvinceInput").value.trim(),
    staff_count: Number(document.querySelector("#ambulanceStaffInput").value),
    preferred_hospital: document.querySelector("#ambulanceHospitalInput").value.trim(),
    company: document.querySelector("#ambulanceCompanyInput").value.trim(),
    driver: "Sin asignar",
    location: document.querySelector("#ambulanceZoneInput").value.trim(),
    priority: "low",
    active: false,
  };

  localAmbulances = [ambulance, ...localAmbulances];
  remoteAmbulances = [ambulance, ...remoteAmbulances];
  renderAmbulanceFleet(usingLocalAmbulances ? localAmbulances : remoteAmbulances);
  form.reset();
  form.classList.add("hidden");

  try {
    const { id, ...payload } = ambulance;
    await createAmbulance(payload);
    const ambulances = await getAmbulances();
    remoteAmbulances = ambulances;
    usingLocalAmbulances = false;
    renderAmbulanceFleet(ambulances);
  } catch (error) {
    usingLocalAmbulances = true;
    renderAmbulanceFleet(localAmbulances);
  }
}

function renderAmbulanceFleet(ambulances) {
  const list = document.querySelector("#ambulanceFleetList");
  const availableCount = document.querySelector("#ambulanceAvailableCount");
  const activeCount = document.querySelector("#ambulanceActiveCount");

  const activeAmbulances = ambulances.filter((ambulance) => ambulance.active);
  const availableAmbulances = ambulances.filter((ambulance) => !ambulance.active);

  if (availableCount) availableCount.textContent = String(availableAmbulances.length);
  if (activeCount) activeCount.textContent = String(activeAmbulances.length);

  if (!list) {
    return;
  }

  list.innerHTML = ambulances
    .map((ambulance) => {
      const isActive = Boolean(ambulance.active);
      const statusLabel = isActive ? "En servicio" : "Disponible";
      const statusClass = isActive ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700";

      return `
        <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-black uppercase text-blue-700">${ambulance.company}</p>
              <h3 class="mt-2 text-xl font-black text-[#071836]">${ambulance.name}</h3>
              <p class="mt-2 text-sm font-bold text-slate-600">${ambulance.model}</p>
            </div>
            <span class="rounded-full px-3 py-1 text-xs font-black uppercase ${statusClass}">${statusLabel}</span>
          </div>
          <div class="mt-5 grid gap-3 text-sm text-slate-600 md:grid-cols-2">
            ${renderAmbulanceDetail("Zona", ambulance.zone)}
            ${renderAmbulanceDetail("Provincia", ambulance.province)}
            ${renderAmbulanceDetail("Personal", `${ambulance.staff_count} personas`)}
            ${renderAmbulanceDetail("Hospital", ambulance.preferred_hospital)}
            ${renderAmbulanceDetail("Compania", ambulance.company)}
            ${renderAmbulanceDetail("Prioridad", priorityLabel(ambulance.priority))}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAmbulanceDetail(label, value) {
  return `
    <p class="rounded-md bg-slate-50 px-4 py-3">
      <span class="block text-xs font-black uppercase text-blue-700">${label}</span>
      <span class="mt-1 block font-bold text-[#071836]">${value}</span>
    </p>
  `;
}

function priorityLabel(priority) {
  const labels = {
    high: "Alta",
    medium: "Media",
    low: "Baja",
    none: "Sin prioridad",
  };

  return labels[priority] ?? priority;
}

function renderSettingsStat(title, subtitle, icon, tone = "red") {
  const bgClass = tone === "blue" ? "bg-blue-600" : "bg-red-600";
  return `
    <article class="flex items-center gap-4 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-md">
      <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full ${bgClass} text-white shadow-lg shadow-blue-950/20">
        ${settingsIcon(icon)}
      </span>
      <p class="text-sm">
        <strong class="block">${title}</strong>
        <span class="text-blue-50">${subtitle}</span>
      </p>
    </article>
  `;
}

function renderSettingsNav(title, subtitle, icon, active = false) {
  return `
    <button class="flex min-h-16 items-center gap-4 rounded-lg px-4 text-left transition ${active ? "border-l-4 border-red-600 bg-red-50 text-red-600" : "text-[#071836] hover:bg-slate-50"}" type="button">
      <span class="grid h-10 w-10 shrink-0 place-items-center rounded-lg ${active ? "bg-white" : "bg-slate-50"}">
        ${settingsIcon(icon)}
      </span>
      <span>
        <strong class="block text-sm">${title}</strong>
        <span class="mt-1 block text-xs ${active ? "text-slate-600" : "text-slate-500"}">${subtitle}</span>
      </span>
    </button>
  `;
}

function renderSettingsToggle(title, subtitle, icon, checked = false) {
  return `
    <div class="flex items-center justify-between gap-4 border-b border-slate-100 p-4 last:border-b-0">
      <div class="flex items-center gap-4">
        <span class="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-600">
          ${settingsIcon(icon)}
        </span>
        <div>
          <h3 class="font-black text-[#071836]">${title}</h3>
          <p class="mt-1 text-sm text-slate-500">${subtitle}</p>
        </div>
      </div>
      <label class="relative inline-flex cursor-pointer items-center">
        <input class="peer sr-only" type="checkbox" ${checked ? "checked" : ""} />
        <span class="h-7 w-12 rounded-full bg-slate-200 transition peer-checked:bg-blue-600"></span>
        <span class="absolute left-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5"></span>
      </label>
    </div>
  `;
}

function settingsIcon(name) {
  const icons = {
    shield: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-5"/></svg>',
    clock: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    bell: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    users: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>',
    gear: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V20h-4v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1H4v-4h.09a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V4h4v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.15.36.36.7.6 1H20v4h-.09a1.7 1.7 0 0 0-.51 1z"/></svg>',
    route: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 16V8a3 3 0 0 1 3-3h6"/><path d="M18 8v8a3 3 0 0 1-3 3H9"/></svg>',
    globe: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/></svg>',
    palette: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 22a10 10 0 1 1 10-10c0 2.2-1.8 4-4 4h-1.5a2 2 0 0 0-1.4 3.4l.4.4A1.3 1.3 0 0 1 14.6 22H12z"/></svg>',
    pin: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.4 7-12a7 7 0 1 0-14 0c0 6.6 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
    moon: '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
  };

  return icons[name] ?? icons.gear;
}

function setupDirectory() {
  const searchInput = document.querySelector("#directorySearch");
  const form = document.querySelector("#directoryForm");
  const titleInput = document.querySelector("#directoryTitleInput");
  const phoneInput = document.querySelector("#directoryPhoneInput");

  renderDirectoryList();

  searchInput.addEventListener("input", () => {
    renderDirectoryList(searchInput.value);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const phone = phoneInput.value.trim();

    if (!title || !phone) {
      return;
    }

    directoryEntries = [
      { title, phone, category: "Agregado" },
      ...directoryEntries,
    ];
    form.reset();
    renderDirectoryList(searchInput.value);
  });
}

function renderDirectoryList(query = "") {
  const list = document.querySelector("#directoryList");
  const normalizedQuery = normalizeText(query);
  const filteredEntries = directoryEntries.filter((entry) => {
    const searchable = normalizeText(`${entry.title} ${entry.phone} ${entry.category}`);
    return searchable.includes(normalizedQuery);
  });

  if (filteredEntries.length === 0) {
    list.innerHTML = `
      <article class="rounded-lg border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
        No hay contactos con esa busqueda.
      </article>
    `;
    return;
  }

  list.innerHTML = filteredEntries
    .map((entry) => {
      const primaryPhone = entry.phone.split(/[\/|,]/)[0].trim();
      const telHref = primaryPhone.replace(/[^\d+]/g, "");

      return `
        <article class="rounded-lg border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-black uppercase text-blue-700">${entry.category}</p>
              <h3 class="mt-2 text-base font-black leading-6 text-[#071836]">${entry.title}</h3>
              <p class="mt-2 text-sm font-bold text-slate-600">${entry.phone}</p>
            </div>
            <a class="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-red-600 text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700" href="tel:${telHref}" aria-label="Llamar a ${entry.title}">
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.9.66 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.27-1.27a2 2 0 0 1 2.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
        </article>
      `;
    })
    .join("");
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function setHelpOpen(nextOpen) {
  isHelpOpen = nextOpen;
  helpWidget.classList.toggle("is-open", isHelpOpen);
  helpToggleBtn.classList.toggle("rotate-90", isHelpOpen);
  helpToggleBtn.classList.toggle("bg-red-600", isHelpOpen);
  helpToggleBtn.classList.toggle("hover:bg-red-700", isHelpOpen);
  helpToggleBtn.classList.toggle("bg-blue-600", !isHelpOpen);
  helpToggleBtn.classList.toggle("hover:bg-blue-700", !isHelpOpen);
  helpOpenIcon.classList.toggle("hidden", isHelpOpen);
  helpCloseIcon.classList.toggle("hidden", !isHelpOpen);
}

function updateHelpAgent() {
  const agent = helpAgents[helpAgentSelect.value] ?? helpAgents.salud;
  helpAgentName.textContent = agent.name;
  helpAgentRole.textContent = agent.role;
  helpAgentAvatar.textContent = agent.avatar;
  helpAgentAvatar.className = `grid h-10 w-10 place-items-center rounded-full border-2 border-white ${agent.color} text-sm font-black text-white shadow-sm`;
  helpWidgetGlow.className = `absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-70`;
  helpAgentStatus.className = [
    "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white",
    agent.status === "online" ? "bg-emerald-500" : "bg-amber-500",
  ].join(" ");
}

function appendHelpMessage(content, sender = "user") {
  const agent = helpAgents[helpAgentSelect.value] ?? helpAgents.salud;
  helpEmptyState?.classList.add("hidden");
  const message = document.createElement("div");
  message.className = sender === "user"
    ? "flex flex-row-reverse gap-3 self-end"
    : "flex gap-3";

  if (sender === "user") {
    message.innerHTML = `
      <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-600 text-xs font-black text-white shadow-sm">ME</div>
      <div class="max-w-[85%] rounded-2xl rounded-tr-none bg-blue-600 px-4 py-2.5 text-sm text-white shadow-md">${escapeHtml(content)}</div>
    `;
  } else {
    message.innerHTML = `
      <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 ${agent.color} text-xs font-black text-white shadow-sm">${agent.avatar}</div>
      <div class="max-w-[85%]">
        <span class="text-xs font-bold text-slate-500">${agent.name}</span>
        <div class="mt-1 rounded-2xl rounded-tl-none border border-slate-200/70 bg-white/75 px-4 py-2.5 text-sm text-slate-700 shadow-sm backdrop-blur-sm">${escapeHtml(content)}</div>
      </div>
    `;
  }

  helpMessages.append(message);
  helpMessages.scrollTop = helpMessages.scrollHeight;
  return message;
}

function appendTypingIndicator() {
  const agent = helpAgents[helpAgentSelect.value] ?? helpAgents.salud;
  helpEmptyState?.classList.add("hidden");
  const typing = document.createElement("div");
  typing.className = "flex gap-3";
  typing.innerHTML = `
    <div class="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 ${agent.color} text-xs font-black text-white shadow-sm">${agent.avatar}</div>
    <div class="flex w-16 items-center justify-center gap-1 rounded-2xl rounded-tl-none border border-slate-200/70 bg-white/75 px-4 py-3 shadow-sm">
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-slate-500"></span>
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-slate-500"></span>
      <span class="typing-dot h-1.5 w-1.5 rounded-full bg-slate-500"></span>
    </div>
  `;
  helpMessages.append(typing);
  helpMessages.scrollTop = helpMessages.scrollHeight;
  return typing;
}

function getBasicHealthAiAnswer(message, agent = "salud") {
  const text = normalizeText(message);

  if (/(hola|buenas|hey|saludos)/.test(text)) {
    return "Hola. Decime que necesitas y te ayudo.";
  }

  if (/(gracias|ok|perfecto|entiendo)/.test(text)) {
    return "Con gusto. Aqui estoy si necesitas algo mas.";
  }

  if (/(emergencia|urgencia|grave|accidente|infarto|derrame|sangre|convulsion|respira)/.test(text)) {
    return "Si la situacion es inmediata o pone en riesgo la vida, llama al 911 en Costa Rica. Confirma direccion exacta, telefono de contacto, sintomas principales y centro medico mas cercano para coordinar el traslado.";
  }

  if (/(hospital|clinica|telefono|numero|directorio|contacto|ccss|area de salud)/.test(text)) {
    return "Para contactos de salud en Costa Rica, abre Directorio y busca por nombre, categoria o telefono. Incluye hospitales CCSS, areas de salud y Ministerio de Salud. Tambien puedes agregar un contacto con titulo y numero.";
  }

  if (/(ruta|ambulancia|traslado|mapa|llegar|trafico|origen|destino)/.test(text)) {
    return "Para revisar ambulancias de S.E.A, abre la pagina Ambulancias. Ahi puedes ver unidades, conductores, ubicacion, prioridad y disponibilidad operativa.";
  }

  if (/(protocolo|ministerio|salud publica|triaje|prioridad|paciente)/.test(text)) {
    return "Para orientacion operativa de salud en Costa Rica: identifica prioridad, ubicacion exacta, contacto, centro medico de referencia y si requiere 911. No doy diagnosticos ni recetas; eso debe verlo personal de salud.";
  }

  if (/(san jose|alajuela|cartago|heredia|guanacaste|puntarenas|limon)/.test(text)) {
    return "Para esa zona de Costa Rica puedo orientarte con hospitales, clinicas, EBAIS, telefonos, rutas o servicios de salud. Dime que necesitas exactamente y te respondo directo.";
  }

  if (/(costa rica|tico|nacional|provincia|canton|distrito)/.test(text)) {
    return "Si lo enfocamos en salud de Costa Rica, puedo ayudarte con ubicaciones, hospitales, clinicas, rutas, citas, servicios de la CCSS o contactos. Dame el detalle y te respondo.";
  }

  if (/(que eres|quien eres|como funcionas|ia|inteligencia artificial)/.test(text)) {
    return "Soy el asistente de S.E.A. Si Ollama esta activo uso un modelo abierto; si no, uso respuestas basicas locales.";
  }

  if (agent === "directorio") {
    return "Estoy enfocado en Directorio medico de Costa Rica. Preguntame por hospitales, clinicas, areas de salud, telefonos o como agregar un nuevo contacto.";
  }

  if (agent === "emergencias") {
    return "Estoy enfocado en emergencias de Costa Rica. Si hay peligro inmediato llama al 911; tambien puedo orientarte para ubicar un hospital o preparar datos de traslado.";
  }

  return "Puedo ayudarte con eso. Dame un poco mas de contexto o una pregunta mas especifica para responderte mejor.";
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);
}

function enterSystem(sectionId = "inicio") {
  closeCreateAccountModal();
  signupScreen.classList.add("hidden");
  topNav.classList.remove("hidden");
  menuHero.classList.add("hidden");
  menuTabs.classList.remove("hidden");
  menuTabs.classList.add("grid");
  systemContent.classList.remove("hidden");
  helpWidget.classList.remove("hidden");
  helpWidget.classList.add("flex");
  localStorage.setItem("seaSessionActive", "true");
  localStorage.setItem("seaSection", sectionId);
  applyPreferences();
  renderSection(sectionId);
}

function openCreateAccountModal() {
  signupModal.classList.remove("hidden");
  signupModal.classList.add("flex");
  signupModal.setAttribute("aria-hidden", "false");
}

function closeCreateAccountModal() {
  signupModal.classList.add("hidden");
  signupModal.classList.remove("flex");
  signupModal.setAttribute("aria-hidden", "true");
}

function returnToLogin() {
  signupForm.reset();
  closeCreateAccountModal();
  localStorage.removeItem("seaSessionActive");
  localStorage.removeItem("seaSection");
  setHelpOpen(false);
  helpWidget.classList.add("hidden");
  helpWidget.classList.remove("flex");
  topNav.classList.add("hidden");
  menuHero.classList.add("hidden");
  menuTabs.classList.add("hidden");
  menuTabs.classList.remove("grid");
  systemContent.classList.add("hidden");
  signupScreen.classList.remove("hidden");
}

setupTabs();
applyPreferences();
if (localStorage.getItem("seaSessionActive") === "true") {
  enterSystem(localStorage.getItem("seaSection") || "inicio");
}
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterSystem();
});
createAccountBtn.addEventListener("click", openCreateAccountModal);
topLogoutBtn.addEventListener("click", returnToLogin);
helpToggleBtn.addEventListener("click", () => setHelpOpen(!isHelpOpen));
helpCloseBtn.addEventListener("click", () => setHelpOpen(false));
helpAgentSelect.addEventListener("change", () => {
  updateHelpAgent();
});
helpInput.addEventListener("input", () => {
  helpSendBtn.disabled = helpInput.value.trim().length === 0;
});
helpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = helpInput.value.trim();
  if (!message) {
    return;
  }

  const selectedAgent = helpAgentSelect.value;
  appendHelpMessage(message, "user");
  helpInput.value = "";
  helpSendBtn.disabled = true;
  const typing = appendTypingIndicator();

  try {
    const data = await askHealthAi(message, selectedAgent);
    typing.remove();
    appendHelpMessage(data.answer, "agent");
  } catch (error) {
    typing.remove();
    appendHelpMessage(getBasicHealthAiAnswer(message, selectedAgent), "agent");
  }
});
document.addEventListener("change", (event) => {
  if (event.target?.id !== "languageSelect") {
    return;
  }

  window.setSeaLanguage(event.target.value);
});
document.addEventListener("click", (event) => {
  const themeButton = event.target.closest?.("[data-theme-option]");
  if (!themeButton) {
    return;
  }

  window.setSeaTheme(themeButton.dataset.themeOption);
});
document.addEventListener("pointerdown", (event) => {
  const themeButton = event.target.closest?.("[data-theme-option]");
  if (!themeButton) {
    return;
  }

  event.preventDefault();
  window.setSeaTheme(themeButton.dataset.themeOption);
}, true);
document.addEventListener("click", (event) => {
  const toggleButton = event.target.closest?.("#toggleAmbulanceFormBtn");
  if (!toggleButton) {
    return;
  }

  document.querySelector("#ambulanceForm")?.classList.toggle("hidden");
});
document.addEventListener("click", (event) => {
  const toggleButton = event.target.closest?.("#togglePeopleFormBtn");
  if (!toggleButton) {
    return;
  }

  document.querySelector("#peopleForm")?.classList.toggle("hidden");
});
document.addEventListener("click", (event) => {
  const tab = event.target.closest?.("[data-people-tab]");
  if (!tab) {
    return;
  }

  currentPeopleDirectoryTab = tab.dataset.peopleTab === "critical" ? "critical" : "staff";
  renderPeopleDirectory();
});
document.addEventListener("click", (event) => {
  const card = event.target.closest?.("[data-critical-person-index]");
  if (!card) {
    return;
  }

  openCriticalPersonModal(Number(card.dataset.criticalPersonIndex));
});
document.addEventListener("click", (event) => {
  const card = event.target.closest?.("[data-staff-person-index]");
  if (!card) {
    return;
  }

  openStaffPersonModal(Number(card.dataset.staffPersonIndex));
});
document.addEventListener("click", (event) => {
  if (event.target.closest?.("[data-close-critical-modal]") || event.target?.id === "criticalPersonModal") {
    closeCriticalPersonModal();
  }
  if (event.target.closest?.("[data-close-staff-modal]") || event.target?.id === "staffPersonModal") {
    closeStaffPersonModal();
  }
});
document.addEventListener("submit", (event) => {
  if (event.target?.id !== "ambulanceForm") {
    return;
  }

  handleAmbulanceFormSubmit(event);
});
document.addEventListener("submit", (event) => {
  if (event.target?.id !== "peopleForm") {
    return;
  }

  handlePeopleFormSubmit(event);
});
homeLogoBtn.addEventListener("click", () => {
  renderSection("inicio");
});
if (ambulanceIconBtn) ambulanceIconBtn.addEventListener("click", () => {
  renderSection("tracking");
});
if (settingsIconBtn) settingsIconBtn.addEventListener("click", () => {
  renderSection("configuraciones");
});
closeSignupModal.addEventListener("click", closeCreateAccountModal);
signupModalBackdrop.addEventListener("click", closeCreateAccountModal);
signinFromModal.addEventListener("click", closeCreateAccountModal);
createAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterSystem();
});
toggleModalPassword.addEventListener("click", () => {
  const isHidden = modalPassword.type === "password";
  modalPassword.type = isHidden ? "text" : "password";
  toggleModalPassword.textContent = isHidden ? "Hide" : "Show";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !signupModal.classList.contains("hidden")) {
    closeCreateAccountModal();
  }
  if (event.key === "Escape") {
    closeCriticalPersonModal();
    closeStaffPersonModal();
  }
});
