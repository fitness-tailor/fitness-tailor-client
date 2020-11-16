let nutritionState = {
  isLoading: false,
  currentDayFoodList: [],
  date: null,
  selectedDate: null,
  dateObject: {},
  totalCal: 0,
  errorFetchingJournal: false,
};

const nutritionReducers = (state = nutritionState, action) => {
  switch (action.type) {
    case "FETCH_USER_JOURNAL":
      return {
        ...state,
        isLoading: true,
        errorFetchingJournal: false,
      };

    case "FETCH_USER_JOURNAL_SUCCESS":
      return {
        ...state,
        isLoading: false,
        currentDayFoodList: action.payload,
      };

    case "FETCH_USER_JOURNAL_SUCCESS_BUT_EMPTY":
      return {
        ...state,
        isLoading: false,
        currentDayFoodList: action.payload,
      };

    case "FETCH_USER_JOURNAL_ERROR":
      return {
        ...state,
        isLoading: false,
        errorFetchingJournal: true,
      };

    case "STORE_CALORIES":
      return {
        ...state,
        totalCal: action.payload,
      };

    case "STORE_DATES":
      return {
        ...state,
        selectedDate: action.payload.selectedDate,
        dateObject: action.payload.dateObject,
        date: action.payload.date,
      };

    default:
      return state;
  }
};

export default nutritionReducers;
