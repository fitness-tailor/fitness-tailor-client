import styles from "./styles.js";
import firebase from "firebase";
import React, { Component } from 'react';
import {
  SafeAreaView,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Dates from 'react-native-dates';
import moment from 'moment';

export default class NutritionScreen extends Component {
  state = {
    date: null,
    focus: 'startDate',
    startDate: null,
    endDate: null
  }


  render() {
    const isDateBlocked = (date) =>
      date.isBefore(moment(), 'day');

    const onDatesChange = ({ startDate, endDate, focusedInput }) =>
      this.setState({ ...this.state, focus: focusedInput }, () =>
        this.setState({ ...this.state, startDate, endDate })
      );

    const onDateChange = ({ date }) =>
      this.setState({ ...this.state, date });


    return (
      <SafeAreaView style={styles.containerNutScreen}>
        <View >
          <Dates
            onDatesChange={onDatesChange}
            isDateBlocked={isDateBlocked}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            focusedInput={this.state.focus}
            range
          />

        {this.state.date && <Text style={styles.dateNutScreen}>{this.state.date && this.state.date.format('LL')}</Text>}
        <Text style={[styles.date, this.state.focus === 'startDate' && styles.focused]}>{this.state.startDate && this.state.startDate.format('LL')}</Text>
        <Text style={[styles.date, this.state.focus === 'endDate' && styles.focused]}>{this.state.endDate && this.state.endDate.format('LL')}</Text>
        </View>
      </SafeAreaView>
    );
  }
};
