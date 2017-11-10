import { combineReducers } from 'redux'
import beersReducer from './beerReducer'
import favoritesReducer from './favoriteReducer'

export default combineReducers({
    beers: beersReducer,
    favorites: favoritesReducer
})