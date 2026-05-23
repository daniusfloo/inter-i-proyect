from pydantic import BaseModel


class TrafficLight(BaseModel):
    id: int
    location: str
    status: str


class Hospital(BaseModel):
    id: int
    name: str
    location: str
    available_beds: int


class EmergencyLocation(BaseModel):
    location: str
    priority: str
    status: str


class Ambulance(BaseModel):
    id: int
    name: str
    model: str
    zone: str
    province: str
    staff_count: int
    preferred_hospital: str
    company: str
    driver: str
    location: str
    priority: str
    active: bool = True


class AmbulanceCreateRequest(BaseModel):
    name: str
    model: str
    zone: str
    province: str
    staff_count: int
    preferred_hospital: str
    company: str
    driver: str = "Sin asignar"
    location: str = "Base operativa"
    priority: str = "low"
    active: bool = False


class DispatchRequest(BaseModel):
    emergency_location: str
    priority: str = "high"


class ChatRequest(BaseModel):
    message: str
    agent: str = "salud"


class ChatResponse(BaseModel):
    answer: str
    model: str
