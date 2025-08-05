import React from "react";
import { MdLocationOn, MdEventAvailable, MdDateRange, MdCancel, MdClose } from "react-icons/md";

const TripDetailsModal = ({ trip, onClose }) => {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-fade-in px-3 py-4">
      <div className="bg-white/90 backdrop-blur-xl border border-yellow-100 rounded-3xl shadow-2xl max-w-lg w-full relative overflow-hidden">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-3xl text-yellow-500 hover:text-red-500 focus:outline-none transition"
          onClick={onClose}
          aria-label="Close"
        >
          <MdClose />
        </button>
        {/* Trip Image */}
        <div className="relative">
          <img
            src={trip.image}
            alt={trip.name}
            className="w-full h-56 object-cover object-center rounded-t-3xl"
          />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-400/85 text-white font-bold text-xs shadow uppercase tracking-widest">
            {trip.availableSlots} Slots
          </span>
        </div>
        <div className="p-7 pt-4 flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900">{trip.name}</h2>
            <span className="ml-auto text-yellow-600 font-bold text-lg sm:text-xl">
              ₹{trip.price.toLocaleString()}
            </span>
          </div>
          {/* Dates */}
          <div className="flex flex-col gap-1.5 text-sm sm:text-base text-gray-600">
            <div className="flex items-center gap-2">
              <MdEventAvailable className="text-xl text-green-600" />
              Start: <b className="ml-1 text-black">{new Date(trip.startDate).toLocaleDateString("en-GB")}</b>
            </div>
            <div className="flex items-center gap-2">
              <MdDateRange className="text-xl text-pink-600" />
              End: <b className="ml-1 text-black">{new Date(trip.endDate).toLocaleDateString("en-GB")}</b>
            </div>
            <div className="flex items-center gap-2">
              <MdCancel className="text-xl text-red-600" />
              <span className="text-black font-semibold">Cancellation:</span>
              <span className="ml-1">{trip.cancellationPolicy}</span>
            </div>
          </div>
          {/* Description */}
          <div>
            <p className="text-base text-gray-800 leading-relaxed whitespace-pre-line">{trip.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailsModal;
