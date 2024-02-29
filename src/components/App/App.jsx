import { HashRouter as Router, Route } from 'react-router-dom';
import FavoriteView from '../FavoriteView/FavoriteView';
import SearchView from '../SearchView/SearchView';


function App() {
  return (
    <Router>
      <Route path="/" exact>
        <SearchView />
      </Route>
      <Route path="/favorite-view">
        <FavoriteView />
      </Route>
    </Router>
  );
}


export default App;
