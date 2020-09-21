import {
  FETCH_RECIPE_LIST,
  FETCH_RECIPE_LIST_SUCCESS,
  FETCH_RECIPE_LIST_ERROR,
} from "./actionTypes.js";
import axios from "axios";
import config from "../../assets/API_KEYS.json";

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
    const recipeQuery = recipe.replace(/%20/g, " ");
    dispatch(fetchRecipeList());
    axios
      .get(
        `https://api.edamam.com/search?q=${recipeQuery}&app_id=${config.RECIPE_API_KEYS.APP_ID}&app_key=${config.RECIPE_API_KEYS.APP_KEY}&from=0&to=1`
      )
      .then((res) => {
        const recipeList = res.data.hits; // contains array of recipe list
        dispatch(fetchRecipeListSuccess(recipeList)); // change 'recipes' in our state to list of recipe that was fetched
      })
      .catch((err) => {
        const errorMsg = err.message;
        dispatch(fetchRecipeListError(errorMsg)); // change 'error' value in our state to error message received
      });
  };
};
