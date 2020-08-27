import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  SegmentedControlIOS,
  Animated,
} from "react-native";
import {
  Container,
  Content,
  Root,
} from "native-base";
import { NavigationEvents } from 'react-navigation';
import LoadingSpinner from '../../components/LoadingSpinner';
import AsyncStorage from '@react-native-community/async-storage';

import CategoryController from '../../controllers/CategoryController'
import ItemController from '../../controllers/ItemController'

// Components 
import CategoriesHeader from '../../components/CategoriesHeader';
import ExpenseContainer from '../../components/ExpenseContainer';
import ReportContainer from '../../components/ReportContainer';
import CategoriesNewButton from '../../components/CategoriesNewButton';

import CategoriesStyles from "./CategoriesStyles";
import { Context } from "../../context/Context";

const segments = ['Expense', 'Income', 'Report'];

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useContext(Context);
  const [segment, setSegment] = useState(segments[0])
  const [loading, setLoading] = useState(false)
  const [dateFilter, setDateFilter] = useState(null)

  useEffect(() => {
    getCategories(true)
  }, [])

  const getCategories = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }
    const data = await CategoryController.get()
    await setCategories(data)

    setLoading(false)
  }

  const getContent = () => {
    if (loading) {
      return (
        <LoadingSpinner
          loading={loading}
          length={categories.length} />
      )
    } else if (segment === 'Expense') {
      return (
        <View key={1}>
          <ExpenseContainer
            type={segment}
            categories={categories}
            navigation={navigation} />
          <CategoriesNewButton
            navigation={navigation}
            segment={segment} />
        </View>
      )
    } else if (segment === 'Income') {
      return (
        <View key={2}>
          <ExpenseContainer
            type={segment}
            categories={categories}
            navigation={navigation} />
          <CategoriesNewButton
            navigation={navigation}
            segment={segment} />
        </View>
      )
    } else if (segment === 'Report') {
      return (
        <ReportContainer />
      )
    }
  }

  return (
    <Root>
      {/* <NavigationEvents onDidFocus={async () => getCategories()} /> */}
      <Container style={CategoriesStyles.container}>
        <CategoriesHeader
          categories={categories}
          navigation={navigation}
          segment={segment}
          dateFilter={dateFilter}
          onSegmentChange={(val) => {
            setSegment(val)
          }}
          onDateFilterChange={(val) => {
            setDateFilter(val)
          }}
        />
        <Content style={CategoriesStyles.content}>
          {getContent()}
        </Content>
      </Container>
    </Root>
  );
}

export default CategoriesScreen;
