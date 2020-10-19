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
import firebase from 'firebase';
import styles from "./styles.js";

const ProfileScreen = (props) => {
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInch, setHeightInch] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState('');
    const [gender, setGender] = useState('');

  useEffect(() => {
    firebase.database().ref('users/' + props.displayName)
    .on('value', function(snapshot) {
      if(snapshot.val() === null) {
        setHeightFeet('0');
        setHeightInch('0');
        setWeight('0');
        setGender('0');
        setBMI('0');
      } else {
        setHeightFeet(snapshot.val().heightFeet);
        setHeightInch(snapshot.val().heightInch);
        setWeight(snapshot.val().weight);
        setGender(snapshot.val().gender);
        setBMI(snapshot.val().BMI);
      }
    });
  }, []);

  const numbersOnly = (input) => {
    let numbers = '1234567890';
    for (var i = 0; i < input.length; i++) {
      if(numbers.indexOf(input[i]) === -1) {
        return false;
      }
    }
  };

  const updateUserInfo = () => {
    if(heightFeet.length === 0 || heightInch.length === 0 || weight.length === 0) {
      Alert.alert(
        "Please enter all information"
      )
    } else if (numbersOnly(heightFeet) === false || numbersOnly(heightInch) === false || numbersOnly(weight) === false ) {
      Alert.alert(
        "Please enter only numbers"
      )
    } else {
      firebase.database().ref('users/' + props.displayName).update({
        weight: weight,
        heightFeet: heightFeet,
        heightInch: heightInch,
        gender: gender,
      })
      .then(() => {
        let userInchSquared = Math.pow((parseInt(heightFeet)*12) + parseInt(heightInch), 2)
        let userLbs = parseInt(weight);
        let BMI = ((userLbs/(userInchSquared))*703);
        setBMI(BMI.toFixed(2));
        firebase.database().ref('users/' + props.displayName).update({
          BMI: bmi,
        })
      })
    }
  };

    const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" }
  ];

  return (
    <SafeAreaView style={styles.containerProfile}>
      <Text>
        Hello {props.displayName}, please enter your height and weight.
      </Text>
      <Text>
        Your BMI is {bmi}
      </Text>

      <View style={styles.userInputProfile}>

        <View style={styles.userGenderProfile}>
          <Text style={{"fontSize": "25",}}>Gender</Text>
          <RNPickerSelect
            selectedValue={gender}
            style={pickerStyles}
            items={genderList}
            onValueChange={(itemValue) => setGender(itemValue)}
          />
        </View>

        <View style={styles.userHeightProfile}>
          <Text style={{"fontSize": "25",}} >Height</Text>
          <TextInput placeholder='Feet' keyboardType={'numeric'} style={styles.userInput} value={heightFeet} onChangeText={text => setHeightFeet(text)} />
          <Text>Feet</Text>
          <TextInput placeholder='Inches' keyboardType={'numeric'} style={styles.userInput} value={heightInch} onChangeText={text => setHeightInch(text)} />
          <Text>Inches</Text>
        </View>

        {/* <View styles={styles.userHeightProfile}> */}
        {/* </View> */}
        <View style={styles.userWeightProfile}>
          <Text style={{"fontSize": "25",}}>
            Weight
          </Text>
          <TextInput placeholder='Weight' keyboardType={'numeric'} value={weight} onChangeText={text => setWeight(text)} /><Text>lbs</Text>
        </View>

        <Button title="Done" onPress={updateUserInfo} />
      </View>
    </SafeAreaView>
  );
};

const pickerStyles = StyleSheet.create({
  inputIOS: {
    // justifyContent: "center/",
    // textAlign: "center",
    // paddingHorizontal: 4,
    // paddingVertical: 4,
    // marginTop: 2,
    // marginHorizontal: "10%",
    // width: "80%",
    // borderWidth: 0.5,
    // fontSize: 16,
    // color: "#000000",
  },
  inputAndroid: {
    // Copied code of docs
    // TODO: Make styles responsive to androids
    fontSize: 16,
    justifyContent: "center",
    textAlign: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    color: "#000000",
  },
});

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps, null)(ProfileScreen);