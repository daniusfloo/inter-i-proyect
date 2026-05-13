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

export function getTrafficLights() {
  return request("/api/traffic-lights");
}

export function getAmbulances() {
  return request("/api/ambulances");
}

export function dispatchAmbulance(emergencyLocation, priority) {
  return request("/api/dispatch", {
    method: "POST",
    body: JSON.stringify({
      emergency_location: emergencyLocation,
      priority,
    }),
  });
}

export function resetSimulation() {
  return request("/api/reset", { method: "POST" });
}
