import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import AuthLoadingScreen from './AuthLoadingScreen';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStackNavigator,
    App: MainStackNavigator,
  })
);
