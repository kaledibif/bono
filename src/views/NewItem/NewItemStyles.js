import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  // Container
  container: {
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
  flexRow: {
    flexDirection: 'row',
  },
  // Container

  // Header
  header: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitle: {
    color: Colors.fume,
    fontFamily: 'montserrat-medium',
  },
  headerTitle: {
    color: Colors.shadow,
    fontFamily: 'montserrat-semi-bold',
  },
  headerIcon: {
    color: Colors.mainColor,
  },
  headerSmallIcon: {
    fontSize: 18,
    color: Colors.mainColor,
  },
  // Header

  // Screen
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
    height: 48,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemRow: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
    // height: 48,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  input: {
    color: Colors.shadow,
    fontSize: 15,
    fontFamily: 'montserrat-medium',
  },
  iconTO: {
    width: 36,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  currencyText: {
    fontSize: 22,
    color: Colors.mainColor,
    marginRight: 6
  },
  form: {
    marginTop: -1,
    backgroundColor: Colors.white,
  },
  // Screen
});
