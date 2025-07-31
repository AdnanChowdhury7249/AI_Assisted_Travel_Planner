from ..db.database import database
from openai import OpenAI
from dotenv import load_dotenv
import os
from fastapi import HTTPException

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def createTripQuery(location, num_people, budget, duration):
    query = """
    INSERT INTO trips (location, num_people, budget, duration) 
    VALUES (:location, :num_people, :budget, :duration)
    RETURNING id;
    """
    values = {
        "location": location,
        "num_people": num_people,
        "budget": budget,
        "duration": duration,
    }
    trip_id_row = await database.fetch_one(query=query, values=values)

    if trip_id_row is None:
        raise HTTPException(status_code=500, detail="Failed to create trip")

    return trip_id_row["id"]


async def updateTripQuery(id, location, num_people, budget, duration):
    query = """
    UPDATE trips
    SET location = :location,
    num_people = :num_people, 
    budget = :budget, 
    duration = :duration
    WHERE id = :id
  """
    values = {
        "id": id,
        "location": location,
        "num_people": num_people,
        "budget": budget,
        "duration": duration,
    }
    await database.execute(query=query, values=values)


async def getTripQuery():
    query = """
  SELECT * From Trips
  """
    result = await database.fetch_all(query=query)
    return result


async def deleteTripQuery(id):
    query = "DELETE FROM trips WHERE id = :id"
    result = await database.execute(query=query, values={"id": id})
    return result


async def generateItinerary(trip_id: int):
    query = "SELECT * FROM trips WHERE id = :trip_id"
    trip = await database.fetch_one(query=query, values={"trip_id": trip_id})
    if not trip:
        return None

    prompt = (
        f"Create a {trip['duration']}-day travel itinerary for {trip['num_people']} people "
        f"going to {trip['location']} with a budget of {trip['budget']}."
    )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800,
        temperature=0.7,
    )

    content = response.choices[0].message.content

    insert_query = """
    INSERT INTO itineraries (trip_id, content, status)
    VALUES (:trip_id, :content, :status)
    """
    await database.execute(
        query=insert_query,
        values={"trip_id": trip_id, "content": content, "status": "generated"},
    )
    return content


async def getItineraryQuery(trip_id: int):
    query = "SELECT * FROM itineraries WHERE trip_id = :trip_id"
    result = await database.fetch_one(query=query, values={"trip_id": trip_id})
    return result


async def getTripByIdQuery(id: int):
    query = "SELECT * FROM trips WHERE id = :id"
    values = {"id": id}
    result = await database.fetch_one(query=query, values=values)
    return result
