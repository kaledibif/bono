import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

export default StyleSheet.create({
  // Container
  container: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
    backgroundColor: Colors.mainColor,
  },
  flex1: {
    flex: 1,
  },
  // Container

  // Header
  header: {
    backgroundColor: Colors.mainColor,
    borderBottomWidth: 0,
  },
  headerIcon: {
    color: Colors.white,
    marginLeft: 8,
  },
  headerLeftText: {
    marginLeft: 8,
    color: Colors.white,
  },
  // Header
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
  spinner: {
    marginLeft: 16,
  },
  form: {
    marginTop: 12,
    marginBottom: 36,
  },
  label: {
    color: Colors.white,
  },
  input: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 18,
  },
  offlineButton: {
    backgroundColor: Colors.mainDarker,
    marginVertical: 0,
    marginHorizontal: 16,
  },
  offlineButtonText: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 16,
  },
  button: {
    margin: 16,
  },
  buttonText: {
    fontWeight: 'bold',
    color: Colors.black,
    fontSize: 16,
  },
  greyButton: {
    alignSelf: 'center',
  },
  greyButtonText: {
    alignSelf: 'center',
    color: Colors.white,
    margin: 16,
    fontSize: 16,
  },
});
