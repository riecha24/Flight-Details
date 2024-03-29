import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlightTable from './components/FlightTable';
import FlightDetailView from './components/FlightDetailView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FlightTable />} />
          <Route path="/flight/:flightId" element={<FlightDetailView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
