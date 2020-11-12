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
  id,
  yr,
  mm,
  dd,
}) {
  // Allows recipe to be immutable
  // such that food name is not lost on the card
  let [inputName, setInputName] = useState(recipe);

  const sendEdit = () => {
    console.log("before", recipe);
    setRecipe(inputName);
    console.log("After", recipe);

    // firebase
    //   .database()
    //   .ref(`users/${displayName}/foodJournal/${yr}/${mm}/${dd}/${id}`)
    //   .update({
    //     name: recipe,
    //     calories: calories,
    //   })
    //   .then(() => {
    //     Alert.alert("Success", "Your edits have been saved to our database!", [
    //       { text: "Ok", onPress: () => setEditModalVisible(false) },
    //     ]);
    //   })
    //   .catch((err) => {
    //     Alert.alert(
    //       "Error",
    //       "An error occured! We could not save your edits",
    //       []
    //     );
    //   });
  };

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
              <Text style={styles.headerTextStyle}>Edit Your Food</Text>
            </View>

            <Text style={styles.displayMsg}>What would you like to edit?</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
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

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#EA4848" }}
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

export default connect(mapStateToProps, null)(EditModal);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: "black",
    textAlign: "center",
    marginHorizontal: 14,
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
  nameInput: {
    fontSize: 22,
    marginBottom: "8%",
    width: "100%",
    height: 100,
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
