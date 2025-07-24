from fastapi import APIRouter
from backend.queries.queries import createTripQuery
from backend.schema.trip_schemas import TripCreate


router = APIRouter()


@router.post("/api/create_trip", tags=["Trips"])
async def create_trip(trip: TripCreate):
    await createTripQuery(
        location=trip.location,
        num_people=trip.num_people,
        budget=trip.budget,
        duration=trip.duration,
    )
    return {"message": "Trip created successfully"}
