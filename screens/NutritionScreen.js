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
import NutritionCard from "./Nutrition_Comp/NutritionCard";
import TotalCaloriePercentage from "./Nutrition_Comp/TotalNutrition";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const NutritionScreen = (props) => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.percentageContainer}>
        <TotalCaloriePercentage />
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.oneCardContainer}>
          <NutritionCard />
        </View>
        <View>
          <Text style={{ fontSize: 30 }}>{counter}</Text>
        </View>

        <Button
          onPress={() => dispatch({ type: "ADD_COUNTER" })}
          title={"Add Counter"}
          style={styles.oneCardContainer}
        />

        <Button
          title="Go Home"
          onPress={() => {
            props.navigation.navigate("App");
          }}
        />
        <Button
          title="Go to Recipe List"
          onPress={() => {
            props.navigation.navigate("RecipeList");
          }}
        />
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
