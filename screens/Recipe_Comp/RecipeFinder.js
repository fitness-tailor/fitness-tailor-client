import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { connect } from "react-redux";
import searchImage from "../../assets/search_button.png";
import axios from "axios";
import config from "../../assets/API_KEYS.json";
import { getRecipes } from "../../redux/actions/recipeListActions.js";

function RecipeSearch(props) {
  const [recipe, setRecipe] = useState("");

  const fetchRecipesOnPress = (recipe) => {
    props.fetchRecipesFromAPI(recipe);
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
        <Image source={searchImage} style={styles.searchButton} />
      </TouchableOpacity>
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRecipesFromAPI: (recipe) => dispatch(getRecipes(recipe)),
  };
}

export default connect(null, mapDispatchToProps)(RecipeSearch);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "90%",
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
  },
  searchButton: {
    height: 45,
    width: 45,
    borderRadius: 10,
    marginLeft: "10%",
  },
});
