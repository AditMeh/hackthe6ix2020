import 'whatwg-fetch';
import { Component } from 'react';
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

class HttpServiceClass extends Component {
	constructor(props) {
        super(props);
        
        this.show_songs = this.show_songs.bind(this);
	}

	show_songs = () => {
		songs.get().then((querySnapshot) => {
			//querySnapshot is "iteratable" itself
			querySnapshot.forEach((userDoc) => {
				//userDoc contains all metadata of Firestore object, such as reference and id
				console.log(userDoc.id);

				//If you want to get doc data
				var userDocData = userDoc.data();
				console.dir(userDocData);
			});
		});
	};
}

// export { db };
export default HttpServiceClass;