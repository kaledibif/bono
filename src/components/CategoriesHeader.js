import React, { useState, useEffect, useContext } from 'react'
import {
  SegmentedControlIOS,
  View,
  TouchableOpacity,
} from 'react-native'
import {
  Header,
  ActionSheet,
  Left,
  Text,
  Body,
  Right,
  Title,
  Icon,
  Button,
} from 'native-base'
var moment = require('moment');

import CategoriesStyles from '../views/Categories/CategoriesStyles'
import Colors from '../constants/Colors'
import Strings from '../constants/Strings'
import CategoryController from '../controllers/CategoryController'

import { Context } from "../context/Context";

const currentMont = new Date();

const CategoriesHeader = ({ segment, onSegmentChange, navigation, dateFilter, incomeCategories, expenseCategories }) => {
  const [activeMonth, setActiveMonth] = useState(currentMont.toLocaleString('default', { month: 'long' }))
  const [activeYear, setActiveYear] = useState('2020')
  const [showFilter, setShowFilter] = useState(false)
  const [categories, setCategories] = useContext(Context);

  const handleActionSheet = () => {
    ActionSheet.show(
      {
        options: Strings.monthsSheet,
        cancelButtonIndex: 12,
      },
      (buttonIndex) => {
        if (buttonIndex < 12) {
          setActiveMonth(Strings.monthsSheet[buttonIndex])
        }
      }
    )
  }

  const getSegments = () => {
    return (
      <SegmentedControlIOS
        style={CategoriesStyles.segment}
        tintColor={Colors.mainColor}
        values={Strings.categories.segments}
        selectedIndex={Strings.categories.segments.indexOf(segment)}
        onChange={(event) => {
          onSegmentChange(Strings.categories.segments[event.nativeEvent.selectedSegmentIndex])
        }} />
    )
  }

  const getCategories = async () => {
    const data = await CategoryController.get()
    setCategories(data)
  }

  const getHeader = () => {
    return (
      <View>
        <Header style={CategoriesStyles.header} hasSegment>
          <Left style={CategoriesStyles.flex1}>
            <Button
              transparent
              onPress={() => {
                setShowFilter(true)
              }}
            >
              <Icon
                style={CategoriesStyles.headerIcon}
                type="Feather"
                name="filter"
              />
            </Button>
            <Button
              transparent
              onPress={() => {
                getCategories()
              }}
            >
              <Icon
                style={CategoriesStyles.headerIcon}
                type="Feather"
                name="search"
              />
            </Button>
          </Left>
          <Body style={CategoriesStyles.flex4} >
            <Title style={CategoriesStyles.headerBoldTitle}>
              {moment(dateFilter).format('MMMM')} {moment(dateFilter).year() === 2020 ? '' : moment(dateFilter).year()}
            </Title>
          </Body>
          <Right style={CategoriesStyles.flex1}>
            <Button
              transparent
              onPress={() => {
                navigation.navigate(
                  'NewItem',
                  { navigation, categories: segment === 'Income' ? incomeCategories : expenseCategories }
                )
              }}
            >
              <Icon
                style={CategoriesStyles.headerIcon}
                type="Feather"
                name="plus"
              />
            </Button>
            <Button
              transparent
              onPress={() => {
                navigation.navigate('Profile', navigation)
              }}
            >
              <Icon
                style={CategoriesStyles.headerRightIcon}
                type="Feather"
                name="user"
              />
            </Button>
          </Right>
        </Header>
        {getSegments()}
      </View>
    )
  }

  const getDateFilter = () => {
    return (
      <Header style={CategoriesStyles.header} hasSegment>
        <Left style={CategoriesStyles.flex1}>
          <Button
            transparent
            onPress={() => {
              setShowFilter(false)
            }}
          >
            <Icon
              style={CategoriesStyles.headerLeftIcon}
              type="Feather"
              name="x"
            />
          </Button>
          <TouchableOpacity
            activeOpacity={.8}
            style={CategoriesStyles.headerTO}
            onPress={() => handleActionSheet()}
          >
            <Title style={CategoriesStyles.headerSubTitle}>Month</Title>
            <Title style={CategoriesStyles.headerMidTitle}>{activeMonth}</Title>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.8}
            style={CategoriesStyles.headerTO}
            onPress={() => {
              setActiveYear(activeYear == '2020' ? '2019' : '2020')
            }}
          >
            <Title style={CategoriesStyles.headerSubTitle}>Year</Title>
            <Title style={CategoriesStyles.headerMidTitle}>{activeYear}</Title>
          </TouchableOpacity>
        </Left>
        <Right style={CategoriesStyles.flex1}>
          <TouchableOpacity
            transparent
            onPress={() => {
              setShowFilter(false)
            }}
          >
            <Icon
              style={CategoriesStyles.headerIcon}
              type="Feather"
              name="check"
            />
          </TouchableOpacity>
        </Right>
      </Header>
    )
  }
  return (
    <View style={CategoriesStyles.headerContainer} >
      {showFilter === true ? getDateFilter() : getHeader()}
    </View>
  )
}

export default CategoriesHeader
