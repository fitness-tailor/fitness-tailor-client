import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
// import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import styles from "../styles.js";
import { connect } from "react-redux";
import firebase from "firebase";
import moment from 'moment';

function AddModal({
  addModalVisible,
  setAddModalVisible,
  displayName,
  date
}) {
  const [name, setName] = useState('Name')
  const [calories, setCalories] = useState(100)


  const addToJournal = () => {
    let year = moment(date).format('YYYY');
    let month = moment(date).format('MM');
    let day = moment(date).format('D');

    firebase
    .database()
    .ref(`users/${displayName}/foodJournal/${year}/${month}/${day}`)
    .push()
    .set({
      // referenceID: fdcId,
      name: name,
      calories: calories,
      // servingSize: SERVING_SIZE.value,
      // servingUnit: SERVING_SIZE.unit,
    });
  }

  return (
    <View>
      <Modal
        isVisible={addModalVisible}
        hasBackdrop={true}
        animationIn="slideInUp"
        animationInTiming={1000}
        animationOut="fadeOut"
        animationOutTiming={1000}
        backdropTransitionOutTiming={0}
        backdropColor="black"
        backdropOpacity={0.8}>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "80%",
                }}
              >
            <TextInput
              value={name}
              placeholder={`${name}`}
              placeholderTextColor="black"
              onChangeText={(val) => setName(val)}
            />
            <TextInput
              // style={styles.servingInput}
              value={calories}
              placeholder={`${calories}`}
              placeholderTextColor="black"
              keyboardType={"numeric"}
              maxLength={6}
              onChangeText={(val) => setCalories(val)}
            />
            </View>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#EA4848" }}
                onPress={() => setAddModalVisible(false)}
              >
                <Text style={styles.buttonTextStyle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.buttonStyles, backgroundColor: "#26A637" }}
                onPress={() => addToJournal()}
              >
                <Text style={styles.buttonTextStyle}>Add To Journal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
});

export default connect(mapStateToProps, null)(AddModal);