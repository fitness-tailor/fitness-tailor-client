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
    // var res = recipe.replace(/ /g, "%20");
    // axios
    //   .get(
    //     `https://api.edamam.com/search?q=${res}&app_id=${config.RECIPE_API_KEYS.APP_ID}&app_key=${config.RECIPE_API_KEYS.APP_KEY}&from=0&to=3`
    //   )
    //   .then((res) => {
    //     // console.log(res.data)
    //     console.log("All Foods:", res.data);
    //     console.log("API Data Label:", res.data.hits[2].recipe.label);
    //     console.log("API Data Calories:", res.data.hits[2].recipe.calories);
    //     console.log(
    //       "API Data Nutrients:",
    //       res.data.hits[2].recipe.totalNutrients
    //     );
    //     console.log(
    //       "API Data Total Daily:",
    //       res.data.hits[2].recipe.totalDaily
    //     );
    //     console.log("API Data Digest:", res.data.hits[2].recipe.digest);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
        defaultValue={recipe}
      />
      <TouchableOpacity onPress={() => fetchRecipesOnPress(recipe)}>
        <Image source={searchImage} style={styles.searchButton} />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.recipeList.isLoading,
  recipes: state.recipeList.recipes,
  error: state.recipeList.error,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchRecipesFromAPI: (recipe) => dispatch(getRecipes(recipe)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeSearch);

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "green",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "7%",
  },
  inputBox: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    fontSize: 20,
    padding: 10,
    borderRightWidth: 0.2,
    borderColor: "green",
  },
  searchButton: {
    height: 45,
    width: 45,
    marginRight: 5,
    marginLeft: 5,
  },
});
