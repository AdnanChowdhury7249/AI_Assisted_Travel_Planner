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
    <div className="p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5 ">
      {trips.map((trip) => (
        <div key={trip.id} className="border-white rounded-lg shadow p-4 bg-white">
          <h2 className="text-sm font-bold py-1">{trip.location.charAt(0).toUpperCase() + String(trip.location).slice(1)}</h2>
          <p className="text-xs text-gray-600 py-1">Created at {new Date(trip.created_at).toLocaleDateString()}</p>
          <div className="flex gap-5 text-sm">
            <p className=" text-gray-800 py-1">{trip.num_people} Travellers</p>
            <p className=" py-1"> £ {trip.budget}</p>
            <p className=" py-1">{trip.duration} {trip.duration === 1 ? 'day' : 'days'}</p>
          </div>

          <button
            onClick={() => handleDelete(trip.id)}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
          <button onClick={() => displayItinerary(trip.id)}
            className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {expandedItineraries[trip.id] ? "Hide Itinerary" : "View Itinerary"}</button>
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
