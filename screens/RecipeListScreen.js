import React from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import RecipeFinder from "./Recipe_Comp/RecipeFinder";
import RecipeCard from "./Recipe_Comp/RecipeCard";
import { connect } from "react-redux";

// Recipe List Component
const RecipeListScreen = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.searchContainer}>
          <RecipeFinder />
        </View>

        <View style={styles.cardsContainer}>
          {props.isLoading ? (
            <View style={styles.messageContainer}>
              <ActivityIndicator size={"large"} />
            </View>
          ) : props.error.length ? (
            <View style={styles.messageContainer}>
              <Text style={styles.errorMessage}>
                Failed to get results. Try again!
              </Text>
            </View>
          ) : (
            props.recipes.map((recipe, key) => {
              return (
                <View style={styles.oneCardContainer}>
                  <RecipeCard recipe={recipe} key={key} />
                </View>
              );
            })
          )}
        </View>
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
  messageContainer: {
    padding: 5,
    margin: 5,
  },
  errorMessage: {
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    color: "red",
  },
  oneCardContainer: {
    borderWidth: 1,
    marginBottom: "5%",
    width: "100%",
    borderRadius: 10,
  },
});
