import { FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "./actionTypes.js";
import firebase from "firebase";

const fetchUser = () => {
  return {
    type: FETCH_USER,
  };
};
const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};
const fetchUserError = () => {
  return {
    type: FETCH_USER_ERROR,
    payload: "Sign In!",
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch(fetchUser());
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        dispatch(fetchUserSuccess(user));
      } else {
        dispatch(fetchUserError());
      }
    });
  }
}

