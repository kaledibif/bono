import React, { useState, useEffect, useContext } from "react";
import {
  View,
} from "react-native";
import {
  Container,
  Content,
  Root,
} from "native-base";
var moment = require('moment');
import LoadingSpinner from '../../components/LoadingSpinner';

// Components 
import CategoriesHeader from '../../components/CategoriesHeader';
import ExpenseContainer from '../../components/ExpenseContainer';
import CategoriesNewButton from '../../components/CategoriesNewButton';

import CategoriesStyles from "./CategoriesStyles";
import { Context } from "../../context/Context";

const CategoriesScreen = ({ navigation }) => {
  const [contextData, setContextData] = useContext(Context);
  const [categories, setCategories] = useState(contextData.categories);
  const [loading, setLoading] = useState(false)
  const [dateFilter, setDateFilter] = useState(moment(new Date()))

  useEffect(() => {
    getCategories(false)
  }, [])

  const getCategories = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
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
    }

    return (
      <View key={1}>
        <ExpenseContainer
          categories={categories}
          dateFilter={dateFilter}
          onDateFilterChange={(val) => {
            setDateFilter(val)
            getCategories()
          }}
          navigation={navigation} />
        <CategoriesNewButton
          navigation={navigation} />
      </View>
    )
  }

  return (
    <Root>
      {/* <NavigationEvents onDidFocus={async () => getCategories()} /> */}
      <Container style={CategoriesStyles.container}>
        <CategoriesHeader
          navigation={navigation}
          dateFilter={dateFilter}
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
