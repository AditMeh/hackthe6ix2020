import React from 'react';
import ReactDOM from 'react-dom';
 
import './index.css';
import * as serviceWorker from './serviceWorker';
 
import App from './App';
// import Firebase, { FirebaseContext } from './components/firebase';
 
ReactDOM.render(
  <React.StrictMode>

  {/* //<FirebaseContext.Provider value={new Firebase()}> */}
    <App />
  {/* //</FirebaseContext.Provider> */}
  </React.StrictMode>,

  document.getElementById('root'),
);
 
serviceWorker.unregister();