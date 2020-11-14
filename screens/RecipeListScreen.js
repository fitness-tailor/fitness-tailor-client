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
import FadeInView from "./Animation_View_Comps/AuthView.js";

// Recipe List Component
const RecipeListScreen = (props) => {
  return (
    <KeyboardAwareScrollView style={styles.containerRecipeList}>
      <SafeAreaView>
        <ScrollView style={styles.scrollViewRecipeList}>
          <View style={styles.searchContainerRecipeList}>
            <RecipeFinder />
          </View>

          <FadeInView style={styles.cardsContainerRecipeList}>
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
                  <View key={key} style={styles.oneCardContainerRecipeList}>
                    <RecipeCard recipe={recipe} />
                  </View>
                );
              })
            )}
          </FadeInView>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.recipeList.isLoading,
  recipes: state.recipeList.recipes,
  error: state.recipeList.error,
  RDA: state.recipeList.RDA,
});

export default connect(mapStateToProps, null)(RecipeListScreen);
