import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import firebase from "firebase";
import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  SnapshotViewIOSComponent,
} from "react-native";
import { getUserAuth, getProfilePic } from "../redux/actions/authActions.js";
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
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    props.fetchUser(props.user.displayName);
    if (props.user.displayName) {
      props.getProfilePic(props.user);
    }
  }, [props.user]);

  useEffect(() => {
    props.fetchRDA(props.gender);
  }, [props.gender]);

  useEffect(() => {
    if (props.profilePic) {
      setImage(props.profilePic);
    }
  }, [props.profilePic]);



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

  useEffect(() => {
    getCalIntake();
    getCalExpend();
    getCalGoal();
  }, [props.user])


  const getCalExpend = () => {
    firebase
    .database()
    .ref(`users/${props.displayName}/bmrPlusExcer`)
    .on("value", function (snapshot) {
      setCalExpenditure(snapshot.val());
    })
  };

  const getCalIntake = () => {
    let yr = moment().format("YYYY");
    let mm = moment().format("MM");
    let dd = moment().format("D");
    firebase
    .database()
    .ref(`users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}`)
    .on("value", function(snapshot) {
      if(snapshot.val() === null) {
        setCalIntake(null);
      } else {
        let calories = 0;
        Object.values(snapshot.val()).map((recipe) => {
          calories += recipe.calories;
        })
        setCalIntake(calories)
      }
    })
  }

  const getCalGoal = () => {
    firebase
    .database()
    .ref(`users/${props.displayName}`)
    .on("value", function(snapshot) {
      if(snapshot.val() === null) {
        setCalGoal(null);
      } else {
        const goal = snapshot.val().goal;
        const bmrPlusExcer = snapshot.val().bmrPlusExcer
        if(goal === "maintain") {
          setCalGoal(bmrPlusExcer)
        } else if(goal === "lose") {
          setCalGoal(parseInt(bmrPlusExcer) - 500)
        } else if(goal === "gain") {
          setCalGoal(parseInt(bmrPlusExcer) + 500)
        }
      }
    })
  }
  
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

  let profilePicError =
    props.errFetchingProfPic === true
      ? Alert.alert("Error getting your profile pics")
      : null;

  const closeLogOutModal = () => setLogOutModalVisible(false);

  let logOutModal = logOutModalVisible ? (
    <LogOutModal closeLogOutModal={closeLogOutModal} />
  ) : null;

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
            {profilePicError}
          </TouchableOpacity>

          <View style={styles.userInfoHome}>
            <Text
              style={{
                color: "#32b4be",
                fontSize: 35,
                textTransform: "uppercase",
                fontFamily: "OpenSans_600SemiBold",
              }}
            >
              {props.user.displayName}
            </Text>

            <View style={styles.calGoals} >
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isProfPicLoading: state.auth.isProfPicLoading,
  user: state.auth.user,
  displayName: state.auth.user.displayName,
  error: state.auth.error,
  gender: state.auth.gender,
  RDA: state.recipeList.RDA,
  profilePic: state.auth.profilePic,
  errFetchingProfPic: state.auth.errFetchingProfPic,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (name) => dispatch(getUserAuth(name)),
    fetchRDA: (gender) => dispatch(storeRDA(gender)),
    getProfilePic: (name) => dispatch(getProfilePic(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
