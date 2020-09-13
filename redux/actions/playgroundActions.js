import { ADD_COUNTER, ADD_HELP } from "./actionTypes.js";
const addCounter = () => {
  return {
    type: ADD_COUNTER,
  };
};

const addHelp = () => {
  return {
    type: ADD_HELP,
  };
};

export default {
  addCounter,
  addHelp,
};
