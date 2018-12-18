import {
  FirebaseApp,
} from '../services/firebase.srv'

const databse = FirebaseApp.database();
const BraceletHoldsRef = databse.ref('/Pokemons/bracelet-holds');
const BraceletPowersRef = databse.ref('/Pokemons/bracelet-powers');
const BraceletWishesRef = databse.ref('/Pokemons/bracelet-wishes');
const BraceletMovesRef = databse.ref('/Pokemons/bracelet-moves');

const RefLookUps = {
  'BraceletHolds': BraceletHoldsRef,
  'BraceletPowers': BraceletPowersRef,
  'BraceletWishes': BraceletWishesRef,
  'BraceletMoves': BraceletMovesRef,
}

export default {
  getRef(name = 'BraceletHolds', sortBy = 'name') {
    return RefLookUps[name];
  },

  save(refname, data) {
    const pokesRef = this.getRef(refname);
    const newRef = pokesRef.push();
    return newRef.set(data).then(() => newRef);
  },

  getAll(refname, orderBy = 'name') {
    const pokesRef = this.getRef(refname);
    const query = pokesRef
      .orderByChild(orderBy)
      .once('value');
    return query.then((snapshot) => {
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

  removeStatByKey(refname, key) {
    const pokesRef = this.getRef(refname);
    return pokesRef.child(key).remove();
  },

  updateStatByKey(refname, key, data) {
    const pokesRef = this.getRef(refname);
    data.time_edited = Date.now();
    const childRef = pokesRef.child(`${key}`);
    childRef.update(data);
  },

  getStatByKey(refname, key) {
    const pokesRef = this.getRef(refname);
    const childRef = pokesRef.child(`${key}`);
    return childRef.once('value').then(snapshot => snapshot.val());
  },
}
