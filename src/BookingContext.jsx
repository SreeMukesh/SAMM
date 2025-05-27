import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookedSeats, setBookedSeats] = useState({
    2: { gender: "female", name: "Alice", mobile: "9876543210" },
    7: { gender: "male", name: "Bob", mobile: "9123456780" },
    20: { gender: "female", name: "Carol", mobile: "9012345678" }
  });

  return (
    <BookingContext.Provider value={{ bookedSeats, setBookedSeats }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
