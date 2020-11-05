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
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { connect } from "react-redux";
import { getUserAuth } from "../redux/actions/authActions.js";
import { storeRDA } from "../redux/actions/recipeListActions.js";
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
          setGender("non-binary");
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

  const convertToCM = (feet, inches)　=> {
    let totalInches = (parseInt(feet) * 12) + parseInt(inches);
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
    console.log(heightCM);
    console.log(weightKG);
    if(gender === "male") {
      return (10 * weightKG) + (6.25 * heightCM) - (5 * age) + 5;
    } else if (gender === "female") {
      return (10 * weightKG) + (6.25 * heightCM) - (5 * age) - 161;
    }
  }

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

  const activityLevelList = [
    { label: "Little to No Exercise", value: 1.2 },
    { label: "Light Excercise", value: 1.375 },
    { label: "Light to Moderate Excerise", value: 1.55 },
    { label: "Moderate to Difficult", value: 1.725 },
    { label: "Professional Athlete", value: 1.9 },
  ];

  return (
    <SafeAreaView style={styles.containerProfile}>
      <Text>
        Hello <Text style={{"fontSize": 25,}}>{props.displayName}</Text>, {"\n"}
        please enter your height and weight.{"\n"}
      </ Text>
        <Text style={{"fontSize": 20,}}>Your BMI is {bmi}</Text>
        <Text style={{"fontSize": 20,}}>Your BMR is {bmr}</Text>
        <Text style={{"fontSize": 20,}}>Your Daily Caloric Expenditure is {bmrPlusExcer}</Text>

      <View style={styles.userInputProfile}>

        <View style={styles.userGenderProfile}>
          <Text style={{"fontSize": 25,}}>Gender</Text>
          <RNPickerSelect
            selectedValue={gender}
            // style={pickerStyles}
            items={genderList}
            onValueChange={(itemValue) => setGender(itemValue)}
          />
        </View>
        <View >
          <Text style={{"fontSize": 25,}}>Activity Level</Text>
          <RNPickerSelect
            selectedValue={activityLevel}
            // style={pickerStyles}
            items={activityLevelList}
            onValueChange={(itemValue) => setActivityLevel(itemValue)}
          />
        </View>

        <View style={styles.userHeightProfile}>
          <Text style={{"fontSize": 25,}} >Height</Text>
          <TextInput placeholder='Feet' keyboardType={'numeric'} style={styles.userInput} value={heightFeet} onChangeText={text => setHeightFeet(text)} />
          <Text>Feet</Text>
          <TextInput placeholder='Inches' keyboardType={'numeric'} style={styles.userInput} value={heightInch} onChangeText={text => setHeightInch(text)} />
          <Text>Inches</Text>
        </View>

        {/* <View styles={styles.userHeightProfile}> */}
        {/* </View> */}
        <View style={styles.userWeightProfile}>
          <Text style={{"fontSize": 25,}}>
            Weight
          </Text>
          <TextInput placeholder='Weight' keyboardType={'numeric'} value={weight} onChangeText={text => setWeight(text)} /><Text>lbs</Text>
        </View>
        <View style={styles.userAgeProfile}>
          <Text style={{"fontSize": 25,}}>
            Age
          </Text>
          <TextInput placeholder='Age' keyboardType={'numeric'} value={age} onChangeText={text => setAge(text)} /><Text>years</Text>
        </View>

        <Button title="Done" onPress={updateUserInfo} />
      </View>
    </SafeAreaView>
  );
};

// const pickerStyles = StyleSheet.create({
//   inputIOS: {
//     // justifyContent: "center/",
//     // textAlign: "center",
//     // paddingHorizontal: 4,
//     // paddingVertical: 4,
//     // marginTop: 2,
//     // marginHorizontal: "10%",
//     // width: "80%",
//     // borderWidth: 0.5,
//     // fontSize: 16,
//     // color: "#000000",
//   },
//   inputAndroid: {
//     // Copied code of docs
//     // TODO: Make styles responsive to androids
//     // fontSize: 16,
//     // justifyContent: "center",
//     // textAlign: "center",
//     // paddingHorizontal: 10,
//     // paddingVertical: 8,
//     // borderWidth: 0.5,
//     // color: "#000000",
//   },
// });

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
