import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { AppLoading } from "expo";
import firebase from "firebase";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getUserAuth, getProfilePic } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import styles from "./styles.js";

const HomeScreen = (props) => {
  const [image, setImage] = useState(null);

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

  const logOut = () => {
    firebase.auth().signOut();
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

  let profilePicError =
    props.errFetchingProfPic === true
      ? Alert.alert("Error getting your profile pics")
      : null;

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
              bottom: 120,
              borderRadius: 230 / 2,
              position: "relative",
            }}
            onPress={pickProfilePic}
          >
            <View>{profilePic}</View>
            {profilePicError}
          </TouchableOpacity>
          <Text
            style={{
              color: "#32b4be",
              fontSize: 35,
              textTransform: "uppercase",
              fontFamily: "Inter_600SemiBold",
              bottom: 65,
            }}
          >
            {props.user.displayName}
          </Text>
          <View
            style={{
              borderColor: "white",
              borderWidth: 1,
              bottom: 215,
              height: 120,
              width: 240,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
            }}
          >
            <Text style={{ color: "white", fontSize: 18 }}>
              Your Caloric Goal:
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>2200</Text>
            <Text style={{ color: "white", fontSize: 18 }}>
              Your Caloric Intake Today:
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>2300</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#055f7d",
              width: 230,
              height: 60,
              top: 80,
              borderRadius: 30 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
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
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  isProfPicLoading: state.auth.isProfPicLoading,
  user: state.auth.user,
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
