import {
  FETCH_USER_AUTH,
  FETCH_USER_AUTH_SUCCESS,
  FETCH_USER_AUTH_ERROR,
  STORE_GENDER,
  STORE_PROFILE_PIC,
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
  return {
    type: STORE_GENDER,
    payload: gender,
  };
};

const fetchGender = (name) => {
  return (dispatch) => {
    if (name) {
      firebase
        .database()
        .ref(`users/${name}`)
        .once("value")
        .then((snapshot) => {
          dispatch(storeGender(snapshot.val().gender));
        });
    }
  };
};

const storeProfilePic = (image) => {
  return {
    type: STORE_PROFILE_PIC,
    payload: image,
  };
};

export const fetchProfilePic = (name) => {
  return (dispatch) => {
    if (name) {
      let ref = firebase.storage().ref(`profilePic/${name}`);
      ref
        .getDownloadURL()
        .then((url) => {
          dispatch(storeProfilePic(url));
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
