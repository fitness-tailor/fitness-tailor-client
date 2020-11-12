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
import DateModal from "../Modals/DateModal.js";

const RecipeCard = ({ recipe, RDA, displayName }) => {
  const { description, foodNutrients, fdcId } = recipe;
  const [totalNutrients, setTotalNutrients] = useState({});
  const [baseNutCopy, setBaseNutCopy] = useState({});
  const [isEditingServeSize, setIsEditingServeSize] = useState(false);
  const [servingModalVisible, setServingModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [servingSize, setServingSize] = useState("100");
  const [servingUnit, setServingUnit] = useState("g");

  useEffect(() => {
    let nutritionData = parseNutritionData(foodNutrients, fdcId, true);
    let baseCopy = parseNutritionData(foodNutrients, fdcId);

    // totalNutrients data will be shown to user
    setTotalNutrients(nutritionData);
    // base data will be saved to archives only if user adds to journal
    setBaseNutCopy(baseCopy);
  }, []);

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

  let servingModal = (
    <ServingModal
      totalNutrients={totalNutrients}
      setTotalNutrients={setTotalNutrients}
      servingModalVisible={servingModalVisible}
      setServingModalVisible={setServingModalVisible}
      servingSize={servingSize}
      servingUnit={servingUnit}
      setServingSize={setServingSize}
      setServingUnit={setServingUnit}
    />
  );

  let dateModal = (
    <DateModal
      dateModalVisible={dateModalVisible}
      setDateModalVisible={setDateModalVisible}
      totalNutrients={totalNutrients}
      baseNutCopy={baseNutCopy}
      fdcId={fdcId}
      description={description}
    />
  );

  // only render if nutrients is not an empty object
  return JSON.stringify(totalNutrients) === "{}" ? null : (
    <SafeAreaView style={styles.container}>
      <View style={styles.recipeContainer}>
        <Text style={styles.foodTitleText}>{description}</Text>

        <View style={styles.nutritionFactsContainer}>
          <Text style={styles.nutritionFactsTitle}>Nutrition Facts</Text>

          <Dividers borderWidth={1} />

          <MainRowData
            id="Serving Size"
            nutValue={totalNutrients.SERVING_SIZE.value}
            nutUnit={totalNutrients.SERVING_SIZE.unit}
            fontSize={20}
          />

          <Dividers borderWidth={5} />

          <Text style={styles.amountPerServingTitle}>Amount per serving</Text>

          <MainRowData
            id="Calories"
            nutValue={totalNutrients.CALORIES.value}
            fontSize={26}
          />

          <Dividers borderWidth={3} />

          <Text style={styles.dailyValPercentageTitle}>% Daily Value</Text>

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
          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => setServingModalVisible(true)}
            activeOpacity="0.5"
          >
            <Text style={styles.buttonText}>Convert Serve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonStyles}
            onPress={() => {
              setDateModalVisible(true);
            }}
            activeOpacity="0.5"
          >
            <Text style={styles.buttonText}>Add To Journal</Text>
          </TouchableOpacity>
        </View>
      </View>
      {servingModal}
      {dateModal}
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
  foodTitleText: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
    paddingVertical: 4,
    fontFamily: "Montserrat_600SemiBold",
    marginBottom: "2%",
  },
  // ============================
  // Nutrition Facts Styles
  // ============================
  nutritionFactsContainer: {
    width: "100%",
    backgroundColor: "white",
    borderWidth: 1,
    alignItems: "center",
  },
  nutritionFactsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 3,
    fontFamily: "OpenSans_700Bold",
  },
  // ============================
  // Miscellaneous Nutrition Title Styles
  // ============================
  amountPerServingTitle: {
    fontSize: 16,
    textAlign: "left",
    width: "97%",
    marginTop: 4,
    marginBottom: -2,
    paddingHorizontal: 4,
    fontFamily: "OpenSans_700Bold",
  },
  dailyValPercentageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    width: "97%",
    marginVertical: 4,
    paddingHorizontal: 4,
  },
  // ============================
  // Button Styles
  // ============================
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "3%",
    marginBottom: "5%",
    marginHorizontal: "3%",
  },
  buttonStyles: {
    padding: 12,
    marginTop: 10,
    marginBottom: 5,
    backgroundColor: "rgb(37, 93, 120)",
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontFamily: "Montserrat_400Regular",
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
