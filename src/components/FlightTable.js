import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { fetchFlights, fetchFlightDetails } from '../actions/FlightActions';
import './FlightTable.css'; // Import CSS file for styling
import { formatDepartureTime } from '../utils/date'


const FlightTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const flights = useSelector(state => state.flights);
  const error = useSelector(state => state.error);
  const [selectedFlight, setSelectedFlight] = useState(null);

  useEffect(() => {
    dispatch(fetchFlights());
    const interval = setInterval(() => {
      dispatch(fetchFlights());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  

  const handleRowClick = (flightId) => {
    // Dispatch action to fetch flight details for the clicked flight
    dispatch(fetchFlightDetails(flightId))
      .then(() => {
        // Redirect to FlightDetailView after fetching flight details
        navigate(`/flight/${flightId}`);
      })
      .catch(error => {
        console.error('Error fetching flight details:', error);
      });
    setSelectedFlight(flightId);
  };

  return (
    <div className="flight-table-container">
      {error && <div className="error-message">Error: {error}</div>}
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure Date & Time (UTC)</th> {/* Updated column header */}
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(flights.flights) && flights.flights.map(flight => (
            <tr key={flight.id} onClick={() => handleRowClick(flight.id)} className={selectedFlight === flight.id ? 'selected' : ''}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{flight.destination}</td>
              <td>{formatDepartureTime(flight.departureTime)}</td> {/* Use formatDateTime function */}
              <td>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
