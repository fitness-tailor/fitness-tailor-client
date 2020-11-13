import styles from "./styles.js";
import firebase from "firebase";
import { connect } from "react-redux";
import React, { useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment, { now } from 'moment';
import { render } from "react-dom";
import NutritionCard from "./Nutrition_Comp/NutritionCard.js"

const NutritionScreen = (props) => {
  const [date, setDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [totalCal, setTotalCal] = useState(null);

  //run addCalories after every render
  useEffect(() => {
    addCalories();
  })

  const addCalories = () => {
    let calories = 0;
    recipes.map((recipe) => {
      calories += parseInt(recipe[1].calories);
    })
    setTotalCal(calories);
  }

  const displayRecipesOnDate = (date) => {
    setSelectedDate(date.dateString);
    let formatted = moment(date.dateString).format("MMMM D, YYYY")
    setDate(formatted)
    let yr = date.year;
    let mm = date.month;
    let dd = date.day;
    firebase
    .database()
    .ref(`users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}`)
    .on('value', (snapshot) => {
      if(snapshot.val() === null) {
        setRecipes([]);
        setTotalCal(0);
      } else {
        setRecipes(Object.entries(snapshot.val()))
      }
    })
  };

  return (
    <SafeAreaView style={styles.containerNutScreen}>
      <View >
        <Calendar
          onDayPress={(day) => displayRecipesOnDate(day)}
          markedDates={{
            [selectedDate] : {selected: true, selectedColor: '#00adf5'},
          }}
          theme={{
            arrowColor: "rgb(22, 66, 92)",
          }}
        />
        </View>
        <ScrollView contentContainerStyle={styles.journalNut}>
            <Text style={[styles.date]}>{date}</Text>
            <Text style={styles.totalCal}>{totalCal ? `${totalCal} Total Calories` : null}</Text>
            {recipes.map((recipe, key) => {
              return (
                <NutritionCard key={key} id={recipe[0]} name={recipe[1].name} calories={recipe[1].calories} date={date}>
                </NutritionCard>
              )
            })}
          </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps)(NutritionScreen);