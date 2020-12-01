let initialState = {
  isLoading: false,
  isProfPicLoading: false,
  user: {},
  displayName: null,
  error: "",
  gender: "",
  profilePic: null,
  errFetchingProfPic: false,
  calExpenditureRedux: null,
  calGoalRedux: null,
};

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_DISPLAYNAME":
      return {
        ...state,
        initialDisplayName: action.payload,
      };
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

    case "FETCH_PROFILE_PIC":
      return {
        ...state,
        isProfPicLoading: true,
      };
    case "FETCH_PROFILE_PIC_SUCCESS":
      return {
        ...state,
        isProfPicLoading: false,
        errFetchingProfPic: false,
        profilePic: action.payload,
      };
    case "FETCH_PROFILE_PIC_ERROR":
      return {
        ...state,
        isProfPicLoading: false,
        profilePic: null,
        errFetchingProfPic: true,
      };

    case "STORE_GENDER":
      return {
        ...state,
        gender: action.payload,
      };

    case "STORE_CAL_EXPEND":
      return {
        ...state,
        calExpenditureRedux: action.payload,
      };

    case "STORE_CAL_GOAL":
      return {
        ...state,
        calGoalRedux: action.payload,
      };

    default:
      return state;
  }
};

export default authReducers;
