import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const RowData = ({ id, nutValue, nutUnit, percentage }) => {
  if (!nutValue && nutValue !== 0) nutValue = "N/A";
  if (!nutUnit) nutUnit = "";

  if (!percentage && percentage !== 0) {
    percentage = "N/A";
  } else if (percentage > 200) {
    percentage = `<200%`;
  } else {
    percentage = `${percentage}%`;
  }

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
      <View style={styles.nutrientTitle}>
        <Text style={[styles.recipeFont]}>{id}</Text>
      </View>

      <View style={styles.nutrientAmount}>
        <Text style={[styles.recipeFont]}>{valueDisplay}</Text>
      </View>

      <View style={styles.nutrientPercentage}>
        <Text style={[styles.recipeFont]}>{percentage}</Text>
      </View>
    </View>
  );
};

export default RowData;

const styles = StyleSheet.create({
  recipeFont: {
    fontSize: 17,
    textAlign: "center",
  },
  recipeName: {
    marginBottom: "2%",
  },
  nutritionRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderWidth: 1,
    borderTopWidth: 0,
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitle: {
    flex: 1.5,
    borderRightWidth: 1,
    height: "100%",
  },
  // ============================
  // Nutrient Amount
  // ============================
  nutrientAmount: {
    flex: 1,
    borderRightWidth: 1,
  },
  // ============================
  // Nutrient Percentage
  // ============================
  nutrientPercentage: {
    flex: 0.7,
  },
});
