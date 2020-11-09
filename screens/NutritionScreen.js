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

const NutritionScreen = (props) => {
  const [date, setDate] = useState(null);
  const [focus, setFocus] = useState('startDate');
  const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const [recipes, setRecipes] = useState([]);

  const isDateBlocked = (date) => {
    date.isBefore(moment(), 'day');
  }

  const onDatesChange = ({ startDate, endDate, focusedInput }) => {
    // setFocus(focusedInput);
    setStartDate(startDate);
    displayRecipesOnDate(startDate);
    // setEndDate(endDate);
  };

  const displayRecipesOnDate = (date) => {

    let yr = moment(date).format("YYYY");
    let mm = moment(date).format("MM");
    let dd = moment(date).format("D");
    firebase
    .database()
    .ref(`users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}`)
    .on('value', (snapshot) => {
      if(snapshot.val() === null) {
        setRecipes([]);
      } else {
        setRecipes(Object.values(snapshot.val()));
      }
    })
  };

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

      <Text style={[styles.date, focus === 'startDate' && styles.focusedNutScreen]}>{startDate && startDate.format('LL')}</Text>
      {recipes.map((recipe) => {
        return (
          <View>
            <Text>{recipe.name}</Text>
            <Text>{recipe.calories} calories</Text>
          </View>
        )
      })}
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps)(NutritionScreen);