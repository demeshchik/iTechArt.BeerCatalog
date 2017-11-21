import { ITEMS_PER_PAGE } from '../constants/globalConstants';
import * as Constants from '../constants/reduxConstants';

import { getNewBeers } from '../repos/beerRepository';

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

        getNewBeers(query, page)
            .then(data => {
                dispatch({
					type: Constants.LOAD_BEERS_SUCCESS,
					data: {
						beers: data,
						hasMore: data.length === ITEMS_PER_PAGE,
					},
                })
            })
            .catch(error => {
                dispatch({
					type: Constants.LOAD_BEERS_FAILED,
					data: error,
				})
			});
    };
}