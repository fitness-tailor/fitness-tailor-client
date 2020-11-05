import React, { useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableHighlight,
} from "react-native";
import { getUserAuth } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./styles.js";

const HomeScreen = (props) => {
  useEffect(() => {
    props.fetchUser(props.user.displayName);
    props.fetchRDA(props.gender);
  }, [props.user.displayName, props.gender]);

  const logOut = () => {
    firebase.auth().signOut();
  };

  return (
    <LinearGradient
      colors={["#ff5a5a", "#ff5a5a", "#013c57", "#013c57"]}
      locations={[0, 0.33, 0.33, 1]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.containerHome}>
          <Text
            style={{
              color: "#32b4b3",
              fontSize: 25,
              marginBottom: 4,
            }}
          >
            HELLO
          </Text>
          <Text
            style={{
              color: "#32b4be",
              fontSize: 35,
              textTransform: "uppercase",
              fontFamily: "Inter_600SemiBold",
            }}
          >
            {props.user.displayName}
          </Text>
          <TouchableHighlight
            style={{
              backgroundColor: "#055f7d",
              width: 230,
              height: 60,
              top: 100,
              borderRadius: 30 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={logOut}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Inter_400Regular",
                  color: "white",
                  fontSize: 24,
                }}
              >
                Log Out
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
