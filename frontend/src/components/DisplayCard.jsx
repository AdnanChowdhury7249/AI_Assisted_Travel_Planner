import { useState, useEffect } from "react";
import { getAllTrips } from "../api/api";


function DisplayCard() {

  const [trips, setTrips] = useState([])

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await getAllTrips()
        setTrips(response.data)

      } catch (error) {
        console.error("error fetching trips", error)

      }
    }
    fetchTrips();
  }, [])

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <div key={trip.id} className="border rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">{trip.location}</h2>
          <p>People: {trip.num_people}</p>
          <p>Budget: £{trip.budget}</p>
          <p>Duration: {trip.duration} days</p>
        </div>
      ))}
    </div>

  )
}

export default DisplayCard
