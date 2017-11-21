/* eslint-disable no-unused-expressions */
import { ITEMS_PER_PAGE } from '../constants/globalConstants';
import * as Constants from '../constants/reduxConstants';

import { idCombinator } from '../utils/utils';
import { getNewBeers } from '../repos/beerRepository';
import * as favoritesRepository from '../repos/favoritesRepository';

export function loadFavorites(page) {
	return (dispatch) => {
		getNewBeers(`&ids=${idCombinator(favoritesRepository.getFavorites(), page)}`, 1)
			.then(data => {
				dispatch({
					type: Constants.LOAD_FAVORITES_SUCCESS,
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
				});
			});

	};
}

export function manageFavorites(flag, id) {
	return (dispatch) => {
		flag ? favoritesRepository.addFavorite(id) : favoritesRepository.removeFavorite(id);

		dispatch({
			type: Constants.MANAGE_FAVORITE,
            data: { flag, id },
		});
	};
}