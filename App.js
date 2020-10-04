import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillUpdate is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
  'Warning: componentWillReceiveProps has been renamed',
  'Animated: `useNativeDriver` was not specified'
]);

import { Context } from './src/context/Context'
import AppNavigator from "./src/navigation/AppNavigator";
import Colors from "./src/constants/Colors";

const App = (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [categories, setCategories] = useState([]);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === "ios" && <StatusBar barStyle="default" />}
        <Context.Provider value={[categories, setCategories]}>
          <AppNavigator />
        </Context.Provider>
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // require("./src/assets/images/launcher.png"),
    ]),
    Font.loadAsync({
      ...Ionicons.font,
      "montserrat-bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
      "montserrat-light": require("./src/assets/fonts/Montserrat-Light.ttf"),
      "montserrat-medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
      "montserrat-regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
      "montserrat-semi-bold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
      "space-mono": require("./src/assets/fonts/SpaceMono-Regular.ttf"),
      "roboto-medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
    })
  ]);
}

function handleLoadingError(error) {
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default App;
