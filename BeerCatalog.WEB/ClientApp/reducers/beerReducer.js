import * as Constants from '../constants/reduxConstants';

const initialState = {
	data: [],
	hasMore: true,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case Constants.CLEAR_STORE:
		return initialState;

	case Constants.LOAD_BEERS_SUCCESS:
		const storeBeers = [...state.data];
		storeBeers.push(...action.data.beers);
		return { ...state, data: storeBeers, hasMore: action.data.hasMore };

	case Constants.LOAD_BEERS_FAILED:
		return { ...state, hasMore: false, error: action.data.message };

	default:
		return state;
	}
}
