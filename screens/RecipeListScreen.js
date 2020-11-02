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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import styles from "./styles.js";

// Recipe List Component
const RecipeListScreen = (props) => {
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.containerRecipeList}>
        <ScrollView style={styles.scrollViewRecipeList}>
          <View style={styles.searchContainerRecipeList}>
            <RecipeFinder />
          </View>

          <View style={styles.cardsContainerRecipeList}>
            {props.isLoading ? (
              <View style={styles.messageContainerRecipeList}>
                <ActivityIndicator size={"large"} />
              </View>
            ) : props.error.length ? (
              <View style={styles.messageContainerRecipeList}>
                <Text style={styles.errorMessageRecipeList}>
                  Failed to get results. Try again!
                </Text>
              </View>
            ) : (
              props.recipes.map((recipe, key) => {
                return (
                  <View style={styles.oneCardContainerRecipeList}>
                    <RecipeCard recipe={recipe} key={key} />
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.recipeList.isLoading,
  recipes: state.recipeList.recipes,
  error: state.recipeList.error,
});

export default connect(mapStateToProps, null)(RecipeListScreen);
