import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/"
})


export const createTrip = (tripData) => API.post("api/create_trip", tripData)
export const createItinerary = (trip_id) => API.post("api/create_itinerary", { trip_id })







