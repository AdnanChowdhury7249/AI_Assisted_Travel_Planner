from fastapi import APIRouter, HTTPException
from backend.queries.queries import (
    createTripQuery,
    updateTripQuery,
    getTripQuery,
    generateItinerary,
    getItineraryQuery,
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


@router.put("/api/update_trip", tags=["Trips"])
async def updateTrip(trip_id: int, trip: TripUpdate):
    await updateTripQuery(
        id=trip_id,
        location=trip.location,
        num_people=trip.num_people,
        budget=trip.budget,
        duration=trip.duration,
    )
    return {"message": "Trip updated successfully"}


@router.get("/api/get_trips", tags=["Trips"])
async def getTrips():
    all_trips = await getTripQuery()
    return all_trips


@router.post("/api/create_itinerary", tags=["Itineraries"])
async def createItinerary(request: ItineraryRequest):
    content = await generateItinerary(request.trip_id)
    if not content:
        raise HTTPException(status_code=404, detail="Trip not found")
    return {"message": "Itinerary generated successfully", "itinerary": content}


@router.get("/api/get_itinerary/{trip_id}", tags=["Itineraries"])
async def get_itinerary(trip_id: int):
    itinerary = await getItineraryQuery(trip_id)

    if not itinerary:
        raise HTTPException(status_code=404, detail="itinerary not found")
    return {"itinerary": itinerary["content"]}
