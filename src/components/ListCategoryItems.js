import React, { useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  List,
  ListItem,
  Body,
  Right,
  Separator,
} from "native-base";
import Colors from '../constants/Colors';

import moment from 'moment';

import Helpers from '../utils/Helpers';

const ListCategoryItems = ({ navigation, category, items }) => {
  useEffect(() => {
    return
    let monthlyData = []

    items.forEach(item => {
      const month = moment.unix(item.date.seconds).format("MMMM")
      if (monthlyData.indexOf(month) <= -1) {
      }
    });

    console.warn(monthlyData)
  }, [])

  const getSection = (section) => {
    return (
      <View style={styles.listContainer}>
        <Separator style={styles.monthSeperator}>
          <Text style={styles.monthSeperatorText}>Cat {/* {Helpers.getCurrentSeperator(section['name'])} */}</Text>
          <Text style={styles.monthSeperatorTextRight}>$ {Helpers.sumAll(items, 'value')}</Text>
        </Separator>

        <List style={styles.list}>
          {items.reverse().map(item =>
            <ListItem
              style={styles.listItem}
              key={item.id + item.name}
              first
              last
              onPress={() => {
                navigation.navigate('NewItem', { category, item, navigation })
              }}>
              <Body>
                <Text style={styles.itemNameText}>{item.name}</Text>
                <Text note style={styles.itemDateText}>
                  {moment.unix(item.date.seconds).format("Do MMMM")} {item.images && item.images.length > 0 ? 'IMG' : null} {item.details ? 'NOTE' : null}
                </Text>
              </Body>
              <Right>
                <Text note style={styles.itemValueText}>$ {item.value}</Text>
              </Right>
            </ListItem>
          )}
        </List>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {getSection(null)}
      {/* {items.map((section, key) => {
        return (
          <View key={key}>
            {getSection(section)}
          </View>
        );
      })} */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 64,
    backgroundColor: Colors.white,
  },
  list: {
    backgroundColor: Colors.white,
  },
  monthSeperator: {
    backgroundColor: Colors.itemGroupsOutside,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 20,
    height: 60,
  },
  monthSeperatorText: {
    color: Colors.grey,
    fontFamily: 'montserrat-semi-bold',
  },
  monthSeperatorTextRight: {
    fontFamily: 'montserrat-semi-bold',
    marginRight: 24,
    color: Colors.grey,
  },
  listItem: {
    // marginLeft: 6,
  },
  itemNameText: {
    fontFamily: 'montserrat-medium',
    fontSize: 14,
    color: Colors.shadow,
  },
  itemDateText: {
    color: Colors.fume,
    marginTop: 4,
    fontWeight: 'bold',
    fontFamily: 'space-mono',
  },
  itemValueText: {
    marginRight: 8,
    fontWeight: 'bold',
    fontFamily: 'montserrat-bold',
    color: Colors.mainColor,
  },
});

export default ListCategoryItems
