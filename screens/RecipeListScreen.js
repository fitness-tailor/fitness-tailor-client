import React, { useState, useEffect } from "react";
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
import { connect } from "react-redux";

const RecipeListScreen = (props) => {
  const [recipeList, setRecipeList] = useState(props.recipes);
  console.log(recipeList);
  useEffect(() => {
    displayRecipes(recipeList);
  });

  const displayRecipes = (list) => {
    list.map((recipe, key) => {
      return (
        <View style={styles.oneCardContainer}>
          <RecipeCard recipe={recipe} key={key} />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <RecipeFinder />
        </View>

        <View style={styles.cardsContainer}>
          {props.recipes.map((recipe, key) => {
            return (
              <View style={styles.oneCardContainer}>
                <RecipeCard recipe={recipe} key={key} />
              </View>
            );
          })}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.recipeList.isLoading,
  recipes: state.recipeList.recipes,
  error: state.recipeList.error,
});

export default connect(mapStateToProps, null)(RecipeListScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
  },
  scrollView: {
    paddingHorizontal: "4%",
    padding: 0,
  },
  searchContainer: {
    minWidth: "100%",
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
