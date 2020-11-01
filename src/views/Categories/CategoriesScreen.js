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
var moment = require('moment');
import { NavigationEvents } from 'react-navigation';
import LoadingSpinner from '../../components/LoadingSpinner';

// Components 
import CategoriesHeader from '../../components/CategoriesHeader';
import ExpenseContainer from '../../components/ExpenseContainer';
import ReportContainer from '../../components/ReportContainer';
import CategoriesNewButton from '../../components/CategoriesNewButton';

import CategoriesStyles from "./CategoriesStyles";
import { Context } from "../../context/Context";
import Strings from "../../constants/Strings"

const CategoriesScreen = ({ navigation }) => {
  const [contextData, setContextData] = useContext(Context);
  const [categories, setCategories] = useState(contextData.categories);
  const [segment, setSegment] = useState(Strings.categories.segments[0])
  const [loading, setLoading] = useState(false)
  const [dateFilter, setDateFilter] = useState(moment(new Date()))

  useEffect(() => {
    getCategories(false)
  }, [])

  const getCategories = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)

      setTimeout(() => {
        setLoading(true)
      }, 1000);
    }
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
            dateFilter={dateFilter}
            onDateFilterChange={(val) => {
              setDateFilter(val)
              getCategories()
            }}
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
            dateFilter={dateFilter}
            onDateFilterChange={(val) => {
              setDateFilter(val)
              getCategories()
            }}
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
        <Content
          showsVerticalScrollIndicator={false}
          style={CategoriesStyles.content}>
          {getContent()}
        </Content>
      </Container>
    </Root>
  );
}

export default CategoriesScreen;
