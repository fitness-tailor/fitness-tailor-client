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
import RecipeFinder from "./recipe-finder";
import NutritionCard from "./nutrition-card";
import TotalCaloriePercentage from "./total-nutrition";
import axios from "axios";

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <RecipeFinder />
      </View>

      <View style={styles.percentageContainer}>
        <TotalCaloriePercentage />
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.oneCardContainer}>
          <NutritionCard />
        </View>
        <View style={styles.oneCardContainer}>
          <NutritionCard />
        </View>
        <View style={styles.oneCardContainer}>
          <NutritionCard />
        </View>
      </View>
    </SafeAreaView>
  );
}

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
    marginTop: "4%",
    alignItems: "center",
    width: "90%",
  },
  oneCardContainer: {
    borderWidth: 1,
    marginBottom: "3%",
    width: "100%",
    borderRadius: 10,
  },
});
