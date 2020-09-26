import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { getRecipes } from "../../redux/actions/recipeListActions.js";

function RecipeSearch(props) {
  const [recipe, setRecipe] = useState("");

  const fetchRecipesOnPress = (recipe) => {
    props.getRecipes(recipe.replace(/%20/g, ""));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={recipe}
        placeholder="Search Any Recipe"
        maxLength={50}
        autoCorrect={false}
        onChangeText={(recipe) => setRecipe(recipe)}
      />
      <TouchableOpacity
        style={styles.buttonBox}
        onPress={() => fetchRecipesOnPress(recipe)}
      >
        <Ionicons name="md-search" size={45} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRecipes: (recipe) => dispatch(getRecipes(recipe)),
  };
};

export default connect(null, mapDispatchToProps)(RecipeSearch);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "green",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "7%",
  },
  inputBox: {
    flex: 5.5,
    height: 50,
    justifyContent: "center",
    fontSize: 20,
    padding: 10,
    borderRightWidth: 0.2,
    borderColor: "green",
  },
  buttonBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
