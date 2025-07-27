from fastapi import APIRouter, HTTPException
from backend.queries.queries import (
    createTripQuery,
    updateTripQuery,
    getTripQuery,
    generateItinerary,
)
from backend.schema.trip_schemas import TripCreate, TripUpdate, ItineraryRequest


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


@router.get("/api/get_trips")
async def getTrips():
    all_trips = await getTripQuery()
    return all_trips


@router.post("/api/create_itinerary", tags=["itineraries"])
async def createItinerary(request: ItineraryRequest):
    content = await generateItinerary(request.trip_id)
    if not content:
        raise HTTPException(status_code=404, detail="Trip not found")
    return {"message": "Itinerary generated successfully", "itinerary": content}
