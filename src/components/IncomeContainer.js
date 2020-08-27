import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import {
  ListItem,
  Left,
  List,
  Button,
  Body,
  Right,
  Icon,
  View,
} from "native-base";
import { NavigationEvents } from 'react-navigation';

import LoadingSpinner from '../components/LoadingSpinner';
import CategoryController from '../controllers/CategoryController'

import Colors from '../constants/Colors';

const IncomeContainer = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
  }, []);

  const getCategories = async (displayLoading = true) => {
    displayLoading ? setLoading(true) : null;
    const data = await CategoryController.get('Income')
    setCategories(data)
    setLoading(false)
  }

  return (
    <View>
      <NavigationEvents onDidFocus={() => getCategories(false)} />
      {loading ? (
        <LoadingSpinner
          loading={loading}
          length={categories.length} />
      ) :
        <List style={styles.container}>
          {categories.map((category, key) => {
            return (
              <ListItem
                icon
                key={key}
                first
                last
                key={category.id}
                onPress={() => {
                  navigation.navigate('Category', category)
                }}
              >
                <Left>
                  <Button transparent>
                    <Icon
                      active
                      name={category.icon}
                      type="Feather"
                      style={{ color: category.color }}
                    />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>{category.name}</Text>
                </Body>
                <Right>
                  <Text style={styles.rightInfoText}>{category.value} $</Text>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            )
          })}
        </List>}
      {categories && categories.length ? (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>Earned in July: 3.600 $</Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  summaryContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryText: {
    color: Colors.placeholder,
    margin: 18
  },
  text: {
    fontFamily: 'montserrat-medium',
    color: Colors.shadow,
  },
  rightInfoText: {
    fontFamily: 'montserrat-medium',
    color: Colors.lightgrey,
  }
});

export default IncomeContainer;