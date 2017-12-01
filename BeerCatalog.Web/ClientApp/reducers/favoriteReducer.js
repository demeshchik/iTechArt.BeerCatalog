/* eslint-disable no-unused-expressions */
import * as Constants from '../constants/reduxConstants';

const remove = require('lodash.remove');
const intersectionby = require('lodash.intersectionby');

const initialState = {
    data: [],
    hasMore: true,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
    case Constants.LOAD_FAVORITES_SUCCESS:
        const storeArray = [...state.data];

        const transformedArray = action.data.beers.map(item => ({
            isFavorite: true,
            beer: { ...item },
        }));

        storeArray.push(...transformedArray);

        const uniqueArray = intersectionby(storeArray, item => item.beer.id);

        return { ...state, data: uniqueArray, hasMore: action.data.hasMore };

    case Constants.MANAGE_FAVORITE:
        const storeFaves = [...state.data];

        action.data.flag ? '' : remove(storeFaves, item => item.beer.id === action.data.id);

        return { ...state, data: storeFaves };
    default:
        return state;
    }
}