import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Easing,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import { getUserAuth } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
import FadeInView from "./Animation_View_Comps/AuthView.js";
import firebase from "firebase";
import styles from "./styles.js";

const ProfileScreen = (props) => {
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInch, setHeightInch] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmi, setBMI] = useState("");
  const [bmr, setBMR] = useState("");
  const [bmrPlusExcer, setbmrPlusExcer] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    firebase
      .database()
      .ref("users/" + props.displayName)
      .on("value", function (snapshot) {
        if (snapshot.val() === null) {
          setHeightFeet(0);
          setHeightInch(0);
          setWeight(0);
          setAge(0);
          setGender("");
          setBMI(0);
          setBMR(0);
        } else {
          setHeightFeet(snapshot.val().heightFeet);
          setHeightInch(snapshot.val().heightInch);
          setWeight(snapshot.val().weight);
          setAge(snapshot.val().age);
          setGender(snapshot.val().gender);
          setBMI(snapshot.val().BMI);
          setBMR(snapshot.val().BMR);
          setActivityLevel(snapshot.val().activityLevel);
          setGoal(snapshot.val().goal);
          setbmrPlusExcer(snapshot.val().bmrPlusExcer);
        }
      });
  }, []);

  const numbersOnly = (input) => {
    let numbers = "1234567890";
    for (var i = 0; i < input.length; i++) {
      if (numbers.indexOf(input[i]) === -1) {
        return false;
      }
    }
  };

  const convertToCM = (feet, inches) => {
    let totalInches = parseInt(feet) * 12 + parseInt(inches);
    let totalCM = totalInches * 2.54;
    return totalCM;
  };

  const convertToKg = (lbs) => {
    return lbs * 0.45359;
  };

  const calculateBMI = (heightFeet, heightInch, weight) => {
    let userInchSquared = Math.pow(
      parseInt(heightFeet) * 12 + parseInt(heightInch),
      2
    );
    let userLbs = parseInt(weight);
    let BMI = (userLbs / userInchSquared) * 703;
    return BMI;
  };

  const calculateBMR = (gender, weight, heightFeet, heightInch, age) => {
    let heightCM = convertToCM(heightFeet, heightInch);
    let weightKG = convertToKg(weight);
    if (gender === "male") {
      return 10 * weightKG + 6.25 * heightCM - 5 * age + 5;
    } else if (gender === "female") {
      return 10 * weightKG + 6.25 * heightCM - 5 * age - 161;
    }
  };

  const updateUserInfo = () => {
    if (
      heightFeet.length === 0 ||
      heightInch.length === 0 ||
      weight.length === 0 ||
      age.length === 0
    ) {
      Alert.alert("Please enter all information");
    } else if (
      numbersOnly(heightFeet) === false ||
      numbersOnly(heightInch) === false ||
      numbersOnly(weight) === false ||
      numbersOnly(age) === false
    ) {
      Alert.alert("Please enter only numbers");
    } else {
      console.log(goal);
      firebase
        .database()
        .ref("users/" + props.displayName)
        .update({
          weight: weight,
          age: age,
          heightFeet: heightFeet,
          heightInch: heightInch,
          gender: gender,
          activityLevel: activityLevel,
          goal: goal,
        })
        .then(() => {
          let BMI = calculateBMI(heightFeet, heightInch, weight);
          setBMI(BMI.toFixed(2));
          let BMR = calculateBMR(gender, weight, heightFeet, heightInch, age);
          setBMR(BMR.toFixed(0));
          let bmrPlusExcer = (BMR * activityLevel).toFixed(0);
          setbmrPlusExcer(bmrPlusExcer);
          firebase
            .database()
            .ref("users/" + props.displayName)
            .update({
              BMI: bmi,
              BMR: bmr,
              bmrPlusExcer: bmrPlusExcer,
            });
        });
      // to refresh gender on update
      props.fetchUser(props.displayName);
      props.fetchRDA(props.gender);
    }
  };

  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    // { label: "Non-Binary", value: "non-binary" },
  ];

  const goalList = [
    { label: "Heavy Weight Loss", value: -600 },
    { label: "Moderate Weight Loss", value: -400 },
    { label: "Light Weight Loss", value: -200 },
    { label: "Maintain Weight", value: 0 },
    { label: "Light Weight Gain", value: 200 },
    { label: "Moderate Weight Gain", value: 400 },
    { label: "Heavy Weight Gain", value: 600 },
  ];

  const activityLevelList = [
    { label: "Little to No Exercise", value: 1.2 },
    { label: "1-3 Days Light", value: 1.375 },
    { label: "3-5 Days Moderate", value: 1.55 },
    { label: "5-6 Days Intense", value: 1.725 },
    { label: "Professional Athlete", value: 1.9 },
  ];

  return (
    <SafeAreaView style={styles.containerProfile}>
      <FadeInView
        style={styles.userSumsProfile}
        easing={Easing.bezier(0.2, 0.2, 0.5, 1)}
      >
        <Text style={styles.profileTitle}>
          Hello <Text style={styles.profileUsername}>{props.displayName}</Text>,{" "}
          {"\n"}
          please enter your information{"\n"}
        </Text>
        <Text style={styles.profileGeneralText}>Your BMI is {bmi}</Text>
        <Text style={styles.profileGeneralText}>Your BMR is {bmr}</Text>
        <Text style={styles.profileGeneralText}>
          Your Daily Caloric Expenditure is {bmrPlusExcer}
        </Text>
      </FadeInView>

      <FadeInView
        style={styles.userInputProfile}
        easing={Easing.bezier(0.2, 0.2, 0.5, 1)}
      >
        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Gender</Text>
          <RNPickerSelect
            selectedValue={gender}
            placeholder={{}}
            items={genderList}
            onValueChange={(itemValue) => setGender(itemValue)}
            // value={gender}
            style={{
              ...pickerSelectStyles,
            }}
          />
        </View>

        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Activity Level</Text>
          <RNPickerSelect
            selectedValue={activityLevel}
            placeholder={{}}
            items={activityLevelList}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
            // value={activityLevel}
            style={{
              ...pickerSelectStyles,
            }}
          />
        </View>

        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Goal</Text>
          <RNPickerSelect
            selectedValue={goal}
            placeholder={{}}
            items={goalList}
            onValueChange={(itemValue) => setGoal(itemValue)}
            // value={goal}
            style={{
              ...pickerSelectStyles,
            }}
          />
        </View>

        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Height</Text>
          <View style={styles.userProfileRow}>
            <TextInput
              placeholder="Feet"
              placeholderTextColor="#DBDBDB"
              keyboardType={"numeric"}
              maxLength={1}
              style={styles.profileInputBoxes}
              value={heightFeet}
              onChangeText={(text) => setHeightFeet(text)}
            />
            <Text style={styles.profileGeneralText}> Feet </Text>
            <TextInput
              placeholder="Inch"
              placeholderTextColor="#DBDBDB"
              keyboardType={"numeric"}
              maxLength={2}
              style={styles.profileInputBoxes}
              value={heightInch}
              onChangeText={(text) => setHeightInch(text)}
            />
            <Text style={styles.profileGeneralText}> Inches</Text>
          </View>
        </View>

        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Weight</Text>
          <View style={styles.userProfileRow}>
            <TextInput
              placeholder="Weight"
              placeholderTextColor="#DBDBDB"
              style={styles.profileInputBoxes}
              maxLength={3}
              keyboardType={"numeric"}
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
            <Text style={styles.profileGeneralText}> lbs</Text>
          </View>
        </View>

        <View style={styles.userProfileRow}>
          <Text style={styles.profileGeneralText}>Age</Text>
          <View style={styles.userProfileRow}>
            <TextInput
              placeholder="Age"
              maxLength={3}
              style={styles.profileInputBoxes}
              keyboardType={"numeric"}
              value={age}
              onChangeText={(text) => setAge(text)}
            />
            <Text style={styles.profileGeneralText}> years</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => updateUserInfo()}
        >
          <Text style={styles.profileButtonText}>Done</Text>
        </TouchableOpacity>
      </FadeInView>
    </SafeAreaView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 20,
    backgroundColor: "rgb(37, 93, 120)",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontFamily: "OpenSans_400Regular",
    // paddingVertical: 12,
    // paddingHorizontal: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    // borderRadius: 4,
    color: "white",
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 25,
    // paddingHorizontal: 10,
    // paddingVertical: 8,
    // borderWidth: 0.5,
    // borderColor: 'purple',
    // borderRadius: 8,
    color: "white",
    // paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (name) => dispatch(getUserAuth(name)),
    fetchRDA: (gender) => dispatch(storeRDA(gender)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
