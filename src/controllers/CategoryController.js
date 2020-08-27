import { firebase } from '../config/firebase/firebase'
import AsyncStorage from '@react-native-community/async-storage';

import ItemController from './ItemController'

const collection = 'categories'

const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    alert(error)
  }
};

const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value
    }
    return false
  } catch (error) {
    alert(error)
    return false
  }
};

const get = async (type, filter = null) => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase
    .firestore()
    .collection(collection)
    .where('userId', '==', userId)

  const snapshot = await ref.get();

  let data = [];
  let categoryCount = 0;
  let itemCount = 0;

  snapshot.forEach(async (doc) => {
    categoryCount++;
    const items = await ItemController.get(doc)
    itemCount = itemCount + (items.length ? items.length : 0)
    data.push({ id: doc.id, items: items, ...doc.data() })
  });

  await _storeData('@categoryCount', (categoryCount).toString())
  await _storeData('@itemCount', (itemCount).toString())

  return data;
}

const insert = async (obj) => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.firestore().collection(collection)
  const id = ref.doc().id;
  return await ref
    .doc(id)
    .set(
      {
        id,
        userId: userId,
        ...obj
      }
    )
    .then(() => {
      return true
    })
    .catch((error) => {
      alert(error)
      return false;
    })
}

const update = async (obj) => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.firestore().collection(collection)

  return await ref
    .doc(obj.id)
    .set(
      {
        userId: userId,
        ...obj
      }
    )
    .then(() => {
      return true
    })
    .catch((error) => {
      alert(error)
      return false;
    })
}

const remove = async (category) => {
  const items = await firebase.firestore()
    .collection('items')
    .where('categoryId', '==', category.id)
    .get()

  const batch = firebase.firestore().batch();
  items.forEach(doc => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  const ref = firebase.firestore().collection(collection)
  return await ref
    .doc(category.id)
    .delete()
    .then(() => {
      return true
    })
    .catch((error) => {
      alert(error)
      return false;
    })
}

export default {
  get,
  insert,
  update,
  remove,
};