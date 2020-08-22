
import './App.css';
import {HashRouter as Router, Switch, Route} from 'react-router-dom';

import Generate_page from './components/generate_page/generate_page';

function App() {
  return (
    <Router>
    <div>
      <Nav/>
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generate" exact component={Generate_page} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
