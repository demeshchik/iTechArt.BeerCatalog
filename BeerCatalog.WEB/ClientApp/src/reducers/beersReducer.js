import * as Constants from '../constants/Constants'

let initialState = {
    thumbnails: [],
    hasMore: true
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Constants.CLEAR_STORE:
            return initialState;
        case Constants.GET_BEERS_SUCCESS:
            let tempArray = [...state.thumbnails];
            tempArray.push(...action.data);
            return {...state, thumbnails: tempArray, hasMore: action.data.length >= 9};
        case Constants.GET_BEERS_FAILED:
            return {...state, hasMore: false, error: action.data.message};
        default:
            return state;
    }
}