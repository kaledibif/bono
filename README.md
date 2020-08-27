# BONO - Basic Income & Expense Manager

This is a simple Expo + Firebase project for basic Expense & Income management. It includes:

- based on Expo SDK `38.x.x`
- navigation using `react-navigation` 3.11.0
- Firebase as backend for email auth (login & register & logout)
- category and item CRUD structure with Firebase
- custom and reusable components
- handles different field types in forms


## Installation

1. Install node modules using Yarn.
```bash
$ yarn
```
2. Update `firebaseConfig.js` file at src/config/firebase folder with your own configuration
```js
export default {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```
3. Start Expo Project
```bash
$ expo start
```

## Screens

- Login / Register
- Categories (Expense & Income)
- New / Update Category
- New / Update Item
- Profile

