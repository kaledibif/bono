export default {
  auth: {
    header: {
      boldLetter: 'E',
      appMotto: 'Expense Manager',
    },
    inputs: {
      name: 'Name',
      email: 'Email Address',
      password: 'Password',
      passwordConfirmation: 'Password Confirmation',
    },
    buttons: {
      login: 'Login',
      register: 'Register',
      useOffline: 'Use Offline',
      forgot: 'Reset My Password!',
      backToLogin: 'Back to Login!',
      registerNow: 'Register Now!',
    }
  },
  categories: {
    segments: ['Expense', 'Income', 'Report'],
    header: {
      title: 'Categories',
    },
    newCategory: 'Add Category',
  },
  category: {
    buttons: [
      "New Expense",
      "Edit Category",
      "Delete Category",
      "Cancel"
    ],
    newExpenseIndex: 0,
    editCategoryIndex: 1,
    deleteCategoryIndex: 2,
    cancelIndex: 3,
  },
  newCategory: {
    type: 'Category Type',
    title: 'New Category',
    name: 'Name',
    namePlaceholder: 'Text',
    treshold: 'Treshold',
    tresholdPlaceholder: 'Value',
    save: 'Save',
    update: 'Update',
    nothingFoundText: 'No category found!',
    color: 'Color',
    icon: 'Icon',
  },
  newItem: {
    header: {
      title: 'New Expense',
      editTitle: 'Update Expense',
    },
    title: 'Add Record',
    clear: 'Clear',
    save: 'Save',
    update: 'Update',
    actionButtons: ['Take Image', 'Pick From Library', 'Cancel'],
    cancelIndex: 2,
  },
  tabs: {
    categories: {
      label: 'Expenses',
      new: {
        label: 'New Category',
        edit_label: 'Edit Category',
      },
    },
    new_item: {
      label: 'New Expense',
    },
    edit_item: {
      label: 'Edit Expense',
    },
    profile: {
      label: 'Profile',
    },
  },
  profile: {
    title: 'Profile',
    email: 'Email',
    name: 'Name',
    changePassword: 'Change Password',
    no: 'No',
    yes: 'Yes',
    logout: 'Logout',
    alertConfirm: 'Confirm',
    alertLogOutMessage: 'Are you sure you want to logout?',
    language: 'Language',
    changeLanguageTitle: 'Select App Language',
    languages: [
      'English', 'Turkish', 'Cancel'
    ],
    currency: 'Currency',
    changeCurrencyTitle: 'Select App Currency',
    currencies: [
      'Euro (€)', 'Dollar ($)', 'Turkish Lira (₺)', 'Cancel'
    ],
    appName: 'Bono',
    appVersion: 'Version: 1.0',
  },
  monthsSheet: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    'Cancel'
  ]
};
