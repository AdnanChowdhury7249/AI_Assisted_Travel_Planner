from ..db.database import database


async def createTripQuery(location, num_people, budget, duration):
    query = """InSERT into trips (location, num_people, budget, duration) 
    VALUES (:location, :num_people, :budget, :duration)
    """
    values = {
        "location": location,
        "num_people": num_people,
        "budget": budget,
        "duration": duration,
    }
    await database.execute(query=query, values=values)


async def updateTripQuery(id, location, num_people, budget, duration):
    query = """
    UPDATE trips
    SET location = :location,
    num_people = :num_people, 
    budget = :budget, 
    duration = :duration
  """
    values = {
        "id": id,
        "location": location,
        "num_people": num_people,
        "budget": budget,
        "duration": duration,
    }
    await database.execute(query=query, values=values)
