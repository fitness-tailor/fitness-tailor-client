import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";
import RNPickerSelect from "react-native-picker-select";
import convert from "convert-units";

export default function ServingModal({
  closeServingModal,
  servingSize,
  servingUnit,
  totalNutrients,
  setServingSize,
  setServingUnit,
}) {
  const [inputSize, setInputSize] = useState(servingSize);
  const [inputUnit, setInputUnit] = useState("g");

  const handleServingSize = (size, unit) => {
    // change default size
    setServingSize(size);
    // changes nutrition value relative to serving size
    size = Number(size);
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

  // Checks if serving size inputs are empty
  const checkForEmptyInputs = () => {
    if (!inputUnit && !inputSize) {
      Alert.alert("Warning", "Please Input Serving Unit and Yield");
    } else if (!inputUnit) {
      Alert.alert("Warning", "Please Input Serving Units");
    } else if (!inputSize) {
      Alert.alert("Warning", "Please Input Serving Yield");
    }
  };

  // Toggles editing when converting serving size
  const toggleEditing = () => {
    // Don't submit data if input fields are empty
    if (!inputSize || !inputUnit) {
      checkForEmptyInputs();
      return;
    } else {
      handleServingSize(inputSize, inputUnit);
    }
    // Closes modal
    closeServingModal();
  };

  const unitList = [
    { label: "g", value: "g" },
    { label: "oz", value: "oz" },
  ];

  return (
    <View style={styles.centeredView}>
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerTextStyle}>Change Serving Size</Text>
            </View>

            <Text style={styles.displayMsg}>Change Serving Size and Units</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <TextInput
                style={styles.servingInput}
                value={inputSize}
                placeholder={`${inputSize}`}
                placeholderTextColor="black"
                keyboardType={"numeric"}
                maxLength={6}
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

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#EA4848" }}
                onPress={() => closeServingModal()}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#26A637" }}
                onPress={() => toggleEditing()}
              >
                <Text style={styles.buttonTextStyle}>Convert</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
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
