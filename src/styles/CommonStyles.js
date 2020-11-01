import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../constants/Colors';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  // Scene Elemens
  container: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  flexCenter: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  flexRow: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
  },

  // Header
  header: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitle: {
    color: Colors.shadow,
    fontFamily: 'montserrat-semi-bold',
  },
  headerIcon: {
    color: Colors.mainColor,
  },
  headerGreyIcon: {
    color: Colors.mainColor,
  },

  // Form Elements
  form: {
    marginTop: -1,
    backgroundColor: Colors.white,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum,
    height: 48,
    marginLeft: 0,
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
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
  pick: {
    marginLeft: -2,
  },
  firstItem: {
    height: 48,
    borderTopColor: Colors.gum,
    borderTopWidth: 1,
  },
  secItem: {
    display: 'flex',
    justifyContent: 'flex-end',
    height: 48,
  },
  label: {
    flex: 1,
    fontFamily: 'montserrat-medium',
    fontSize: 15,
    marginLeft: 4,
    color: Colors.fume,
  },
  // Form
  cellWrapperCategory: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
  },
  pickCell: {
    borderWidth: 0.5,
    borderColor: Colors.gum,
    width: screenWidth / 5,
    height: screenWidth / 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellIcon: {
    fontSize: 22,
  },

  // Button Actions
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
  },
  button: {
    flex: 2,
    margin: 4,
    backgroundColor: Colors.mainColor,
  },
  buttonLight: {
    flex: 1,
    margin: 4,
    backgroundColor: Colors.gum,
  },
  buttonText: {
    color: Colors.white,
  },
  buttonTextLight: {
    color: Colors.dark,
  },
});
