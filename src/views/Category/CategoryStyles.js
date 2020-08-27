import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  // Container
  content: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  flex1: {
    flex: 1,
  },
  flex1Row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },
  flexBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 2,
  },
  flex4: {
    flex: 4,
  },
  // Container

  // Header
  header: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitle: {
    color: Colors.shadow,
    fontFamily: 'montserrat-semi-bold',
    marginTop: 2,
  },
  headerIcon: {
    color: Colors.mainColor,
  },
  headerGreyIconPlus: {
    color: Colors.mainColor,
    color: Colors.fume,
    fontSize: 16,
  },
  headerGreyIcon: {
    color: Colors.mainColor,
    color: Colors.fume,
  },
  headerMidIcon: {
    marginLeft: 0,
    color: Colors.mainColor,
    fontSize: 24,
  },
  categoryIcon: {
    marginLeft: 0,
    marginRight: 12,
    marginTop: 4,
    fontSize: 20,
  }
  // Header
});
