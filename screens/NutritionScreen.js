import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import NutritionCard from "./Nutrition_Comp/NutritionCard";
import TotalCaloriePercentage from "./Nutrition_Comp/TotalNutrition";

const NutritionScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.percentageContainer}>
        <TotalCaloriePercentage />
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.oneCardContainer}>
          <NutritionCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NutritionScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  // ==================================
  // Nutrition Card Styles
  // ==================================
  percentageContainer: {
    marginTop: "4%",
    width: "90%",
    justifyContent: "center",
  },
  cardsContainer: {
    marginTop: "5%",
    alignItems: "center",
    width: "90%",
  },
  oneCardContainer: {
    borderWidth: 1,
    marginBottom: "4%",
    width: "100%",
    borderRadius: 10,
  },
});
