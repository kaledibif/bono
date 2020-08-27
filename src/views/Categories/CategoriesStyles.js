import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  // Container
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: Colors.itemGroupsOutside,
  },
  flex1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  content: {
    backgroundColor: Colors.itemGroupsOutside,
  },
  // Container

  // Header
  headerContainer: {
    backgroundColor: Colors.headerBackground,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gum
  },
  header: {
    backgroundColor: Colors.headerBackground,
  },
  segmentContainter: {
    height: 42,
  },
  segment: {
    backgroundColor: Colors.headerBackground,
    marginTop: 4,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  headRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: 42,
    borderBottomWidth: 0,
  },
  headerTO: {
    marginRight: 4,
    marginLeft: 4,
    alignItems: 'flex-start',
    width: 108,
  },
  headerSubTitle: {
    color: Colors.fume,
    fontSize: 12,
    fontFamily: 'montserrat-regular',
  },
  headerMidTitle: {
    color: Colors.shadow,
    fontSize: 16,
    fontFamily: 'montserrat-semi-bold',
  },
  headerBoldTitle: {
    color: Colors.shadow,
    fontFamily: 'montserrat-semi-bold',
  },
  headerTitle: {
    color: Colors.shadow,
    fontFamily: 'montserrat-regular',
  },
  headerLeftIcon: {
    marginLeft: 12,
    marginRight: 4,
    color: Colors.mainColor,
    fontSize: 22,
  },
  headerRightIcon: {
    marginRight: 6,
    color: Colors.mainColor,
    fontSize: 22,
  },
  headerIcon: {
    marginLeft: 12,
    color: Colors.mainColor,
    fontSize: 22,
  },
  headerMidIcon: {
    marginRight: 12,
    color: Colors.mainColor,
    fontSize: 24,
  },
  // Header
  item: {
    borderBottomWidth: 0,
    height: 50,
    marginTop: 0,
    marginBottom: 0,
  }
});
