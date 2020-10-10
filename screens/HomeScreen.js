import React from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { getUser } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import styles from "./styles.js";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchRDA("male");
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containerHome}>
          <Text>{this.props.user.displayName}</Text>
          <Text>{this.props.user.email}</Text>
          <Button
            title="Log Off"
            onPress={() => {
              firebase.auth().signOut();
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchUser: () => dispatch(getUser()),
    // Fetching RDA is hardcoded as male
    // TODO: make function accept user's gender
    fetchRDA: (gender) => dispatch(storeRDA(gender)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
