/* eslint-disable react-native/no-color-literals */
import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import {
  Body,
  Icon,
  Item,
  Label,
  List,
  Right,
  Text,
  ListItem,
  Radio,
} from "native-base";

import Colors from '../constants/Colors';

const CategoryPicker = ({ category, categories, onPicked }) => {
  const [pickCategory, setPickCategory] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (category) {
      setCategoryId(category.id)
      setCategoryName(category.name)
    }
  }, [])

  const orderBy = (data) => {
    // return data.sort((a, b) => (a.type > b.type) ? 1 : (a.type === b.type) ? ((a.name > b.name) ? 1 : -1) : -1)
    // return data.sort((a, b) => (a.type > b.type) ? 1 : -1)
    return data
  }

  return (
    <View>
      <Item
        last
        style={styles.firstItem}
        onPress={() => {
          Keyboard.dismiss();
          setPickCategory(!pickCategory)
        }}
      >
        <Label style={[styles.formLabel, { color: categoryId !== '' ? Colors.shadow : Colors.lightgrey }]}>
          {categoryId !== '' ? categoryName : 'Category'}
        </Label>
        <View style={styles.flexRow}>
          <View style={styles.iconTO}>
            <Icon
              type="Feather"
              style={[styles.icon, { color: Colors.mainColor }]}
              name={pickCategory ? 'chevron-up' : 'chevron-down'}
            />
          </View>
        </View>
      </Item>
      {pickCategory ? (
        <List style={styles.cellWrapper}>
          {orderBy(categories).map(category => (
            <ListItem
              last
              key={category.name}
              onPress={() => {
                setCategoryId(category.id)
                setCategoryName(category.name)
                setPickCategory(false)
                onPicked(category)
              }}
            >
              <Body style={styles.pickCatCell}>
                <Icon
                  type="Feather"
                  name={category.icon}
                  style={[styles.listLeftIcon, { color: category.color }]}
                />
                <Text style={styles.categoryItemText}>{category.name}</Text>
              </Body>
              <Right>
                <Radio
                  style={styles.radio}
                  color={Colors.fume}
                  selectedColor={Colors.mainColor}
                  selected={categoryId === category.id}
                />
              </Right>
            </ListItem>
          ))}
        </List>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  firstItem: {
    borderTopColor: Colors.gum,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
    height: 48,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formLabel: {
    fontSize: 15,
    fontFamily: 'montserrat-medium',
    marginLeft: 4,
  },
  iconTO: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 26
  },
  flexRow: {
    flexDirection: 'row',
  },
  cellWrapper: {
    flexDirection: 'column',
    flex: 1,
    //marginTop: -6,
  },
  pickCatCell: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  radio: {
    marginRight: 8
  },
  listLeftIcon: {
    marginLeft: 4,
    marginTop: 2,
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: Colors.lightgrey,
  },
  categoryItemText: {
    marginLeft: 12,
    fontFamily: 'montserrat-medium',
    fontSize: 15,
  },
  categoryTypeTextContainer: {
    backgroundColor: Colors.fef,
    borderRadius: 4,
  },
  categoryTypeText: {
    paddingVertical: 4,
    marginTop: -4,
    marginLeft: 12,
    fontFamily: 'space-mono',
    fontSize: 12,
  },
});

export default CategoryPicker
