import { useHistory } from 'react-router-dom';

function SearchView() {
    const history = useHistory();

    return <>
        <h1>Giphy Search!</h1>
        <button onClick={()=>history.push('/favorite-view')}>Go to Favorites</button>
    </>;
}

export default SearchView;