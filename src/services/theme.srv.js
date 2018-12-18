import {
  FirebaseApp,
} from '../services/firebase.srv'

const databse = FirebaseApp.database();
const ThemeRef = databse.ref('/theme');

export default {
  getTheme() {
    const query = ThemeRef
      .once('value');
    return query.then((snapshot) => {
        return snapshot.val();
      })
      .catch(error => {
        console.log(error)
        return []
      });
  },

  update(key, value) {
    const data = {
      value: value,
      time_editted: Date.now(),
      edittedby: 'anonymous'
    }
    const childRef = ThemeRef.child(`${key}`);
    return childRef.update(data);
  }
}
