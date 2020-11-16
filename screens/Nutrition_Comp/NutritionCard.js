import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Easing,
} from "react-native";
import firebase from "firebase";
import moment from "moment";
import { connect } from "react-redux";
import convert from "convert-units";
import EditModal from "../Modals/EditModal.js";
import DeleteModal from "../Modals/DeleteModal.js";
import MainRowData from "../Recipe_Comp/MainRowData.js";
import NutritionRowData from "../Recipe_Comp/NutritionRowData.js";
import FadeInView from "../Animation_View_Comps/AuthView.js";
import Dividers from "../Recipe_Comp/Dividers.js";

const NutritionCard = ({
  recipeObj,
  calories,
  name,
  id,
  dateObject,
  displayName,
  referenceData,
  journalData,
  referenceID,
}) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [calorie, setCalorie] = useState(calories);
  const [nutFactor, setNutFactor] = useState(0);
  const [recipe, setRecipe] = useState(name);
  const [archiveData, setArchiveData] = useState({});
  const [relativeData, setRelativeData] = useState({});

  useEffect(() => {
    fetchArchiveData(referenceID);
  }, []);

  useEffect(() => {
    if (Object.keys(archiveData).length) {
      let factoredValue = calculateFactor(
        archiveData.SERVING_SIZE.value,
        archiveData.SERVING_SIZE.unit,
        journalData.servingSize,
        journalData.servingUnit
      );

      setNutFactor(factoredValue);
    }
  }, [archiveData]);

  useEffect(() => {
    if (Object.keys(archiveData).length) {
      createActualObj(archiveData);
    }
  }, [nutFactor]);

  const fetchArchiveData = async (foodID) => {
    let foodArchivesData = await firebase
      .database()
      .ref(`foodArchives/${foodID}`)
      .once("value")
      .then((snapshot) => snapshot.val())
      .catch((err) => {
        console.log("You had an error fetching food archives", err);
      });

    await setArchiveData(foodArchivesData);
  };

  const createActualObj = (data) => {
    let result = {};
    for (let key in data) {
      if (key === "ID" || key === "NAME" || key === "SERVING_SIZE") {
        continue;
      } else {
        let newValue = data[key].value * nutFactor;
        result[key] = { ...data[key], value: newValue };
      }
    }

    setRelativeData(result);
  };

  const calculateFactor = (refSize, refUnit, currSize, currUnit) => {
    let currValues = convert(currSize).from(currUnit).to("g");
    let refValues = convert(refSize).from(refUnit).to("g");
    let factor = currValues / refValues;
    return factor;
  };

  let editModal = (
    <EditModal
      editModalVisible={editModalVisible}
      setEditModalVisible={setEditModalVisible}
      recipe={recipe}
      setRecipe={setRecipe}
      calories={calories}
      setCalorie={setCalorie}
      id={id}
      yr={dateObject.year}
      mm={dateObject.month}
      dd={dateObject.day}
    />
  );

  let deleteModal = (
    <DeleteModal
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      id={id}
      yr={dateObject.year}
      mm={dateObject.month}
      dd={dateObject.day}
    />
  );

  return (
    <FadeInView
      style={styles.container}
      easing={Easing.bezier(0.2, 0.2, 0.5, 1)}
    >
      <View style={styles.nameContainer}>
        <Text style={styles.font}>{recipe}</Text>

        <Text style={styles.font}>Calories: {journalData.calories}</Text>
      </View>

      {Object.keys(relativeData).length > 0 && (
        <View style={styles.nutritionFactsContainer}>
          <Text style={styles.nutritionFactsTitle}>Nutrition Facts</Text>
          <Dividers borderWidth={1} />
          <MainRowData
            id="Serving Size"
            nutValue={journalData.servingSize}
            nutUnit={journalData.servingUnit}
            fontSize={20}
          />
          <Dividers borderWidth={5} />
          <Text style={styles.amountPerServingTitle}>Amount per serving</Text>
          <MainRowData
            id="Calories"
            nutValue={journalData.calories}
            fontSize={26}
          />
          <Dividers borderWidth={3} />
          <Text style={styles.dailyValPercentageTitle}>% Daily Value</Text>
          <Dividers borderWidth={1.5} />

          {relativeData.hasOwnProperty("TOTAL_FAT") && (
            <>
              <NutritionRowData
                id="Total Fat"
                nutValue={relativeData.TOTAL_FAT.value}
                nutUnit={relativeData.TOTAL_FAT.unit}
                fontWeight={"700"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("SAT_FAT") && (
            <>
              <NutritionRowData
                id="Sat. Fat"
                nutValue={relativeData.SAT_FAT.value}
                nutUnit={relativeData.SAT_FAT.unit}
                paddingLeft={20}
                titleFontFamily={"OpenSans_400Regular"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("TRANS_FAT") && (
            <>
              <NutritionRowData
                id="Trans. Fat"
                nutValue={relativeData.TRANS_FAT.value}
                nutUnit={relativeData.TRANS_FAT.unit}
                paddingLeft={20}
                titleFontFamily={"OpenSans_400Regular"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("CHOLESTEROL") && (
            <>
              <NutritionRowData
                id="Cholesterol"
                nutValue={relativeData.CHOLESTEROL.value}
                nutUnit={relativeData.CHOLESTEROL.unit}
                fontWeight={"700"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("SODIUM") && (
            <>
              <NutritionRowData
                id="Sodium"
                nutValue={relativeData.SODIUM.value}
                nutUnit={relativeData.SODIUM.unit}
                fontWeight={"700"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("CARBS") && (
            <>
              <NutritionRowData
                id="Total Carbohydrate"
                nutValue={relativeData.CARBS.value}
                nutUnit={relativeData.CARBS.unit}
                fontWeight={"700"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("FIBER") && (
            <>
              <NutritionRowData
                id="Dietary Fiber"
                nutValue={relativeData.FIBER.value}
                nutUnit={relativeData.FIBER.unit}
                paddingLeft={20}
                titleFontFamily={"OpenSans_400Regular"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("TOTAL_SUGAR") && (
            <>
              <NutritionRowData
                id="Total Sugar"
                nutValue={relativeData.TOTAL_SUGAR.value}
                nutUnit={relativeData.TOTAL_SUGAR.unit}
                percentage={null}
                paddingLeft={20}
                titleFontFamily={"OpenSans_400Regular"}
              />

              <Dividers borderWidth={1} />
            </>
          )}

          {relativeData.hasOwnProperty("PROTEIN") && (
            <NutritionRowData
              id="Protein"
              nutValue={relativeData.PROTEIN.value}
              nutUnit={relativeData.PROTEIN.unit}
              fontWeight={"700"}
            />
          )}
        </View>
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ ...styles.buttonStyles, backgroundColor: "#07989D" }}
          activeOpacity="0.6"
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={[styles.buttonText]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.buttonStyles, backgroundColor: "#DB1916" }}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 0, width: 0 }}>
        {editModal}
        {deleteModal}
      </View>
    </FadeInView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
  dateObject: state.nutrition.dateObject,
});

export default connect(mapStateToProps)(NutritionCard);

const styles = StyleSheet.create({
  // ==================================
  // Main Container + Title Styles
  // ==================================
  container: {
    width: "80%",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: "#E1DFD7",
    borderColor: "#615C49",
    borderWidth: 0.2,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  nameContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  font: {
    textAlign: "center",
    color: "black",
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    marginBottom: 5,
  },
  // ==================================
  // Button Styles
  // ==================================
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonStyles: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "OpenSans_600SemiBold",
    paddingVertical: 10,
  },
});
