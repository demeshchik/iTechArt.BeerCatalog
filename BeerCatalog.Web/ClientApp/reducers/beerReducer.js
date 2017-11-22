import * as Constants from '../constants/reduxConstants';
import { STORE_NAME } from '../constants/globalConstants';

import { checkItemInStorage } from '../utils/utils';

const initialState = {
	data: [],
	selectedBeer: {},
	hasMore: true,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case Constants.CLEAR_STORE:
		return initialState;

	case Constants.LOAD_BEERS_SUCCESS:
        const storeBeers = [...state.data];

        let transformedArray = action.data.beers.map(item => {
            return {
                isFavorite: checkItemInStorage(STORE_NAME, item.id),
                beer: { ...item },
            }
        });

        return { ...state, data: [...storeBeers, ...transformedArray], hasMore: action.data.hasMore };

	case Constants.LOAD_BEERS_FAILED:
		return { ...state, hasMore: false, error: action.data.message };

    case Constants.MANAGE_FAVORITE:
        const storeData = [...state.data];
        let requiredItemIndex = storeData.findIndex(item => {
            return item.beer.id === action.data.id
        });

        storeData[requiredItemIndex].isFavorite = action.data.flag;
        return { ...state, data: storeData };

    case Constants.USER_SELECT_BEER:
    	const storeBeer = state.data.find((item) => item.beer.id === action.data);
		return {...state, selectedBeer: storeBeer};

	default:
		return state;
	}
}
