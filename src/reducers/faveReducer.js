import * as Constants from '../constants/Constants'

import initialState from '../store/initialState'

//TODO: try to merge beers

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Constants.LOAD_FAVES_SUCCESS:
            let tempFaves = [...state.faves];
            tempFaves.push(...action.data.beers);
            return {...state, faves: tempFaves, hasMore: action.data.hasMore};

        case Constants.MANAGE_FAVE:
            let temporaryFaves = [...state.faves];
            action.data.flag ? temporaryFaves.push(action.data.item) : temporaryFaves.splice(temporaryFaves.indexOf(action.data.item), 1);
            return {...state, faves: temporaryFaves};
        default:
            return state;
    }
}