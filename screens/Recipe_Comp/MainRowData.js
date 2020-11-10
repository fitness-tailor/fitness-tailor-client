import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

// Serving Size and Calories Display ONLY
export default function MainRowData({
  id,
  nutValue,
  fontSize,
  nutUnit = null,
}) {
  if (!nutUnit) nutUnit = "";

  let valueDisplay = "";

  if (id === "Serving Size") {
    valueDisplay = `${nutValue} ${nutUnit}`;
  } else if (id === "Calories") {
    valueDisplay = `${Math.round(nutValue)}`;
  }

  let styleObj = {
    fontSize: fontSize,
    fontFamily: "OpenSans_700Bold",
  };

  return (
    <View style={styles.nutritionRow}>
      <Text style={styleObj}>{id}</Text>

      <Text style={styleObj}>{valueDisplay}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  nutritionRow: {
    flexDirection: "row",
    width: "97%",
    paddingVertical: 5,
    paddingHorizontal: 4,
    justifyContent: "space-between",
  },
});
