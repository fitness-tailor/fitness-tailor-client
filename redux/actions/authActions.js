import {
  FETCH_USER_AUTH,
  FETCH_USER_AUTH_SUCCESS,
  FETCH_USER_AUTH_ERROR,
  STORE_GENDER,
} from "./actionTypes.js";
import firebase from "firebase";

const fetchUserAuth = () => {
  return {
    type: FETCH_USER_AUTH,
  };
};

const fetchUserAuthSuccess = (user) => {
  return {
    type: FETCH_USER_AUTH_SUCCESS,
    payload: user,
  };
};

const fetchUserAuthError = () => {
  return {
    type: FETCH_USER_AUTH_ERROR,
    payload: "Sign In!",
  };
};

const storeGender = (gender) => {
  console.log(gender);
  return {
    type: STORE_GENDER,
    payload: gender,
  };
};

const fetchGender = (name) => {
  return (dispatch) => {
    firebase
      .database()
      .ref(`users/${name}`)
      .once("value")
      .then(function (snapshot) {
        dispatch(storeGender(snapshot.val().gender));
      });
  };
};

export const getUserAuth = (name) => {
  return (dispatch) => {
    dispatch(fetchUserAuth());

    if (name && typeof name === "string") {
      dispatch(fetchGender(name));
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        dispatch(fetchUserAuthSuccess(user));
      } else {
        dispatch(fetchUserAuthError());
      }
    });
  };
};
