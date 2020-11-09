import styles from "./styles.js";
import firebase from "firebase";
import { connect } from "react-redux";
import React, { useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Dates from 'react-native-dates';
import moment, { now } from 'moment';
import { render } from "react-dom";

// export default class NutritionScreen extends Component {
const NutritionScreen = (props) => {
  const [date, setDate] = useState(null);
  const [focus, setFocus] = useState('startDate');
  const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [recipes, setRecipes] = useState([]);

  // state = {
  //   date: null,
  //   focus: 'startDate',
  //   startDate: null,
  //   endDate: null,
  //   recipes: [],
  // }

  //add firebase functionality retrieving user foods
  // useEffect(() => {
  //   console.log(startDate)
  //   firebase
  //     .database()
  //     .ref("users/" + props.displayName)
  // }, []);

  const isDateBlocked = (date) => {
    date.isBefore(moment(), 'day');
  }

  const onDatesChange = ({ startDate, endDate, focusedInput }) => {
    // setFocus(focusedInput);
    setStartDate(startDate);
    displayRecipesOnDate(startDate);
    console.log(focus)
    // setEndDate(endDate);
    // console.log(startDate)
  }

  const displayRecipesOnDate = (date) => {

    let yr = moment(date).format("YYYY");
    let mm = moment(date).format("MM");
    let dd = moment(date).format("D");

      firebase
      .database()
      .ref(`users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}`)
      .on('value', (snapshot) => {
        if(snapshot.val() === null) {
          setRecipes([])
        } else {
          setRecipes(Object.values(snapshot.val()));
        }
      })
    };

  const onDateChange = ({ date }) => {
    setDate(date);
    // displayRecipesOnDate(date);
  }

    return (
      <SafeAreaView style={styles.containerNutScreen}>
        <View >
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={startDate}
            // endDate={endDate}
            focusedInput={focus}
            range
          />

        {date && <Text style={styles.dateNutScreen}>{date && date.format('LL')}</Text>}
        <Text style={[styles.date, focus === 'startDate' && styles.focusedNutScreen]}>{startDate && startDate.format('LL')}</Text>
        {recipes.map((recipe) => {
          return (
            <View>
              <Text>{recipe.name}</Text>
              <Text>{recipe.calories} calories</Text>
            </View>
          )
        })}
        {/* <Text style={[styles.date, focus === 'endDate' && styles.focusedNutScreen]}>{endDate && endDate.format('LL')}</Text> */}
        </View>
      </SafeAreaView>
    );
};


const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

// export default NutritionScreen;
export default connect(mapStateToProps)(NutritionScreen);