import * as Constants from '../constants/Constants'

import Utils from '../utils/Utils'
import Wrapper from '../utils/Wrapper'

export function loadFaves(page) {
    return function (dispatch) {
        Wrapper.getBeers(`&ids=${Utils.IDs(faves, page)}`, page, (response, flag) => {
            if (flag) {
                dispatch({
                    type: Constants.LOAD_BEERS_FAILED,
                    data: response
                })
            }
            else {
                dispatch({
                    type: Constants.LOAD_FAVES_SUCCESS,
                    data: {
                        beers: response,
                        hasMore: response.length === 12
                    }

                })
            }
        });
    }
}

export function manageFave(flag, item) {
    return function (dispatch) {
        Wrapper.faveManager(flag, item, () => {
            dispatch({
                type: Constants.MANAGE_FAVE,
                data: {flag, item}
            });
        });
    }
}