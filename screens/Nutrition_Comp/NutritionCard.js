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
              styles.editButton,
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
              styles.editButton,
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
  container: {
    width: "80%",
    height: 80,
    flex: 1,
    borderRadius: 20,
    margin: 5,
    backgroundColor: "rgb(37, 93, 120)",
  },
  recipeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  // ==================================
  // Name Styles
  // ==================================
  nameContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
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
    marginHorizontal: 20,
    borderRadius: 20,
  },
  editButton: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
