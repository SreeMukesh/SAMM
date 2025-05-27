import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BusSeatSelector from "./BusSeatSelector";
import PassengerSummary from "./PassengerSummary";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusSeatSelector />} />
        <Route path="/summary" element={<PassengerSummary />} />
      </Routes>
    </Router>
  );
}

export default App;