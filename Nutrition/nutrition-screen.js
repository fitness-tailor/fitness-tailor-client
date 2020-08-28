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
import axios from "axios";

export default function NutritionScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <RecipeFinder />
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
  cardsContainer: {
    marginTop: "5%",
    alignItems: "center",
    width: "90%",
  },
  oneCardContainer: {
    borderWidth: 1,
    marginTop: "3%",
    width: "100%",
    borderRadius: 10,
  },
});
