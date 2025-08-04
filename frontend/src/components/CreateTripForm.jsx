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

      onTripCreated();

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">

      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-white p-6 rounded-lg w-full max-w-lg shadow-md bg-white"
      >
        <h1 className="flex justify-center items-center font-bold text-2x1">Plan Your Next Adventure</h1>
        <h2 className="flex justify-center items-center text-sm text-gray-500">Tell us about your dream trip and we'll help you plan it</h2>
        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-sm py-1">Destination</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border px-1 py-1 text-sm rounded"
          />
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between">
          <div className="flex flex-col w-full md:w-[30%]">
            <label htmlFor="num_people" className="font-semibold text-sm py-1">Number of people:</label>
            <input
              type="number"
              name="num_people"
              value={formData.num_people}
              onChange={handleChange}
              className="border px-1 py-1 text-sm rounded"
            />
          </div>

          <div className="flex flex-col w-full md:w-[30%]">
            <label htmlFor="budget" className="font-semibold text-sm py-1">Budget (£):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="border px-1 py-1 text-sm rounded"
            />
          </div>

          <div className="flex flex-col w-full md:w-[30%]">
            <label htmlFor="duration" className="font-semibold text-sm py-1">Duration (days):</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="border px-1 py-1 text-sm rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Trip
        </button>
      </form>
    </div>
  )
}


export default CreateTripForm
