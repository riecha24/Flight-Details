import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Import the named export 'thunk' from redux-thunk
import rootReducer from './reducers'; // Import the combined reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
