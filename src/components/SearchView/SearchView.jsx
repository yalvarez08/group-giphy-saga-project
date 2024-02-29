import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SearchView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchTerms, setSearchTerms] = useState('');
    const searchResults = useSelector(store => store.searchResults);

    const searchForGif = () => {
        dispatch({
            type: 'FETCH_GIFS',
            payload: searchTerms
        });
        setSearchTerms('');
    }

    const addToFavorites = (url, title) => {
        dispatch({
            type: 'ADD_TO_FAVORITES',
            payload: { url, title }
        });
    }

    const displayResults = () => {
        if (!searchResults.length) {
            return <div>Make a search!</div>;
        } else {
            return searchResults.map((item, index) => <li key={index}>
                <img src={item.url} alt={item.title} />
                <button onClick={()=>addToFavorites(item.url, item.title)}>Favorite!</button>
            </li>);
        }
    }

    return <>
        <h1>Giphy Search!</h1>
        <button onClick={()=>history.push('/favorite-view')}>Go to Favorites</button>
        <div>
            <input type="text" placeholder="Search" value={searchTerms} onChange={event=>setSearchTerms(event.target.value)} />
            <button onClick={searchForGif}>Search</button>
        </div>
        {displayResults()}
    </>;
}

export default SearchView;