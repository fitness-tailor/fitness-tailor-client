import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import firebase from "firebase";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import convert from "convert-units";

// First argument of component is just props. But Destructured
// const {recipe, setRecipe...} = props <= Basically this
// allows you to `setRecipe(...)` instead of `props.setRecipe(...)`
function EditModal({
  recipe,
  setRecipe,
  setEditModalVisible,
  editModalVisible,
  calories,
  setCalories,
  displayName,
  servingSize,
  servingUnit,
  id,
  yr,
  mm,
  dd,
}) {
  // Allows recipe to be immutable
  // such that food name is not lost on the card
  const [inputName, setInputName] = useState(recipe);
  const [inputSize, setInputSize] = useState(servingSize);
  const [inputUnit, setInputUnit] = useState(servingUnit);

  const convertCalorie = (newSize, newUnits) => {
    let newValues = convert(newSize).from(newUnits).to("g");
    let previousValues = convert(servingSize).from(servingUnit).to("g");
    let factor = newValues / previousValues;
    calories *= factor;
    return setCalories(calories);
  };

  const sendEdit = () => {
    // Change Food Name in Nut. Card to what was placed in input

    setRecipe(inputName);
    convertCalorie(inputSize, inputUnit);

    firebase
      .database()
      .ref(`users/${displayName}/foodJournal/${yr}/${mm}/${dd}/${id}`)
      .update({
        name: inputName,
        calories: calories,
        // servingSize: inputSize,
        // servingUnit: inputUnit,
      })
      .then(() => {
        Alert.alert("Success", "Your edits have been saved to our database!", [
          { text: "Ok", onPress: () => setEditModalVisible(false) },
        ]);
      })
      .catch((err) => {
        Alert.alert("Error", "An error occured! We could not save your edits");
      });
  };

  const unitList = [
    { label: "g", value: "g" },
    { label: "oz", value: "oz" },
  ];

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={editModalVisible}
        hasBackdrop={true}
        animationIn="slideInUp"
        animationInTiming={1000}
        animationOut="fadeOut"
        animationOutTiming={1000}
        backdropTransitionOutTiming={0}
        backdropColor="black"
        backdropOpacity={0.8}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerTextStyle}>Edit Entry</Text>
            </View>

            <Text style={styles.displayMsg}>What will you edit?</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputTitle}>Name</Text>

              <TextInput
                style={styles.nameInput}
                value={inputName}
                multiline
                numberOfLines={3}
                placeholder={`${inputName}`}
                placeholderTextColor="gray"
                onChangeText={(text) => setInputName(text)}
              />
            </View>

            <View styles={{ flexDirection: "column", alignItems: "center" }}>
              <Text style={styles.inputTitle}>Serving Size</Text>

              <View style={styles.servingInputContainer}>
                <TextInput
                  style={styles.servingInput}
                  value={inputSize}
                  placeholder={`${inputSize}`}
                  placeholderTextColor="black"
                  keyboardType={"numeric"}
                  maxLength={4}
                  onChangeText={(val) => setInputSize(val)}
                />
                <RNPickerSelect
                  selectedValue={inputUnit}
                  value={inputUnit}
                  placeholder={{}}
                  style={{ ...pickerSelectStyles }}
                  onValueChange={(unit) => setInputUnit(unit)}
                  items={unitList}
                />
              </View>
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#E16151" }}
                onPress={() => {
                  setTimeout(() => {
                    setInputName(recipe);
                  }, 1000);
                  setEditModalVisible(false);
                }}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#78BFCE" }}
                onPress={() => sendEdit()}
              >
                <Text style={styles.buttonTextStyle}>Edit</Text>
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

export default connect(mapStateToProps, null)(EditModal);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 22,
    width: 70,
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
  // ==============================
  // Main Container Styles
  // ==============================
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "84%",
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
  // ==============================
  // Header + Display Msg Styles
  // ==============================
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    fontFamily: "OpenSans_400Regular",
  },
  // ==============================
  // Name Input Styles
  // ==============================
  inputContainer: {
    justifyContent: "space-around",
    width: "80%",
    marginBottom: 20,
  },
  inputTitle: {
    fontFamily: "OpenSans_400Regular",
    marginBottom: 6,
    fontSize: 18,
    textAlign: "center",
  },
  nameInput: {
    fontSize: 22,
    width: "100%",
    maxHeight: 130,
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
    textAlign: "center",
  },
  // ==============================
  // Serving Input Styles
  // ==============================
  servingInputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  servingInput: {
    fontSize: 22,
    width: "50%",
    textAlign: "center",
    borderBottomWidth: 1,
    paddingVertical: 10,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  // ==============================
  // Buttons Styles
  // ==============================
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  buttonStyles: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
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
