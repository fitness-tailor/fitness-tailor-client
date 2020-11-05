import styles from "./styles.js";
import firebase from "firebase";
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

// export default class NutritionScreen extends Component {
const NutritionScreen = (props) => {
  const [date, setDate] = useState(null);
  const [focus, setFocus] = useState('startDate');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
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
  //   firebase
  //     .database()
  //     .ref("users/" + props.displayName)
  //     .on("value", function (snapshot) {
  //       if (snapshot.val() === null) {
  //         setHeightFeet("0");

  //       } else {
  //         setHeightFeet(snapshot.val().heightFeet);

  //       }
  //     });
  // }, []);

  const isDateBlocked = (date) => {
    date.isBefore(moment(), 'day');
  }

  const onDatesChange = ({ startDate, endDate, focusedInput }) => {
    setFocus(focusedInput);
    setStartDate(startDate);
    setEndDate(endDate);
  }

  const onDateChange = ({ date }) =>
    setDate(date);

    return (
      <SafeAreaView style={styles.containerNutScreen}>
        <View >
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={startDate}
            endDate={endDate}
            focusedInput={focus}
            range
          />

        {date && <Text style={styles.dateNutScreen}>{date && date.format('LL')}</Text>}
        <Text style={[styles.date, focus === 'startDate' && styles.focusedNutScreen]}>{startDate && startDate.format('LL')}</Text>
        <Text style={[styles.date, focus === 'endDate' && styles.focusedNutScreen]}>{endDate && endDate.format('LL')}</Text>
        </View>
      </SafeAreaView>
    );
};

export default NutritionScreen;