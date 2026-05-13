import {
  dispatchAmbulance,
  getAmbulances,
  getTrafficLights,
  resetSimulation,
} from "./api.js";

const apiStatus = document.querySelector("#apiStatus");
const ambulanceList = document.querySelector("#ambulanceList");
const trafficList = document.querySelector("#trafficList");
const locationInput = document.querySelector("#locationInput");
const priorityInput = document.querySelector("#priorityInput");
const dispatchBtn = document.querySelector("#dispatchBtn");
const resetBtn = document.querySelector("#resetBtn");

function statusLabel(status) {
  const labels = {
    red: "Rojo",
    yellow: "Amarillo",
    green: "Verde",
  };

  return labels[status] ?? status;
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

function renderTrafficLights(lights) {
  trafficList.innerHTML = lights
    .map(
      (light) => `
        <div class="item">
          <div>
            <strong>Semaforo ${light.id}</strong>
            <span>${light.location}</span>
          </div>
          <span class="light ${light.status}">${statusLabel(light.status)}</span>
        </div>
      `,
    )
    .join("");
}

async function loadDashboard() {
  try {
    const [ambulances, lights] = await Promise.all([
      getAmbulances(),
      getTrafficLights(),
    ]);

    renderAmbulances(ambulances);
    renderTrafficLights(lights);
    apiStatus.classList.add("online");
  } catch (error) {
    apiStatus.classList.remove("online");
    ambulanceList.innerHTML = `<p class="empty">No se pudo conectar con el backend.</p>`;
    trafficList.innerHTML = `<p class="empty">Levanta FastAPI en el puerto 8000.</p>`;
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
