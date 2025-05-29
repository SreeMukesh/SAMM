
import React, { useState } from "react";
import { supabase } from './supabaseClient';

const generateSeatsLayout = () => {
  const layout = [];
  let seatNumber = 1;

  for (let i = 0; i < 13; i++) {
    layout.push([seatNumber++, seatNumber++, null, seatNumber++, seatNumber++]);
  }

  return layout;
};

const seatsLayout = generateSeatsLayout();

export default function BusSeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(initialBookedSeats);
  const [gender, setGender] = useState("male");
  const [passengerName, setPassengerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [editingSeat, setEditingSeat] = useState(null);

  const isAdmin = true;
  
  useEffect(() => {
	const fetchBookings = async () => {
		const { data, error } = await supabase.from("bookings").select("*");
		if (data) {
			const mapped = {};
			data.forEach(({ seat_number, gender }) => {
				mapped[seat_number] = gender;
			});
			setBookedSeats(mapped);
		}
	};
	fetchBookings();
	}, []);

  const toggleSeat = (seat) => {
    if (!seat || (!isAdmin && bookedSeats[seat])) return;
	
	setSelectedSeats((prev) =>
		prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
	);
  };

	const bookSeats = async () => {
	if (!isAdmin || !name || !mobile) return;

    if (bookedSeats[seat]) {
      const { name, mobile, gender } = bookedSeats[seat];
      setEditingSeat(seat);
      setPassengerName(name);
      setMobile(mobile);
      setGender(gender);
    } else {
      setEditingSeat(seat);
      setPassengerName("");
      setMobile("");
      setGender("male");
    }
  };

  const handleBooking = () => {
    if (!editingSeat || !isAdmin) return;

    const newBookings = { ...bookedSeats };
    newBookings[editingSeat] = {
      name: passengerName,
      mobile: mobile,
      gender: gender
    };
    setBookedSeats(newBookings);
    setSelectedSeats([]);
    setEditingSeat(null);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Sree Arunachaleswara Mithra Mandali</h1>
	  <h2 className="text-xl font-bold mb-2 text-center">Bus Number 2 (52 Seats)</h2>
      <div className="grid grid-cols-5 gap-2">
        {seatsLayout.flat().map((seat, index) => {
          if (seat === null) {
            return <div key={`gap-${index}`} className="w-8" />;
          }
          const seatData = bookedSeats[seat];
          const isBooked = !!seatData;
          const isSelected = editingSeat === seat;

          return (
            <button
              key={seat}
              onClick={() => toggleSeat(seat)}
              className={`p-3 rounded-lg text-sm font-semibold border shadow relative h-12 w-12
                ${isBooked ? "bg-gray-400" : "bg-green-300 hover:bg-green-400"}
                ${isSelected ? "ring-2 ring-blue-600" : ""}`}
            >
              {seat}
              {seatData?.gender && (
                <span className="absolute bottom-1 right-1 text-xs text-white bg-black px-1 rounded">
                  {seatData.gender.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {isAdmin && editingSeat && (
        <div className="mt-4 border-t pt-4">
          <h2 className="font-semibold mb-2">Booking Seat {editingSeat}</h2>
          <div className="space-y-2">
            <div>
              <label className="mr-2">Name:</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                className="border p-1 rounded w-64"
              />
            </div>
            <div>
              <label className="mr-2">Mobile:</label>
              <input
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="border p-1 rounded w-64"
              />
            </div>
            <div>
              <label className="mr-2">Gender:</label>
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
              onClick={handleBooking}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {bookedSeats[editingSeat] ? "Update Booking" : "Confirm Booking"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
