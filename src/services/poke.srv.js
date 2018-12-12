import {FirebaseApp, FirebaseUtil} from '../services/firebase.srv'
const databse = FirebaseApp.database();
const pokesRef = databse.ref('/Pokemons/stats');

export default {
  /***
  only use for uniform update.
  updateAll(data) {
      FirebaseUtil.updateAll(pokesRef);
  },
  ***/

  save(data) {
    data.time_added = new Date();
    return pokesRef.push().set(data);
  },

  getCount() {
    return FirebaseUtil.getRefKeyMap(pokesRef).then(keys => keys.length)
  },

  getAll(orderBy = 'name', pageNumber = 1, itemsPerPage = 10) {
    return FirebaseUtil.getQuery(pokesRef, orderBy, pageNumber, itemsPerPage).then((snapshot) => {
      const items = []
      snapshot.forEach((obj) => {
        let data = obj.val();
        data.key = obj.key;
        items.push(data);
      })
      return items;
    })
    .catch(error => {
      console.log(error)
      return []
    });
  },

  removeStatByKey(key) {
    return pokesRef.child(key).remove();
  },

  updateStatByKey(key, data) {
    const childRef = databse.ref(`/Pokemons/stats/${key}`);
    childRef.update(data);
  },

  getStatByKey(key) {
    const childRef = databse.ref(`/Pokemons/stats/${key}`);
    return childRef.once('value').then(snapshot => snapshot.val());
  },

  filterStatsByQueryText(queryText) {
    return pokesRef.orderByChild('name').once('value').then((snapshot) => {
      const items = []
      snapshot.forEach((obj) => {
        let data = obj.val();
        if (data.name.indexOf(queryText) >= 0) {
          data.key = obj.key;
          items.push(data);
        }
      })
      return items;
    });
  },
}
