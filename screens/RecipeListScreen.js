import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import RecipeFinder from "./Recipe_Comp/RecipeFinder";
import RecipeCard from "./Recipe_Comp/RecipeCard";
import axios from "axios";

const RecipeListScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <RecipeFinder />
        </View>
        <View style={styles.cardsContainer}>
          <View style={styles.oneCardContainer}>
            <RecipeCard />
          </View>

          <View style={styles.oneCardContainer}>
            <RecipeCard />
          </View>

          <Button
            title="Go Home"
            onPress={() => {
              props.navigation.navigate("App");
            }}
          />
          <Button
            title="Go to Nutrition"
            onPress={() => {
              props.navigation.navigate("Nutrition");
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RecipeListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
  },
  scrollView: {
    paddingHorizontal: "4%",
    padding: 0,
  },
  cardsContainer: {
    marginTop: "6%",
    alignItems: "center",
  },
  oneCardContainer: {
    borderWidth: 1,
    marginBottom: "5%",
    width: "100%",
    borderRadius: 10,
  },
});
