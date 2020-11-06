let initialState = {
  isLoading: false,
  error: "",
  user: {},
  gender: "",
  profilePic: "",
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USER_AUTH":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USER_AUTH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    case "FETCH_USER_AUTH_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "STORE_GENDER":
      return {
        ...state,
        gender: action.payload,
      };

    case "STORE_PROFILE_PIC":
      return {
        ...state,
        profilePic: action.payload,
      };

    default:
      return state;
  }
};

export default authReducers;
