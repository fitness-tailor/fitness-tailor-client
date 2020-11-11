import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import firebase from "firebase";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

function DateModal({
  closeDateModal,
  totalNutrients,
  baseNutCopy,
  description,
  fdcId,
  displayName,
}) {
  const [inputSize, setInputSize] = useState("100");
  const [inputUnit, setInputUnit] = useState("g");
  const [currentDate, setCurrentDate] = useState({
    month: String(new Date().getMonth() + 1),
    date: String(new Date().getDate()),
    year: String(new Date().getFullYear()).substring(2),
  });
  const [monthList, setMonthList] = useState([]);
  const [dateList, setDateList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [duplicateList, setDuplicateList] = useState([]);
  let { month, date, year } = currentDate;

  useEffect(() => {
    let mList = createPickerList(12);
    let dList = createPickerList(31);
    let yList = [
      {
        label: `20${String(Number(year) - 1)}`,
        value: String(Number(year) - 1),
      },
      { label: `20${year}`, value: year },
      {
        label: `20${String(Number(year) + 1)}`,
        value: String(Number(year) + 1),
      },
    ];
    setMonthList(mList);
    setDateList(dList);
    setYearList(yList);
    setDuplicateList(yList);
    // let duplicateYearList = createDuplicateArray(yearList);
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
          Alert.alert("Success", "Your food has been saved to your journal", [
            { text: "Ok", onPress: () => closeDateModal() },
          ]);
          return nutriData;
        } else {
          return;
        }
      },
      (error, committed, snapshot) => {
        if (error) {
          Alert.alert("Error", "Could not save food in your journal");
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
    await setTimeout(closeDateModal, 3000);
  };

  const createPickerList = (max, array = []) => {
    for (let val = 1; val <= max; val++) {
      array.push({ label: `${val}`, value: `${val}` });
    }
    return array;
  };

  // const createDuplicateArray = (array) => JSON.parse(JSON.stringify(array));

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={true}
        hasBackdrop={true}
        backdropColor="black"
        backdropOpacity={0.8}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerTextStyle}>Save Your Nutrition</Text>
            </View>

            <Text style={styles.displayMsg}>
              Input the day you consumed this item
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                marginBottom: 30,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text style={styles.dateTitle}>Month</Text>

                <RNPickerSelect
                  selectedValue={currentDate.month}
                  value={currentDate.month}
                  placeholder={{}}
                  style={{ ...pickerSelectStyles }}
                  onValueChange={(val) =>
                    setCurrentDate({ ...currentDate, month: val })
                  }
                  items={monthList}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={styles.dateTitle}>Date</Text>

                <RNPickerSelect
                  selectedValue={date}
                  value={date}
                  placeholder={{}}
                  style={{ ...pickerSelectStyles }}
                  onValueChange={(val) =>
                    setCurrentDate({ ...currentDate, date: val })
                  }
                  items={dateList}
                />
              </View>

              <View style={{ alignItems: "center" }}>
                <Text style={styles.dateTitle}>Year</Text>

                <RNPickerSelect
                  selectedValue={year}
                  value={year}
                  placeholder={{}}
                  style={{ ...pickerSelectStyles }}
                  onValueChange={(val, index) =>
                    setCurrentDate({
                      ...currentDate,
                      year: yearList[index].value,
                    })
                  }
                  items={yearList}
                />
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#EA4848" }}
                onPress={() => closeDateModal()}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#26A637" }}
                onPress={() => addFoodToDatabase(currentDate, totalNutrients)}
              >
                <Text style={styles.buttonTextStyle}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps, null)(DateModal);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 10,
    fontSize: 22,
    width: 50,
    borderBottomWidth: 1,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "white",
    color: "white",
    textAlign: "center",
    marginHorizontal: 4,
    width: 50,
    padding: 10,
    fontSize: 20,
    width: 40,
  },
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    width: "100%",
    backgroundColor: "#F2D092",
    alignItems: "center",
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 26,
  },
  displayMsg: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    fontFamily: "OpenSans_400Regular",
  },
  dateTitle: {
    fontFamily: "OpenSans_400Regular",
    marginBottom: 4,
    fontSize: 16,
  },
  servingInput: {
    fontSize: 22,
    marginBottom: "8%",
    width: "50%",
    textAlign: "center",
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  buttonStyles: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderRadius: 20,
    marginBottom: 25,
    marginHorizontal: 5,
    elevation: 2,
  },
  buttonTextStyle: {
    color: "black",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    fontSize: 18,
  },
});
