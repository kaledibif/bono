import React, {
  useState,
  useEffect,
} from "react";
import {
  Text,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Container,
  Content,
  Header,
  Icon,
  Spinner,
  Form,
  Item,
  Input,
  Label,
  Body,
  Left,
  Right,
  Root,
  Title,
  Toast,
} from "native-base";
import { firebase } from '../config/firebase/firebase'

import AuthController from '../controllers/AuthController'
import AuthStyles from "./AuthStyles"

import Strings from '../constants/Strings'
import { Validators } from "../utils/Validators"

const AuthScreen = ({ navigation }) => {
  const [type, setType] = useState('login')
  const [appLoading, setAppLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('faruk@expenso.com')
  const [password, setPassword] = useState('123123')
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    getAutoLoginStatus()
  })

  const getAutoLoginStatus = async () => {
    setAppLoading(false)
    // let status = await AuthController.autoLogin()
    // navigation.navigate('Categories')
  }

  const clearState = () => {
    setType('login')
    setLoading(false)
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
  }

  const requestLogin = async () => {
    let user = await AuthController.login(email, password)
    if (user) {
      navigation.navigate('Categories', { user })
    }
    clearState()
  }

  const requestRegister = async () => {
    let user = await AuthController.register(name, email, password)
    if (user) {
      navigation.navigate('Categories', { user })
    }
    clearState()
  }

  const submitPressed = () => {
    Keyboard.dismiss();

    if (type === 'register' && name == "") { return Toast.show({ text: 'Name input can not be emtpy!' }); }
    if (type === 'register' && (name.length < 3)) { return Toast.show({ text: 'Name input must have at least 3 chars!' }); }
    if (email === "") { return Toast.show({ text: 'Email input can not be emtpy!' }); }
    if (!Validators.isEmailValid(email)) { return Toast.show({ text: 'Email address is not valid!' }); }
    if (password === "") { return Toast.show({ text: 'Password input can not be emtpy!' }); }
    if (password.length < 6) { return Toast.show({ text: 'Password must have at least 6 chars!' }); }
    if (type === 'register' && confirmPassword === "") { return Toast.show({ text: 'Password Confirmation input can not be emtpy!' }); }
    if (type === 'register' && password !== confirmPassword) { return Toast.show({ text: 'Passwords do not match!' }); }

    setLoading(true)
    if (type === 'register') {
      requestRegister()
    } else {
      requestLogin()
    }
  }

  const getContent = () => {
    return (
      <Container style={AuthStyles.container}>
        <Header style={AuthStyles.header}>
          <Left style={AuthStyles.flex1}>
            <Button transparent>
              <Icon type="Ionicons" style={AuthStyles.headerIcon} name="ios-infinite" />
              <Title style={AuthStyles.headerLeftText}>{Strings.auth.header.appMotto}</Title>
            </Button>
          </Left>
          <Right style={AuthStyles.flex1} />
        </Header>
        <Content scrollEnabled={false}>
          <Form style={AuthStyles.form}>
            {type === 'register' ? (
              <Item stackedLabel>
                <Label style={AuthStyles.label}>{Strings.auth.inputs.name}</Label>
                <Input
                  blurOnSubmit={false}
                  disabled={loading}
                  onChangeText={nameVal => setName(nameVal)}
                  returnKeyType={'next'}
                  selectionColor={'white'}
                  style={AuthStyles.input}
                  value={name}
                />
              </Item>
            ) : null}
            <Item stackedLabel>
              <Label style={AuthStyles.label}>{Strings.auth.inputs.email}</Label>
              <Input
                autoCapitalize="none"
                autoCompleteType="email"
                blurOnSubmit={false}
                disabled={loading}
                email-address
                keyboardType="email-address"
                onChangeText={emailVal => setEmail(emailVal)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                returnKeyType={'next'}
                selectionColor={'white'}
                style={AuthStyles.input}
                value={email}
              />
            </Item>
            <Item stackedLabel>
              <Label style={AuthStyles.label}>{Strings.auth.inputs.password}</Label>
              <Input
                blurOnSubmit={false}
                disabled={loading}
                onChangeText={passwordVal => setPassword(passwordVal)}
                returnKeyType={'next'}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                secureTextEntry
                selectionColor={'white'}
                style={AuthStyles.input}
                value={password}
              />
            </Item>
            {type === 'register' ? (
              <Item stackedLabel>
                <Label style={AuthStyles.label}>{Strings.auth.inputs.passwordConfirmation}</Label>
                <Input
                  blurOnSubmit={false}
                  disabled={loading}
                  onChangeText={val => setConfirmPassword(val)}
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  returnKeyType={'next'}
                  secureTextEntry
                  selectionColor={'white'}
                  style={AuthStyles.input}
                  value={confirmPassword}
                />
              </Item>
            ) : null}
            <Button
              activeOpacity={.8}
              block
              disabled={loading}
              icon
              light
              onPress={() => submitPressed()}
              style={AuthStyles.button}
            >
              <Left style={AuthStyles.flex1}>
                {loading ? (
                  <Spinner
                    color="black"
                    size='small'
                    style={AuthStyles.spinner} />
                ) : null}
              </Left>
              <Body style={AuthStyles.flex4}>
                <Text style={AuthStyles.buttonText}>
                  {type === 'register' ? Strings.auth.buttons.register : Strings.auth.buttons.login}
                </Text>
              </Body>
              <Right style={AuthStyles.flex1} />
            </Button>
            {/* {type === 'login' ? (
              <Button
                activeOpacity={.8}
                block
                disabled={loading}
                icon
                light
                onPress={() => navigation.navigate('Categories')}
                style={styles.offlineButton}
              >
                <Body style={styles.flex4}>
                  <Text style={styles.offlineButtonText}>
                    {Strings.auth.buttons.useOffline}
                  </Text>
                </Body>
              </Button>
            ) : null} */}
            <TouchableOpacity
              activeOpacity={.75}
              disabled={loading}
              light
              onPress={() => {
                console.warn(firebase.auth())
                clearState()
                setType(type === 'register' ? 'login' : 'register')
              }}
              style={AuthStyles.greyButton}
            >
              <Text uppercase={false} style={AuthStyles.greyButtonText}>
                {type === 'register' ? Strings.auth.buttons.backToLogin : Strings.auth.buttons.registerNow}
              </Text>
            </TouchableOpacity>
          </Form>
        </Content>
      </Container>
    )
  }

  const loadingView = () => {
    return (
      <View style={AuthStyles.container}>
        <Spinner
          color="white"
          size='large'
          style={AuthStyles.spinner} />
      </View>
    )
  }

  return (
    <Root>
      {appLoading ? loadingView() : getContent()}
    </Root >
  );
}

export default AuthScreen;