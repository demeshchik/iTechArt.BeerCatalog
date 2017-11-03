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

        case Constants.LOAD_BEERS_SUCCESS:
            let tempArray = [...state.thumbnails];
            tempArray.push(...action.data.beers);
            return {...state, thumbnails: tempArray, hasMore: action.data.hasMore};

        case Constants.LOAD_BEERS_FAILED:
            return {...state, hasMore: false, error: action.data.message};

        case Constants.LOAD_FAVES_SUCCESS:
            let tempFaves = [...state.faves];
            tempFaves.push(...action.data.beers);
            return {...state, faves: tempFaves, hasMore: action.data.hasMore};

        case Constants.MANAGE_FAVE:
            break;

        default:
            return state;
    }
}