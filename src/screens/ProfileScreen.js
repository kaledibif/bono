import React, {
  useState,
  useContext,
  useEffect
} from 'react';
import {
  Alert,
  Text,
  View,
} from 'react-native';
import {
  Body,
  Container,
  Content,
  Icon,
  Title,
  Header,
  Thumbnail,
  Left,
  Right,
  List,
  ListItem,
  Button,
  ActionSheet,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Context } from "../context/Context";

import AuthController from "../controllers/AuthController";
import ProfileStyles from '../styles/ProfileStyles';

import Strings from '../constants/Strings';
import Images from '../constants/Images';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileScreen = ({ navigation }) => {
  const [contextData, setContextData] = useContext(Context);

  const [language, setLanguage] = useState('')
  const [currency, setCurrency] = useState('')
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    getInitData()
  }, [])

  const getInitData = async () => {
    const user = await AuthController.userInfo();
    setUserInfo(user)

    const language = await AsyncStorage.getItem('@language')
    if (language !== null) {
      setLanguage(language)
    } else {
      saveAsyncStorage('language', Strings.profile.languages[0]);
    }

    const currency = await AsyncStorage.getItem('@currency')
    if (currency !== null) {
      setCurrency(currency)
    } else {
      saveAsyncStorage('currency', Strings.profile.currencies[0]);
    }
  }

  const confirmLogout = () => {
    Alert.alert(
      Strings.profile.alertConfirm, Strings.profile.alertLogOutMessage,
      [
        { text: Strings.profile.no, onPress: () => console.log('Cancel Pressed'), style: 'cancel', }, {
          text: Strings.profile.yes, onPress: () => {
            AuthController.logout();
            navigation.navigate('Auth');
          }
        }
      ], { cancelable: false },
    );
  }

  const saveAsyncStorage = async (key, value) => {
    key = '@' + key;
    await AsyncStorage.setItem(key, value)
  }

  const handleLanguageActionSheet = () => {
    ActionSheet.show(
      {
        title: Strings.profile.changeLanguageTitle,
        options: Strings.profile.languages,
        cancelButtonIndex: Strings.profile.languages.length - 1,
      },
      buttonIndex => {
        if (buttonIndex < (Strings.profile.languages.length - 1)) {
          setLanguage(Strings.profile.languages[buttonIndex])
          saveAsyncStorage('language', Strings.profile.languages[buttonIndex]);
        }
      }
    )
  }

  const handleCurrencyActionSheet = () => {
    ActionSheet.show(
      {
        title: Strings.profile.changeCurrencyTitle,
        options: Strings.profile.currencies,
        cancelButtonIndex: Strings.profile.currencies.length - 1,
      },
      buttonIndex => {
        if (buttonIndex < (Strings.profile.currencies.length - 1)) {
          setCurrency(Strings.profile.currencies[buttonIndex])
          saveAsyncStorage('currency', Strings.profile.currencies[buttonIndex]);
        }
      }
    )
  }

  return (
    <Container>
      <Header style={ProfileStyles.header}>
        <Left style={ProfileStyles.flex1}>
          <Button
            transparent
            onPress={() => {
              navigation.goBack()
            }}
          >
            <Icon
              style={ProfileStyles.headerIcon}
              type="Feather"
              name="chevron-left"
            />
          </Button>
        </Left>
        <Body style={ProfileStyles.flex4}>
          <Title style={ProfileStyles.headerTitle}>{Strings.profile.title}</Title>
        </Body>
        <Right style={ProfileStyles.flex1}></Right>
      </Header>
      <Content style={ProfileStyles.content}>
        <View>
          <List first last style={ProfileStyles.iconListContainer}>
            <Thumbnail
              square
              style={ProfileStyles.appIcon}
              large
              source={Images.logos.app} />
            <View style={ProfileStyles.appInfoContainer}>
              <Text style={ProfileStyles.listItemText}>{Strings.profile.appName}</Text>
              <Text style={ProfileStyles.listItemRightText}>{Strings.profile.appVersion}</Text>
            </View>
          </List>
          <ListItem itemDivider style={ProfileStyles.seperatorContainer}>
            <Text style={ProfileStyles.itemDivider}>Usage</Text>
            <TouchableOpacity onPress={() => { () => { } }}>
              <Text style={ProfileStyles.getMoreText}>Upgrade</Text>
            </TouchableOpacity>
          </ListItem>
          <List first last style={ProfileStyles.usageMainContainer}>
            <View style={ProfileStyles.usageContainer}>
              <View style={ProfileStyles.usageItem}>
                <Text style={ProfileStyles.usageTextBold}>Category</Text>
                <Text style={ProfileStyles.usageText}>{(Object.keys(contextData.categories).length)} / 32</Text>
              </View>
              <View style={ProfileStyles.usageItem}>
                <Text style={ProfileStyles.usageTextBold}>Item</Text>
                <Text style={ProfileStyles.usageText}>{(Object.keys(contextData.items).length)} / 1000</Text>
              </View>
            </View>
          </List>
        </View>
        <View style={ProfileStyles.listsContainer}>
          <ListItem itemDivider style={ProfileStyles.seperatorContainer}>
            <Text style={ProfileStyles.itemDivider}>User</Text>
            <TouchableOpacity onPress={() => { confirmLogout() }}>
              <Text style={ProfileStyles.getMoreText}>Logout</Text>
            </TouchableOpacity>
          </ListItem>
          <List style={ProfileStyles.list}>
            <ListItem
              icon
              first
              last={false}>
              <Body>
                <Text style={ProfileStyles.listItemText}>{Strings.profile.email}</Text>
              </Body>
              <Right style={ProfileStyles.listItemRight}>
                <Text style={ProfileStyles.listItemRightText}>{userInfo.email}</Text>
              </Right>
            </ListItem>
            <ListItem
              icon
              last={false}>
              <Body>
                <Text style={ProfileStyles.listItemText}>{Strings.profile.name}</Text>
              </Body>
              <Right style={ProfileStyles.listItemRight}>
                <Text style={ProfileStyles.listItemRightText}>Name</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              icon
              last={true}>
              <Body>
                <Text style={ProfileStyles.listItemText}>{Strings.profile.changePassword}</Text>
              </Body>
              <Right style={ProfileStyles.listItemRight}>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
          <ListItem itemDivider style={ProfileStyles.seperatorContainer}>
            <Text style={ProfileStyles.itemDivider}>Preferences</Text>
          </ListItem>
          <List style={ProfileStyles.list}>
            <ListItem
              icon
              onPress={() => { handleLanguageActionSheet() }}
              last={true}>
              <Body>
                <Text style={ProfileStyles.listItemText}>{Strings.profile.language}</Text>
              </Body>
              <Right style={ProfileStyles.listItemRight}>
                <Text style={ProfileStyles.listItemRightText}>{language}</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              icon
              onPress={() => { handleCurrencyActionSheet() }}
              last={true}>
              <Body>
                <Text style={ProfileStyles.listItemText}>{Strings.profile.currency}</Text>
              </Body>
              <Right style={ProfileStyles.listItemRight}>
                <Text style={ProfileStyles.listItemRightText}>{currency}</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </View>
      </Content>
    </Container>
  );
}

export default ProfileScreen
