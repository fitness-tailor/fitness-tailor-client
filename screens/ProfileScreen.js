import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { connect } from "react-redux";
import firebase from 'firebase';

const ProfileScreen = (props) => {
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInch, setHeightInch] = useState('');
    const [weight, setWeight] = useState('');

  const updateUserInfo = () => {
    firebase.database().ref('users/' + props.displayName).set({
      weight: weight,
      height: `${heightFeet}' ${heightInch}"`
    })
    .then((res) => {
      console.log('successful update')
    })
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Hello {props.displayName}, please enter your height and weight.
      </Text>
      <View style={styles.userInput}>
        <View styles={styles.userHeight}>
            <TextInput placeholder='Feet' pattern="[0-9]" style={styles.userInput} value={heightFeet} onChangeText={text => setHeightFeet(text)} />
            <Text>Feet</Text>
        </View>
        <View styles={styles.userHeight}>
            <TextInput placeholder='Inches' style={styles.userInput} value={heightInch} onChangeText={text => setHeightInch(text)} /><Text>Inches</Text>
        </View>

        <View style={styles.userWeight}>
          <TextInput placeholder='Weight' value={weight} onChangeText={text => setWeight(text)} /><Text>lbs</Text>
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

export default connect(mapStateToProps)(ProfileScreen);

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
  // alignItems: "left",
  width: "40%",
  },
  userWeight: {
    marginTop: "5%",
    // flex: 1,
    // flexDirection: "row",
  }
});
