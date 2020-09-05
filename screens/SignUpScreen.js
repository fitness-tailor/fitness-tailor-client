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
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container}>
            <Text style={{ fontSize: 32, fontWeight: "700", color: "black" }}>
              Fitness Tailor
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={(displayName) => this.setState({ displayName })}
              />
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
              <Text>Sign Up</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                Already have an account?
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
export default SignUpScreen;
