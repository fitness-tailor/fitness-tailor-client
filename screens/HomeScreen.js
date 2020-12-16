import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import moment from "moment";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Easing,
  Alert,
  SnapshotViewIOSComponent,
} from "react-native";
import { getUserAuth, getProfilePic } from "../redux/actions/authActions.js";
import FadeInView from "./Animation_View_Comps/AuthView.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import styles from "./styles.js";
import LogOutModal from "./Modals/LogOutModal.js";

const HomeScreen = (props) => {
  const [image, setImage] = useState(null);
  const [logOutModalVisible, setLogOutModalVisible] = useState(false);
  const [calExpenditure, setCalExpenditure] = useState(null);
  const [calIntake, setCalIntake] = useState(null);
  const [calGoal, setCalGoal] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Oops",
            "We need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    props.fetchUser(props.user.displayName);
    if (props.user.displayName) {
      props.getProfilePic(props.user);
    }
  }, []);

  useEffect(() => {
    props.fetchRDA(props.gender);
  }, [props.gender]);

  useEffect(() => {
    setImage(props.profilePic);
  }, [props.profilePic]);

  useEffect(() => {
    if (props.user.displayName) {
      getCalExpendAndGoal(props.user.displayName);
    }
    getCalIntake(userDisplayName);
  }, [props.user]);

  useEffect(() => {
    if (props.calGoalRedux && props.calExpenditureRedux) {
      setCalGoal(props.calGoalRedux);
      setCalExpenditure(props.calExpenditureRedux);
    }
  }, [props.calGoalRedux, props.calExpenditureRedux]);

  const uploadProfilePic = async (imageURI, { uid, displayName }) => {
    const response = await fetch(imageURI);
    const blob = await response.blob();
    let profilePicRef = firebase
      .storage()
      .ref(`users/${uid}_${displayName}/profilePic`);
    return profilePicRef.put(blob);
  };

  const pickProfilePic = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadProfilePic(result.uri, props.user)
        .then(() => {
          Alert.alert("Profile Pic stored to Database");
          setImage(result.uri);
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  const getCalExpendAndGoal = (displayName) => {
    firebase
      .database()
      .ref(`users/${displayName}`)
      .once("value")
      .then((snapshot) => {
        let bmrPlusExcer = null;
        let goal = null;

        if (snapshot.val() && snapshot.val().bmrPlusExcer) {
          bmrPlusExcer = snapshot.val().bmrPlusExcer;
        }
        if (snapshot.val() && snapshot.val().goal) {
          goal = snapshot.val().goal;
        }

        if (bmrPlusExcer) {
          setCalExpenditure(Number(bmrPlusExcer));
        }
        if (goal) {
          setCalGoal(Number(bmrPlusExcer) + Number(goal));
        }
      });
  };

  const getCalIntake = (name) => {
    let yr = moment().format("YYYY");
    let mm = moment().format("MM");
    let dd = moment().format("D");
    firebase
      .database()
      .ref(`users/${name}/foodJournal/${yr}/${mm}/${dd}`)
      .on("value", function (snapshot) {
        if (snapshot.val() === null) {
          setCalIntake(null);
        } else {
          let calories = 0;
          Object.values(snapshot.val()).map((recipe) => {
            calories += Math.round(recipe.calories);
          });
          setCalIntake(calories);
        }
      });
  };

  let profilePic = !image ? (
    <View>
      <AntDesign name="pluscircle" size={230} color="#dcdcdc" />
    </View>
  ) : (
    <Image
      source={{ uri: image }}
      style={{
        height: 230,
        width: 230,
        borderRadius: 230 / 2,
      }}
    />
  );

  let logOutModal = (
    <LogOutModal
      setLogOutModalVisible={setLogOutModalVisible}
      logOutModalVisible={logOutModalVisible}
    />
  );

  let userDisplayName = props.user.displayName
    ? props.user.displayName
    : props.initialDisplayName;

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
        <FadeInView
          style={styles.containerHome}
          easing={Easing.bezier(0.2, 0.2, 0.5, 1)}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: "#055f7d",
              height: 230,
              width: 230,
              top: "13%",
              borderRadius: 230 / 2,
              position: "absolute",
              zIndex: 1,
            }}
            onPress={pickProfilePic}
          >
            <View>{profilePic}</View>
          </TouchableOpacity>

          <View style={styles.userInfoHome}>
            <Text
              style={{
                color: "#32b4be",
                fontSize: 35,
                textTransform: "uppercase",
                fontFamily: "Montserrat_500Medium",
              }}
            >
              {userDisplayName}
            </Text>

            <View style={styles.calGoals}>
              <Text style={{ color: "white", fontSize: 18 }}>
                Daily Caloric Expenditure: {calExpenditure}
              </Text>

              <Text style={{ color: "white", fontSize: 18 }}>
                Daily Caloric Goal: {calGoal}
              </Text>

              <Text style={{ color: "white", fontSize: 18 }}>
                Caloric Intake Today: {calIntake}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#055f7d",
                width: 230,
                height: 60,
                borderRadius: 30 / 2,
                justifyContent: "center",
                alignItems: "center",
              }}
              activeOpacity={0.7}
              onPress={() => setLogOutModalVisible(true)}
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
            </TouchableOpacity>
          </View>
          {logOutModal}
        </FadeInView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  initialDisplayName: state.auth.initialDisplayName,
  error: state.auth.error,
  gender: state.auth.gender,
  RDA: state.recipeList.RDA,
  profilePic: state.auth.profilePic,
  errFetchingProfPic: state.auth.errFetchingProfPic,
  calExpenditureRedux: state.auth.calExpenditureRedux,
  calGoalRedux: state.auth.calGoalRedux,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (name) => dispatch(getUserAuth(name)),
    fetchRDA: (gender) => dispatch(storeRDA(gender)),
    getProfilePic: (name) => dispatch(getProfilePic(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
