let initialState = {
  counter: 0,
};

const combinedReducers = (state = initialState, action) => {
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

export default combinedReducers;
