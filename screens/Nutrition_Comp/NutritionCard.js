import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import firebase from "firebase";
import moment from "moment";
import { connect } from "react-redux";
import EditModal from "../Modals/EditModal.js";
import DeleteModal from "../Modals/DeleteModal.js";

const NutritionCard = (props) => {
  const [editting, setEditting] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [calories, setCalories] = useState(props.calories);
  const [recipe, setRecipe] = useState(props.name);
  let yr = moment(props.date).format("YYYY");
  let mm = moment(props.date).format("MM");
  let dd = moment(props.date).format("D");

  // Delete this function here from Nutrition Card
  // Since it now lives in Edit Modal
  // const sendEdit = () => {
  //   setEditting(false);
  //   firebase
  //     .database()
  //     .ref(
  //       `users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}/${props.id}`
  //     )
  //     .update({
  //       name: recipe,
  //       calories: calories,
  //     });
  // };

  // Delete this function here from Nutrition Card
  // Since it now lives in Delete Modal
  // const deleteNutritionData = () => {
  //   firebase
  //     .database()
  //     .ref(
  //       `users/${props.displayName}/foodJournal/${yr}/${mm}/${dd}/${props.id}`
  //     )
  //     .remove();
  // };

  let editModal = (
    <EditModal
      editModalVisible={editModalVisible}
      setEditModalVisible={setEditModalVisible}
      recipe={recipe}
      setRecipe={setRecipe}
      calories={calories}
      setCalories={setCalories}
      displayName={props.displayName}
      id={props.id}
      yr={yr}
      mm={mm}
      dd={dd}
    />
  );

  let deleteModal = (
    <DeleteModal
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      id={props.id}
      yr={yr}
      mm={mm}
      dd={dd}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        {/* Recipe Name */}
        <View style={styles.nameContainer}>
          {editting ? (
            <>
              <Text>Edit Name: </Text>
              <TextInput onChangeText={(text) => setRecipe(text)}>
                {recipe}
              </TextInput>
            </>
          ) : (
            <Text style={[styles.font]}>{recipe}</Text>
          )}
          {editting ? (
            <>
              <Text>Edit Calories: </Text>
              <TextInput onChangeText={(text) => setCalories(text)}>
                {calories}
              </TextInput>
            </>
          ) : (
            <Text style={[styles.font]}>
              <Text style={styles.boldFont}>Calories: </Text>
              {calories}
            </Text>
          )}
        </View>

        {/* Recipe Serving Size */}
        {/* <View style={styles.servingContainer}>
          <View style={styles.servingTotal}>
            <Text style={[styles.fontSize, styles.baseText]}>
              <Text style={styles.boldFont}>Serving Size: </Text>
              100 g
            </Text>
          </View>
        </View> */}

        {/* Recipe Calories */}
        {/* <View style={styles.caloriesContainer}>
          <View style={styles.calTotal}>
            <Text style={[styles.fontSize, styles.baseText]}>
              <Text style={styles.boldFont}>calories: </Text>
              {props.calories}
            </Text>
          </View>
        </View> */}
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* This commented code below unneccasry due to Modals */}
        {/* {editting ? (
          <TouchableOpacity
            style={[styles.buttonStyles]}
            activeOpacity="0.6"
            onPress={() => sendEdit()}
          >
            <Text style={[styles.editButton]}>Done</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.buttonStyles]}
            activeOpacity="0.6"
            onPress={() => setEditModalVisible(true)}
          >
            <Text style={[styles.editButton]}>Edit</Text>
          </TouchableOpacity>
        )} */}
        {/* This commented code above unneccasry due to Modals */}

        <TouchableOpacity
          style={[styles.buttonStyles]}
          activeOpacity="0.6"
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={[styles.editButton]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonStyles]}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={[styles.editButton]}>Delete</Text>
        </TouchableOpacity>
      </View>
      {/* Hardcoded size to prevent maintain current design */}
      <View style={{ height: 0, width: 0 }}>
        {editModal}
        {deleteModal}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
  RDA: state.recipeList.RDA,
});

export default connect(mapStateToProps)(NutritionCard);

const styles = StyleSheet.create({
  font: {
    fontSize: 18,
    color: "white",
  },
  container: {
    width: "80%",
    height: 80,
    flex: 1,
    borderRadius: 20,
    margin: 5,
    backgroundColor: "rgb(37, 93, 120)",
  },
  recipeContainer: {
    flex: 1,
    justifyContent: "center",
  },
  // ==================================
  // Name Styles
  // ==================================
  nameContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
    width: "100%",
  },
  // ==================================
  // Serving Styles
  // ==================================
  // servingContainer: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   flex: 1,
  //   borderBottomWidth: 0.25,
  //   width: "100%",
  // },
  // ==================================
  // Calories Styles
  // ==================================
  // caloriesContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   borderBottomWidth: 0.25,
  //   width: "100%",
  // },
  // calTotal: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // ==================================
  // Button Styles
  // ==================================
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    height: "100%",
  },
  buttonStyles: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(22, 66, 92)",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  editButton: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
