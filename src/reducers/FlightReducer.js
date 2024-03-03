import { FETCH_FLIGHTS_SUCCESS, FETCH_FLIGHTS_FAILURE } from '../actions/FlightActions';

const initialState = {
  flights: [],
  error: null
};

const flightReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.payload,
        error: null
      };
    case FETCH_FLIGHTS_FAILURE:
      return {
        ...state,
        flights: [],
        error: action.payload
      };
    default:
      return state;
  }
};

export default flightReducer;
