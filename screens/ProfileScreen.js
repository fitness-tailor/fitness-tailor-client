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
import {Picker} from '@react-native-community/picker';
import { connect } from "react-redux";
import firebase from 'firebase';

const ProfileScreen = (props) => {
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInch, setHeightInch] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBMI] = useState('');
    const [gender, setGender] = useState('');

  useEffect(() => {
    firebase.database().ref('users/' + props.displayName).on('value', function(snapshot) {
      setHeightFeet(snapshot.val().heightFeet);
      setHeightInch(snapshot.val().heightInch);
      setWeight(snapshot.val().weight);
      setGender(snapshot.val().gender);
      setBMI(snapshot.val().BMI);
    })
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Hello {props.displayName}, please enter your height and weight.
      </Text>
      <Text>
        Your BMI is {bmi}
      </Text>
      <View style={styles.userInput}>

      <Picker
        selectedValue={gender}
        itemStyle={{height: 100}}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>



        <View styles={styles.userHeight}>
            <TextInput placeholder='Feet' keyboardType={'numeric'} style={styles.userInput} value={heightFeet} onChangeText={text => setHeightFeet(text)} />
            <Text>Feet</Text>
        </View>
        <View styles={styles.userHeight}>
            <TextInput placeholder='Inches' keyboardType={'numeric'} style={styles.userInput} value={heightInch} onChangeText={text => setHeightInch(text)} /><Text>Inches</Text>
        </View>

        <View style={styles.userWeight}>
          <TextInput placeholder='Weight' keyboardType={'numeric'} value={weight} onChangeText={text => setWeight(text)} /><Text>lbs</Text>
        </View>

        <Button title="Done" onPress={updateUserInfo} />
      </View>

      <Button
        title="Go Home"
        onPress={() => {
          props.navigation.navigate("App");
        }}
      />
      <Button
        title="Go to Recipe List"
        onPress={() => {
          props.navigation.navigate("RecipeList");
        }}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps, null)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userHeight: {
    flex: 1,
    flexDirection: 'row',
  },
  userInput: {
  marginTop: "5%",
  width: "40%",
  },
  userWeight: {
    marginTop: "5%",
  }
});
