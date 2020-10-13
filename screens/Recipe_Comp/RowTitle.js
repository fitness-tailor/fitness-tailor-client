import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RowTitle = (props) => {
  return (
    <View style={styles.nutritionRow}>
      <View style={styles.nutrientTitle}>
        <Text style={[styles.recipeFont, styles.baseText]}>Name</Text>
      </View>

      <View style={styles.nutrientAmount}>
        <Text style={[styles.recipeFont, styles.baseText]}>DV</Text>
      </View>

      <View style={styles.nutrientPercentage}>
        <Text style={[styles.recipeFont, styles.baseText]}>% DV</Text>
      </View>
    </View>
  );
};

export default RowTitle;

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  baseText: { fontFamily: "Menlo" },
  bottomPadding: { paddingBottom: 2 },
  recipeFont: {
    fontSize: 20,
    textAlign: "center",
  },
  recipeName: {
    marginBottom: "2%",
  },
  nutritionRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderWidth: 1,
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitle: {
    flex: 1.5,
    borderRightWidth: 1,
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
