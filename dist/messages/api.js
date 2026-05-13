const API_URL = "http://127.0.0.1:8001";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function getAmbulances() {
  return request("/api/ambulances");
}

export function getEmergencyLocation() {
  return request("/api/emergency-location");
}
