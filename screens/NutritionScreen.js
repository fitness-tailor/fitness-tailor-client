import React, { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import NutritionCard from "./Nutrition_Comp/NutritionCard";
import TotalCaloriePercentage from "./Nutrition_Comp/TotalNutrition";
import styles from "./styles.js";

const NutritionScreen = (props) => {
  return (
    <SafeAreaView style={styles.containerNutScreen}>
      <View style={styles.percentageContainerNutScreen}>
        <TotalCaloriePercentage />
      </View>

      <View style={styles.cardsContainerNutScreen}>
        <View style={styles.oneCardContainerNutScreen}>
          <NutritionCard />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NutritionScreen;