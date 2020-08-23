import 'whatwg-fetch';
import firebase from 'firebase';
import firebaseApp from './FirebaseService';
import axios from 'axios';

const db = firebaseApp.firestore();
const storage = firebaseApp.storage('gs://songsmith-98875.appspot.com/').ref('trap_anthem.ogg');

var songs = db.collection('songs');

class HttpServiceClass {
	constructor() {
		this.show_songs = this.show_songs.bind(this);
		this.get_song_info = this.get_song_info.bind(this);
	}

	show_songs = async () => {
		var data = [];
		await songs.get().then((querySnapshot) => {
			querySnapshot.forEach((userDoc) => {
				var userDocData = userDoc.data();
				data.push(userDocData);
			});
		});
		return data;
	};

	get_song_info = async (song) => {
		var data = {};
		await songs.where('title', '==', song).get().then(function(querySnapshot) {
			querySnapshot.forEach(function(doc) {
				console.log(doc.id, ' => ', doc.data());
				data = doc.data();
			});
		});
		return data;
	};
}

// export { db };
export default HttpServiceClass;
