import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Spinner } from 'native-base';
import Colors from '../constants/Colors';

const LoadingSpinner = ({ loading, length }) => {
  if (loading) {
    return (
      <View style={styles.flexCenter}>
        <Spinner color="grey" style={styles.spinner} />
      </View>
    )
  } else
    return (
      <View style={styles.flexCenter}>
        {length == 0 ?
          <Text note style={styles.nothingFoundText}>Nothing found!</Text>
          : null}
      </View>
    )
}

const styles = StyleSheet.create({
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    marginLeft: 8,
  },
  nothingFoundText: {
    color: Colors.fume,
    marginTop: 24,
  }
});

export default LoadingSpinner
