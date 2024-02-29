import { useHistory } from 'react-router-dom';

function FavoriteView() {
    const history = useHistory();

    return <>
        <h1>Giphy Favorites!</h1>
        <button onClick={()=>history.push('/')}>Go to Search</button>
    </>;
}

export default FavoriteView;