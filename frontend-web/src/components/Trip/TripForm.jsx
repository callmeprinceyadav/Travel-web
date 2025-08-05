import React, { useState, useEffect } from "react";

const TripForm = ({ createTrip, updateTrip, selectedTrip, setSelectedTrip }) => {
  const initialState = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    price: "",
    availableSlots: "",
    cancellationPolicy: "",
    image: "",
  };

  const [trip, setTrip] = useState(initialState);

  useEffect(() => {
    if (selectedTrip) {
      setTrip(selectedTrip);
    } else {
      setTrip(initialState);
    }
  }, [selectedTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrip((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTrip) {
      updateTrip(trip);
    } else {
      createTrip(trip);
    }
    setTrip(initialState);
  };

  const handleCancel = () => {
    setSelectedTrip(null);
    setTrip(initialState);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={trip.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Trip name"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={trip.description}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition resize-none"
            placeholder="Briefly describe the trip"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="endDate">
            End Date
          </label>
          <input
            id="endDate"
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
          />
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-sm font-semibold mb-2" htmlFor="price">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            min="0"
            name="price"
            value={trip.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Trip price"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="availableSlots">
            Available Slots
          </label>
          <input
            id="availableSlots"
            type="number"
            min="1"
            name="availableSlots"
            value={trip.availableSlots}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="Number of available slots"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="cancellationPolicy">
            Cancellation Policy
          </label>
          <textarea
            id="cancellationPolicy"
            name="cancellationPolicy"
            value={trip.cancellationPolicy}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition resize-none"
            placeholder="Describe the cancellation policy"
          />

          <label className="block text-sm font-semibold my-3" htmlFor="image">
            Image URL
          </label>
          <input
            id="image"
            type="url"
            name="image"
            value={trip.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            placeholder="https://example.com/image.jpg"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-4 focus:ring-yellow-300"
        >
          {selectedTrip ? "Update Trip" : "Create Trip"}
        </button>

        {selectedTrip && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold px-6 py-3 rounded-xl shadow-md transition focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TripForm;
