import { useEffect, useState } from "react";
import { getAllTrips } from "../api/api";
import CreateTripForm from "./CreateTripForm";
import DisplayCard from "./DisplayCard";

function TripPage() {
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    try {
      const response = await getAllTrips();
      setTrips(response.data);
    } catch (err) {
      console.error("Failed to fetch trips", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div>
      <CreateTripForm onTripCreated={fetchTrips} />
      <DisplayCard trips={trips} setTrips={setTrips} />
    </div>
  );
}

export default TripPage;
