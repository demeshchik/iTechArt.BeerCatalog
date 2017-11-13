import * as Constants from '../constants/constants';

const initialState = {
	data: [],
	hasMore: true,
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case Constants.CLEAR_STORE:
		return initialState;

	case Constants.LOAD_BEERS_SUCCESS:
		const tempArray = [...state.data];
		tempArray.push(...action.data.beers);
		return { ...state, data: tempArray, hasMore: action.data.hasMore };

	case Constants.LOAD_BEERS_FAILED:
		return { ...state, hasMore: false, error: action.data.message };

	default:
		return state;
	}
}
