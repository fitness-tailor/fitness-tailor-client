import {
  FETCH_USER_AUTH,
  FETCH_USER_AUTH_SUCCESS,
  FETCH_USER_AUTH_ERROR,
  FETCH_PROFILE_PIC,
  FETCH_PROFILE_PIC_SUCCESS,
  FETCH_PROFILE_PIC_ERROR,
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

const fetchProfilePic = () => {
  return {
    type: FETCH_PROFILE_PIC,
  };
};

const fetchProfilePicSuccess = (image) => {
  return {
    type: FETCH_PROFILE_PIC_SUCCESS,
    payload: image,
  };
};

const fetchProfilePicError = () => {
  return {
    type: FETCH_PROFILE_PIC_ERROR,
  };
};

export const getProfilePic = ({ uid, displayName }) => {
  return (dispatch) => {
    if (!!displayName) {
      dispatch(fetchProfilePic());

      let profilePicRef = firebase
        .storage()
        .ref(`users/${uid}_${displayName}/profilePic`);

      profilePicRef
        .getDownloadURL()
        .then((url) => {
          dispatch(fetchProfilePicSuccess(url));
        })
        .catch((error) => {
          dispatch(fetchProfilePicError());
        });
    }
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
    if (!!name) {
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

export const getUserAuth = (name) => {
  return (dispatch) => {
    dispatch(fetchUserAuth());

    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        dispatch(fetchUserAuthSuccess(user));
        dispatch(fetchGender(name));
      } else {
        dispatch(fetchUserAuthError());
      }
    });
  };
};
