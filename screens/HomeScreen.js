import React, { useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { getUserAuth } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import styles from "./styles.js";

const HomeScreen = (props) => {
  useEffect(() => {
    props.fetchUser(props.user.displayName);
    props.fetchRDA(props.gender);
  }, [props.user.displayName, props.gender]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.containerHome}>
        <Text>{props.user.displayName}</Text>
        <Text>{props.user.email}</Text>
        <Button
          title="Log Off"
          onPress={() => {
            firebase.auth().signOut();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error,
  gender: state.auth.gender,
  RDA: state.recipeList.RDA,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (name) => dispatch(getUserAuth(name)),
    fetchRDA: (gender) => dispatch(storeRDA(gender)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
