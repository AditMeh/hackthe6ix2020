import React from 'react';
import './nav.css';
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav class="navbar navbar-expand-md ">
      <Link to= '/'>
        <h3 className="logo">SongSmith</h3>
      </Link>
      <div class="collapse navbar-collapse" id="nav-main">
        <ul className="nav-links navbar-nav ml-auto" >
          <Link to="/">
            <li>Inspiration</li>
         </Link>
         <Link to="/">
            <li>About</li>
         </Link>
         <Link to="/generate">
            <li>Try It!</li>
         </Link>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
