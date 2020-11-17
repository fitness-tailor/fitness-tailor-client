import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

// Serving Size and Calories Display ONLY
function FoodRowData({
  id,
  nutValue,
  nutUnit,
  paddingLeft = 0,
  titleFontFamily = "OpenSans_700Bold",
  RDA,
  RDAkey = null,
}) {
  let [percentageString, setPercentageString] = useState(null);
  if (!nutValue) nutUnit = "g";

  const handlePercentage = (value, RDAValue) => {
    let result = (value / RDAValue) * 100;
    return `${Math.round(result)}%`;
  };

  useEffect(() => {
    if (RDAkey !== null) {
      let percentVal = handlePercentage(nutValue, RDA[RDAkey]);
      setPercentageString(percentVal);
    }
  }, []);

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

const mapStateToProps = (state) => ({
  RDA: state.recipeList.RDA,
});

export default connect(mapStateToProps)(FoodRowData);

const styles = StyleSheet.create({
  nutritionRow: {
    flexDirection: "row",
    width: "97%",
    paddingVertical: 5,
    paddingHorizontal: 4,
    justifyContent: "space-between",
  },
});
