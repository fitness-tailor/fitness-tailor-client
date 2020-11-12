import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
        <Ionicons name="md-search" size={35} color="grey" />
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
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "white",
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "5%",
  },
  inputBox: {
    flex: 5.5,
    height: 50,
    justifyContent: "center",
    fontSize: 20,
    padding: 10,
    borderRightWidth: 1,
  },
  buttonBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
