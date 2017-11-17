import { ITEMS_PER_PAGE } from "../constants/globalConstants";
import * as Constants from '../constants/reduxConstants';

import Wrapper from '../utils/Wrapper';

function clearStore(dispatch) {
    dispatch({
        type: Constants.CLEAR_STORE,
        data: null,
    });
}

export default function loadBeers(query, page) {
    return (dispatch) => {
        if (page === 1) {
            clearStore(dispatch)
        }

        Wrapper.getBeers(query, page, (response, flag) => {
            if (flag) {
                dispatch({
                    type: Constants.LOAD_BEERS_FAILED,
                    data: response,
                });
            }
            else {
                dispatch({
                    type: Constants.LOAD_BEERS_SUCCESS,
                    data: {
                        beers: response,
                        hasMore: response.length === ITEMS_PER_PAGE,
                    },
                });
            }
        });
    };
}