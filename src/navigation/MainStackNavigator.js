import {
  createStackNavigator,
} from 'react-navigation';

// Screens
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryScreen from '../screens/CategoryScreen';
import NewCategoryScreen from '../screens/NewCategoryScreen';
import NewItemScreen from '../screens/NewItemScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Navigator
export default createStackNavigator({
  Categories: {
    screen: CategoriesScreen,
    path: '/categories',
    navigationOptions: () => ({
      header: null,
      title: 'Categories',
    }),
  },
  NewCategory: {
    screen: NewCategoryScreen,
    path: '/new-category',
    navigationOptions: () => ({
      header: null,
      title: 'NewCategory',
    }),
  },
  Category: {
    screen: CategoryScreen,
    path: '/category',
    navigationOptions: () => ({
      header: null,
      title: 'Category',
    }),
  },
  NewItem: {
    screen: NewItemScreen,
    path: 'category/new-item',
    navigationOptions: () => ({
      header: null,
      title: 'New Expense',
    }),
  },
  Profile: {
    screen: ProfileScreen,
    path: '/',
    navigationOptions: () => ({
      header: null,
      title: 'Profile',
    }),
  },
});
