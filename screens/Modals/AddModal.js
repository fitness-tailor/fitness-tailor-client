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
// import styles from "../styles.js";
import { connect } from "react-redux";
import firebase from "firebase";
import moment from "moment";

function AddModal({ addModalVisible, setAddModalVisible, displayName, date }) {
  const [name, setName] = useState("Name");
  const [calories, setCalories] = useState("100");

  const addToJournal = () => {
    let year = moment(date).format("YYYY");
    let month = moment(date).format("MM");
    let day = moment(date).format("D");

    firebase
      .database()
      .ref(`users/${displayName}/foodJournal/${year}/${month}/${day}`)
      .push()
      .set({
        // referenceID: fdcId,
        name: name,
        calories: Number(calories),
        // servingSize: SERVING_SIZE.value,
        // servingUnit: SERVING_SIZE.unit,
      });
  };

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
                flexDirection: "row",
                justifyContent: "space-around",
                width: "80%",
              }}
            >
              <View style={styles.inputArea}>
                <Text>Name</Text>
                <TextInput
                  value={name}
                  placeholder={`${name}`}
                  style={styles.input}
                  placeholderTextColor="black"
                  onChangeText={(val) => setName(val)}
                />
              </View>

              <View style={styles.inputArea}>
                <Text>Calories</Text>
                <TextInput
                  // style={styles.servingInput}
                  value={calories}
                  placeholder={`${calories}`}
                  style={styles.input}
                  placeholderTextColor="black"
                  keyboardType={"numeric"}
                  maxLength={6}
                  onChangeText={(val) => setCalories(val)}
                />
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
                onPress={() => addToJournal()}
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

export default connect(mapStateToProps, null)(AddModal);

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
    height: "30%",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
