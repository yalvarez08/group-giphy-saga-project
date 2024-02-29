import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SearchView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [searchTerms, setSearchTerms] = useState('');
    const searchResults = useSelector(store => store.searchresults);

    const searchForGif = () => {
        // TODO: dispatch a call to a saga with the search term as a payload
        setSearchTerms('');
    }

    return <>
        <h1>Giphy Search!</h1>
        <button onClick={()=>history.push('/favorite-view')}>Go to Favorites</button>
        <div>
            <input type="text" placeholder="Search" value={searchTerms} onChange={event=>setSearchTerms(event.target.value)} />
            <button onClick={searchForGif}>Search</button>
        </div>
        {/* TODO: display the search results */}
    </>;
}

export default SearchView;