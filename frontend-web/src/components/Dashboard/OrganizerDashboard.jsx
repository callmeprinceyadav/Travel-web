import React, { useState, useEffect } from "react";
import axios from "axios";
import TripForm from "../Trip/TripForm";
import TripList from "../Trip/TripList";

const OrganizerDashboard = () => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const response = await axios.get(
        "https://travel-web-backend.vercel.app/trips",
        { withCredentials: true }
      );
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
      alert("Failed to load trips. Please refresh or try later.");
    }
  };

  const createTrip = async (trip) => {
    try {
      const response = await axios.post(
        "https://travel-web-backend.vercel.app/trips/create/",
        trip,
        { withCredentials: true }
      );
      setTrips((prevTrips) => [...prevTrips, response.data]);
      alert("Trip created successfully!");
    } catch (error) {
      console.error("Error creating trip:", error);
      alert("Failed to create trip.");
    }
  };

  const updateTrip = async (trip) => {
    try {
      const response = await axios.put(
        `https://travel-web-backend.vercel.app/trips/update/${trip._id}`,
        trip,
        { withCredentials: true }
      );
      setTrips((prevTrips) =>
        prevTrips.map((t) => (t._id === trip._id ? response.data : t))
      );
      setSelectedTrip(null);
      alert("Trip updated successfully!");
    } catch (error) {
      console.error("Error updating trip:", error);
      alert("Failed to update trip.");
    }
  };

  const deleteTrip = async (id) => {
    try {
      await axios.delete(
        `https://travel-web-backend.vercel.app/trips/delete/${id}`,
        { withCredentials: true }
      );
      setTrips((prevTrips) => prevTrips.filter((t) => t._id !== id));
      alert("Trip deleted successfully!");
    } catch (error) {
      console.error("Error deleting trip:", error);
      alert("Failed to delete trip.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-blue-50 via-yellow-50 to-pink-50 py-8 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-extrabold text-yellow-600 mb-8 text-center">
          Organizer Dashboard
        </h1>

        <section className="mb-10">
          <TripForm
            createTrip={createTrip}
            updateTrip={updateTrip}
            selectedTrip={selectedTrip}
            setSelectedTrip={setSelectedTrip}
          />
        </section>

        <section>
          <TripList
            trips={trips}
            deleteTrip={deleteTrip}
            setSelectedTrip={setSelectedTrip}
          />
        </section>
      </div>
    </main>
  );
};

export default OrganizerDashboard;
