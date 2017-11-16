import { ITEMS_PER_PAGE } from "../constants/globalConstants";
import * as Constants from '../constants/reduxConstants';

import { idCombinator } from '../utils/utils';
import Wrapper from '../utils/Wrapper';

export function loadFavorites(page) {
	return (dispatch) => {
		Wrapper.getBeers(`&ids=${idCombinator(Wrapper.getFavorites(), page)}`, page, (response, flag) => {
			if (flag) {
				dispatch({
					type: Constants.LOAD_BEERS_FAILED,
					data: response,
				});
			} else {
				dispatch({
					type: Constants.LOAD_FAVORITES_SUCCESS,
					data: {
						beers: response,
						hasMore: response.length === ITEMS_PER_PAGE,
					},
				});
			}
		});
	};
}

export function manageFavorites(flag, item) {
	return (dispatch) => {
		Wrapper.favoriteManager(flag, item);

		Wrapper.getBeer(item, (beer) => {
			dispatch({
				type: Constants.MANAGE_FAVORITE,
				data: { flag, beer },
			});
		});
	};
}
