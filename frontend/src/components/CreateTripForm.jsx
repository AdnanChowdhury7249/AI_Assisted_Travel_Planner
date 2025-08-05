import { useEffect, useState } from "react";
import { createTrip, createItinerary } from "../api/api";
import { BeatLoader } from "react-spinners";


function CreateTripForm({ onTripCreated }) {

  const [formData, setFormData] = useState({
    location: "",
    num_people: 1,
    budget: 0,
    duration: 1
  })
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

      setSuccess(true);
      onTripCreated();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <div className="flex justify-center pt-8 px-4 py-20">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-white p-6 rounded-lg w-full max-w-lg shadow-md bg-white"
      >
        <h1 className="text-center font-bold text-2xl">Plan Your Next Adventure</h1>
        <h2 className="text-center text-sm text-gray-500">Tell us about your dream trip and we'll help you plan it</h2>

        <div className="flex flex-col">
          <label htmlFor="location" className="font-semibold text-xs py-1" style={{ color: "#2C303A" }}>Destination</label>
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
            <label htmlFor="num_people" className="font-semibold text-xs py-1" style={{ color: "#2C303A" }}>Travellers:</label>
            <input
              type="number"
              name="num_people"
              value={formData.num_people}
              onChange={handleChange}
              className="border px-1 py-1 text-sm rounded"
            />
          </div>

          <div className="flex flex-col w-full md:w-[30%]">
            <label htmlFor="budget" className="font-semibold text-xs py-1" style={{ color: "#2C303A" }}>Budget (£):</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="border px-1 py-1 text-sm rounded"
            />
          </div>

          <div className="flex flex-col w-full md:w-[30%]">
            <label htmlFor="duration" className="font-semibold text-xs py-1" style={{ color: "#2C303A" }}>Duration (days):</label>
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
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Create Trip
        </button>
        {loading && (
          <div className="flex justify-center mt-4">
            <BeatLoader color="#3B82F6" size={10} />
          </div>
        )}
        {success && !loading && (
          <div className="text-green-600 text-sm text-center mt-2">
            Trip created successfully!
          </div>
        )}
      </form>
    </div>
  );

}


export default CreateTripForm
