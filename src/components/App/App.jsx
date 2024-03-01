import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Header from '../Header/Header';
import FavoriteView from '../FavoriteView/FavoriteView';
import SearchView from '../SearchView/SearchView';
import React from 'react';
import './App.css';



function App() {
  return (
    <div className="App">
      <Header />
      <Router>
      <div>
          <ul className="nav_bar">
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/favorite-view">Favorites</Link>
            </li>
          </ul>
    
      <Route path="/" exact>
        <SearchView />
      </Route>
      <Route path="/favorite-view">
        <FavoriteView />
      </Route>
      </div>
      </Router>
    </div>
  );
}

export default App;
