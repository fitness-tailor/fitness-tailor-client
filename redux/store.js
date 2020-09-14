import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers/index.js";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewares = [thunk];

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default reduxStore;