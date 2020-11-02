let recipeListState = {
  isLoading: false,
  recipes: [],
  error: "",
  RDA: null,
};

const recipeListReducers = (state = recipeListState, action) => {
  switch (action.type) {
    // While get request is sent to recipe search api
    // Loading is true since data is being received
    case "FETCH_RECIPE_LIST":
      return {
        ...state,
        isLoading: true,
        error: "",
        recipes: [],
      };
    case "FETCH_RECIPE_LIST_SUCCESS":
      return {
        ...state,
        isLoading: false,
        recipes: action.payload,
      };
    case "FETCH_RECIPE_LIST_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "STORE_RDA":
      return {
        ...state,
        RDA: action.payload,
      };
    default:
      return state;
  }
};

export default recipeListReducers;
