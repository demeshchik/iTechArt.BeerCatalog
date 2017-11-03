import * as Constants from '../constants/Constants'

let initialState = {
    faves: [],
    thumbnails: [],
    hasMore: true
};

//TODO: try to merge beers

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Constants.CLEAR_STORE:
            return initialState;
        case Constants.GET_BEERS_SUCCESS:
            let tempArray = [...state.thumbnails];
            tempArray.push(...action.data);
            return {...state, thumbnails: tempArray, hasMore: action.data.length >= 12};
        case Constants.GET_BEERS_FAILED:
            return {...state, hasMore: false, error: action.data.message};
        case Constants.LOAD_FAVES_SUCCESS:
            let tempFaves = [...state.faves];
            tempFaves.push(...action.data);
            return {...state, faves: tempFaves, hasMore: action.data.length >= 12};
        default:
            return state;
    }
}