const intersectionBy = require('lodash.intersectionby');
const remove = require('lodash.remove');

import * as Constants from '../constants/constants'

const initialState = {
    data: [],
    hasMore: true
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Constants.LOAD_FAVES_SUCCESS:
            let storeArray = [...state.data];

            storeArray.push(...action.data.beers);

            let finalArray = intersectionBy(storeArray, 'id');

            return {...state, data: finalArray, hasMore: action.data.hasMore};

        case Constants.MANAGE_FAVE:
            let storeFaves = [...state.data];

            action.data.flag ? storeFaves.push(action.data.beer) : remove(storeFaves, (item) => item.id === action.data.beer.id);

            return {...state, data: storeFaves};
        default:
            return state;
    }
}