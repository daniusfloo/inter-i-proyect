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
    driver: str
    location: str
    priority: str
    active: bool = True


class DispatchRequest(BaseModel):
    emergency_location: str
    priority: str = "high"


class ChatRequest(BaseModel):
    message: str
    agent: str = "salud"


class ChatResponse(BaseModel):
    answer: str
    model: str
