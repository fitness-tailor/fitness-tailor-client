import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import axios from "axios";

export default function NutritionPercentage() {
  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={styles.title}>
          <Text style={styles.firstRowText}>
            Daily Total Calories Allowance
          </Text>
        </View>
        <View style={styles.firstRowDivider}></View>
        <View style={styles.calorieDivision}>
          <Text style={{ fontSize: 18, paddingRight: 10 }}>900/2400</Text>
        </View>
      </View>

      <View style={styles.secondRow}>
        <View style={styles.calorieDivision}>
          <Text
            style={{ fontSize: 30, fontWeight: "bold", color: "slategrey" }}
          >
            37.5%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
    backgroundColor: "lightblue",
    marginBottom: "1%",
  },
  // ==================================
  // First Row Styles
  // ==================================
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 5,
    marginBottom: 5,
    borderBottomWidth: 1,
  },
  firstRowText: {
    fontSize: 18,
  },
  firstRowDivider: {
    borderLeftWidth: 1,
  },
  // ==================================
  // Second Row Styles
  // ==================================
  secondRow: {
    alignItems: "center",
  },
});
