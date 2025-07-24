from pydantic import BaseModel
from typing import Optional


class TripCreate(BaseModel):
    location: str
    num_people: int
    budget: float
    duration: int


class TripUpdate(BaseModel):
    location: Optional[str]
    num_people: Optional[int]
    budget: Optional[float]
    duration: Optional[int]
