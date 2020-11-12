import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import firebase from "firebase";
import Modal from "react-native-modal";

export default function LogOutModal({
  closeLogOutModal,
  setLogOutModalVisible,
  logOutModalVisible,
}) {
  const logOut = () => firebase.auth().signOut();

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={logOutModalVisible}
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
              <Text style={styles.headerTextStyle}>Log Out</Text>
            </View>

            <Text style={styles.displayMsg}>Do you want to log out?</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => setLogOutModalVisible(false)}
              >
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => logOut()}
              >
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: "#E99C85",
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
  buttonStyles: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    marginBottom: 25,
    marginHorizontal: 5,
    backgroundColor: "#1BDCD6",
    elevation: 2,
  },
  buttonText: {
    color: "black",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    fontSize: 20,
  },
});
