/* eslint-disable react-native/no-color-literals */
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Colors from '../constants/Colors';
import Helpers from '../utils/Helpers';
import { TouchableOpacity } from 'react-native-gesture-handler';

const DatePicker = ({ date, onDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);

  const readableChosenDate = (date) => {
    return date.getDate() + ' ' + Helpers.keyToMonth(date.getMonth() + 1) + ' ' + date.getFullYear();
  }

  return (
    <View style={styles.dateContainer}>
      {!showPicker && (
        <TouchableOpacity
          onPress={() => setShowPicker(true)}>
          <Text style={styles.shadowText}>{readableChosenDate(new Date(date))}</Text>
        </TouchableOpacity>
      )}
      {showPicker && (
        <View style={styles.dateButtons}>
          <TouchableOpacity
            onPress={() => { setShowPicker(false) }}>
            <Text style={styles.text}>Set Date</Text>
          </TouchableOpacity>
        </View>
      )}
      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(date)}
          mode={'date'}
          display="default"
          onChange={(event, date) => onDateChange(date)}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  dateButtons: {
    flexDirection: 'row',
    marginVertical: 12,
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  dateContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
  },
  shadowText: {
    color: Colors.mainColor,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    fontFamily: 'montserrat-medium',
  },
  text: {
    color: Colors.mainColor,
    fontSize: 16,
    fontFamily: 'montserrat-medium',
  },
});

export default DatePicker
