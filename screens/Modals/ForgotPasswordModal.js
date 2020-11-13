import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import firebase from "firebase";
import Modal from "react-native-modal";

export default function ForgotPasswordModal({
  closePasswordModal,
  passwordModalVisible,
}) {
  const [email, setEmail] = useState("");

  const forgotPassword = (email) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Success", "We have e-mailed you a password reset link!", [
          { text: "Ok", onPress: () => closePasswordModal() },
        ]);
      })
      .catch(() =>
        Alert.alert(
          "This Email does not exist. Please check your e-mail or Create a new Account"
        )
      );
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        isVisible={passwordModalVisible}
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
              <Text style={styles.headerTextStyle}>Forgot your Password</Text>
            </View>
            <Text style={styles.displayMsg}>Enter your E-mail below!</Text>
            <TextInput
              style={styles.forgetPasswordInput}
              placeholder="E-mail"
              autoCapitalize="none"
              placeholderTextColor="#000000"
              color="#000000"
              returnKeyType="next"
              keyboardType="email-address"
              textContentType="emailAddress"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#EA4848" }}
                onPress={() => closePasswordModal()}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#26A637" }}
                onPress={() => forgotPassword(email)}
              >
                <Text style={styles.buttonTextStyle}>Send</Text>
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
  buttonsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  openButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 100,
    borderRadius: 20,
    marginBottom: 25,
    marginHorizontal: 5,
    elevation: 2,
  },
  headerTextStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "OpenSans_600SemiBold",
    fontSize: 26,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 26,
  },
  forgetPasswordInput: {
    fontSize: 22,
    marginHorizontal: "4%",
    marginBottom: "8%",
    borderBottomWidth: 1,
    width: "84%",
    padding: 10,
    backgroundColor: "#EEC16D",
    fontFamily: "OpenSans_400Regular",
  },
  buttonTextStyle: {
    color: "black",
    fontFamily: "OpenSans_600SemiBold",
    textAlign: "center",
    fontSize: 18,
  },
  displayMsg: {
    textAlign: "center",
    fontSize: 20,
    padding: 20,
    fontFamily: "OpenSans_400Regular",
  },
});
