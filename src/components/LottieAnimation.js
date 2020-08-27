import React, { useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import LottieView from "lottie-react-native";
import Colors from '../constants/Colors';

const LottieAnimation = () => {
  return (
    <View style={styles.lottieContainer}>
      <LottieView
        autoPlay
        loop
        style={styles.lottie}
        source={require('../assets/animations/shopping.json')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  lottieContainer: {
    backgroundColor: Colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  lottie: {
    width: 180,
    height: 180,
    backgroundColor: Colors.mainColor,
  },
});

export default LottieAnimation
