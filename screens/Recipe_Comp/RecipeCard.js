import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";

const RecipeCard = () => {
  const editNutritionData = () => {
    // TODO: add function to edit nutrition data
    // HINT: axios put/update
  };

  const deleteNutritionData = () => {
    // TODO: add function to delete nutrition data
    // HINT: axios delete
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text style={[styles.boldFont, { fontSize: 24 }]}>Pad See Ew</Text>
        </View>

        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientTitleWrapper}>
            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Serving Size</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Calories</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Sat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Trans. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Polyunsat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Monounsat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Cholesterol</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Sodium</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Carbs</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Dietary Fiber</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Sugar</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Protein</Text>
            </View>
          </View>

          <View style={styles.nutrientAmountWrapper}>
            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>1000mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>5mg</Text>
            </View>
          </View>

          <View style={styles.nutrientPercentageWrapper}>
            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>100%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>2%</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.addButtonContainer} activeOpacity="0.5">
          <Text style={styles.addButtonText}>Add To Journal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  bottomPadding: { paddingBottom: 2 },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  recipeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "2%",
    paddingTop: "2%",
    width: "100%",
  },
  recipeFont: {
    fontSize: 20,
    textAlign: "center",
  },
  recipeName: {
    marginBottom: "2%",
  },
  nutrientsContainer: {
    flexDirection: "row",
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitleWrapper: {
    borderWidth: 0.5,
    flex: 2,
  },
  nutrientTitle: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Nutrient Amount
  // ============================
  nutrientAmountWrapper: {
    borderWidth: 0.5,
    flex: 1,
  },
  nutrientAmount: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Nutrient Percentage
  // ============================
  nutrientPercentageWrapper: {
    borderWidth: 0.5,
    flex: 1,
  },
  nutrientPercentage: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Add Button
  // ============================
  addButtonContainer: {
    paddingVertical: "2%",
    paddingHorizontal: "6%",
    marginVertical: "3%",
    backgroundColor: "#24a0ed",
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 26,
    color: "#ffffff",
  },
});
