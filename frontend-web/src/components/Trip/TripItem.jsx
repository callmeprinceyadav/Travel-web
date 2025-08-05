import React from "react";

const TripItem = ({ trip, deleteTrip, setSelectedTrip }) => {
  // Format dates to a more readable form (e.g., DD/MM/YYYY)
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB");

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
      <img
        src={trip.image}
        alt={trip.name}
        className="w-full h-48 object-cover rounded-t-2xl"
        loading="lazy"
      />
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{trip.name}</h2>
        <p className="text-gray-600 mb-1 text-sm">
          <span className="font-semibold">Dates:</span>{" "}
          {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
        </p>
        <p className="text-gray-700 mb-4 flex-grow line-clamp-3">{trip.description}</p>
        <p className="text-lg font-semibold text-yellow-600 mb-1">
          Rs - {trip.price.toLocaleString()}
        </p>
        <p className="text-gray-600 mb-2 text-sm">
          <span className="font-semibold">Available Slots:</span> {trip.availableSlots}
        </p>
        <p className="text-gray-600 mb-4 text-sm">{trip.cancellationPolicy}</p>
        <div className="mt-auto flex justify-between">
          <button
            onClick={() => setSelectedTrip(trip)}
            className="bg-yellow-500 text-white px-5 py-2 rounded-full hover:bg-yellow-600 transition duration-300 shadow-md"
            aria-label={`Edit trip ${trip.name}`}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTrip(trip._id)}
            className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            aria-label={`Delete trip ${trip.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripItem;
