import { STORE_NAME } from '../constants/globalConstants';

export function getFavorites() {
	return typeof localStorage.getItem(STORE_NAME) !== 'string' ? [] : JSON.parse(localStorage.getItem(STORE_NAME));
}

export function addFavorite(item) {
	let favorites = getFavorites();
	favorites.push(item);

	localStorage.setItem(STORE_NAME, JSON.stringify(favorites));
}

export function removeFavorite(item) {
	const favorites = getFavorites();

	favorites.splice(favorites.indexOf(item), 1);

	localStorage.setItem(STORE_NAME, JSON.stringify(favorites));
}