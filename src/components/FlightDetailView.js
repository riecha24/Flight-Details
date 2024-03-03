import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './FlightDetailView.css'; // Import the CSS file

const FlightDetailView = () => {
  const { flightId } = useParams();
  const [flightDetails, setFlightDetails] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://flight-status-mock.core.travelopia.cloud/flights/${flightId}`, {
          cancelToken: source.token
        });
        setFlightDetails(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          setError(error.message);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel("FlightDetailView component unmounted");
    };
  }, [flightId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="detail-container">
      <h2>Flight Details</h2>
      {error && <div>Error: {error}</div>}
      {!flightDetails && !error && <div>Loading...</div>}
      {flightDetails && Object.keys(flightDetails).length === 0 && (
        <div>No flight details available for the specified ID.</div>
      )}
      {flightDetails && Object.keys(flightDetails).length > 0 && (
        <div>
          <p><strong>Flight Number:</strong> {flightDetails.flightNumber}</p>
          <p><strong>Airline:</strong> {flightDetails.airline}</p>
          <p><strong>Origin:</strong> {flightDetails.origin}</p>
          <p><strong>Destination:</strong> {flightDetails.destination}</p>
          <p><strong>Departure Time:</strong> {flightDetails.departureTime}</p>
          <p><strong>Status:</strong> {flightDetails.status}</p>
          <button className="back-button" onClick={handleBackClick}>Back</button>
        </div>
      )}
    </div>
  );
};

export default FlightDetailView;
