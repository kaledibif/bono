import { firebase } from '../config/firebase/firebase'
import AsyncStorage from '@react-native-community/async-storage';

const collection = 'items'

const getAll = async () => {
  const userId = firebase.auth().currentUser.uid;
  const snapshot = await firebase
    .firestore()
    .collection(collection)
    .where('userId', '==', userId)
    .get()

  let data = [];
  snapshot.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  });

  return data;
}

const get = async (category, dateFilter = null) => {
  // const activeMonth = new Date().toLocaleString('default', { month: 'long' })

  let ref = null;
  if (dateFilter) {
    const firstDay = new Date(dateFilter.year(), dateFilter.month(), 1);
    const endDay = new Date(dateFilter.year(), dateFilter.month() + 1, 0);

    console.warn('first:', firstDay)
    console.warn('last:', endDay)

    ref = firebase
      .firestore()
      .collection(collection)
      .where('categoryId', '==', category.id)
      .orderBy('date')
      .startAt(firstDay)
      .endAt(endDay)
  } else {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    ref = firebase
      .firestore()
      .collection(collection)
      .where('categoryId', '==', category.id)
      .orderBy('date')
  }

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
  disableSync()

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
  disableSync()

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
  disableSync()

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

const disableSync = () => {
  AsyncStorage.setItem("isSync", JSON.stringify(false), (err) => { }).catch((err) => { });
}

export default {
  get,
  getAll,
  insert,
  update,
  remove,
};
