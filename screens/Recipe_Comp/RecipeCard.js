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
import MainRowData from "./MainRowData.js";
import Dividers from "./Dividers.js";
import NutritionRowData from "./NutritionRowData.js";
import ServingModal from "../Modals/ServingModal.js";

const RecipeCard = ({ recipe, RDA, displayName }) => {
  const { description, foodNutrients, fdcId } = recipe;
  const [totalNutrients, setTotalNutrients] = useState({});
  const [baseNutCopy, setBaseNutCopy] = useState({});
  const [isEditingServeSize, setIsEditingServeSize] = useState(false);
  const [servingModalVisible, setServingModalVisible] = useState(false);
  const [servingSize, setServingSize] = useState("100");
  const [servingUnit, setServingUnit] = useState("g");

  const [currentDate, setCurrentDate] = useState({
    month: String(new Date().getMonth() + 1),
    date: String(new Date().getDate()),
    year: String(new Date().getFullYear()).substring(2),
  });
  let { month, date, year } = currentDate;

  useEffect(() => {
    let nutritionData = parseNutritionData(foodNutrients, fdcId, true);
    let baseCopy = parseNutritionData(foodNutrients, fdcId);

    // totalNutrients data will be shown to user
    setTotalNutrients(nutritionData);
    // base data will be saved to archives only if user adds to journal
    setBaseNutCopy(baseCopy);
  }, []);

  // Add Food Info to User's Journal
  const addToUserJournal = (
    { month, date, year },
    { CALORIES, SERVING_SIZE }
  ) => {
    const storeFoodInUserRef = firebase
      .database()
      .ref(`users/${displayName}/foodJournal/20${year}/${month}/${date}`);

    storeFoodInUserRef.push().set({
      referenceID: fdcId,
      name: description,
      calories: CALORIES.value,
      servingSize: SERVING_SIZE.value,
      servingUnit: SERVING_SIZE.unit,
    });
  };

  // Add Food Info of 100 g serving size to Food Archives
  // Only if Food ID doesn't exist
  const addToArchives = (nutriData) => {
    const foodArchivesRef = firebase.database().ref(`foodArchives/${fdcId}`);

    // Transaction adds to archives unless id already exists
    foodArchivesRef.transaction(
      (currentData) => {
        if (currentData === null) {
          return nutriData;
        } else {
          return;
        }
      },
      (error, committed, snapshot) => {
        if (error) {
          console.log("Transaction failed abnormally!", error);
        } else if (!committed) {
          console.log(`Did not save since fdcId: ${fdcId} already exists`);
        } else {
          console.log(`fdcId: ${fdcId} has been added to archives!`);
        }
      }
    );
  };

  // Adds Nutrition Info to User's Journal and Archives
  const addFoodToDatabase = async (dateObj, nutritionObj) => {
    await addToUserJournal(dateObj, nutritionObj);
    await addToArchives(baseNutCopy);
  };

  // Parse through nutrition database
  const parseNutritionData = (nutritionArray, id, allowPercentages = false) => {
    let parsedObject = {
      ID: id,
      NAME: description,
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

    if (allowPercentages) addPercentagesKey(parsedObject);

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

  const unitList = [
    { label: "g", value: "g" },
    { label: "oz", value: "oz" },
  ];

  const closeServingModal = () => setServingModalVisible(false);

  let servingModal = servingModalVisible ? (
    <ServingModal
      closeServingModal={closeServingModal}
      totalNutrients={totalNutrients}
      servingSize={servingSize}
      servingUnit={servingUnit}
      setServingSize={setServingSize}
      setServingUnit={setServingUnit}
    />
  ) : null;

  // only render if nutrients is not an empty object
  return JSON.stringify(totalNutrients) === "{}" ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.recipeName}>
          <Text
            style={[
              {
                fontSize: 24,
                color: "white",
                textAlign: "center",
                paddingVertical: 4,
              },
            ]}
          >
            {description}
          </Text>
        </View>

        <View
          style={{
            width: "100%",
            backgroundColor: "white",
            borderWidth: 1,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              marginVertical: 3,
              fontFamily: "OpenSans_700Bold",
            }}
          >
            Nutrition Facts
          </Text>

          <Dividers borderWidth={1} />

          <MainRowData
            id="Serving Size"
            nutValue={totalNutrients.SERVING_SIZE.value}
            nutUnit={totalNutrients.SERVING_SIZE.unit}
            fontSize={20}
          />

          <Dividers borderWidth={5} />

          <Text
            style={{
              fontSize: 16,
              textAlign: "left",
              width: "97%",
              marginTop: 4,
              marginBottom: -2,
              paddingHorizontal: 4,
              fontFamily: "OpenSans_700Bold",
            }}
          >
            Amount per serving
          </Text>

          <MainRowData
            id="Calories"
            nutValue={totalNutrients.CALORIES.value}
            fontSize={26}
          />

          <Dividers borderWidth={3} />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "right",
              width: "97%",
              marginVertical: 4,
              paddingHorizontal: 4,
            }}
          >
            % Daily Value
          </Text>

          <Dividers borderWidth={1.5} />

          <NutritionRowData
            id="Total Fat"
            nutValue={totalNutrients.TOTAL_FAT.value}
            nutUnit={totalNutrients.TOTAL_FAT.unit}
            percentage={totalNutrients.TOTAL_FAT.percentage()}
            fontWeight={"700"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Sat. Fat"
            nutValue={totalNutrients.SAT_FAT.value}
            nutUnit={totalNutrients.SAT_FAT.unit}
            percentage={totalNutrients.SAT_FAT.percentage()}
            paddingLeft={20}
            titleFontFamily={"OpenSans_400Regular"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Trans. Fat"
            nutValue={totalNutrients.TRANS_FAT.value}
            nutUnit={totalNutrients.TRANS_FAT.unit}
            percentage={null}
            paddingLeft={20}
            titleFontFamily={"OpenSans_400Regular"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Cholesterol"
            nutValue={totalNutrients.CHOLESTEROL.value}
            nutUnit={totalNutrients.CHOLESTEROL.unit}
            percentage={totalNutrients.CHOLESTEROL.percentage()}
            fontWeight={"700"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Sodium"
            nutValue={totalNutrients.SODIUM.value}
            nutUnit={totalNutrients.SODIUM.unit}
            percentage={totalNutrients.SODIUM.percentage()}
            fontWeight={"700"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Total Carbohydrate"
            nutValue={totalNutrients.CARBS.value}
            nutUnit={totalNutrients.CARBS.unit}
            percentage={totalNutrients.CARBS.percentage()}
            fontWeight={"700"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Dietary Fiber"
            nutValue={totalNutrients.FIBER.value}
            nutUnit={totalNutrients.FIBER.unit}
            percentage={totalNutrients.FIBER.percentage()}
            paddingLeft={20}
            titleFontFamily={"OpenSans_400Regular"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Total Sugar"
            nutValue={totalNutrients.TOTAL_SUGAR.value}
            nutUnit={totalNutrients.TOTAL_SUGAR.unit}
            percentage={null}
            paddingLeft={20}
            titleFontFamily={"OpenSans_400Regular"}
          />

          <Dividers borderWidth={1} />

          <NutritionRowData
            id="Protein"
            nutValue={totalNutrients.PROTEIN.value}
            nutUnit={totalNutrients.PROTEIN.unit}
            percentage={totalNutrients.PROTEIN.percentage()}
            fontWeight={"700"}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.oneButtonContainer}>
            <View style={styles.editDisplay}>
              <Text style={styles.buttonText}>Serving Size</Text>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setServingModalVisible(true)}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>Convert Serve</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.oneButtonContainer}>
            <View style={styles.editDisplay}>
              <Text style={styles.buttonText}>Date</Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
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
                    setCurrentDate({ ...currentDate, month: val })
                  }
                />
                <Text style={{ fontSize: 24, color: "white" }}>/</Text>
                <TextInput
                  style={styles.dateInputBox}
                  value={date}
                  placeholder={`${date}`}
                  placeholderTextColor="white"
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(val) =>
                    setCurrentDate({ ...currentDate, date: val })
                  }
                />
                <Text style={{ fontSize: 24, color: "white" }}>/</Text>
                <TextInput
                  style={styles.dateInputBox}
                  value={year}
                  placeholder={`${year}`}
                  color="white"
                  keyboardType={"numeric"}
                  maxLength={2}
                  onChangeText={(val) =>
                    setCurrentDate({ ...currentDate, year: val })
                  }
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addFoodToDatabase(currentDate, totalNutrients)}
              activeOpacity="0.5"
            >
              <Text style={styles.buttonText}>Add To Journal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {servingModal}
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
    backgroundColor: "rgb(22, 66, 92)",
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
    backgroundColor: "rgb(37, 93, 120)",
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
    color: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 20,
    width: 80,
  },
  // ==========
  // Date Buttons
  // ==========
  addButton: {
    padding: "4%",
    margin: "5%",
    marginBottom: "2%",
    backgroundColor: "rgb(37, 93, 120)",
    // borderWidth: 2,
    borderRadius: 10,
  },
  dateInputBox: {
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 4,
    fontSize: 20,
    width: 35,
  },
  buttonText: {
    textAlign: "center",
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
    fontSize: 20,
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
    fontSize: 20,
    width: 40,
  },
});
