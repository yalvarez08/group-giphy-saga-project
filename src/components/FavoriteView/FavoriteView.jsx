import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FavoriteView() {
    const history = useHistory();
    const categories = useSelector(store => store.categoriesReducer);
    const favorites = useSelector(store => store.favoritesReducer);

    const displayFavorites = () => {
        if (!favorites) {
            return <div>You have no favorites!</div>;
        } else {
            return favorites.map(favorite => <li key={favorite.id}>
                <img src={favorite.url} alt={favorite.title} />
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