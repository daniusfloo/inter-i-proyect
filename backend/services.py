from models import Ambulance, EmergencyLocation, Hospital, TrafficLight

traffic_lights = [
    TrafficLight(id=1, location="Avenida Central", status="red"),
    TrafficLight(id=2, location="Hospital San Juan", status="green"),
    TrafficLight(id=3, location="Ruta 27", status="yellow"),
]

ambulances = [
    Ambulance(id=1, driver="Ana Perez", location="Base Norte", priority="medium", active=False),
    Ambulance(id=2, driver="Luis Rojas", location="Base Sur", priority="low", active=False),
]

hospitals = [
    Hospital(id=1, name="Hospital Mexico", location="La Uruca", available_beds=8),
    Hospital(id=2, name="Hospital San Juan", location="San Jose centro", available_beds=5),
    Hospital(id=3, name="Hospital Calderon Guardia", location="Aranjuez", available_beds=3),
]

current_emergency = EmergencyLocation(
    location="Sin emergencia activa",
    priority="none",
    status="waiting",
)


def get_traffic_lights():
    return traffic_lights


def get_ambulances():
    return ambulances


def get_hospitals():
    return hospitals


def get_emergency_location():
    return current_emergency


def prioritize_route(emergency_location: str, priority: str):
    for light in traffic_lights:
        light.status = "green"

    selected = ambulances[0]
    selected.location = emergency_location
    selected.priority = priority
    selected.active = True
    current_emergency.location = emergency_location
    current_emergency.priority = priority
    current_emergency.status = "assigned"

    return {
        "message": "Emergency route prioritized",
        "ambulance": selected,
        "emergency_location": current_emergency,
        "traffic_lights": traffic_lights,
    }


def reset_simulation():
    statuses = ["red", "green", "yellow"]
    for index, light in enumerate(traffic_lights):
        light.status = statuses[index % len(statuses)]

    ambulances[0].location = "Base Norte"
    ambulances[0].priority = "medium"
    ambulances[0].active = False
    ambulances[1].location = "Base Sur"
    ambulances[1].priority = "low"
    ambulances[1].active = False
    current_emergency.location = "Sin emergencia activa"
    current_emergency.priority = "none"
    current_emergency.status = "waiting"

    return {"message": "Simulation reset"}
