import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import styles from "./styles.js";
import { Fontisto, AntDesign } from "@expo/vector-icons";
import FadeInView from "./Animation_View_Comps/AuthView.js";
import AuthErrorModal from "./Modals/AuthErrorModal.js";

class SignUpScreen extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    error: "",
    errorModalVisible: false,
    loading: false,
  };

  onLoginSuccess() {
    this.props.navigation.navigate("App");
  }

  onLoginFailure(errorMessage) {
    this.setState({
      error: errorMessage,
      loading: false,
      errorModalVisible: true,
    });
  }

  closeErrorModal() {
    this.setState({ errorModalVisible: false });
  }

  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }
  async signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((result) => {
        const user = firebase.auth().currentUser;
        return user.updateProfile({
          displayName: this.state.displayName,
        });
      })
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure.bind(this)("Password is too weak!");
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
    Segment.identify(this.state.email);
    Segment.trackWithProperties("User SignIn", {
      accountType: "CustomEmailAuth",
      email: this.state.email,
    });
  }

  render() {
    let modal = this.state.errorModalVisible ? (
      <View
        style={{
          width: "90%",
          height: 0,
        }}
      >
        <AuthErrorModal
          error={this.state.error}
          closeErrorModal={this.closeErrorModal.bind(this)}
        />
      </View>
    ) : null;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.containerSignIn}>
          <KeyboardAvoidingView style={styles.SignIn}>
            <FadeInView>
              <Text style={styles.title}>NUTRIFIC</Text>
              <View style={styles.formSignIn}>
                <View style={styles.inputSignInContainer}>
                  <AntDesign name="user" size={30} color="#B1B1B1"></AntDesign>
                  <TextInput
                    style={styles.inputSignIn}
                    placeholder="Full Name"
                    autoCapitalize="none"
                    placeholderTextColor="#B1B1B1"
                    color="#B1B1B1"
                    returnKeyType="next"
                    textContentType="name"
                    value={this.state.displayName}
                    onChangeText={(displayName) =>
                      this.setState({ displayName })
                    }
                  />
                </View>

                <View style={styles.inputSignInContainer}>
                  <Fontisto name="email" size={30} color="#B1B1B1"></Fontisto>
                  <TextInput
                    style={styles.inputSignIn}
                    placeholder="E-mail"
                    autoCapitalize="none"
                    placeholderTextColor="#B1B1B1"
                    color="#B1B1B1"
                    returnKeyType="next"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                  />
                </View>

                <View style={styles.inputSignInContainer}>
                  <AntDesign name="lock" size={30} color="#B1B1B1"></AntDesign>
                  <TextInput
                    style={styles.inputSignIn}
                    placeholder="Password"
                    autoCapitalize="none"
                    placeholderTextColor="#B1B1B1"
                    color="#B1B1B1"
                    returnKeyType="done"
                    textContentType="newPassword"
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                  />
                </View>

                {this.renderLoading()}
                {modal}

                <TouchableOpacity
                  style={styles.signInButton}
                  onPress={() => this.signInWithEmail()}
                >
                  <Text style={styles.signInButtonText}>Sign Up</Text>
                </TouchableOpacity>
                <View>
                  <Text
                    style={[styles.authOptionsText, { margin: 20 }]}
                    onPress={() => {
                      this.props.navigation.navigate("SignIn");
                    }}
                  >
                    Already have an account?
                  </Text>
                </View>
              </View>
            </FadeInView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUpScreen;
