/* eslint-disable no-unused-expressions */
import * as Constants from '../constants/globalConstants';

// TODO: invoke callback

export default class Wrapper {
	static getBeers(query, page, callback) {
		const xhr = new XMLHttpRequest();
		const path = `${Constants.BASE_PATH}?per_page=${Constants.ITEMS_PER_PAGE}&page=${page}${query}`;

		xhr.open('get', path, true);
		xhr.send();

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				const response = JSON.parse(xhr.responseText);

				callback(response, xhr.status === 200);
			}
		};
	}

	static getBeer(id, callback) {
		const xhr = new XMLHttpRequest();
		const path = `${Constants.BASE_PATH}?ids=${id}`;

		xhr.open('get', path, true);
		xhr.send();

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				const response = JSON.parse(xhr.responseText);

				xhr.status === 200 ? callback(response[0], false) : callback(response, true);
			}
		};
	}

	static getFavorites() {
		return typeof localStorage.getItem('favorites') !== 'string' ? [] : JSON.parse(localStorage.getItem('favorites'));
	}

	static favoriteManager(flag, item) {
		const faves = Wrapper.getFavorites();

		flag ? faves.push(item) : faves.splice(faves.indexOf(item), 1);

		localStorage.setItem('favorites', JSON.stringify(faves));
	}
}