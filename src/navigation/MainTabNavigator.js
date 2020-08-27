import {
  createStackNavigator,
} from 'react-navigation';

// Screens
import AuthScreen from '../views/Auth/AuthScreen';
import CategoriesScreen from '../views/Categories/CategoriesScreen';
import CategoryScreen from '../views/Category/CategoryScreen';
import NewCategoryScreen from '../views/NewCategory/NewCategoryScreen';
import NewItemScreen from '../views/NewItem/NewItemScreen';
import ProfileScreen from '../views/Profile/ProfileScreen';

// Navigator
const CategoryTab = createStackNavigator({
  Auth: {
    screen: AuthScreen,
    path: '/auth',
    navigationOptions: () => ({
      header: null,
      title: 'Auth',
    }),
  },
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

export default createStackNavigator(
  {
    CategoryTab,
  },
  {
    // initialRouteName: 'Auth',
    headerMode: 'none',
  }
);
