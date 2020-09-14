import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index.js";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk, logger];

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

reduxStore.subscribe(reduxStore.getState);

// console.log(reduxStore.getState());

export default reduxStore;
