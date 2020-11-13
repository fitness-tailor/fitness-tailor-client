import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import Modal from "react-native-modal";
import firebase from "firebase";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";

function DeleteModal({
  deleteModalVisible,
  setDeleteModalVisible,
  displayName,
  yr,
  mm,
  dd,
  id,
}) {
  const deleteNutritionData = async () => {
    await firebase
      .database()
      .ref(`users/${displayName}/foodJournal/${yr}/${mm}/${dd}/${id}`)
      .remove();

    await Alert.alert("Success", "This entry has been deleted", [
      { text: "Ok", onPress: () => setDeleteModalVisible(false) },
    ]);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={deleteModalVisible}
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
              <Text style={styles.headerTextStyle}>Delete Entry</Text>
            </View>

            <Text style={styles.displayMsg}>
              Are you sure you'd like to delete?
            </Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.buttonTextStyle}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => deleteNutritionData()}
              >
                <Text style={styles.buttonTextStyle}>Yes</Text>
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

export default connect(mapStateToProps, null)(DeleteModal);

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
    backgroundColor: "#C0BEAF",
  },
  buttonTextStyle: {
    color: "black",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    fontSize: 18,
  },
});
