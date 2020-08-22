import 'whatwg-fetch';
import firebase from 'firebase';
import firebaseApp from './FirebaseService'

const db = firebaseApp.firestore();
var songs = db.collection('songs');

class HttpServiceClass {
	constructor() {

		this.show_songs = this.show_songs.bind(this);
	}

	show_songs = () => {
		var data = []
		songs.get().then((querySnapshot) => {
			//querySnapshot is "iteratable" itself
			querySnapshot.forEach((userDoc) => {
				var userDocData = userDoc.data();
				console.dir(userDocData);
				data.push(userDocData);
			});
		});
		return data;
	};
}

// export { db };
export default HttpServiceClass;