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
                {displayButtons(favorite.id)}
            </li>);
        }
    }

    const addCategory = (favoriteId, categoryId) => {
        dispatch({
            type: 'UPDATE_CATEGORY',
            payload: {
                id: favoriteId,
                category_id: categoryId
            }
        });
    }

    const displayButtons = (favoriteId) => {
        let buttonString = '';
        for (let category of categories) {
            buttonString += <button onClick={()=>addCategory(favoriteId, category.id)}>{category.name}</button>
        }
        return buttonString;
    }

    return <>
        <h1>Giphy Favorites!</h1>
        <button onClick={()=>history.push('/')}>Go to Search</button>
        {displayFavorites()}
    </>;
}

export default FavoriteView;