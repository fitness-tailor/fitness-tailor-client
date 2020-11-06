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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import styles from "./styles.js";

class SignInScreen extends React.Component {
  state = {
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

  forgotPassword() {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({
          error: "Password reset email has been sent!",
        });
      })
      .catch(() => {
        this.setState({
          error: "Enter email above!",
        });
      });
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
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => {
        let errorMessage = error.message;
        this.onLoginFailure.bind(this)(errorMessage);
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
            <Text style= {styles.title}>
              NUTRIFIC
            </Text>
            <View style={styles.formSignIn}>
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
                color="#B1B1B1"
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
              <Text style = {{ fontWeight: "500", fontSize: 20, color: "white" }}>Sign In</Text>
            </TouchableOpacity>
            </View>

            <View >
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "white", margin: 20}}
                onPress={() => {
                  this.props.navigation.navigate("SignUp");
                }}
              >
                Don't have an Account?
              </Text>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center", color: "white" }}
                onPress={() => {
                  this.forgotPassword();
                }}
              >
                Forgot Password?
              </Text>
            </View>

          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
};

export default SignInScreen;
