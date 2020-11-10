import React from "react";
import { View } from "react-native";

export default function Dividers({ borderWidth }) {
  return (
    <View
      style={{
        width: "96%",
        borderBottomWidth: borderWidth,
        marginBottom: 2,
      }}
    />
  );
}
