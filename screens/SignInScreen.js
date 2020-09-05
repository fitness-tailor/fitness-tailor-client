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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 32, fontWeight: "700", color: "black" }}>
              Fitness Tailor
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
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
              style={{ width: "85%", marginTop: 10 }}
              onPress={() => this.signInWithEmail()}
            >
              <Text>Sign In</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("SignUp");
                }}
              >
                Don't have an Account?
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
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
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "85%",
    marginTop: 15,
  },
  input: {
    fontSize: 15,
    borderColor: "black",
    borderBottomWidth: 1,
    paddingBottom: 1.5,
    marginTop: 25,
  },
});
export default SignInScreen;
