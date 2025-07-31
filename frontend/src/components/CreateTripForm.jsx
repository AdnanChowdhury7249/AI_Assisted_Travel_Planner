import { useState } from "react";
import { createTrip, createItinerary } from "../api/api";
import ReactMarkdown from 'react-markdown';

function CreateTripForm({ onTripCreated }) {

  const [formData, setFormData] = useState({
    location: "",
    num_people: 1,
    budget: 0,
    duration: 1
  })
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const parsers = {
      num_people: (val) => parseInt(val) || 0,
      duration: (val) => parseInt(val) || 0,
      budget: (val) => parseFloat(val) || 0.0,
    };

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsers[name] ? parsers[name](value) : value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setItinerary("");

    try {
      const response = await createTrip(formData);
      const tripId = response.data.trip_id;
      await createItinerary(tripId);
      alert("Trip created!");

      // ✅ call parent-provided refresh function
      onTripCreated();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="num_people">Number of people:</label>
            <input
              type="number"
              name="num_people"
              value={formData.num_people}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="budget">Budget (£):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="duration">Duration (days):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Create Trip
        </button>
      </form>
    </div>
  )

}


export default CreateTripForm
