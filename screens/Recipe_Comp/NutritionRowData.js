import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

// Serving Size and Calories Display ONLY
export default function NutritionRowData({
  id,
  nutValue,
  nutUnit,
  percentage,
  paddingLeft = 0,
  titleFontFamily = "OpenSans_700Bold",
}) {
  if (!nutValue) nutUnit = "g";

  const handlePercentageString = (percentageVal) => {
    let noPercentageArray = ["Trans. Fat", "Total Sugar"];

    if (noPercentageArray.indexOf(id) !== -1) {
      return null;
    } else if (percentageVal) {
      return `${percentageVal} %`;
    } else if (percentageVal > 500) {
      return `<500 %`;
    } else {
      return `0 %`;
    }
  };

  let percentageString = handlePercentageString(percentage);

  let amountStyle = {
    fontSize: 16,
    paddingLeft: paddingLeft,
    fontFamily: titleFontFamily,
  };

  let percentageStyle = {
    fontSize: 16,
    fontFamily: "OpenSans_700Bold",
  };

  return (
    <View style={styles.nutritionRow}>
      <Text style={amountStyle}>
        {id} {`${Math.round(nutValue)} ${nutUnit}`}
      </Text>

      <Text style={percentageStyle}>{percentageString}</Text>
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
