import React, { useState } from "react";
import { Link } from "react-router-dom";

const generateSeatsLayout = () => {
  const layout = [];
  let seatNumber = 1;

  for (let i = 0; i < 13; i++) {
    layout.push([seatNumber++, seatNumber++, null, seatNumber++, seatNumber++]);
  }

  return layout;
};

const seatsLayout = generateSeatsLayout();

const initialBookedSeats = {
  2: { gender: "female", name: "Aisha", mobile: "1234567890" },
  7: { gender: "male", name: "John", mobile: "9876543210" },
  20: { gender: "female", name: "Lina", mobile: "1112223333" }
};

export default function BusSeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatDetails, setSeatDetails] = useState({});
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const [gender, setGender] = useState("male");

  const isAdmin = true;

  const toggleSeat = (seat) => {
    if (!seat || !isAdmin || bookedSeats[seat]) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
      const updated = { ...seatDetails };
      delete updated[seat];
      setSeatDetails(updated);
    } else {
      setSelectedSeats([...selectedSeats, seat]);
      setSeatDetails({ ...seatDetails, [seat]: { name: "", mobile: "" } });
    }
  };

  const updateSeatDetail = (seat, field, value) => {
    setSeatDetails((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value
      }
    }));
  };

  const bookSeats = () => {
    if (!isAdmin) return;
    const newBookings = { ...bookedSeats };

    selectedSeats.forEach((seat) => {
      const { name, mobile } = seatDetails[seat] || {};
      if (!name || !mobile) return; // skip incomplete
      newBookings[seat] = {
        gender,
        name,
        mobile
      };
    });

    setBookedSeats(newBookings);
    setSelectedSeats([]);
    setSeatDetails({});
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Bus Seat Layout (52 Seats)</h1>

      <div className="grid grid-cols-5 gap-2">
        {seatsLayout.flat().map((seat, index) => {
          if (seat === null) return <div key={`gap-${index}`} className="w-8" />;
          const isBooked = !!bookedSeats[seat];
          const isSelected = selectedSeats.includes(seat);
          const info = bookedSeats[seat];

          return (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              disabled={!isAdmin || isBooked}
              className={`p-3 rounded-lg text-sm font-semibold border shadow relative h-12 w-12
                ${isBooked ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-green-300 hover:bg-green-400"}
                ${isSelected ? "ring-2 ring-green-600" : ""}`}
            >
              {seat}
              {info && (
                <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black px-1 rounded">
                  {info.gender.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAdmin && selectedSeats.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Seat Details</h2>
          {selectedSeats.map((seat) => (
            <div key={seat} className="mb-4 border p-2 rounded-md shadow-sm">
              <h3 className="font-medium">Seat {seat}</h3>
              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={seatDetails[seat]?.name || ""}
                  onChange={(e) => updateSeatDetail(seat, "name", e.target.value)}
                  className="border p-2 rounded w-full"
                />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={seatDetails[seat]?.mobile || ""}
                  onChange={(e) => updateSeatDetail(seat, "mobile", e.target.value)}
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {isAdmin && (
        <div className="mt-4 text-center">
          <div className="mb-2">
            <label className="mr-2 font-medium">Select Gender:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded p-1"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <button
            onClick={bookSeats}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Book Selected Seats
          </button>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-medium">Selected Seats:</h2>
        <p>{selectedSeats.join(", ") || "None"}</p>
      </div>
	  {isAdmin && (
		<div className="mt-6 text-center">
			<Link
				to="/summary"
				state={{ bookedSeats }}
				className="inline-block mt-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
				>
				View Passenger Summary
			</Link>
		</div>
				)}
    </div>
  );
}
