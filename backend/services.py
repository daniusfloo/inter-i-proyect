import json
import os
from urllib.error import URLError
from urllib.request import Request, urlopen

from models import Ambulance, AmbulanceCreateRequest, EmergencyLocation, Hospital, TrafficLight

traffic_lights = [
    TrafficLight(id=1, location="Avenida Central", status="red"),
    TrafficLight(id=2, location="Hospital San Juan", status="green"),
    TrafficLight(id=3, location="Ruta 27", status="yellow"),
]

ambulances = [
    Ambulance(
        id=1,
        name="Unidad Ruta vida CR-01",
        model="Toyota Hiace",
        zone="Base Norte",
        province="San Jose",
        staff_count=3,
        preferred_hospital="Hospital Mexico",
        company="Ruta vida CR",
        driver="Ana Perez",
        location="Base Norte",
        priority="medium",
        active=False,
    ),
    Ambulance(
        id=2,
        name="Unidad Ruta vida CR-02",
        model="Mercedes-Benz Sprinter",
        zone="Base Sur",
        province="San Jose",
        staff_count=2,
        preferred_hospital="Hospital San Juan de Dios",
        company="Ruta vida CR",
        driver="Luis Rojas",
        location="Base Sur",
        priority="low",
        active=False,
    ),
]

hospitals = [
    Hospital(id=1, name="Hospital", location="La Uruca", available_beds=8),
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


def add_ambulance(request: AmbulanceCreateRequest):
    next_id = max((ambulance.id for ambulance in ambulances), default=0) + 1
    ambulance = Ambulance(id=next_id, **request.model_dump())
    ambulances.append(ambulance)
    return ambulance


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


def ask_open_source_health_ai(message: str, agent: str = "salud"):
    model = os.getenv("SEA_OLLAMA_MODEL", "llama3.1")
    ollama_url = os.getenv("SEA_OLLAMA_URL", "http://127.0.0.1:11434/api/chat")

    payload = {
        "model": model,
        "stream": False,
        "messages": [
            {
                "role": "system",
                "content": (
                    "Eres un asistente de inteligencia artificial de codigo abierto integrado en Ruta vida CR. "
                    "Responde en espanol de forma clara, util y natural."
                ),
            },
            {
                "role": "user",
                "content": message,
            },
        ],
    }

    request = Request(
        ollama_url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    try:
        with urlopen(request, timeout=45) as response:
            data = json.loads(response.read().decode("utf-8"))
    except URLError:
        return {
            "answer": get_basic_health_ai_answer(message, agent),
            "model": "sea-basic-open-ai",
        }
    except TimeoutError:
        return {
            "answer": get_basic_health_ai_answer(message, agent),
            "model": "sea-basic-open-ai",
        }

    answer = data.get("message", {}).get("content", "").strip()
    if not answer:
        answer = "La IA local no devolvio una respuesta valida. Intenta reformular la pregunta."

    return {"answer": answer, "model": model}


def get_basic_health_ai_answer(message: str, agent: str = "salud"):
    text = message.lower()

    if any(word in text for word in ["hola", "buenas", "hey", "saludos"]):
        return "Hola. Decime que necesitas y te ayudo."

    if any(word in text for word in ["gracias", "ok", "perfecto", "entiendo"]):
        return "Con gusto. Aqui estoy si necesitas algo mas."

    if any(word in text for word in ["emergencia", "urgencia", "grave", "accidente", "infarto", "derrame", "sangre"]):
        return (
            "Si la situacion es inmediata o pone en riesgo la vida, llama al 911 en Costa Rica. "
            "Mientras coordinas, ubica el centro medico mas cercano, confirma direccion exacta, "
            "telefono de contacto y sintomas principales para el traslado."
        )

    if any(word in text for word in ["hospital", "clinica", "telefono", "numero", "directorio", "contacto"]):
        return (
            "Para contactos de salud en Costa Rica, entra a Directorio y busca por nombre, categoria o telefono. "
            "El sistema incluye hospitales CCSS, areas de salud y el Ministerio de Salud. "
            "Si no aparece el contacto, puedes agregarlo con titulo y numero."
        )

    if any(word in text for word in ["ruta", "ambulancia", "traslado", "mapa", "llegar"]):
        return (
            "Para una ruta de ambulancia en Costa Rica, entra a Inicio y escribe punto de origen y destino "
            "con nombres especificos, por ejemplo Hospital Mexico u Hospital Calderon Guardia. "
            "Verifica siempre la ruta con condiciones reales de transito."
        )

    if any(word in text for word in ["ccss", "ministerio", "protocolo", "salud publica"]):
        return (
            "Para temas de CCSS o Ministerio de Salud, mantente en informacion operativa: identifica centro medico, "
            "contacto, ubicacion, disponibilidad y prioridad. No sustituyas criterio medico profesional."
        )

    if any(word in text for word in ["san jose", "alajuela", "cartago", "heredia", "guanacaste", "puntarenas", "limon"]):
        return (
            "Para esa zona de Costa Rica puedo orientarte con hospitales, clinicas, EBAIS, telefonos, rutas o servicios de salud. "
            "Dime que necesitas exactamente y te respondo directo."
        )

    if any(word in text for word in ["costa rica", "tico", "nacional", "provincia", "canton", "distrito"]):
        return (
            "Si lo enfocamos en salud de Costa Rica, puedo ayudarte con ubicaciones, hospitales, clinicas, rutas, citas, "
            "servicios de la CCSS o contactos. Dame el detalle y te respondo."
        )

    if any(word in text for word in ["que eres", "quien eres", "como funcionas", "ia"]):
        return "Soy el asistente de Ruta vida CR. Si Ollama esta activo uso un modelo abierto; si no, uso respuestas basicas locales."

    return "Puedo ayudarte con eso. Dame un poco mas de contexto o una pregunta mas especifica para responderte mejor."
