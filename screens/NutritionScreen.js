import styles from "./styles.js";
import firebase from "firebase";
import { connect } from "react-redux";
import React, { useState, useEffect, Component } from "react";
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import moment, { now } from "moment";
import { render } from "react-dom";
import {
  storeDates,
  getUserJournal,
} from "../redux/actions/nutritionActions.js";
import NutritionCard from "./Nutrition_Comp/NutritionCard.js";
import AddModal from "./Modals/AddModal.js";
import { AntDesign } from "@expo/vector-icons";

const NutritionScreen = (props) => {
  // const [date, setDate] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(null);
  // const [recipes, setRecipes] = useState([]);
  // const [totalCal, setTotalCal] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);

  //run addCalories after every render
  // useEffect(() => {
  //   addCalories();
  // });

  // const addCalories = () => {
  //   let calories = 0;
  //   recipes.map((recipe) => {
  //     calories += parseInt(recipe[1].calories);
  //   });
  //   setTotalCal(calories);
  // };

  // const displayRecipesOnDate = (date) => {
  //   setSelectedDate(date.dateString);
  //   let formatted = moment(date.dateString, "YYYY-MM-DD").format(
  //     "MMMM D, YYYY"
  //   );
  //   setDate(formatted);
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

  let addModal = (
    <AddModal
      addModalVisible={addModalVisible}
      setAddModalVisible={setAddModalVisible}
      date={props.selectedDate}
    />
  );

  console.log(props.currentDayFoodList);

  return (
    <SafeAreaView style={styles.containerNutScreen}>
      <View>
        <Calendar
          onDayPress={(day) => props.getUserJournal(day, props.displayName)}
          markedDates={{
            [props.selectedDate]: { selected: true, selectedColor: "#00adf5" },
          }}
          theme={{
            arrowColor: "rgb(22, 66, 92)",
          }}
        />
      </View>
      <ScrollView contentContainerStyle={styles.journalNut}>
        <Text style={[styles.date]}>{props.date}</Text>
        <Text style={styles.totalCal}>
          {props.totalCal ? `Total Calories: ${props.totalCal}` : null}
        </Text>
        {props.currentDayFoodList.map((recipe, key) => {
          return (
            <NutritionCard
              key={key}
              id={recipe[0]}
              name={recipe[1].name}
              calories={recipe[1].calories}
              date={props.date}
            ></NutritionCard>
          );
        })}
        {props.date && (
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => setAddModalVisible(true)}
            activeOpacity="0.5"
          >
            <AntDesign name="pluscircle" size={50} color="rgb(37, 93, 120)" />
          </TouchableOpacity>
        )}
      </ScrollView>
      {addModal}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
  date: state.nutrition.date,
  selectedDate: state.nutrition.selectedDate,
  currentDayFoodList: state.nutrition.currentDayFoodList,
  totalCal: state.nutrition.totalCal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    storeDates: (date) => dispatch(storeDates(date)),
    getUserJournal: (date, username) =>
      dispatch(getUserJournal(date, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionScreen);
