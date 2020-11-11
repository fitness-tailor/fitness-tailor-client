import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function AuthErrorModal({
  error = "You have an error",
  closeErrorModal,
  errorModalVisible,
}) {
  if (!error) error = "Something went wrong.";

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={errorModalVisible}
        hasBackdrop={true}
        animationIn="slideInUp"
        animationInTiming={1000}
        animationOut="fadeOut"
        animationOutTiming={800}
        backdropTransitionOutTiming={0}
        backdropColor="black"
        backdropOpacity={0.7}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Entypo name="circle-with-cross" size={70} color="black" />
            </View>

            <Text style={styles.errorText}>{error}</Text>

            <TouchableOpacity
              style={styles.openButton}
              onPress={() => closeErrorModal()}
            >
              <Text style={styles.textStyle}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
    backgroundColor: "#E73636",
    alignItems: "center",
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  openButton: {
    backgroundColor: "#DB995A",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 100,
    borderRadius: 20,
    marginBottom: 20,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 20,
  },
  errorText: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
  },
});
