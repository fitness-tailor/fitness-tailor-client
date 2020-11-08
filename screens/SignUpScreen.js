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

class SignUpScreen extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  };

  onLoginSuccess() {
    this.props.navigation.navigate("App");
  }

  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
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
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={styles.containerSignIn}>
          <KeyboardAvoidingView style={styles.SignIn}>
            <Text style={styles.title}>NUTRIFIC</Text>
            <View style={styles.formSignIn}>
              <TextInput
                style={styles.inputSignIn}
                placeholder="Full Name"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                color="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={(displayName) => this.setState({ displayName })}
              />
              <TextInput
                style={styles.inputSignIn}
                placeholder="E-mail Address"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                color="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.inputSignIn}
                placeholder="Password"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />

              {this.renderLoading()}
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  color: "red",
                  width: "85%",
                }}
              >
                {this.state.error}
              </Text>

              <TouchableOpacity
                style={styles.signInButton}
                onPress={() => this.signInWithEmail()}
              >
                <Text
                  style={{ fontWeight: "500", fontSize: 20, color: "white" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    fontWeight: "200",
                    fontSize: 17,
                    textAlign: "center",
                    color: "white",
                    margin: 20,
                  }}
                  onPress={() => {
                    this.props.navigation.navigate("SignIn");
                  }}
                >
                  Already have an account?
                </Text>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}

export default SignUpScreen;
