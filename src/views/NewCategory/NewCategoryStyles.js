import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../../constants/Colors';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  // Container
  container: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  flexRow: {
    flexDirection: "row"
  },
  spinner: {
    marginLeft: 8,
  },
  // Container

  // Header
  header: {
    backgroundColor: Colors.headerBackground,
  },
  flex1Row: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row'
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
  // Header

  // Form
  pick: {
    marginLeft: -2,
  },
  spinner: {
    marginRight: 12,
  },
  form: {
    marginTop: -1,
    backgroundColor: Colors.white,
  },
  separator: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  separatorText: {
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'montserrat-medium',
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
  input: {
    flex: 1,
    fontFamily: 'montserrat-medium',
    fontSize: 15,
    marginLeft: -24,
  },
  item: {
    height: 48,
    borderBottomWidth: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  segment: {
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 12,
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
});
