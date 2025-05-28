
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useBooking } from "./BookingContext";

export default function PassengerSummary() {
  const { bookedSeats } = useBooking();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const correctPassword = "admin123"; // Replace with env var or secure vault in real apps

  const handleLogin = () => {
    if (password === correctPassword) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!authenticated) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-lg font-bold mb-2">Enter Password to View Passenger Summary</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Submit
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Passenger Summary</h2>
      <table className="table-auto w-full border border-collapse border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Seat</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Gender</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(bookedSeats).map(([seat, details]) => (
            <tr key={seat}>
              <td className="border px-4 py-2">{seat}</td>
              <td className="border px-4 py-2">{details.name}</td>
              <td className="border px-4 py-2">{details.mobile}</td>
              <td className="border px-4 py-2 capitalize">{details.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
