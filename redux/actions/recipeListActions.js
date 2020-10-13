import {
  FETCH_RECIPE_LIST,
  FETCH_RECIPE_LIST_SUCCESS,
  FETCH_RECIPE_LIST_ERROR,
  STORE_RDA,
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

export const storeRDA = (gender = "N/A") => {
  let RDApayload =
    gender !== "female"
      ? {
          CALORIES: 2500,
          TOTAL_FAT: 80,
          SAT_FAT: 25,
          CHOLESTEROL: 300,
          SODIUM: 2400,
          CARBS: 375,
          FIBER: 30,
          PROTEIN: 55,
        }
      : {
          CALORIES: 2000,
          TOTAL_FAT: 65,
          SAT_FAT: 20,
          CHOLESTEROL: 300,
          SODIUM: 2400,
          CARBS: 300,
          FIBER: 25,
          PROTEIN: 45,
        };

  return {
    type: STORE_RDA,
    payload: RDApayload,
  };
};
