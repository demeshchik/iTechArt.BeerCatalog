/* eslint-disable no-unused-expressions */
import * as Constants from '../constants/reduxConstants';
const remove = require('lodash.remove');

const initialState = {
	data: [],
	hasMore: true,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case Constants.LOAD_FAVORITES_SUCCESS:
		const storeArray = [...state.data];

		storeArray.push(...action.data.beers);

        let transformedArray = storeArray.map(item => {
            return {
                isFavorite: true,
                beer: { ...item },
            }
        });

        return { ...state, data: transformedArray, hasMore: action.data.hasMore };

    case Constants.MANAGE_FAVORITE:
		const storeFaves = [...state.data];

		action.data.flag ? '' : remove(storeFaves, item => item.beer.id === action.data.id);

		return { ...state, data: storeFaves };
	default:
		return state;
	}
}