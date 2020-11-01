import React, { useState, useEffect, useContext } from 'react';
import {
  Alert,
  View,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Body,
  Input,
  Item,
  Text,
  Left,
  Title,
  Toast,
  Right,
  Root,
} from 'native-base';

// Components
import DatePicker from '../components/DatePicker';
import CategoryPicker from '../components/CategoryPicker';
import ImagePickerTaker from '../components/ImagePickerTaker';
import LoadingSpinner from '../components/LoadingSpinner';

// Styles
import CommonStyles from "../styles/CommonStyles"
import Colors from '../constants/Colors';
import moment from 'moment';

// Strings
import Strings from '../constants/Strings';
import CategoryController from '../controllers/CategoryController';

import { Context } from '../context/Context'
import ItemController from '../controllers/ItemController';

const NewItemScreen = ({ navigation }) => {
  const category = navigation.state.params.category
  const item = navigation.state.params.item

  const [contextData, setContextData] = useContext(Context);
  const [categories, setCategories] = useState(contextData.categories);

  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [value, setValue] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [details, setDetails] = useState(null)
  const [date, setDate] = useState(new Date())
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState('')
  const [images, setImages] = useState([])

  useEffect(() => {
    if (item !== undefined) {
      if (item.id !== undefined) {
        setValue(item.value)
        setId(item.id)
        setDetails(item.details !== null ? item.details : details)
        setDate(item.date !== null ? new Date(moment.unix(item.date.seconds)) : date);
        setIsEdit(true)
        setName(item.name)
        if (item.images) {
          setImages(item.images)
        }
      }

      if (item.id !== undefined
        && item.categoryId !== undefined
        && item.name !== undefined) {
        setCategoryId(item.categoryId)
        setCategoryName(item.name)
      }
    }
  }, [])

  const save = async () => {
    if (!canSave()) {
      return Toast.show({ text: 'Please fill required fields.' });
    }

    let item = {
      categoryId,
      date,
      name,
      value,
    }

    console.warn(value)

    if (id) { item = { id, ...item } }
    if (details) { item = { details, ...item } }
    if (images && images.length > 0) { item = { images, ...item } }

    setLoading(true)
    let status = false
    if (isEdit) {
      status = await ItemController.update(item)
    } else {
      status = await ItemController.insert(item)
    }
    if (status) {
      navigation.goBack()
      // navigation.navigate('Categories')
    }
    setLoading(false)
  };

  const canSave = () => {
    if (name === '' || value === '' || categoryId === '') {
      return false;
    }
    return true;
  }

  const remove = async () => {
    setLoading(true)
    const status = await ItemController.remove(item)
    if (status) {
      navigation.goBack()
      // navigation.navigate('Categories')
    } else {
      Toast.show({ text: status });
    }
    setLoading(false)
  };

  const confirmRemove = () => {
    Alert.alert(
      'Confirm', 'Are you sure you want to delete this item?',
      [{
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => remove() },
      ], { cancelable: false },
    );
  }

  const getContent = () => {
    if (loading) {
      return (
        <LoadingSpinner loading={loading} length={1} />
      )
    }

    return (
      <Content>
        <Form style={CommonStyles.form}>
          <CategoryPicker
            category={category}
            isEdit={isEdit}
            categories={categories}
            categoryId={categoryId}
            categoryName={categoryName}
            onPicked={(value) => {
              setCategoryId(value.id)
              setCategoryName(value.name)
            }} />
          <Item last style={CommonStyles.item}>
            <Input
              disabled={loading}
              style={CommonStyles.input}
              placeholder="Record Name"
              returnKeyType={'done'}
              placeholderTextColor={Colors.lightgrey}
              defaultValue={name}
              onChangeText={name => setName(name)}
            />
          </Item>
          <Item last style={CommonStyles.item}>
            <Input
              disabled={loading}
              keyboardType="number-pad"
              style={CommonStyles.input}
              placeholder="Value"
              autoCapitalize="none"
              returnKeyType={'done'}
              placeholderTextColor={Colors.lightgrey}
              defaultValue={value.toString()}
              onChangeText={val => setValue(parseFloat(val))}
            />
            <View style={CommonStyles.flexRow}>
              <View style={CommonStyles.iconTO}>
                <Text style={CommonStyles.currencyText}>₺</Text>
              </View>
            </View>
          </Item>
          <DatePicker
            date={date}
            onDateChange={(date) => setDate(date)} />
          <Item last style={CommonStyles.item}>
            <Input
              disabled={loading}
              style={CommonStyles.input}
              placeholder="Notes"
              returnKeyType={'done'}
              placeholderTextColor={Colors.lightgrey}
              defaultValue={details}
              onChangeText={details => setDetails(details)}
            />
          </Item>
          <ImagePickerTaker
            isEdit={isEdit}
            images={images}
            onPicked={(images) => {
              setImages(images)
            }} />
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
              {isEdit ? Strings.newCategory.update : Strings.newCategory.save}
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
                {Strings.newCategory.delete}
              </Text>
            </Button> : null}
        </View>
      </Content>
    );
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
                navigation.goBack()
                // navigation.navigate('Categories')
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
            <Title style={CommonStyles.headerTitle}>{Strings.newItem.title}</Title>
          </Body>
          <Right style={CommonStyles.flexRow}>
            <Text />
          </Right>
        </Header>
        {getContent()}
      </Container>
    </Root>
  );
}

export default NewItemScreen
