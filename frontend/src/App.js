import React from 'react';
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Generate_page from './components/generate_page/generate_page';
import Home from './components/home/home';

function App() {
  return (
    <Router>
    <div>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generate" exact component={Generate_page} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
