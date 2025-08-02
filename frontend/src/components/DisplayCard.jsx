import { deleteTrip, getAllitineraries } from "../api/api";
import { useState } from "react";


function DisplayCard({ trips = [], setTrips }) {
  const [itineraries, setItineraries] = useState({});
  const [expandedItineraries, setExpandedItineraries] = useState({});

  const handleDelete = async (id) => {
    try {
      await deleteTrip(id);
      setTrips((prev) => prev.filter((trip) => trip.id !== id));
    } catch (error) {
      console.error("error deleting trip", error);
    }
  };
  const displayItinerary = async (tripId) => {
    const isExpanded = expandedItineraries[tripId];

    if (isExpanded) {

      setExpandedItineraries((prev) => ({ ...prev, [tripId]: false }));
      return;
    }
    if (!itineraries[tripId]) {
      try {
        const res = await getAllitineraries(tripId);
        setItineraries((prev) => ({
          ...prev,
          [tripId]: res.data.itinerary,
        }));
      } catch (error) {
        console.error("failed to retrieve itinerary", error);
        return;
      }
    }
    setExpandedItineraries((prev) => ({ ...prev, [tripId]: true }));
  };

  return (
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {trips.map((trip) => (
        <div key={trip.id} className="border rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold">{trip.location}</h2>
          <p>People: {trip.num_people}</p>
          <p>Budget: £{trip.budget}</p>
          <p>Duration: {trip.duration} days</p>
          <button
            onClick={() => handleDelete(trip.id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button onClick={() => displayItinerary(trip.id)}
            className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {expandedItineraries[trip.id] ? "Hide Itinerary" : "View Itinerary"}          </button>
          {expandedItineraries[trip.id] && itineraries[trip.id] && (
            <div className="mt-4 bg-gray-100 p-2 rounded max-h-64 overflow-y-auto">
              <h3 className="font-bold mb-2">Itinerary:</h3>
              <p className="whitespace-pre-line">{itineraries[trip.id]}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default DisplayCard;
