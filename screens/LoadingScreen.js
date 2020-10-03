import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";
import styles from "./styles.js";

class LoadingScreen extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate("App");
      } else {
        this.props.navigation.navigate("SignIn");
      }
    });
  }

  render() {
    return (
      <View style={styles.containerLoading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default LoadingScreen;
