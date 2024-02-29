import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FavoriteView() {
    const dispatch = useDispatch();
    const history = useHistory();
    const categories = useSelector(store => store.categoriesReducer);
    const favorites = useSelector(store => store.favoritesReducer);

    const fetchData = () => {
        dispatch({
            type: 'FETCH_CATEGORIES'
        });
        dispatch({
            type: 'FETCH_FAVORITES'
        });
    }

    useEffect(fetchData, []);

    const displayFavorites = () => {
        if (!favorites) {
            return <div>You have no favorites!</div>;
        } else {
            return favorites.map(favorite => <li key={favorite.id}>
                <img src={favorite.url} alt={favorite.title} />
                Category: {favorite.category}

            </li>);
        }
    }

    return <>
        <h1>Giphy Favorites!</h1>
        <button onClick={()=>history.push('/')}>Go to Search</button>
        {displayFavorites()}
    </>;
}

export default FavoriteView;