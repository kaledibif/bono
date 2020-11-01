import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";

// Native Base
import {
  Button,
  Container,
  Content,
  Form,
  Body,
  Header,
  Title,
  Icon,
  Input,
  Label,
  Item,
  Left,
  Right,
  Root,
  Text,
  Toast,
} from "native-base";

// Context
import { Context } from "../context/Context";

// Constants
import Colors from '../constants/Colors';
import Strings from '../constants/Strings';

// Controllers
import CategoryController from "../controllers/CategoryController";

// Data
import ColorPool from '../assets/data/ColorPool';
import IconPool from '../assets/data/IconPool';

// Styles
import CommonStyles from "../styles/CommonStyles";

const NewCategoryScreen = ({ navigation: { state, navigate, goBack } }) => {
  const [contextData, setContextData] = useContext(Context);
  const [categories, setCategories] = useState(contextData.categories);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [treshold, setTreshold] = useState('');
  const [icon, setIcon] = useState('folder');
  const [color, setColor] = useState('#8e8e93');
  const [pickIcon, setPickIcon] = useState(false);
  const [pickColor, setPickColor] = useState(false);

  useEffect(() => {
    if (state.params && state.params.id) {
      setIsEdit(true)
      setName(state.params.name)
      setCreatedAt(state.params.createdAt)
      setTreshold(state.params.treshold)
      setColor(state.params.color)
      setIcon(state.params.icon)
      setId(state.params.id)
    }
  }, [])

  const save = async () => {
    Keyboard.dismiss()
    if (!canSave()) {
      return Toast.show({ text: 'Please input Category Name' });
    }

    let category = {
      createdAt,
      updatedAt,
      name,
      color,
      icon,
    }

    if (id) { category = { id, ...category } }
    if (treshold) { category = { treshold, ...category } }

    setLoading(true)
    let status = false
    if (isEdit) {
      status = await CategoryController.update(category)
    } else {
      status = await CategoryController.insert(category)
      if (status) {
        const newc = await CategoryController.get()
        await setCategories(newc)
      }
    }
    if (status) {
      navigate('Categories')
    }
    setLoading(false)
  };

  const canSave = () => {
    return name !== "";
  }

  return (
    <Root>
      <Container style={CommonStyles.container}>
        <Header style={CommonStyles.header}>
          <Left style={CommonStyles.flexRow}>
            <Button
              disabled={loading}
              transparent
              onPress={() => {
                goBack()
              }}
            >
              <Icon
                style={CommonStyles.headerIcon}
                type="Feather"
                name="chevron-left"
              />
            </Button>
          </Left>
          <Body style={CommonStyles.flexCenter}>
            <Title style={CommonStyles.headerTitle}>{Strings.categories.newCategory}</Title>
          </Body>
          <Right style={CommonStyles.flexRow}>
            <Text />
          </Right>
        </Header>
        <Content scrollEnabled={true}>
          <Form style={CommonStyles.form}>
            <Item first last style={CommonStyles.firstItem}>
              <Label style={CommonStyles.label}>{Strings.newCategory.name}</Label>
              <Input
                disabled={loading}
                defaultValue={name}
                onChangeText={name => setName(name)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                placeholder={Strings.newCategory.namePlaceholder}
                placeholderTextColor={Colors.lightgrey}
                returnKeyType={'done'}
                style={CommonStyles.input}
              />
            </Item>
            <Item first last style={CommonStyles.secItem}
              onPress={() => { }}>
              <Label style={CommonStyles.label}>{Strings.newCategory.treshold}</Label>
              <Input
                disabled={loading}
                defaultValue={treshold}
                onChangeText={val => setTreshold(val)}
                placeholder={Strings.newCategory.tresholdPlaceholder}
                keyboardType="numeric"
                returnKeyType={'done'}
                placeholderTextColor={Colors.lightgrey}
                style={CommonStyles.input}
              />
            </Item>
            <Item first last style={CommonStyles.secItem}
              onPress={() => {
                Keyboard.dismiss()
                setPickIcon(!pickIcon)
              }}>
              <Label style={CommonStyles.label}>{Strings.newCategory.icon}</Label>
              <View
                style={CommonStyles.input}
                activeOpacity={0.9}
              >
                <Icon
                  name={icon}
                  style={[CommonStyles.pick, { color: color }]}
                  type="Feather"
                />
              </View>
            </Item>
            <Item first last style={CommonStyles.secItem}
              onPress={() => {
                Keyboard.dismiss()
                setPickColor(!pickColor)
              }}>
              <Label style={CommonStyles.label}>{Strings.newCategory.color}</Label>
              <View
                style={CommonStyles.input}
                activeOpacity={0.9}
              >
                <Icon
                  name="sun"
                  style={[CommonStyles.pick, { color: color }]}
                  type="Feather"
                />
              </View>
            </Item>
            {pickIcon ? (
              <View>
                <View style={CommonStyles.cellWrapperCategory}>
                  {IconPool.map(icon => (
                    <TouchableOpacity
                      key={icon.name}
                      onPress={() => {
                        setPickIcon(false)
                        setIcon(icon.name);
                      }}
                      style={CommonStyles.pickCell}
                    >
                      <Icon
                        type="Feather"
                        style={[CommonStyles.cellIcon, { color: color }]}
                        name={icon.name}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}
            {pickColor ? (
              <View>
                <View style={CommonStyles.cellWrapperCategory}>
                  {ColorPool.map(color => (
                    <TouchableOpacity
                      key={color.name}
                      onPress={() => {
                        setPickColor(false)
                        setColor(color.name);
                      }}
                      style={CommonStyles.pickCell}
                    >
                      <Icon
                        type="Ionicons"
                        style={[CommonStyles.cellIcon, { color: color.name }]}
                        name="ios-radio-button-on"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}
          </Form>
          <View style={CommonStyles.buttonContainer}>
            <Button
              block
              style={CommonStyles.button}
              disabled={loading || !canSave()}
              onPress={() => {
                save()
              }}
            >
              <Text style={CommonStyles.buttonText}>
                {isEdit ? Strings.newItem.update : Strings.newItem.save}
              </Text>
            </Button>
            {isEdit ?
              <Button
                block
                style={CommonStyles.buttonLight}
                disabled={loading || !canSave()}
                onPress={() => {
                  save()
                }}
              >
                <Text style={CommonStyles.buttonTextLight}>
                  {Strings.newItem.delete}
                </Text>
              </Button> : null}
          </View>
        </Content>
      </Container>
    </Root>
  );
}

export default NewCategoryScreen
