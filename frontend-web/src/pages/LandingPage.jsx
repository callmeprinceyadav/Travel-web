import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TripDetailsModal from "./TripDetailsModal";
import PaymentModal from "./PaymentModal";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { isUserLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          "https://travel-web-backend.vercel.app/trips",
          { withCredentials: true }
        );
        setTrips(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trips:", error);
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const handleViewDetails = async (tripId) => {
    try {
      const response = await axios.get(
        `https://travel-web-backend.vercel.app/trips/${tripId}`,
        { withCredentials: true }
      );
      setSelectedTrip(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching trip details:", error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTrip(null);
  };

  const handleBookNow = (tripId) => {
    if (!isUserLoggedIn) {
      alert("You must be logged in to book a trip.");
      navigate("/login");
    } else {
      const selectedTrip = trips.find((trip) => trip._id === tripId);
      setSelectedTrip(selectedTrip);
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = async (tripId) => {
    try {
      await axios.post(
        "https://travel-web-backend.vercel.app/bookings/book",
        { tripId },
        { withCredentials: true }
      );
      alert("Trip booked successfully!");
      setPaymentModalOpen(false);
      setSelectedTrip(null);
    } catch (error) {
      console.error("Error booking trip:", error);
      alert("Failed to book trip.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-yellow-50 to-pink-100 font-inter">
      {/* HERO HEADER */}
      <section className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')", minHeight: "380px"}}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-yellow-700/30 to-pink-700/40 backdrop-blur-md z-0"></div>
        <div className="relative z-10 flex flex-col items-center text-white py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight mb-4 animate-fade-in">
            {isUserLoggedIn
              ? "Book Your Next Adventure!"
              : "Welcome to TravelExplorer"
            }
          </h1>
          <p className="text-xl md:text-2xl font-light drop-shadow mb-6 max-w-2xl animate-fade-in">
            {isUserLoggedIn
              ? "Explore handpicked destinations and secure your spot now."
              : "Your gateway to world-class adventures, experiences, and memories."
            }
          </p>
          {!isUserLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-full bg-yellow-400 bg-opacity-90 shadow-xl text-blue-900 font-bold hover:bg-yellow-500 hover:scale-105 focus:outline-none active:scale-95 transition-all duration-300"
            >
              Sign In & Discover
            </button>
          )}
        </div>
      </section>

      {/* ABOUT US */}
      <section className="mx-auto max-w-3xl px-4 py-10">
        <h2 className="text-center text-3xl font-bold mb-3 text-blue-900">About Us</h2>
        <p className="text-lg text-gray-600 leading-relaxed text-center">
          <span className="font-semibold text-yellow-600">TravelExplorer</span> curates exceptional journeys for all kinds of travelers. Whether you seek adventure, cultural immersion, or tranquil escapes, our guided tours and expertly crafted experiences help make every trip unforgettable.
        </p>
      </section>

      {/* TRIPS GRID */}
      <section className="py-16 bg-gradient-to-tr from-white via-yellow-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-10">
            Upcoming Trips
          </h2>
          <div className="grid gap-10 px-4 sm:grid-cols-2 lg:grid-cols-3">
            {loading
              ? Array(6)
                  .fill()
                  .map((_, i) => (
                    <div key={i}
                      className="rounded-3xl bg-white/60 shadow-lg p-8 glassy backdrop-blur animate-pulse"
                    >
                      <Skeleton height={192} />
                      <Skeleton height={28} width="70%" style={{ marginBlock: "20px 10px" }} />
                      <Skeleton height={24} width="50%" />
                      <Skeleton height={18} width="80%" />
                      <div className="flex gap-4 mt-8">
                        <Skeleton height={36} width="40%" />
                        <Skeleton height={36} width="40%" />
                      </div>
                    </div>
                  ))
              : trips.map((trip) => (
                  <div
                    key={trip._id}
                    className="glass-card rounded-3xl shadow-2xl overflow-hidden group relative bg-white/70 hover:bg-white/90 transition duration-200 border border-gray-200"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={trip.image}
                        alt={trip.name}
                        className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-yellow-600 shadow">
                        {trip.availableSlots} Slots
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-2">
                      <h3 className="text-2xl font-bold text-blue-900 tracking-tight mb-1">
                        {trip.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-600 text-lg font-extrabold">
                          ₹{trip.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-sm ml-auto">
                          Starts: {new Date(trip.startDate).toLocaleDateString("en-GB")}
                        </span>
                      </div>

                      <div className="flex gap-3 mt-6">
                        <button
                          onClick={() => handleViewDetails(trip._id)}
                          className="px-4 py-2 rounded-full border border-yellow-400 text-yellow-700 font-semibold hover:bg-yellow-50 shadow-sm transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleBookNow(trip._id)}
                          className="px-5 py-2 rounded-full bg-yellow-400 text-blue-900 font-bold shadow-md hover:bg-yellow-500 transition-all duration-200 hover:scale-105 focus:outline-none"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </section>

      {/* MODALS */}
      {modalOpen && selectedTrip && (
        <TripDetailsModal trip={selectedTrip} onClose={handleCloseModal} />
      )}
      {paymentModalOpen && selectedTrip && (
        <PaymentModal
          trip={selectedTrip}
          onClose={() => setPaymentModalOpen(false)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default LandingPage;
