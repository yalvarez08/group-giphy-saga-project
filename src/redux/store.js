import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import logger from 'redux-logger';
import axios from 'axios';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeLatest, put} from 'redux-saga/effects';

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}

const favoritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVORITES':
            return action.payload;
        default:
            return state;
    }
}

const searchResults = (state = [], action) => {
    switch (action.type) {
        case 'SET_SEARCHES':
            return action.payload;
        default:
            return state;
    }
}

//GET from giphy api
function* fetchGifs(action) {
    try {
        const gifResponse = yield axios.get('/api/giphy?q=' + action.payload);
        yield put({type: 'SET_SEARCHES', payload: gifResponse.data});
    } catch(err) {
        console.log('Error getting gifs from server:', err);
    }
}

//POST request to add to favorites
function* postGifToFavorites(action) {
    try {
        yield axios.post('/api/favorites', action.payload);
        yield put({type: 'FETCH_GIFS'});
    } catch(err) {
        console.log('Error adding gif to favorites:', err);
    }
}

//PUT request to set category for fav gifs
function* setGifCategory(action) {
    try {
        yield axios.put('/api/favorites/' + action.payload);
        yield put({type: 'SET_CATEGORIES'});
    } catch(err) {
        console.log('Error updating fav gif category:', err);
    }
}

// Create the rootSaga generator function
function* rootSaga() {
    yield takeLatest('FETCH_GIFS', fetchGifs);
    yield takeLatest('ADD_TO_FAVORITES', postGifToFavorites);
    yield takeLatest('UPDATE_CATEGORY', setGifCategory);
}


// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const store = createStore(
    combineReducers({
        categoriesReducer,
        favoritesReducer,
        searchResults,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

export default store;
