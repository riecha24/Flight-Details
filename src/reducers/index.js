// src/reducers/index.js

import { combineReducers } from 'redux';
import flightReducer from './FlightReducer'; // Import your flight reducer

const rootReducer = combineReducers({
  flights: flightReducer // Add other reducers here if needed
});

export default rootReducer;
