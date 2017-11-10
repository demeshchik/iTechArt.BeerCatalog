import * as Constants from '../constants/constants'

import Utils from '../utils/Utils'
import Wrapper from '../utils/Wrapper'

export function loadFavorites(page) {
    return function (dispatch) {
        Wrapper.getBeers(`&ids=${Utils.IDs(Wrapper.getFavorites(), page)}`, page, (response, flag) => {
            if (flag) {
                dispatch({
                    type: Constants.LOAD_BEERS_FAILED,
                    data: response
                })
            }
            else {
                dispatch({
                    type: Constants.LOAD_FAVORITES_SUCCESS,
                    data: {
                        beers: response,
                        hasMore: response.length === 12
                    }

                })
            }
        });
    }
}

export function manageFavorites(flag, item) {
    return function (dispatch) {
        Wrapper.favoriteManager(flag, item);

        Wrapper.getBeer(item, (beer) => {
            dispatch({
                type: Constants.MANAGE_FAVORITE,
                data: {flag, beer}
            });
        });
    }
}