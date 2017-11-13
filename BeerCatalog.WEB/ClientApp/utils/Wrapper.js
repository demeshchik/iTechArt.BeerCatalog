/* eslint-disable no-unused-expressions */
import * as Constants from '../constants/constants';

export default class Wrapper {
	static getBeers(query, page, callback) {
		const xhr = new XMLHttpRequest();
		const path = `${Constants.BASE_PATH}?per_page=12&page=${page}${query}`;

		xhr.open('get', path, true);
		xhr.send();

		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				const response = JSON.parse(xhr.responseText);

				if (xhr.status === 200) {
					callback(response, false);
				} else {
					callback(response, true);
				}
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

				if (xhr.status === 200) {
					callback(response[0], false);
				} else {
					callback(response, true);
				}
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