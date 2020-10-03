import React, { useState, useEffect } from "react";
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
import firebase from "firebase";
import { connect } from "react-redux";

const RecipeCard = ({ recipe }) => {
  const [name, setName] = useState(recipe.description);
  const [totalNutrients, setTotalNutrients] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [servingSize, setServingSize] = useState(100);
  const [servingUnit, setServingUnit] = useState("g");

  const [calendar, setCalendar] = useState({
    month: null,
    date: null,
    year: null,
  });
  let { month, date, year } = calendar;

  // handles parsing nutririon object
  useEffect(() => {
    let nutritionData = parseNutritionData(recipe.foodNutrients);
    setTotalNutrients(nutritionData);
  }, []);

  // handles calendar display
  useEffect(() => {
    let [month, date, year] = new Date().toLocaleDateString().split("/");
    year = year.substring(2);
    setCalendar({ month, date, year });
  }, []);

  const addToJournal = () => {
    firebase
      .database()
      .ref("users/" + props.displayName)
      .set({
        journal: name,
      });
  };

  const parseNutritionData = (nutritionArray) => {
    let parsedObject = {
      SERVING_SIZE: {
        value: 100,
        unit: "g",
      },
      CALORIES: {},
      TOTAL_FAT: {},
      SAT_FAT: {},
      TRANS_FAT: {},
      CHOLESTEROL: {},
      SODIUM: {},
      CARBS: {},
      FIBER: {},
      TOTAL_SUGAR: {},
      PROTEIN: {},
    };

    let {
      CALORIES,
      TOTAL_FAT,
      SAT_FAT,
      TRANS_FAT,
      CHOLESTEROL,
      SODIUM,
      CARBS,
      FIBER,
      TOTAL_SUGAR,
      PROTEIN,
    } = parsedObject;

    for (var i = 0; i < nutritionArray.length; i++) {
      switch (nutritionArray[i].nutrientId) {
        case 1008:
          CALORIES.value = Math.round(nutritionArray[i].value);
          break;
        case 1004:
          TOTAL_FAT.value = Math.round(nutritionArray[i].value);
          TOTAL_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1258:
          SAT_FAT.value = Math.round(nutritionArray[i].value);
          SAT_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1257:
          TRANS_FAT.value = Math.round(nutritionArray[i].value);
          TRANS_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1253:
          CHOLESTEROL.value = Math.round(nutritionArray[i].value);
          CHOLESTEROL.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1093:
          SODIUM.value = Math.round(nutritionArray[i].value);
          SODIUM.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1005:
          CARBS.value = Math.round(nutritionArray[i].value);
          CARBS.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1079:
          FIBER.value = Math.round(nutritionArray[i].value);
          FIBER.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 2000:
          TOTAL_SUGAR.value = Math.round(nutritionArray[i].value);
          TOTAL_SUGAR.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1003:
          PROTEIN.value = Math.round(nutritionArray[i].value);
          PROTEIN.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        default:
          continue;
      }
    }

    // loops over object for undefined values
    for (let key in parsedObject) {
      if (JSON.stringify(parsedObject[key]) === "{}") {
        parsedObject[key].value = "";
        parsedObject[key].unit = "";
      }
    }

    return parsedObject;
  };

  // Function can handle serving size in 'g'/grams only
  // TODO: make function handle other units "cups, oz, quarts"
  // handle more units after completing 3 mentioned above.
  const handleServingSize = (inputValue) => {
    if (inputValue) {
      let valueList = inputValue.split(" ");
      console.log(valueList);
    }
  };

  const handleEditing = () => {
    if (isEditing) handleServingSize(String(servingSize));
    setIsEditing(!isEditing);
  };

  // only render if nutrients is not an empty object
  return JSON.stringify(totalNutrients) === "{}" ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text
            style={[
              styles.boldFont,
              {
                fontFamily: "Menlo",
                fontSize: 24,
                textAlign: "center",
                paddingVertical: 4,
              },
            ]}
          >
            {name}
          </Text>
        </View>

        <View style={styles.nutrientsContainer}>
          <View style={styles.nutrientTitleWrapper}>
            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={[styles.recipeFont, styles.baseText]}>Name</Text>
            </View>
            <View style={[styles.nutrientTitle, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>Serving Size</Text>
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
              <Text style={[styles.recipeFont, styles.baseText]}>DV</Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={[styles.recipeFont, styles.boldFont]}>
                {`${totalNutrients.SERVING_SIZE.value} ${totalNutrients.SERVING_SIZE.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={[styles.recipeFont, styles.boldFont]}>
                {totalNutrients.CALORIES.value}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.TOTAL_FAT.value} ${totalNutrients.TOTAL_FAT.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.SAT_FAT.value} ${totalNutrients.TOTAL_FAT.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.TRANS_FAT.value} ${totalNutrients.TRANS_FAT.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.CHOLESTEROL.value} ${totalNutrients.CHOLESTEROL.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.SODIUM.value} ${totalNutrients.SODIUM.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.CARBS.value} ${totalNutrients.CARBS.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.FIBER.value} ${totalNutrients.FIBER.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.TOTAL_SUGAR.value} ${totalNutrients.TOTAL_SUGAR.unit}`}
              </Text>
            </View>

            <View style={[styles.nutrientAmount, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>
                {`${totalNutrients.PROTEIN.value} ${totalNutrients.PROTEIN.unit}`}
              </Text>
            </View>
          </View>

          <View style={styles.nutrientPercentageWrapper}>
            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={[styles.recipeFont, styles.baseText]}>% DV</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>NONE</Text>
            </View>

            <View style={[styles.nutrientPercentage, styles.bottomPadding]}>
              <Text style={styles.recipeFont}>LATER</Text>
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

        <View style={styles.buttonsContainer}>
          <View style={styles.oneButtonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => handleEditing()}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>
                {!isEditing ? "Edit" : "Done Editing"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.buttonText}>Serving Size</Text>

            <View style={styles.editDisplay}>
              {!isEditing && (
                <Text
                  style={styles.buttonText}
                >{`${totalNutrients.SERVING_SIZE.value} ${totalNutrients.SERVING_SIZE.unit}`}</Text>
              )}

              {isEditing && (
                <TextInput
                  style={styles.inputBox}
                  value={servingSize}
                  keyboardType="numeric"
                  placeholder={`${servingSize}`}
                  placeholderTextColor="#696969"
                  maxLength={5}
                  onChangeText={(val) => setServingSize(val)}
                />
              )}
            </View>
          </View>

          <View style={styles.oneButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToJournal()}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>Add To</Text>
            </TouchableOpacity>
            <Text style={styles.buttonText}>Date</Text>
            <Text
              style={[styles.buttonText, { marginTop: 5, marginBottom: 3 }]}
            >{`${month}/${date}/${year}`}</Text>
          </View>
        </View>
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
    paddingHorizontal: "3%",
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
    flex: 1.5,
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
    flex: 0.8,
  },
  nutrientPercentage: {
    borderBottomWidth: 0.5,
  },
  // ============================
  // Add Button
  // ============================
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "3%",
    marginBottom: "5%",
  },
  oneButtonContainer: {
    flex: 1,
  },
  editButton: {
    padding: "4%",
    margin: "5%",
    backgroundColor: "limegreen",
    borderWidth: 2,
    borderRadius: 10,
  },
  editDisplay: {
    marginTop: 5,
    justifyContent: "center",
  },
  inputBox: {
    justifyContent: "center",
    textAlign: "center",
    flex: 1,
    width: "80%",
    marginHorizontal: "10%",
    fontSize: 16,
    borderWidth: 1,
    marginTop: 2,
  },
  addButton: {
    padding: "4%",
    margin: "5%",
    backgroundColor: "deepskyblue",
    borderWidth: 2,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Menlo",
    fontWeight: "bold",
    fontSize: 18,
    color: "#000000",
  },
});
