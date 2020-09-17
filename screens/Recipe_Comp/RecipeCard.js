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
import firebase from 'firebase';
import {connect} from 'react-redux';

const RecipeCard = (props) => {
  const [name, setName] = useState(props.recipe.recipe.label);
  const [servingSize, setServingSize] = useState(props.recipe.recipe.yield);
  const [calories, setCalories] = useState(props.recipe.recipe.calories);
  const [totalNutrients, setTotalNutrients] = useState(
    props.recipe.recipe.totalNutrients
  );
  const [dailyValues, setDailyValues] = useState(
    props.recipe.recipe.totalDaily
  );

  const addToJournal = () => {
    firebase.database().ref('users/' + props.displayName).set({
      journal: name,
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text style={[styles.boldFont, { fontSize: 24 }]}>{name}</Text>
        </View>

        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientTitleWrapper}>
            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Yield</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Calories</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Sat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Trans. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Polyunsat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Monounsat. Fat</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Cholesterol</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Sodium</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Carbs</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Dietary Fiber</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Total Sugar</Text>
            </View>

            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Protein</Text>
            </View>
          </View>

          <View style={styles.nutrientAmountWrapper}>
            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={[styles.recipeFont, styles.boldFont]}>
                {servingSize}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>{Math.round(calories)}</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FAT.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FASAT.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FATRN.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FAMS.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FAPU.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.CHOLE.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.NA.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.CHOCDF.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.FIBTG.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.SUGAR.quantity)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {Math.round(totalNutrients.PROCNT.quantity)}
              </Text>
            </View>
          </View>

          <View style={styles.nutrientPercentageWrapper}>
            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>None</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Later </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.FAT.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.FASAT.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.CHOLE.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.NA.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.CHOCDF.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.FIBTG.quantity)}%`}
              </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {" "}
                {`${Math.round(dailyValues.PROCNT.quantity)}%`}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => addToJournal()}
          activeOpacity="0.5"
        >
          <Text style={styles.addButtonText}>Add To Journal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps, null)(RecipeCard);

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  bottomPadding: { paddingBottom: 2 },
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  recipeContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "2%",
    paddingTop: "2%",
    width: "100%",
  },
  recipeFont: {
    fontSize: 20,
    textAlign: "center",
  },
  recipeName: {
    marginBottom: "2%",
  },
  nutrientsContainer: {
    flexDirection: "row",
  },
  // ============================
  // Nutrient Title
  // ============================
  nutrientTitleWrapper: {
    borderWidth: 0.5,
    flex: 2,
  },
  nutrientTitle: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Nutrient Amount
  // ============================
  nutrientAmountWrapper: {
    borderWidth: 0.5,
    flex: 1,
  },
  nutrientAmount: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Nutrient Percentage
  // ============================
  nutrientPercentageWrapper: {
    borderWidth: 0.5,
    flex: 1,
  },
  nutrientPercentage: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Add Button
  // ============================
  addButtonContainer: {
    paddingVertical: "2%",
    paddingHorizontal: "6%",
    marginVertical: "3%",
    backgroundColor: "#24a0ed",
    borderRadius: 5,
  },
  addButtonText: {
    fontSize: 26,
    color: "#ffffff",
  },
});
