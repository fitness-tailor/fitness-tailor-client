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
      <View style={styles.nameContainer}>
        <Text style={styles.font}>{recipe}</Text>

        <Text style={styles.font}>Calories: {calories}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={{ ...styles.buttonStyles, backgroundColor: "#07989D" }}
          activeOpacity="0.6"
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={[styles.buttonText]}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.buttonStyles, backgroundColor: "#DB1916" }}
          onPress={() => setDeleteModalVisible(true)}
        >
          <Text style={styles.buttonText}>Delete</Text>
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
  // ==================================
  // Main Container + Title Styles
  // ==================================
  container: {
    width: "80%",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    backgroundColor: "#E1DFD7",
    borderColor: "#615C49",
    borderWidth: 0.2,
    shadowOffset: {
      width: 0,
      height: 15,
    },
    shadowOpacity: 0.15,
    shadowRadius: 30,
  },
  nameContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  font: {
    textAlign: "center",
    color: "black",
    fontFamily: "Montserrat_500Medium",
    fontSize: 20,
    marginBottom: 5,
  },
  // ==================================
  // Button Styles
  // ==================================
  buttonContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonStyles: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontFamily: "OpenSans_600SemiBold",
    paddingVertical: 10,
  },
});
