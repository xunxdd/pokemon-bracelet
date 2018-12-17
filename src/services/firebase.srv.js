import Firebase from 'firebase/app';
import 'firebase/database';
import Configs from '../../config/data-config/firebase'

const FirebaseApp = Firebase.apps.length ? Firebase.apps[0] : Firebase.initializeApp(Configs.FIREBASE_CONFIG)

const FirebaseUtil = {
  // some maintenance task, mass update
  updateAll(ref) {
    return ref.once('value').then(snapshot => {
      snapshot.forEach(data => {
        // ids.push(data.key)
        ref.child(data.key).update({
          'poke_rank': 1
        })
      })
    })
  },

  getRefKeyMap(ref, orderBy = 'name') {
    return ref.orderByChild(orderBy).once('value').then(snapshot => {
      const ids = []
      snapshot.forEach(data => {
        ids.push(data.key)
      })
      return ids;
    })
  },

  getQuery(ref = null, orderBy = 'name', pageNumber = 1, itemsPerPage = 10) {
    if (!ref) {
      return null
    }
    if (pageNumber === 1) {
      return ref
        .orderByChild(orderBy)
        .limitToFirst(itemsPerPage)
        .once('value')
    }

    return ref
      .orderByChild(orderBy)
      .limitToFirst(itemsPerPage * pageNumber)
      .once('value')
  },

  filteQuery(ref = null, orderBy = 'name', queryText = '') {
    if (!ref) {
      return null
    }

    return ref
      .orderByChild(orderBy)
      .once('value')
  }
}
export {
  FirebaseApp,
  FirebaseUtil
}
