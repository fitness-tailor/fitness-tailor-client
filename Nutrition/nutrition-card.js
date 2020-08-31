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

export default function NutritionCard() {
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
            style={[styles.fontSize, styles.centeredText, styles.normalFont]}
          >
            Pasta Con Vongole and Ciabatta and Marinara
          </Text>
        </View>

        {/* Recipe Calories */}
        <View style={styles.caloriesContainer}>
          <View style={styles.calTotal}>
            <Text style={styles.fontSize}>
              <Text style={styles.boldFont}>calories: </Text>
              90
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.fontSize, styles.editButton]}>Edit</Text>
        </TouchableOpacity>

        <View style={styles.buttonDivider} />

        <TouchableOpacity style={styles.button}>
          <Text style={[styles.fontSize, styles.deleteButton]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  container: {
    width: "100%",
    minHeight: "26%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cardDivider: {
    borderRightWidth: 1,
    height: "98.5%",
  },
  recipeContainer: {
    flex: 3,
  },
  nameContainer: {
    flex: 2,
    justifyContent: "center",
    padding: 6,
    borderBottomWidth: 0.25,
  },
  // ==================================
  // Calories Styles
  // ==================================
  caloriesContainer: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 6,
  },
  calTotal: {
    flex: 1,
    minHeight: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  // ==================================
  // Button Styles
  // ==================================
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    flex: 0.49,
  },
  editButton: {
    textAlign: "center",
    color: "blue",
  },
  buttonDivider: {
    width: "100%",
    borderBottomWidth: 0.75,
  },
  deleteButton: {
    textAlign: "center",
    color: "red",
  },
});
