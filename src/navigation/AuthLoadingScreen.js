import React, { useContext, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {
  Thumbnail,
} from 'native-base';
import { firebase } from '../config/firebase/firebase'
import Colors from '../constants/Colors';
import Images from '../constants/Images';

import AsyncStorage from '@react-native-community/async-storage';
import { Context } from "../context/Context";

import CategoryController from '../controllers/CategoryController'
import ItemController from '../controllers/ItemController'

const AuthLoadingScreen = ({ navigation }) => {
  const [contextData, setContextData] = useContext(Context);

  useEffect(() => {
    getTokenStatus()
  }, [])

  const getTokenStatus = async () => {
    const authPromise = () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          // console.warn(user);
          await getDataStatus()
          navigation.navigate('App');
        } else {
          navigation.navigate('Auth');
        }
      });
    }

    setTimeout(authPromise, 1000)
  }

  const getDataStatus = async () => {
    var d1 = new Date();
    const isSync = await AsyncStorage.getItem("isSync");

    // Skip Firebase fetch if local is already up-to date
    if (JSON.parse(isSync) === true) {
      const appData = await AsyncStorage.getItem("appData");
      setContextData(JSON.parse(appData))
    } else {
      const categories = await CategoryController.getAll()
      const items = await ItemController.getAll()
      setContextData({ categories, items })

      AsyncStorage.setItem("appData", JSON.stringify({ categories, items }), (err) => { }).catch((err) => { });
      AsyncStorage.setItem("isSync", JSON.stringify(true), (err) => { }).catch((err) => { });
    }

    console.warn((JSON.parse(isSync) === true ? 'Local' : 'Remote') + ' sync took ' + (new Date() - d1) + ' ms.');
  }

  return (
    <View style={{
      alignSelf: 'stretch',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexGrow: 1,
      backgroundColor: Colors.mainColor,
    }}>
      <View style={styles.widget}>
        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 20 }}>Bono App</Text>
        <Thumbnail
          square
          style={{ width: 148, height: 148 }}
          large
          source={Images.logos.app} />
      </View>
      <View style={styles.widgetBottom}>
        <ActivityIndicator size="large" color="white" />
        <Text style={{ margin: 12, color: 'white', fontSize: 16 }}>Please wait...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  widget: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  widgetBottom: {
    marginBottom: 32
  },
})

export default AuthLoadingScreen