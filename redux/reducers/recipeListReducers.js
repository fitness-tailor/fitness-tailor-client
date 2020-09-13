let recipeListState = {
  isLoading: false,
  recipes: [],
  error: "",
};

const recipeListReducers = (state = recipeListState, action) => {
  switch (action.type) {
    // While get request is sent to recipe search api
    // Loading is true since data is being received
    case "FETCH_RECIPE_LIST":
      return {
        ...state,
        isLoading: true,
      };
    // Reset loading state if request is successful
    // Place data fetched from api to recipes in redux/global state
    case "FETCH_RECIPE_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        recipes: action.payload,
      };
    // Reset loading state if request has failed
    // Store error message inside error of redux/global state
    case "FETCH_RECIPE_LIST_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    // action.payload will be DIFFERENT depending if API request was successful or it failed
    default:
      return state;
  }
};

export default recipeListReducers;
