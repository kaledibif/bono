import { firebase } from '../config/firebase/firebase'
import AsyncStorage from '@react-native-community/async-storage';

const collection = 'categories'

const getAll = async () => {
  console.warn("getAllCategories")
  const userId = firebase.auth().currentUser.uid;
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .where('userId', '==', userId)
    .get()

  let data = [];

  snapshot.forEach(async (doc) => {
    data.push({ id: doc.id, items: [], ...doc.data() })
  });

  return data;
}

const get = async (dateFilter = {}) => {
  const userId = firebase.auth().currentUser.uid;
  const ref = firebase
    .firestore()
    .collection(collection)
    .where('userId', '==', userId)

  const snapshot = await ref.get();

  let data = [];

  snapshot.forEach(async (doc) => {
    // const items = await ItemController.get(doc, dateFilter)
    // itemCount = itemCount + (items.length ? items.length : 0)
    data.push({ id: doc.id, items: [], ...doc.data() })
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
      {
        id,
        userId: userId,
        ...obj
      }
    )
    .then(() => {
      disableSync()
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
      disableSync()
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
  disableSync()

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

const disableSync = () => {
  AsyncStorage.setItem("isSync", JSON.stringify(false), (err) => { }).catch((err) => { });
}

export default {
  get,
  getAll,
  insert,
  update,
  remove,
  disableSync,
};