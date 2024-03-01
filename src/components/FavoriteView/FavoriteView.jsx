import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FavoriteView.css'

function FavoriteView() {
    const dispatch = useDispatch();
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
        console.log('favorites:', favorites);
        if (!favorites.length) {
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
        return categories.map(category => <button key={category.id} onClick={()=>addCategory(favoriteId, category.id)}>{category.name}</button>);
    }

    return <>
        <h1>Giphy Favorites!</h1>
        
        {displayFavorites()}
    </>;
}

export default FavoriteView;