from fastapi import APIRouter
from backend.queries.queries import createTripQuery, updateTripQuery
from backend.schema.trip_schemas import TripCreate, TripUpdate


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


@router.put("/api/update_trip")
async def updateTrip(trip_id: int, trip: TripUpdate):
    await updateTripQuery(
        id=trip_id,
        location=trip.location,
        num_people=trip.num_people,
        budget=trip.budget,
        duration=trip.duration,
    )
    return {"message": "Trip updated successfully"}
