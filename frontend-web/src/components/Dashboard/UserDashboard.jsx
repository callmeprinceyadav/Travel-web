import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "https://travel-web-backend.vercel.app/bookings",
        { withCredentials: true }
      );
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `https://travel-web-backend.vercel.app/bookings/cancel/${bookingId}`,
        { withCredentials: true }
      );
      alert("Booking Cancelled Successfully!");
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 mb-64 flex flex-col items-center">
        <h1 className="text-4xl font-semibold mb-8 text-gray-700">
          Loading Booked Trips...
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl px-4">
          {Array(6)
            .fill()
            .map((_, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg"
              >
                <Skeleton height={30} width="80%" className="mb-4" />
                <Skeleton height={20} count={6} />
                <Skeleton
                  height={40}
                  width="40%"
                  style={{ marginTop: 20, borderRadius: "9999px" }}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 mb-64 py-8 min-h-[75vh] flex flex-col items-center">
      <h1 className="text-4xl font-semibold mb-8 text-yellow-600 tracking-tight">
        User Dashboard - Booked Trips
      </h1>

      {bookings.length === 0 ? (
        <p className="text-gray-700 text-lg mt-8 font-medium">
          You don't have any bookings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="p-6 rounded-3xl bg-white/70 backdrop-blur-lg shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2 text-gray-800">
                <h2 className="text-2xl font-bold">{booking.trip.name}</h2>
                <p>
                  <span className="font-semibold">Booking Date:</span>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> Rs - {booking.trip.price}
                </p>
                <p>
                  <span className="font-semibold">Cancellation Policy:</span>{" "}
                  {booking.trip.cancellationPolicy}
                </p>
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(booking.trip.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {new Date(booking.trip.endDate).toLocaleDateString()}
                </p>
                <p className="line-clamp-3">
                  <span className="font-semibold">Description:</span> {booking.trip.description}
                </p>
              </div>
              <button
                onClick={() => cancelBooking(booking._id)}
                className="mt-6 bg-red-500 hover:bg-red-600 transition-colors text-white py-2 rounded-full font-semibold shadow-md"
                aria-label={`Cancel booking for ${booking.trip.name}`}
              >
                Cancel Booking
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
