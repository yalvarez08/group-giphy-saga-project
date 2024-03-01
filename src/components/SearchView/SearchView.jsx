import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SearchView.css'


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
        history.push('/favorite-view');
    }

    const displayResults = () => {
        if (!searchResults.length) {
            return <>
            <div className="search_title">Make a search!</div>
            <input type="text" placeholder="Search" value={searchTerms} onChange={event=>setSearchTerms(event.target.value)} />
            <button className="search_btn" onClick={searchForGif}>Search</button>
            </>;
        } else {
            return searchResults.map((item, index) => <li key={index}>
                <img src={item.url} alt={item.title} />
                <button className="fav_btn" onClick={()=>addToFavorites(item.url, item.title)}>Favorite!</button>
            </li>);
        }
    }

    return <>
        
        {displayResults()}
    
    </>;
}

export default SearchView;