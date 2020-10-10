import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

const RowData = ({id, nutValue, nutUnit, percentage}) => {
  if (!nutUnit) {
    nutUnit = "";
  }
  return (
    <View style={styles.nutritionRow}>
      <View style={styles.nutrientTitle}>
        <Text style={[styles.recipeFont, styles.baseText]}>{id}</Text>
      </View>
      <View style={styles.nutrientAmount}>
        <Text style={[styles.recipeFont, styles.baseText]}>{`${nutValue} ${nutUnit}`}</Text>
      </View>
      <View style={styles.nutrientPercentage}>
        <Text style={[styles.recipeFont, styles.baseText]}>{`${percentage}`}</Text>
      </View>
    </View>
  )
};

export default RowData;

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  baseText: { fontFamily: "Menlo" },
  bottomPadding: { paddingBottom: 2 },
  recipeFont: {
    fontSize: 18,
    textAlign: "center",
  },
  recipeName: {
    marginBottom: "2%",
  },
  nutritionRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderWidth: 1,
    borderTopWidth: 0
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitle: {
    flex: 1.5,
    borderRightWidth: 1,
    height: "100%"
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
    flex: 0.8,
  },
});

