from models import Ambulance, TrafficLight

traffic_lights = [
    TrafficLight(id=1, location="Avenida Central", status="red"),
    TrafficLight(id=2, location="Hospital San Juan", status="green"),
    TrafficLight(id=3, location="Ruta 27", status="yellow"),
]

ambulances = [
    Ambulance(id=1, driver="Ana Perez", location="Base Norte", priority="medium"),
    Ambulance(id=2, driver="Luis Rojas", location="Base Sur", priority="low"),
]


def get_traffic_lights():
    return traffic_lights


def get_ambulances():
    return ambulances


def prioritize_route(emergency_location: str, priority: str):
    for light in traffic_lights:
        light.status = "green"

    selected = ambulances[0]
    selected.location = emergency_location
    selected.priority = priority
    selected.active = True

    return {
        "message": "Emergency route prioritized",
        "ambulance": selected,
        "traffic_lights": traffic_lights,
    }


def reset_simulation():
    statuses = ["red", "green", "yellow"]
    for index, light in enumerate(traffic_lights):
        light.status = statuses[index % len(statuses)]

    ambulances[0].location = "Base Norte"
    ambulances[0].priority = "medium"
    ambulances[1].location = "Base Sur"
    ambulances[1].priority = "low"

    return {"message": "Simulation reset"}
