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

export function askHealthAi(message, agent) {
  return request("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message, agent }),
  });
}

export function getAmbulances() {
  return request("/api/ambulances");
}

export function createAmbulance(ambulance) {
  return request("/api/ambulances", {
    method: "POST",
    body: JSON.stringify(ambulance),
  });
}

export function getMenuSections() {
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
      title: "Ambulancias Ruta vida CR",
      intro: "Flota operativa de Ruta vida CR.",
      type: "tracking",
    },
    personas: {
      title: "Personas",
      intro: "Personal operativo registrado para apoyar ambulancias y emergencias.",
      type: "people",
    },
    control: {
      title: "Control",
      intro: "Panel interno para enviar señales operativas al monitor.",
      type: "panelControl",
    },
    monitor: {
      title: "Monitor",
      intro: "Panel interno para recibir señales enviadas desde control.",
      type: "panelMonitor",
    },
    directorio: {
      title: "Directorio",
      intro: "Telefonos de hospitales, clinicas y contactos medicos de Costa Rica.",
      type: "directory",
    },
  };
}
