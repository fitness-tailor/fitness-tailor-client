import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";

export default function NutritionCard(props) {
  const editNutritionData = () => {
    // TODO: add function to edit nutrition data
    // HINT: axios put/update
  };

  const deleteNutritionData = () => {
    // TODO: add function to delete nutrition data
    // HINT: axios delete
  };

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        {/* Recipe Name */}
        <View style={styles.nameContainer}>
          <Text
            style={[
              styles.font,
              // styles.centeredText,
              // styles.normalFont,
            ]}
          >
            {props.name}
          </Text>
          <Text style={[styles.font]}>
              <Text style={styles.boldFont}>calories: </Text>
              {props.calories}
            </Text>
        </View>

        {/* Recipe Serving Size */}
        {/* <View style={styles.servingContainer}>
          <View style={styles.servingTotal}>
            <Text style={[styles.fontSize, styles.baseText]}>
              <Text style={styles.boldFont}>Serving Size: </Text>
              100 g
            </Text>
          </View>
        </View> */}

        {/* Recipe Calories */}
        {/* <View style={styles.caloriesContainer}>
          <View style={styles.calTotal}>
            <Text style={[styles.fontSize, styles.baseText]}>
              <Text style={styles.boldFont}>calories: </Text>
              {props.calories}
            </Text>
          </View>
        </View> */}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonStyles]}
          activeOpacity="0.6"
        >
          <Text
            style={[
              // styles.fontSize,
              styles.editButton,
              // styles.boldFont,
            ]}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyles]}
        >
          <Text
            style={[
              // styles.font,
              styles.editButton,
              // styles.boldFont,
            ]}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  font: {
    fontSize: 18,
    color: "white",
 },
  // boldFont: { fontWeight: "bold" },
  // normalFont: { fontWeight: "normal" },
  // centeredText: { textAlign: "center" },
  // baseText: { fontFamily: "Menlo" },
  container: {
    width: "80%",
    height: 80,
    flex: 1,
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center",
    borderRadius: 20,
    // borderBottomWidth: 1,
    margin: 5,
    backgroundColor: "rgb(37, 93, 120)",
    // color
    // color: "white",
    // justifyContent: "center",
  },
  // cardDivider: {
  //   borderRightWidth: 0.5,
  //   // height: "100%",
  // },
  recipeContainer: {
    flex: 1,
    justifyContent: "center",
    // flexDirection: "column",
    // alignItems: "center",
    // f: "white",
  },
  // ==================================
  // Name Styles
  // ==================================
  nameContainer: {
    justifyContent: "space-around",
    // backgroundColor: "grey",
    // color: "white",
    // alignContent: "space-between",
    // flex: 1,
    flexDirection: "row",
    // borderBottomWidth: 0.25,
    width: "100%",
    // fontSize:
    // paddingHorizontal: 20,
    // paddingHorizontal: 10,
  },
  // ==================================
  // Serving Styles
  // ==================================
  // servingContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  //   borderBottomWidth: 0.25,
  //   width: "100%",
  // },
  // ==================================
  // Calories Styles
  // ==================================
  // caloriesContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   borderBottomWidth: 0.25,
  //   width: "100%",
  // },
  // calTotal: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // ==================================
  // Button Styles
  // ==================================
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "100%",
  },
  buttonStyles: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(22, 66, 92)",
    // borderWidth: 0.25,
    // paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  editButton: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
  buttonDivider: {
    height: "100%",
    borderWidth: 0.25,
  },
  deleteButton: {
    textAlign: "center",
    // color: "red",
  },
});
