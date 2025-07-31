import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/"
})


export const createTrip = (tripData) => API.post("api/create_trip", tripData)
export const createItinerary = (trip_id) => API.post("api/create_itinerary", { trip_id })
export const getAllTrips = () => API.get("api/get_trips")
export const deleteTrip = (id) => API.delete(`api/delete_trip/${id}`)
export const getAllitineraries = (trip_id) => API.get(`api/get_itinerary/${trip_id}`)









