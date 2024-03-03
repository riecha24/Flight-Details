import axios from 'axios';

export const FETCH_FLIGHTS_SUCCESS = 'FETCH_FLIGHTS_SUCCESS';
export const FETCH_FLIGHTS_FAILURE = 'FETCH_FLIGHTS_FAILURE';
export const FETCH_FLIGHT_DETAILS_SUCCESS = 'FETCH_FLIGHT_DETAILS_SUCCESS';
export const FETCH_FLIGHT_DETAILS_FAILURE = 'FETCH_FLIGHT_DETAILS_FAILURE';

export const fetchFlights = () => {
  return dispatch => {
    axios.get('https://flight-status-mock.core.travelopia.cloud/flights')
      .then(response => {
        dispatch({
          type: FETCH_FLIGHTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_FLIGHTS_FAILURE,
          payload: error.message
        });
      });
  };
};

export const fetchFlightDetails = (flightId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://flight-status-mock.core.travelopia.cloud/flights/${flightId}`);
      dispatch({
        type: FETCH_FLIGHT_DETAILS_SUCCESS,
        payload: response.data
      });
      return response.data; // Return the response data
    } catch (error) {
      dispatch({
        type: FETCH_FLIGHT_DETAILS_FAILURE,
        payload: error.message
      });
      throw error; // Throw the error to be caught by the caller
    }
  };
};
