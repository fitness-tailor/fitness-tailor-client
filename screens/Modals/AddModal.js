import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
// import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import RNPickerSelect from "react-native-picker-select";
import { getUserJournal } from "../../redux/actions/nutritionActions.js";
// import styles from "../styles.js";
import { connect } from "react-redux";
import firebase from "firebase";
import moment from "moment";

function AddModal({
  addModalVisible,
  setAddModalVisible,
  displayName,
  date,
  getUserJournal,
  dateObject,
}) {
  const [name, setName] = useState("Food");
  const [calories, setCalories] = useState("100");
  const [inputSize, setInputSize] = useState("100");
  const [inputUnit, setInputUnit] = useState("g");

  const addToJournal = () => {
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MM");
    let day = moment(date).format("D");

    firebase
      .database()
      .ref(`users/${displayName}/foodJournal/${year}/${month}/${day}`)
      .push()
      .set({
        referenceID: "user generated",
        name: name,
        calories: Number(calories),
        servingSize: Number(inputSize),
        servingUnit: inputUnit,
      })
      .then(() => {
        setTimeout(() => {
          getUserJournal(dateObject, displayName);
        }, 1000);
      })
      .then(() => {
        Alert.alert("Success", "Your food entry has been saved!", [
          {
            text: "Ok",
            onPress: () => setAddModalVisible(false),
          },
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
        isVisible={addModalVisible}
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
              <Text style={styles.headerTextStyle}>Add To Journal</Text>
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",

                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <View style={styles.inputArea}>
                <Text style={styles.inputTitle}>Name</Text>
                <TextInput
                  value={name}
                  placeholder={`${name}`}
                  style={styles.nameInput}
                  placeholderTextColor="black"
                  onChangeText={(val) => setName(val)}
                />
              </View>

              <View style={{ ...styles.inputArea, marginTop: 15 }}>
                <Text style={styles.inputTitle}>Calories</Text>
                <TextInput
                  value={calories}
                  placeholder={`${calories}`}
                  style={styles.calorieInput}
                  placeholderTextColor="black"
                  keyboardType={"numeric"}
                  maxLength={4}
                  onChangeText={(val) => setCalories(val)}
                />
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                width: "80%",
                marginBottom: 25,
              }}
            >
              <View style={styles.inputArea}>
                <Text style={styles.inputTitle}>Serving Size</Text>
                <TextInput
                  style={styles.input}
                  value={inputSize}
                  placeholder={`${inputSize}`}
                  placeholderTextColor="black"
                  keyboardType={"numeric"}
                  maxLength={4}
                  onChangeText={(val) => setInputSize(val)}
                />
              </View>

              <View style={styles.inputArea}>
                <Text style={styles.inputTitle}>Serving Unit</Text>
                <View>
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
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#EA4848" }}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#26A637" }}
                onPress={() => {
                  if (
                    name.length === 0 ||
                    calories.length === 0 ||
                    inputSize.length === 0
                  ) {
                    Alert.alert("Please fill in the remaining input");
                  } else {
                    addToJournal();
                  }
                }}
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
  dateObject: state.nutrition.dateObject,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserJournal: (date, username) =>
      dispatch(getUserJournal(date, username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 4,
    padding: 10,
    fontSize: 18,
    width: 100,
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
    width: "84%",
    justifyContent: "space-between",
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
  inputTitle: {
    fontFamily: "OpenSans_400Regular",
    marginBottom: 6,
    fontSize: 18,
    textAlign: "center",
  },
  nameInput: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 14,
    padding: 10,
    fontSize: 18,
    width: "100%",
    borderBottomWidth: 1,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  calorieInput: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18,
    width: 100,
    borderBottomWidth: 1,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  input: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 14,
    paddingVertical: 10,
    fontSize: 18,
    width: 100,
    borderBottomWidth: 1,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  inputArea: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  displayMsg: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    fontFamily: "OpenSans_400Regular",
  },
  mainPickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
  },
  subPickerContainer: { alignItems: "center" },
  dateTitle: {
    fontFamily: "OpenSans_400Regular",
    marginBottom: 4,
    fontSize: 18,
  },
  // servingInput: {
  //   fontSize: 22,
  //   marginBottom: "8%",
  //   width: "50%",
  //   textAlign: "center",
  //   borderBottomWidth: 1,
  //   padding: 20,
  //   backgroundColor: "#EEC16D",
  //   fontFamily: "OpenSans_400Regular",
  // },
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
