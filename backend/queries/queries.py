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
        f"You are a helpful travel planner. Based on the following details, generate a detailed and customer-friendly "
        f"{trip['duration']}-day holiday itinerary in Markdown format:\n\n"
        f"- Destination: {trip['location']}\n"
        f"- Number of people: {trip['num_people']}\n"
        f"- Total budget: £{trip['budget']} GBP\n\n"
        f"Please structure the response with:\n"
        f"1. A friendly introduction\n"
        f"2. A daily breakdown titled **Day 1**, **Day 2**, etc.\n"
        f"3. Suggestions for accommodation, meals, transport, and attractions\n"
        f"4. Emphasise budget-friendliness and unique experiences\n"
        f"5. End with a summary budget breakdown in GBP\n\n"
        f"Keep it well-formatted in Markdown so it's easy to render for customers."
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
