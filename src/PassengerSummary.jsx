// src/PassengerSummary.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function PassengerSummary() {
  const location = useLocation();
  const bookedSeats = location.state?.bookedSeats || {};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Passenger Summary</h1>
      <div className="mb-4 text-center">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Seat Selection
        </Link>
      </div>
      {Object.keys(bookedSeats).length === 0 ? (
        <p className="text-center">No bookings yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-left">Seat</th>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Mobile</th>
                <th className="border px-4 py-2 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(bookedSeats)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([seat, details]) => (
                  <tr key={seat}>
                    <td className="border px-4 py-1">{seat}</td>
                    <td className="border px-4 py-1">{details.name || "-"}</td>
                    <td className="border px-4 py-1">{details.mobile || "-"}</td>
                    <td className="border px-4 py-1 capitalize">{details.gender}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
