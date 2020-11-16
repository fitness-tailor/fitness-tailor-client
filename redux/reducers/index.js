import { combineReducers } from "redux";
import recipeListReducers from "./recipeListReducers.js";
import authReducers from "./authReducers.js";
import nutritionReducers from "./nutritionReducers.js";

let initialState = {
  counter: 0,
};

const playgroundReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COUNTER":
      return {
        ...state,
        counter: state.counter + 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducers,
  playground: playgroundReducers,
  recipeList: recipeListReducers,
  nutrition: nutritionReducers,
});

export default rootReducer;
