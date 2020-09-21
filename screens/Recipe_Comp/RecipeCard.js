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

const RecipeCard = (props) => {
  let { recipe } = props.recipe;
  const [name, setName] = useState(recipe.label);
  const [servingSize, setServingSize] = useState(recipe.yield);
  const [calories, setCalories] = useState(recipe.calories);
  const [totalNutrients, setTotalNutrients] = useState(recipe.totalNutrients);
  const [dailyValues, setDailyValues] = useState(recipe.totalDaily);

  const addToJournal = () => {
    // TODO: add function that adds to users nutrition journal
  };

  // handle calories as edge case

  // return value if it exists or is 0
  // N/A is pretty useless in this case

  // MY PROBLEM: If val is not defined in my recipe object, this function DOES NOT execute whatsoever and gives me an array.
  // Proposal 1: Once we fetch results, we could add an empty object into daily values that contains nothing. But 8g would return 0%.
  // Proposal 2: We add another function that calculates the daily values percentage by ourselves, instead of relying on data. We'd have to some scientific research for this.
  const displayData = (val, unit = "%") => {
    if (val === undefined) {
      return "N/A";
    }

    if (val === calories) {
      return Math.round(val);
    }
    return val || val === 0 ? Math.round(val) + ` ${unit}` : "N/A";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text
            style={[styles.boldFont, { fontFamily: "Menlo", fontSize: 24 }]}
          >
            {name}
          </Text>
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
              <Text style={[styles.recipeFont, styles.boldFont]}>
                {displayData(calories)}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.FAT.quantity,
                  totalNutrients.FAT.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.FASAT.quantity,
                  totalNutrients.FASAT.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {/* {displayData(
                  totalNutrients.FATRN.quantity,
                  totalNutrients.FATRN.unit
                )} */}
                NONE
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.FAMS.quantity,
                  totalNutrients.FAMS.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.FAPU.quantity,
                  totalNutrients.FAPU.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.CHOLE.quantity,
                  totalNutrients.CHOLE.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.NA.quantity,
                  totalNutrients.NA.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.CHOCDF.quantity,
                  totalNutrients.CHOCDF.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.FIBTG.quantity,
                  totalNutrients.FIBTG.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.SUGAR.quantity,
                  totalNutrients.SUGAR.unit
                )}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {displayData(
                  totalNutrients.PROCNT.quantity,
                  totalNutrients.PROCNT.unit
                )}
              </Text>
            </View>
          </View>

          <View style={styles.nutrientPercentageWrapper}>
            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>LATER</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
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
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => addToJournal()}
          activeOpacity="0.5"
        >
          <Text style={[styles.addButtonText, styles.baseText]}>
            Add To Journal
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecipeCard;

const styles = StyleSheet.create({
  fontSize: { fontSize: 18 },
  boldFont: { fontWeight: "bold" },
  normalFont: { fontWeight: "normal" },
  centeredText: { textAlign: "center" },
  baseText: { fontFamily: "Menlo" },
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
