import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import firebase from "firebase";

class HomeScreen extends React.Component {
  state = { user: {} };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({ user: user });
      }
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{this.state.user.email}</Text>
          <Button
            title="Log Off"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
          <Button
            title="Go to Nutrition"
            onPress={() => {
              this.props.navigation.navigate("Nutrition");
            }}
          />
          <Button
            title="Go to Recipe List"
            onPress={() => {
              this.props.navigation.navigate("RecipeList");
            }}
          />
          <Button
            title="Go to Redux Playground"
            onPress={() => {
              this.props.navigation.navigate("Playground");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomeScreen;
