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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addCounter } from "../redux/actions/playgroundActions.js";

const Playground = (props) => {
  const counter = useSelector((props) => props.playground.counter);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={{ fontSize: 30, alignItems: "center" }}>{counter}</Text>
      </View>

      <Button
        onPress={() => dispatch(addCounter())}
        title={"Add Counter"}
        style={styles.oneCardContainer}
      />
      <Button
        title="Go Home"
        onPress={() => {
          props.navigation.navigate("App");
        }}
      />
    </SafeAreaView>
  );
};

export default Playground;

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
