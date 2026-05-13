import {
  dispatchAmbulance,
  getAmbulances,
  getEmergencyLocation,
  getHospitals,
  resetSimulation,
} from "./api.js";

const apiStatus = document.querySelector("#apiStatus");
const ambulanceList = document.querySelector("#ambulanceList");
const hospitalList = document.querySelector("#hospitalList");
const emergencyLocation = document.querySelector("#emergencyLocation");
const locationInput = document.querySelector("#locationInput");
const priorityInput = document.querySelector("#priorityInput");
const dispatchBtn = document.querySelector("#dispatchBtn");
const resetBtn = document.querySelector("#resetBtn");

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
  ambulanceList.innerHTML = ambulances
    .map(
      (ambulance) => `
        <div class="item">
          <div>
            <strong>Ambulancia ${ambulance.id}</strong>
            <span>${ambulance.driver}</span>
          </div>
          <div class="meta">
            <span>${ambulance.location}</span>
            <span class="pill">${ambulance.priority}</span>
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
        <div class="item">
          <div>
            <strong>${hospital.name}</strong>
            <span>${hospital.location}</span>
          </div>
          <span class="pill">${hospital.available_beds} camas</span>
        </div>
      `,
    )
    .join("");
}

function renderEmergencyLocation(emergency) {
  emergencyLocation.innerHTML = `
    <div class="item">
      <div>
        <strong>${emergency.location}</strong>
        <span>${emergency.status === "assigned" ? "Ambulancia asignada" : "Esperando despacho"}</span>
      </div>
      <span class="pill">${priorityLabel(emergency.priority)}</span>
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
    apiStatus.classList.add("online");
  } catch (error) {
    apiStatus.classList.remove("online");
    ambulanceList.innerHTML = `<p class="empty">No se pudo conectar con el backend.</p>`;
    hospitalList.innerHTML = `<p class="empty">Levanta FastAPI en el puerto 8001.</p>`;
    emergencyLocation.innerHTML = `<p class="empty">Sin datos de emergencia.</p>`;
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
