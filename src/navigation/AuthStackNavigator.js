import {
  createStackNavigator,
} from 'react-navigation';

// Screens
import AuthScreen from '../views/Auth/AuthScreen';

// Navigator
export default createStackNavigator({
  Auth: {
    screen: AuthScreen,
    path: '/auth',
    navigationOptions: () => ({
      header: null,
      title: 'Auth',
    }),
  },
});
