import React, { useState, useEffect, useContext } from "react";
import {
  Alert,
  View
} from "react-native";
import {
  ActionSheet,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Body,
  Right,
  Root,
  Title,
  Toast,
} from "native-base";

// Components
import LoadingSpinner from '../../components/LoadingSpinner';

// Strings
import Strings from "../../constants/Strings";

// Styles
import CategoryStyles from "./CategoryStyles";

// Services 
import CategoryController from '../../controllers/CategoryController';
import ListCategoryItems from "../../components/ListCategoryItems";
import ItemController from "../../controllers/ItemController";

import { Context } from "../../context/Context";

const CategoryScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([])
  const [category, setCategory] = useState(navigation.state.params)
  const [categories, setCategories] = useContext(Context);

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async () => {
    setLoading(true)
    setItems(await ItemController.get(category))
    setLoading(false)
  };

  const confirmRemove = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this category?',
      [{
        text: 'No', style: 'cancel',
        onPress: () => console.log('Cancel Pressed'),
      }, { text: 'Yes', onPress: () => remove() },
      ], { cancelable: false },
    );
  }

  const remove = async () => {
    setLoading(true)
    let status = await CategoryController.remove(category);
    if (status) {
      // var obj = JSON.parse(JSON.stringify(categories));
      // var newObj = obj.filter(item => item.id != category.id);
      // setCategories(newObj)
      setCategories(categories.filter(item => item.id != category.id))
      navigation.goBack();
    }
    setLoading(false)
  };

  const handleActionSheet = () => {
    ActionSheet.show(
      {
        options: Strings.category.buttons,
        cancelButtonIndex: Strings.category.cancelIndex,
        destructiveButtonIndex: Strings.category.deleteCategoryIndex,
      },
      buttonIndex => {
        if (buttonIndex == Strings.category.deleteCategoryIndex) {
          confirmRemove();
        }
        if (buttonIndex == Strings.category.editCategoryIndex) {
          navigation.navigate('NewCategory', category);
        }
        if (buttonIndex == Strings.category.newExpenseIndex) {
          navigation.navigate('NewItem', category);
        }
      }
    )
  }

  const getContent = () => {
    if (loading || (items && items.length === 0)) {
      return (
        <LoadingSpinner
          loading={loading}
          length={items.length} />
      )
    } else if (items) {
      return (
        <ListCategoryItems
          navigation={navigation}
          items={items}
          category={category} />
      )
    }
  }

  return (
    <Root>
      <Container>
        <Header style={CategoryStyles.header}>
          <Left style={CategoryStyles.flex1Row}>
            <Button
              transparent
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon
                style={CategoryStyles.headerIcon}
                type="Feather"
                name="chevron-left"
              />
            </Button>
          </Left>
          <Body style={CategoryStyles.flexBody}>
            <Title style={CategoryStyles.headerTitle}>{category.name}</Title>
          </Body>
          <Right style={CategoryStyles.flex1}>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('NewItem', { category })
              }}
            >
              <Icon
                style={CategoryStyles.headerMidIcon}
                type="Feather"
                name="plus"
              />
            </Button>
            <Button
              transparent
              onPress={() => handleActionSheet()}
            >
              <Icon
                style={CategoryStyles.headerGreyIcon}
                type="Feather"
                name="more-horizontal"
              />
            </Button>
          </Right>
        </Header>
        <Content style={CategoryStyles.content}>
          {getContent()}
        </Content>
      </Container>
    </Root>
  );
}

export default CategoryScreen;
