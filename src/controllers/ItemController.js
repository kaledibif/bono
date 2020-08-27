import { firebase } from '../config/firebase/firebase'
import AsyncStorage from '@react-native-community/async-storage';

const collection = 'items'

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

const get = async (category, filter = null) => {
  // const activeMonth = new Date().toLocaleString('default', { month: 'long' })
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  // console.warn('first:', firstDay)
  // console.warn('last:', endDay)

  const ref = firebase
    .firestore()
    .collection(collection)
    .where('categoryId', '==', category.id)

  const snapshot = await ref.get();

  let data = [];
  let count = 0;
  snapshot.forEach(doc => {
    count++;
    data.push({ id: doc.id, ...doc.data() })
  });

  return data;
}

const insert = async (obj) => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase.firestore().collection(collection)
  const id = ref.doc().id;
  return await ref
    .doc(id)
    .set(
      { id, userId: userId, ...obj }
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
      { userId: userId, ...obj }
    )
    .then(() => {
      return true
    })
    .catch((error) => {
      alert(error)
      return false;
    })
}

const remove = async (item) => {
  const ref = firebase.firestore().collection(collection)

  return await ref
    .doc(item.id)
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