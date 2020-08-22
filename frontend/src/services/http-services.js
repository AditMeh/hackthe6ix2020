import 'whatwg-fetch';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBe1fCTVFdOnEy9WobuBqzROq_DGenoQpA',
	authDomain: 'songsmith-98875.firebaseapp.com',
	databaseURL: 'https://songsmith-98875.firebaseio.com',
	projectId: 'songsmith-98875',
	storageBucket: 'songsmith-98875.appspot.com',
	messagingSenderId: '704261263681',
	appId: '1:704261263681:web:9f4ef8ecc9353ffccc91c0',
	measurementId: 'G-9WL3CKEEDV'
});

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