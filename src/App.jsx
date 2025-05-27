import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { BookingProvider } from "./BookingContext";
import BusSeatSelector from "./BusSeatSelector";
import PassengerSummary from "./PassengerSummary";

function App() {
  return (
    <BookingProvider>
      <Router>
        <div className="p-4 max-w-2xl mx-auto text-center">
          <nav className="mb-4 space-x-4">
            <Link to="/" className="text-blue-600 hover:underline">Seat Booking</Link>
            <Link to="/summary" className="text-blue-600 hover:underline">Passenger Summary</Link>
          </nav>
          <Routes>
            <Route path="/" element={<BusSeatSelector />} />
            <Route path="/summary" element={<PassengerSummary />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
}

export default App;
