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
import RNPickerSelect from "react-native-picker-select";
import convert from "convert-units";
import RowTitle from "./RowTitle.js";
import RowData from "./RowData.js";

const RecipeCard = ({ recipe, RDA }) => {
  const [name, setName] = useState(recipe.description);
  const [totalNutrients, setTotalNutrients] = useState({});
  const [isEditingServeSize, setIsEditingServeSize] = useState(false);
  const [servingSize, setServingSize] = useState(100);
  const [servingUnit, setServingUnit] = useState("g");

  const [currentDate, setCurrentDate] = useState({
    month: new Date().getMonth() + 1,
    date: new Date().getDate(),
    year: String(new Date().getFullYear()).substring(2),
  });
  let { month, date, year } = currentDate;

  useEffect(() => {
    // Handle nutrition parsing and calendar set-up
    let nutritionData = parseNutritionData(recipe.foodNutrients);
    setTotalNutrients(nutritionData);
  }, []);

  const addToJournal = () => {
    // console.log(`${month}/${date}/${year}`);
    firebase
      .database()
      .ref("users/" + props.displayName)
      .set({
        journal: name,
      });
  };

  const parseNutritionData = (nutritionArray) => {
    let parsedObject = {
      SERVING_SIZE: { value: 100, unit: "g" },
      CALORIES: { value: null },
      TOTAL_FAT: { value: null, unit: null },
      SAT_FAT: { value: null, unit: null },
      TRANS_FAT: { value: null, unit: null },
      CHOLESTEROL: { value: null, unit: null },
      SODIUM: { value: null, unit: null },
      CARBS: { value: null, unit: null },
      FIBER: { value: null, unit: null },
      TOTAL_SUGAR: { value: null, unit: null },
      PROTEIN: { value: null, unit: null },
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
          CALORIES.value = nutritionArray[i].value;
          break;
        case 1004:
          TOTAL_FAT.value = nutritionArray[i].value;
          TOTAL_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1258:
          SAT_FAT.value = nutritionArray[i].value;
          SAT_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1257:
          TRANS_FAT.value = nutritionArray[i].value;
          TRANS_FAT.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1253:
          CHOLESTEROL.value = nutritionArray[i].value;
          CHOLESTEROL.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1093:
          SODIUM.value = nutritionArray[i].value;
          SODIUM.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1005:
          CARBS.value = nutritionArray[i].value;
          CARBS.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1079:
          FIBER.value = nutritionArray[i].value;
          FIBER.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 2000:
          TOTAL_SUGAR.value = nutritionArray[i].value;
          TOTAL_SUGAR.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        case 1003:
          PROTEIN.value = nutritionArray[i].value;
          PROTEIN.unit = nutritionArray[i].unitName.toLowerCase();
          break;
        default:
          continue;
      }
    }

    addPercentagesKey(parsedObject);
    return parsedObject;
  };

  const addPercentagesKey = (object) => {
    for (let keys in object) {
      if (RDA[keys]) {
        object[keys].percentage = function () {
          let division = this.value / RDA[keys];
          return Math.round(division * 100);
        };
      }
    }
  };

  const handleServingSize = (size, unit) => {
    // changes value inside parsed nutrition object
    changePercentageOnConversion(size, unit);
    totalNutrients.SERVING_SIZE.value = size;
    totalNutrients.SERVING_SIZE.unit = unit;
  };

  const changePercentageOnConversion = (size, convertUnits) => {
    let { value, unit } = totalNutrients.SERVING_SIZE;

    let newValues = convert(size).from(convertUnits).to("g");
    let previousValues = convert(value).from(unit).to("g");
    let factor = newValues / previousValues;

    for (let key in totalNutrients) {
      if (!totalNutrients[key].value && totalNutrients[key].value === 0) {
        continue;
      } else {
        totalNutrients[key].value *= factor;
      }
    }
  };

  // TODO: create new function for converting to other units. i.e.) "cups, oz, quarts".

  const checkForEmptyInputs = () => {
    if (!servingUnit && !servingSize) {
      alert("Please Input Serving Unit and Yield");
    } else if (!servingUnit) {
      alert("Please Input Serving Units");
    } else if (!servingSize) {
      alert("Please Input Serving Yield");
    }
  };

  const toggleEditing = () => {
    // Don't submit data if input fields are empty
    if (isEditingServeSize && (!servingUnit || !servingSize)) {
      checkForEmptyInputs();
      return;
    } else if (isEditingServeSize) {
      handleServingSize(servingSize, servingUnit);
    }

    setIsEditingServeSize(!isEditingServeSize);
  };

  const unitList = [
    { label: "g", value: "g" },
    { label: "oz", value: "oz" },
  ];

  // only render if nutrients is not an empty object
  return JSON.stringify(totalNutrients) === "{}" ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text
            style={[
              {
                // fontFamily: "Menlo",
                fontSize: 24,
                color: "white",
                textAlign: "center",
                paddingVertical: 4,
                // paddingHorizontal: 10,
              },
            ]}
          >
            {name}
          </Text>
        </View>

        <View style={{ width: "100%", backgroundColor: "white" }}>
          <RowTitle />

          <RowData
            id="Serving Size"
            nutValue={totalNutrients.SERVING_SIZE.value}
            nutUnit={totalNutrients.SERVING_SIZE.unit}
            percentage={null}
          />

          <RowData
            id="Calories"
            nutValue={totalNutrients.CALORIES.value}
            percentage={totalNutrients.CALORIES.percentage()}
          />

          <RowData
            id="Total Fat"
            nutValue={totalNutrients.TOTAL_FAT.value}
            nutUnit={totalNutrients.TOTAL_FAT.unit}
            percentage={totalNutrients.TOTAL_FAT.percentage()}
          />

          <RowData
            id="Sat. Fat"
            nutValue={totalNutrients.SAT_FAT.value}
            nutUnit={totalNutrients.SAT_FAT.unit}
            percentage={totalNutrients.SAT_FAT.percentage()}
          />

          <RowData
            id="Trans. Fat"
            nutValue={totalNutrients.TRANS_FAT.value}
            nutUnit={totalNutrients.TRANS_FAT.unit}
            percentage={null}
          />

          <RowData
            id="Cholesterol"
            nutValue={totalNutrients.CHOLESTEROL.value}
            nutUnit={totalNutrients.CHOLESTEROL.unit}
            percentage={totalNutrients.CHOLESTEROL.percentage()}
          />

          <RowData
            id="Sodium"
            nutValue={totalNutrients.SODIUM.value}
            nutUnit={totalNutrients.SODIUM.unit}
            percentage={totalNutrients.SODIUM.percentage()}
          />

          <RowData
            id="Total Carbs."
            nutValue={totalNutrients.CARBS.value}
            nutUnit={totalNutrients.CARBS.unit}
            percentage={totalNutrients.CARBS.percentage()}
          />

          <RowData
            id="Dietary Fiber"
            nutValue={totalNutrients.FIBER.value}
            nutUnit={totalNutrients.FIBER.unit}
            percentage={totalNutrients.FIBER.percentage()}
          />

          <RowData
            id="Total Sugar"
            nutValue={totalNutrients.TOTAL_SUGAR.value}
            nutUnit={totalNutrients.TOTAL_SUGAR.unit}
            percentage={null}
          />

          <RowData
            id="Protein"
            nutValue={totalNutrients.PROTEIN.value}
            nutUnit={totalNutrients.PROTEIN.unit}
            percentage={totalNutrients.PROTEIN.percentage()}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.oneButtonContainer}>
            <TouchableOpacity
              style={styles.editButton}
              onPress={toggleEditing}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>
                {!isEditingServeSize ? "Convert Unit" : "Done"}
              </Text>
            </TouchableOpacity>

            <View style={styles.editDisplay}>
              <Text style={styles.buttonText}>Serving Size</Text>

              {!isEditingServeSize && (
                <Text
                  style={[styles.buttonText, { fontSize: 22 }]}
                >{`${totalNutrients.SERVING_SIZE.value} ${totalNutrients.SERVING_SIZE.unit}`}</Text>
              )}

              {isEditingServeSize && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "75%",
                  }}
                >
                  <TextInput
                    style={styles.servingInputBox}
                    value={servingSize}
                    placeholder={`${servingSize}`}
                    placeholderTextColor="white"
                    keyboardType={"numeric"}
                    onChangeText={(val) => setServingSize(val)}
                  />
                  <RNPickerSelect
                    selectedValue={servingUnit}
                    value={servingUnit}
                    style={{
                      ...pickerSelectStyles,
                    }}
                    onValueChange={(unit) => setServingUnit(unit)}
                    items={unitList}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.oneButtonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToJournal()}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>Add To Journal</Text>
            </TouchableOpacity>

            <View style={styles.editDisplay}>
              <Text style={styles.buttonText}>Date</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "75%",
                }}
              >
                <TextInput
                  style={styles.dateInputBox}
                  value={month}
                  placeholder={`${month}`}
                  placeholderTextColor="white"
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(val) =>
                    setCurrentDate({ month: val, date, year })
                  }
                />
                <Text style={{ fontSize: 24 }}>/</Text>
                <TextInput
                  style={styles.dateInputBox}
                  value={date}
                  placeholder={`${date}`}
                  placeholderTextColor="white"
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(val) =>
                    setCurrentDate({ month, date: val, year })
                  }
                />
                <Text style={{ fontSize: 24 }}>/</Text>
                <TextInput
                  style={styles.dateInputBox}
                  value={year}
                  placeholder={`${year}`}
                  placeholderTextColor="grey"
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(val) =>
                    setCurrentDate({ month, date, year: val })
                  }
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
  RDA: state.recipeList.RDA,
});

