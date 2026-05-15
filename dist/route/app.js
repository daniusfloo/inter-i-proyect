import { getHospitals } from "./api.js";

const nearestHospital = document.querySelector("#nearestHospital");
const routeSummary = document.querySelector("#routeSummary");
const routeStatus = document.querySelector("#routeStatus");
const alertTitle = document.querySelector("#alertTitle");
const alertDescription = document.querySelector("#alertDescription");
const alertOptions = document.querySelectorAll(".alert-option");
const menuLink = document.querySelector("#menuLink");

const fallbackHospitals = [
  { name: "Hospital", location: "La Uruca", available_beds: 8 },
  { name: "Hospital San Juan", location: "San Jose centro", available_beds: 5 },
  { name: "Hospital Calderon Guardia", location: "Aranjuez", available_beds: 3 },
];

const alertContent = {
  alta: {
    title: "Alerta alta",
    description: "Prioridad maxima para traslado inmediato.",
    classes: ["bg-rose-600", "text-white", "border-rose-600"],
  },
  media: {
    title: "Alerta media",
    description: "Prioridad intermedia para seguimiento constante.",
    classes: ["bg-amber-500", "text-white", "border-amber-500"],
  },
  baja: {
    title: "Alerta baja",
    description: "Prioridad baja para atencion sin urgencia critica.",
    classes: ["bg-teal-700", "text-white", "border-teal-700"],
  },
};

const inactiveClasses = [
  "bg-white",
  "text-slate-700",
  "border-slate-200",
  "hover:bg-slate-50",
];

menuLink.href = window.location.pathname.includes("frontend-route")
  ? "../frontend-menu/index.html"
  : "../menu/";

function setupAlertOptions() {
  alertOptions.forEach((option) => {
    option.classList.add(
      "min-h-12",
      "rounded-lg",
      "border",
      "px-4",
      "text-sm",
      "font-bold",
      "transition",
    );

    option.addEventListener("click", () => {
      selectAlert(option.dataset.alert);
    });
  });
}

function selectAlert(type) {
  const selected = alertContent[type] ?? alertContent.alta;
  const activeClasses = Object.values(alertContent).flatMap((alert) => alert.classes);

  alertOptions.forEach((option) => {
    const isActive = option.dataset.alert === type;
    option.classList.remove(...activeClasses, ...inactiveClasses);
    option.classList.add(...(isActive ? selected.classes : inactiveClasses));
  });

  alertTitle.textContent = selected.title;
  alertDescription.textContent = selected.description;
  routeStatus.textContent = selected.title;
}

function getNearestHospital(hospitals) {
  return [...hospitals].sort((a, b) => b.available_beds - a.available_beds)[0];
}

async function loadRoute() {
  try {
    const hospitals = await getHospitals();
    renderRoute(getNearestHospital(hospitals));
  } catch (error) {
    renderRoute(getNearestHospital(fallbackHospitals), true);
  }
}

function renderRoute(hospital, isFallback = false) {
  nearestHospital.textContent = hospital.name;
  routeSummary.textContent = `Ruta sugerida hacia ${hospital.name}, ${hospital.location}.`;

  if (isFallback) {
    routeSummary.textContent = `Ruta sugerida hacia ${hospital.name}, ${hospital.location}. Datos locales.`;
  }
}

setupAlertOptions();
selectAlert("alta");
loadRoute();
