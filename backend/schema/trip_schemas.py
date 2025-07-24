from pydantic import BaseModel


class TripCreate(BaseModel):
    location: str
    num_people: int
    budget: float
    duration: int