export default connect(mapStateToProps, null)(RecipeCard);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'rgb(22, 66, 92)',
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
    // backgroundColor: 'rgb(254, 90, 90)',
  },
  oneButtonContainer: {
    flex: 1,
  },
  editButton: {
    padding: "4%",
    marginHorizontal: "5%",
    marginTop: "5%",
    marginBottom: "2%",
    backgroundColor: 'rgb(37, 93, 120)',
    // borderWidth: 2,
    borderRadius: 10,
  },
  editDisplay: {
    display: "flex",
    marginTop: 5,
    justifyContent: "space-around",
    height: 70,
    alignItems: "center",
  },
  servingInputBox: {
    borderWidth: 1,
    borderColor: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 22,
    width: 90,
  },
  // ==========
  // Date Buttons
  // ==========
  addButton: {
    padding: "4%",
    margin: "5%",
    marginBottom: "2%",
    backgroundColor: 'rgb(37, 93, 120)',
    // borderWidth: 2,
    borderRadius: 10,
  },
  dateInputBox: {
    borderWidth: 1,
    borderColor: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 22,
    width: 40,
  },
  buttonText: {
    textAlign: "center",
    // fontFamily: "Menlo",
    // fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 22,
    width: 50,
  },
  inputAndroid: {
    // Copied code of docs
    // TODO: Make styles responsive to androids
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 22,
    width: 40,
  },
});
