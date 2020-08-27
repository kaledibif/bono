import React, { useState, useEffect, useContext } from "react";
import {
  SegmentedControlIOS,
  View,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Spinner,
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

import NewCategoryStyles from "./NewCategoryStyles";

import CategoryController from "../../controllers/CategoryController";

import Colors from '../../constants/Colors';
import Strings from '../../constants/Strings';
import ColorPool from '../../constants/ColorPool';
import IconPool from '../../constants/IconPool';

import { Context } from "../../context/Context";

const segments = ['Expense', 'Income'];

const NewCategoryScreen = ({ navigation: { state, navigate, goBack } }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const [type, setType] = useState(segments[0]);
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [treshold, setTreshold] = useState('');
  const [icon, setIcon] = useState('folder');
  const [color, setColor] = useState('#8e8e93');
  const [pickIcon, setPickIcon] = useState(false);
  const [pickColor, setPickColor] = useState(false);
  const [categories, setCategories] = useContext(Context);

  useEffect(() => {
    if (state.params && state.params.id) {
      setIsEdit(true)
      setName(state.params.name)
      setCreatedAt(state.params.createdAt)
      setTreshold(state.params.treshold)
      setType(state.params.type)
      setColor(state.params.color)
      setIcon(state.params.icon)
      setId(state.params.id)
    }
    if (state.params && state.params.type) {
      setType(state.params.type)
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
      type,
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
      <Container style={NewCategoryStyles.container}>
        <Header style={NewCategoryStyles.header}>
          <Left style={NewCategoryStyles.flex1Row}>
            <Button
              disabled={loading}
              transparent
              onPress={() => {
                goBack()
              }}
            >
              <Icon
                style={NewCategoryStyles.headerIcon}
                type="Feather"
                name="chevron-left"
              />
            </Button>
            <Title style={NewCategoryStyles.headerTitle}>{Strings.categories.newCategory}</Title>
          </Left>
          <Right style={NewCategoryStyles.flex1Row}>
            {loading ? <Spinner
              color={Colors.mainDarker}
              size='small'
              style={NewCategoryStyles.spinner} /> :
              <Button
                transparent
                disabled={loading || !canSave()}
                onPress={() => {
                  save()
                }}
              >
                <Text
                  style={NewCategoryStyles.headerTitle, { color: canSave() ? Colors.mainColor : Colors.fume }}>
                  {isEdit ? Strings.newCategory.update : Strings.newCategory.save}
                </Text>
              </Button>}
          </Right>
        </Header>
        <Content scrollEnabled={true} style={NewCategoryStyles.content}>
          <Form style={NewCategoryStyles.form}>
            {isEdit === false ? <View>
              {/* <Item style={NewCategoryStyles.item}>
                <Label style={NewCategoryStyles.label}>{Strings.newCategory.type}</Label>
              </Item> */}
              <SegmentedControlIOS
                style={NewCategoryStyles.segment}
                tintColor={Colors.mainColor}
                values={segments}
                selectedIndex={segments.indexOf(type)}
                onChange={(event) => {
                  setType(segments[event.nativeEvent.selectedSegmentIndex])
                }}
              />
            </View> : null}
            <Item first last style={NewCategoryStyles.firstItem}>
              <Label style={NewCategoryStyles.label}>{Strings.newCategory.name}</Label>
              <Input
                disabled={loading}
                defaultValue={name}
                onChangeText={name => setName(name)}
                onSubmitEditing={() => { Keyboard.dismiss() }}
                placeholder={Strings.newCategory.namePlaceholder}
                placeholderTextColor={Colors.lightgrey}
                returnKeyType={'done'}
                style={NewCategoryStyles.input}
              />
            </Item>
            <Item first last style={NewCategoryStyles.secItem}
              onPress={() => { }}>
              <Label style={NewCategoryStyles.label}>{Strings.newCategory.treshold}</Label>
              <Input
                disabled={loading}
                defaultValue={treshold}
                onChangeText={val => setTreshold(val)}
                placeholder={Strings.newCategory.tresholdPlaceholder}
                keyboardType="numeric"
                returnKeyType={'done'}
                placeholderTextColor={Colors.lightgrey}
                style={NewCategoryStyles.input}
              />
            </Item>
            <Item first last style={NewCategoryStyles.secItem}
              onPress={() => {
                Keyboard.dismiss()
                setPickIcon(!pickIcon)
              }}>
              <Label style={NewCategoryStyles.label}>{Strings.newCategory.icon}</Label>
              <View
                style={NewCategoryStyles.input}
                activeOpacity={0.9}
              >
                <Icon
                  name={icon}
                  style={[NewCategoryStyles.pick, { color: color }]}
                  type="Feather"
                />
              </View>
            </Item>
            <Item first last style={NewCategoryStyles.secItem}
              onPress={() => {
                Keyboard.dismiss()
                setPickColor(!pickColor)
              }}>
              <Label style={NewCategoryStyles.label}>{Strings.newCategory.color}</Label>
              <View
                style={NewCategoryStyles.input}
                activeOpacity={0.9}
              >
                <Icon
                  name="sun"
                  style={[NewCategoryStyles.pick, { color: color }]}
                  type="Feather"
                />
              </View>
            </Item>
            {pickIcon ? (
              <View>
                <View style={NewCategoryStyles.cellWrapperCategory}>
                  {IconPool.map(icon => (
                    <TouchableOpacity
                      key={icon.name}
                      onPress={() => {
                        setPickIcon(false)
                        setIcon(icon.name);
                      }}
                      style={NewCategoryStyles.pickCell}
                    >
                      <Icon
                        type="Feather"
                        style={[NewCategoryStyles.cellIcon, { color: color }]}
                        name={icon.name}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}
            {pickColor ? (
              <View>
                <View style={NewCategoryStyles.cellWrapperCategory}>
                  {ColorPool.map(color => (
                    <TouchableOpacity
                      key={color.name}
                      onPress={() => {
                        setPickColor(false)
                        setColor(color.name);
                      }}
                      style={NewCategoryStyles.pickCell}
                    >
                      <Icon
                        type="Ionicons"
                        style={[NewCategoryStyles.cellIcon, { color: color.name }]}
                        name="ios-radio-button-on"
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ) : null}
          </Form>
        </Content>
      </Container>
    </Root>
  );
}

export default NewCategoryScreen
