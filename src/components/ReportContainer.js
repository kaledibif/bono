import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import {
  View,
} from "native-base";

import Colors from '../constants/Colors';

const ReportContainer = ({ onPressCallback }) => {
  useEffect(() => {

  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Work in progress..</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  text: {
    marginTop: 36,
    fontSize: 16,
    color: Colors.fume
  },
});

export default ReportContainer;