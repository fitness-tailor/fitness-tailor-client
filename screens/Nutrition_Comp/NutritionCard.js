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

const NutritionCard = ({ calories, name, id, dateObject, displayName }) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [calorie, setCalorie] = useState(calories);
  const [recipe, setRecipe] = useState(name);

  let editModal = (
    <EditModal
      editModalVisible={editModalVisible}
      setEditModalVisible={setEditModalVisible}
      recipe={recipe}
      setRecipe={setRecipe}
      calories={calories}
      setCalorie={setCalorie}
      id={id}
      yr={dateObject.year}
      mm={dateObject.month}
      dd={dateObject.day}
    />
  );

  let deleteModal = (
    <DeleteModal
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      id={id}
      yr={dateObject.year}
      mm={dateObject.month}
      dd={dateObject.day}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.recipeContainer}>
        <View style={styles.nameContainer}>
          <Text style={[styles.font]}>{recipe}</Text>

          <Text style={[styles.font]}>
            <Text style={styles.boldFont}>Calories: </Text>
            {calories}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
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

      <View style={{ height: 0, width: 0 }}>
        {editModal}
        {deleteModal}
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  displayName: state.auth.user.displayName,
  dateObject: state.nutrition.dateObject,
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
