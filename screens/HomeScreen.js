import React from "react";
import {connect} from "react-redux";
import firebase from "firebase";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { getUser } from "../redux/actions/authActions.js"

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text>{this.props.user.email}</Text>
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

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(getUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);