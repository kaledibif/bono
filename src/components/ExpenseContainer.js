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
var moment = require('moment');
import LoadingSpinner from '../components/LoadingSpinner';
import Helpers from '../utils/Helpers';

import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ExpenseContainer = ({ type, navigation, categories, dateFilter, onDateFilterChange }) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 
  }, []);

  const getSummaryText = (items = [], expText = '', sumText = '', currency = '$') => {
    if (items.length == 1) {
      expText = ''
      sumText = currency + ' ' + items[0].value
    } else if (items.length > 1) {
      expText = items.length + ' -'
      sumText = currency + ' ' + Helpers.sumAll(items, 'value')
    }

    return expText + ' ' + sumText
  }

  const getCategories = (value) => {
    return value.filter(category => category.type === type)
  }

  const getTotalSum = (totalSum = 0) => {
    categories.forEach(cat => {
      if (type === cat.type) {
        totalSum += Helpers.sumAll(cat.items, 'value')
      }
    });

    return type + ' in '
      + new Date(dateFilter).toLocaleString('default', { month: 'long' })
      + ' $' + totalSum
  }

  const getOrderedCategories = (data) => {
    return data.sort((a, b) => (a.name > b.name) ? 1 : -1)
  }

  const monthChange = (increment = false) => {
    if (increment) {
      onDateFilterChange(moment(dateFilter).add(1, 'M'))
    } else {
      onDateFilterChange(moment(dateFilter).subtract(1, 'M'))
    }
  }

  return (
    <View>
      {/* <NavigationEvents onDidFocus={() => getCategories(false)} /> */}
      {loading ? (
        <LoadingSpinner
          loading={loading}
          length={getCategories(categories).length} />
      ) :
        <List style={styles.container}>
          {getOrderedCategories(getCategories(categories)).map((category, key) => {
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
                  <Text style={styles.rightInfoText}>{getSummaryText(category.items)}</Text>
                  <Icon active name="arrow-forward" />
                </Right>
              </ListItem>
            )
          })}
        </List>}
      {getCategories(categories) && getCategories(categories).length ? (
        <View style={styles.summaryContainer}>
          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => { monthChange(false) }}
            style={styles.arrowContainer}>
            <Icon
              style={styles.monthButtons}
              type="Feather"
              name="chevron-left"
            />
          </TouchableOpacity>
          <Text style={styles.summaryText}>{getTotalSum()}</Text>
          <TouchableOpacity
            activeOpacity={.8}
            onPress={() => { monthChange(true) }}
            style={styles.arrowContainer}>
            <Icon
              style={styles.monthButtons}
              type="Feather"
              name="chevron-right"
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  arrowContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.milk,
    borderRadius: 4,
  },
  monthButtons: {
    margin: 2,
    fontSize: 22,
    color: Colors.darkgrey
  },
  container: {
    backgroundColor: Colors.white,
  },
  flexRow: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 32,
    flex: 1,
  },
  summaryText: {
    color: Colors.darkgrey,
    margin: 18,
  },
  text: {
    fontFamily: 'montserrat-medium',
    color: Colors.shadow,
  },
  rightInfoText: {
    fontFamily: 'montserrat-medium',
    color: Colors.darkgrey,
  }
});

export default ExpenseContainer;