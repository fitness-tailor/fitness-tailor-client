import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Serving Size and Calories Display ONLY
export default function MainRowData({ id, nutValue, nutUnit = null }) {
  if (!nutUnit) nutUnit = "";

  let valueDisplay = "";

  if (nutValue === "N/A") {
    valueDisplay = "N/A";
  } else if (id === "Serving Size") {
    valueDisplay = `${nutValue} ${nutUnit}`;
  } else {
    valueDisplay = `${Math.round(nutValue)} ${nutUnit}`;
  }

  return (
    <View style={styles.nutritionRow}>
      <Text style={styles.recipeFont}>{id}</Text>

      <Text style={styles.recipeFont}>{valueDisplay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  recipeFont: {
    fontSize: 20,
    fontWeight: "bold",
  },
  nutritionRow: {
    flexDirection: "row",
    width: "97%",
    paddingVertical: 5,
    paddingHorizontal: 2,
    justifyContent: "space-between",
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitle: {},
  // ============================
  // Nutrient Amount
  // ============================
  nutrientAmount: {},
  // ============================
  // Nutrient Percentage
  // ============================
});
