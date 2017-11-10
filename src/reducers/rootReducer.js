import { combineReducers } from 'redux'
import beersReducer from './beerReducer'
import faveReducer from './faveReducer'

export default combineReducers({
    beers: beersReducer,
    faves: faveReducer
})