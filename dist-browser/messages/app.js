import { getAmbulances, getEmergencyLocation } from "./api.js";

const apiStatus = document.querySelector("#apiStatus");
const lastUpdate = document.querySelector("#lastUpdate");
const messageList = document.querySelector("#messageList");

const baseLocations = {
  1: "Base Norte",
  2: "Base Sur",
};

function priorityLabel(priority) {
  const labels = {
    high: "Alta",
    medium: "Media",
    low: "Baja",
    none: "Sin prioridad",
  };

  return labels[priority] ?? priority;
}

function nowLabel() {
  return new Intl.DateTimeFormat("es-CR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date());
}

function renderEmptyMessage() {
  messageList.innerHTML = `
    <article class="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
      <p class="font-bold text-slate-700">Sin ambulancias en emergencia</p>
      <p class="mt-1 text-sm text-slate-500">
        Cuando se asigne una ambulancia, su informacion aparecera en esta vista.
      </p>
    </article>
  `;
}

function renderEmergencyMessages(ambulances, emergency) {
  const activeAmbulances = ambulances.filter((ambulance) => ambulance.active);

  if (activeAmbulances.length === 0) {
    renderEmptyMessage();
    return;
  }

  messageList.innerHTML = activeAmbulances
    .map((ambulance) => {
      const origin = baseLocations[ambulance.id] ?? "Base operativa";
      const destination = emergency.status === "assigned" ? emergency.location : ambulance.location;

      return `
        <article class="rounded-lg border border-teal-100 bg-teal-50 p-5">
          <div class="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <p class="text-sm font-bold uppercase text-teal-700">
                Ambulancia en emergencia
              </p>
              <h2 class="mt-1 text-xl font-bold text-slate-900">
                Ambulancia ${ambulance.id} - ${ambulance.driver}
              </h2>
            </div>
            <span class="inline-flex min-h-7 w-fit items-center rounded-full bg-white px-3 text-sm font-bold text-teal-800">
              Prioridad ${priorityLabel(ambulance.priority)}
            </span>
          </div>

          <div class="mt-5 grid gap-3 border-l-4 border-teal-600 pl-4">
            <p class="text-slate-700">
              <strong>Ruta:</strong> ${origin} -> ${destination}
            </p>
            <p class="text-slate-700">
              <strong>Estado:</strong> Ambulancia asignada y en desplazamiento.
            </p>
            <p class="text-sm text-slate-500">
              Mensaje recibido a las ${nowLabel()}.
            </p>
          </div>
        </article>
      `;
    })
    .join("");
}

async function loadMessages() {
  try {
    const [ambulances, emergency] = await Promise.all([
      getAmbulances(),
      getEmergencyLocation(),
    ]);

    renderEmergencyMessages(ambulances, emergency);
    apiStatus.classList.remove("bg-rose-500");
    apiStatus.classList.add("bg-emerald-500");
    lastUpdate.textContent = `Ultima actualizacion: ${nowLabel()}`;
  } catch (error) {
    apiStatus.classList.remove("bg-emerald-500");
    apiStatus.classList.add("bg-rose-500");
    lastUpdate.textContent = "No se pudo conectar con el backend.";
    messageList.innerHTML = `
      <article class="rounded-lg border border-rose-100 bg-rose-50 p-5">
        <p class="font-bold text-rose-800">Conexion no disponible</p>
        <p class="mt-1 text-sm text-rose-700">
          Levanta el backend en http://127.0.0.1:8001 para recibir mensajes.
        </p>
      </article>
    `;
  }
}

loadMessages();
setInterval(loadMessages, 5000);
