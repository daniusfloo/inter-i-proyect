const API_URL = "http://127.0.0.1:8001";

async function request(path) {
  const response = await fetch(`${API_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}

export function getHospitals() {
  return request("/api/hospitals");
}
