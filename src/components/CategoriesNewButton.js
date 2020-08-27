import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {
  ListItem,
  Left,
  Button,
  Body,
  Right,
  Icon,
} from "native-base";
import Colors from '../constants/Colors';

const NewCategoryButton = ({ segment, navigation }) => {
  return (
    <View style={styles.container}>
      <ListItem
        style={styles.listItem}
        icon
        first
        last
        activeOpacity={.5}
        onPress={() => {
          navigation.navigate("NewCategory", { type: segment })
        }}
      >
        <Left>
          <Button transparent>
            <Icon name='plus' type="Feather" style={styles.icon} />
          </Button>
        </Left>
        <Body>
          <Text style={styles.text}>New Category</Text>
        </Body>
        <Right>
          <Icon active name="arrow-forward" />
        </Right>
      </ListItem>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    opacity: .75,
    backgroundColor: Colors.itemGroupsOutside,
    marginTop: 18,
    marginBottom: 72,
  },
  listItem: {
    borderTopColor: Colors.milk,
    borderTopWidth: 1,
    backgroundColor: Colors.white,
  },
  icon: {
    color: Colors.fume,
  },
  text: {
    fontFamily: 'montserrat-medium',
    color: Colors.fume,
  },
});

export default NewCategoryButton
