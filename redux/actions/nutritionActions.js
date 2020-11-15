import {
  FETCH_USER_JOURNAL,
  FETCH_USER_JOURNAL_SUCCESS,
  FETCH_USER_JOURNAL_SUCCESS_BUT_EMPTY,
  FETCH_USER_JOURNAL_ERROR,
  STORE_DATES,
  STORE_CALORIES,
} from "./actionTypes.js";
import axios from "axios";
import firebase from "firebase";
import moment, { now } from "moment";

const fetchUserJournal = () => {
  return {
    type: FETCH_USER_JOURNAL,
  };
};

const fetchUserJournalSuccess = (userJournal) => {
  return {
    type: FETCH_USER_JOURNAL_SUCCESS,
    payload: userJournal,
  };
};

const fetchUserJournalSuccessButEmpty = () => {
  return {
    type: FETCH_USER_JOURNAL_SUCCESS_BUT_EMPTY,
    payload: [],
  };
};

const fetchUserJournalError = () => {
  return {
    type: FETCH_USER_JOURNAL_ERROR,
  };
};

const calculateCalories = (recipeList) => {
  if (recipeList.length === 0) return 0;

  let calories = 0;
  recipeList.map((recipe) => {
    calories += Math.round(recipe[1].calories);
  });

  return calories;
};

// Invoke function in payload without recipes if none exist
export const storeCalories = (recipeList = []) => {
  return {
    type: STORE_CALORIES,
    payload: calculateCalories(recipeList),
  };
};

export const getUserJournal = (date, userDisplayName) => {
  return (dispatch) => {
    dispatch(storeDates(date));
    dispatch(fetchUserJournal());
    const yr = date.year;
    const mm = date.month;
    const dd = date.day;
    firebase
      .database()
      .ref(`users/${userDisplayName}/foodJournal/${yr}/${mm}/${dd}`)
      .once("value")
      .then((snapshot) => {
        return snapshot.val() === null ? null : Object.entries(snapshot.val());
      })
      .then((result) => {
        if (result === null) {
          dispatch(fetchUserJournalSuccessButEmpty());
          dispatch(storeCalories());
        } else {
          dispatch(fetchUserJournalSuccess(result));
          dispatch(storeCalories(result));
        }
      })
      .catch((err) => {
        dispatch(fetchUserJournalError());
      });
  };
};

// const displayRecipesOnDate = (date) => {
//   let yr = date.year;
//   let mm = date.month;
//   let dd = date.day;
//   firebase
//     .database()
//     .ref(`users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}`)
//     .on("value", (snapshot) => {
//       if (snapshot.val() === null) {
//         setRecipes([]);
//         setTotalCal(0);
//       } else {
//         setRecipes(Object.entries(snapshot.val()));
//       }
//     });
// };

export const storeDates = (date) => {
  // date.dateString <= used by calendar package
  return {
    type: STORE_DATES,
    payload: {
      selectedDate: date.dateString,
      date: moment(date.dateString, "YYYY-MM-DD").format("MMMM D, YYYY"),
      dateObject: date,
    },
  };
};
