import * as Constants from '../constants/constants'

import Wrapper from '../utils/Wrapper'

export function clearStore() {
    return function (dispatch) {
        dispatch({
            type: Constants.CLEAR_STORE,
            data: null
        })
    }
}

export function loadBeers(query, page) {
    return function (dispatch) {
        if (page === 1) {
            dispatch({
                type: Constants.CLEAR_STORE,
                data: null
            })
        }

        Wrapper.getBeers(query, page, (response, flag) => {
            if (flag) {
                dispatch({
                    type: Constants.LOAD_BEERS_FAILED,
                    data: response
                })
            }
            else {
                dispatch({
                    type: Constants.LOAD_BEERS_SUCCESS,
                    data: {
                        beers: response,
                        hasMore: response.length === 12
                    }

                })
            }
        });
    }
}