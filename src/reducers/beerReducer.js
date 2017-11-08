import * as Constants from '../constants/Constants'

import initialState from '../store/initialState'

//TODO: try to merge beers

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Constants.CLEAR_STORE:
            return initialState;

        case Constants.LOAD_BEERS_SUCCESS:
            let tempArray = [...state.thumbnails];
            tempArray.push(...action.data.beers);
            return {...state, thumbnails: tempArray, hasMore: action.data.hasMore};

        case Constants.LOAD_BEERS_FAILED:
            return {...state, hasMore: false, error: action.data.message};

        default:
            return state;
    }
}