import React, { useState } from "react";

const generateSeatsLayout = () => {
  const layout = [];
  let seatNumber = 1;

  // 13 rows of 4 seats (2 on each side of aisle)
  for (let i = 0; i < 13; i++) {
    layout.push([seatNumber++, seatNumber++, null, seatNumber++, seatNumber++]);
  }

  return layout;
};

const seatsLayout = generateSeatsLayout();

const initialBookedSeats = {
  2: "female",
  7: "male",
  20: "female"
};

export default function BusSeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const [gender, setGender] = useState("male");

  const isAdmin = true; // Change to false for regular users

  const toggleSeat = (seat) => {
    if (!seat || !isAdmin || bookedSeats[seat]) return;

    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const bookSeats = () => {
    if (!isAdmin) return;
    const newBookings = { ...bookedSeats };
    selectedSeats.forEach((seat) => {
      newBookings[seat] = gender;
    });
    setBookedSeats(newBookings);
    setSelectedSeats([]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Bus Seat Layout (52 Seats)</h1>
      <div className="grid grid-cols-5 gap-2">
        {seatsLayout.flat().map((seat, index) => {
          if (seat === null) {
            return <div key={`gap-${index}`} className="w-8" />;
          }
          const isBooked = !!bookedSeats[seat];
          const isSelected = selectedSeats.includes(seat);
          const bookedGender = bookedSeats[seat];

          return (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              disabled={!isAdmin || isBooked}
              className={\`p-3 rounded-lg text-sm font-semibold border shadow relative h-12 w-12 ${isBooked ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-green-300 hover:bg-green-400"}${isSelected ? "ring-2 ring-green-600" : ""}\`}
              {seat}
              {bookedGender && (
                <span className="absolute bottom-1 right-1 text-xs text-white bg-black px-1 rounded">
                  {bookedGender.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          );
        })}
      </div>

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

      <div className="mt-4">
        <h2 className="font-medium">Selected Seats:</h2>
        <p>{selectedSeats.join(", ") || "None"}</p>
      </div>
    </div>
  );
}
