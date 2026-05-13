import {
  dispatchAmbulance,
  getAmbulances,
  getEmergencyLocation,
  getHospitals,
  resetSimulation,
} from "./api.js";

const apiStatus = document.querySelector("#apiStatus");
const emergencyAmbulanceList = document.querySelector("#emergencyAmbulanceList");
const availableAmbulanceList = document.querySelector("#availableAmbulanceList");
const hospitalList = document.querySelector("#hospitalList");
const emergencyLocation = document.querySelector("#emergencyLocation");
const locationInput = document.querySelector("#locationInput");
const priorityInput = document.querySelector("#priorityInput");
const dispatchBtn = document.querySelector("#dispatchBtn");
const resetBtn = document.querySelector("#resetBtn");

const itemClasses =
  "flex flex-col justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center";
const textStackClasses = "grid gap-1";
const mutedTextClasses = "text-slate-500";
const metaClasses = "grid gap-1 text-left sm:text-right";
const pillClasses =
  "inline-flex min-h-7 min-w-20 items-center justify-center rounded-full bg-teal-50 px-3 text-sm font-bold text-teal-800";
const emptyClasses = "text-slate-500";

function priorityLabel(priority) {
  const labels = {
    high: "Alta",
    medium: "Media",
    low: "Baja",
    none: "Sin prioridad",
  };

  return labels[priority] ?? priority;
}

function renderAmbulances(ambulances) {
  const emergencyAmbulances = ambulances.filter((ambulance) => ambulance.active);
  const availableAmbulances = ambulances.filter((ambulance) => !ambulance.active);

  emergencyAmbulanceList.innerHTML = renderAmbulanceCards(
    emergencyAmbulances,
    "No hay ambulancias en emergencia.",
  );
  availableAmbulanceList.innerHTML = renderAmbulanceCards(
    availableAmbulances,
    "No hay ambulancias disponibles.",
  );
}

function renderAmbulanceCards(ambulances, emptyMessage) {
  if (ambulances.length === 0) {
    return `<p class="${emptyClasses}">${emptyMessage}</p>`;
  }

  return ambulances
    .map(
      (ambulance) => `
        <div class="${itemClasses}">
          <div class="${textStackClasses}">
            <strong>Ambulancia ${ambulance.id}</strong>
            <span class="${mutedTextClasses}">${ambulance.driver}</span>
          </div>
          <div class="${metaClasses}">
            <span class="${mutedTextClasses}">${ambulance.location}</span>
            <span class="${pillClasses}">${priorityLabel(ambulance.priority)}</span>
          </div>
        </div>
      `,
    )
    .join("");
}

function renderHospitals(hospitals) {
  hospitalList.innerHTML = hospitals
    .map(
      (hospital) => `
        <div class="${itemClasses}">
          <div class="${textStackClasses}">
            <strong>${hospital.name}</strong>
            <span class="${mutedTextClasses}">${hospital.location}</span>
          </div>
          <span class="${pillClasses}">${hospital.available_beds} camas</span>
        </div>
      `,
    )
    .join("");
}

function renderEmergencyLocation(emergency) {
  emergencyLocation.innerHTML = `
    <div class="${itemClasses}">
      <div class="${textStackClasses}">
        <strong>${emergency.location}</strong>
        <span class="${mutedTextClasses}">${emergency.status === "assigned" ? "Ambulancia asignada" : "Esperando despacho"}</span>
      </div>
      <span class="${pillClasses}">${priorityLabel(emergency.priority)}</span>
    </div>
  `;
}

async function loadDashboard() {
  try {
    const [ambulances, hospitals, emergency] = await Promise.all([
      getAmbulances(),
      getHospitals(),
      getEmergencyLocation(),
    ]);

    renderAmbulances(ambulances);
    renderHospitals(hospitals);
    renderEmergencyLocation(emergency);
    apiStatus.classList.remove("bg-rose-500");
    apiStatus.classList.add("bg-emerald-500");
  } catch (error) {
    apiStatus.classList.remove("bg-emerald-500");
    apiStatus.classList.add("bg-rose-500");
    emergencyAmbulanceList.innerHTML = `<p class="${emptyClasses}">No se pudo conectar con el backend.</p>`;
    availableAmbulanceList.innerHTML = `<p class="${emptyClasses}">No se pudo conectar con el backend.</p>`;
    hospitalList.innerHTML = `<p class="${emptyClasses}">Levanta FastAPI en el puerto 8001.</p>`;
    emergencyLocation.innerHTML = `<p class="${emptyClasses}">Sin datos de emergencia.</p>`;
  }
}

dispatchBtn.addEventListener("click", async () => {
  dispatchBtn.disabled = true;
  try {
    await dispatchAmbulance(locationInput.value, priorityInput.value);
    await loadDashboard();
  } catch (error) {
    await loadDashboard();
  } finally {
    dispatchBtn.disabled = false;
  }
});

resetBtn.addEventListener("click", async () => {
  resetBtn.disabled = true;
  try {
    await resetSimulation();
    await loadDashboard();
  } catch (error) {
    await loadDashboard();
  } finally {
    resetBtn.disabled = false;
  }
});

loadDashboard();
