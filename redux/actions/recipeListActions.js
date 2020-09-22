import {
  FETCH_RECIPE_LIST,
  FETCH_RECIPE_LIST_SUCCESS,
  FETCH_RECIPE_LIST_ERROR,
} from "./actionTypes.js";
import axios from "axios";
import { RECIPE_API_KEYS } from "../../assets/API_KEYS.json";
let { USDA_API_KEY } = RECIPE_API_KEYS;

const fetchRecipeList = () => {
  return {
    type: FETCH_RECIPE_LIST,
  };
};

const fetchRecipeListSuccess = (recipes) => {
  return {
    type: FETCH_RECIPE_LIST_SUCCESS,
    payload: recipes,
  };
};

const fetchRecipeListError = (error) => {
  return {
    type: FETCH_RECIPE_LIST_ERROR,
    payload: error,
  };
};

export const getRecipes = (recipe) => {
  return (dispatch) => {
    const recipeQuery = recipe.replace(/ /g, "%20");
    dispatch(fetchRecipeList());
    // POSSIBLE TODO: Allow user to change page size
    axios
      .get(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${USDA_API_KEY}&query=${recipeQuery}&pageSize=1&sortBy=score&sortOrder=desc&dataType=Branded`
      )
      .then((res) => {
        const recipeList = res.data.foods; // contains array of recipe list
        dispatch(fetchRecipeListSuccess(recipeList)); // change 'recipes' in our state to list of recipe that was fetched
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(fetchRecipeListError(errorMsg)); // change 'error' value in our state to error message received
      });
  };
};
