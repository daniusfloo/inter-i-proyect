from pydantic import BaseModel


class TrafficLight(BaseModel):
    id: int
    location: str
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
