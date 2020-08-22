import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyBe1fCTVFdOnEy9WobuBqzROq_DGenoQpA",
    authDomain: "songsmith-98875.firebaseapp.com",
    databaseURL: "https://songsmith-98875.firebaseio.com",
    projectId: "songsmith-98875",
    storageBucket: "songsmith-98875.appspot.com",
    messagingSenderId: "704261263681",
    appId: "1:704261263681:web:9f4ef8ecc9353ffccc91c0",
    measurementId: "G-9WL3CKEEDV"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

export default Firebase;