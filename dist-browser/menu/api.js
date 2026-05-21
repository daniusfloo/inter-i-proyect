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

export function getMenuSections() {
  return {
    configuraciones: {
      title: "Ajustes",
      intro: "Opciones generales para preparar el uso del sistema.",
      type: "settings",
      items: [],
    },
    tracking: {
      title: "Tracking de ambulancias",
      intro: "Mapa abierto con referencia de San Jose, hospitales y rutas principales.",
      type: "tracking",
      items: [],
    },
    directorio: {
      title: "Directorio",
      intro: "Telefonos de hospitales, clinicas y contactos medicos de Costa Rica.",
      type: "directory",
      items: [
        "Fuente base: directorio publico de hospitales CCSS y directorios institucionales del Ministerio de Salud.",
      ],
    },
  };
}
