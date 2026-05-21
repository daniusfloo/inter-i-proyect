from fastapi import APIRouter

from models import ChatRequest, DispatchRequest
from services import (
    ask_open_source_health_ai,
    get_ambulances,
    get_emergency_location,
    get_hospitals,
    get_traffic_lights,
    prioritize_route,
    reset_simulation,
)

router = APIRouter(prefix="/api")


@router.get("/traffic-lights")
def traffic_lights():
    return get_traffic_lights()


@router.get("/ambulances")
def ambulances():
    return get_ambulances()


@router.get("/hospitals")
def hospitals():
    return get_hospitals()


@router.get("/emergency-location")
def emergency_location():
    return get_emergency_location()


@router.post("/dispatch")
def dispatch(request: DispatchRequest):
    return prioritize_route(request.emergency_location, request.priority)


@router.post("/reset")
def reset():
    return reset_simulation()


@router.post("/chat")
def chat(request: ChatRequest):
    return ask_open_source_health_ai(request.message, request.agent)
