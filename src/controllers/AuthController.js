import { firebase } from '../config/firebase/firebase'

const login = async (email, password) => {
  return await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (response) => {
      return firebase.firestore().collection('users')
        .doc(response.user.uid)
        .get()
        .then(firestoreDocument => {
          if (!firestoreDocument.exists) {
            return alert("User does not exist anymore.")
          }
          return firestoreDocument.data()
        })
        .catch(error => {
          alert(error)
        });
    })
    .catch(error => {
      alert(error)
    })
}

const register = async (name, email, password) => {
  return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(async function () {
      return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async (response) => {
          const uid = response.user.uid
          const user = {
            id: uid,
            email,
            name,
            createdAd: new Date,
          };

          return firebase.firestore().collection('users')
            .doc(uid)
            .set(user)
            .then(() => {
              return user
            })
            .catch((error) => {
              alert(error)
            });
        })
        .catch((error) => {
          alert(error)
        });
    })
    .catch(function (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (response) => {
      const uid = response.user.uid
      const user = {
        id: uid,
        email,
        name,
        createdAd: new Date,
      };

      return firebase.firestore().collection('users')
        .doc(uid)
        .set(user)
        .then(() => {
          return user
        })
        .catch((error) => {
          alert(error)
        });
    })
    .catch((error) => {
      alert(error)
    })
}

const logout = async () => {
  firebase.auth().signOut();
}

const userInfo = async () => {
  const user = firebase.auth().currentUser;
  return user
}

const autoLogin = async () => {
  return firebase.auth();
}

export default {
  autoLogin,
  login,
  register,
  logout,
  userInfo
}
