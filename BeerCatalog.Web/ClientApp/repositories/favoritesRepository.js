import { STORE_NAME } from '../constants/globalConstants';
import { saveFavorite } from '../utils/utils';

export function getFavorites() {
    return typeof localStorage.getItem(STORE_NAME) !== 'string' ? [] : JSON.parse(localStorage.getItem(STORE_NAME));
}

export function addFavorite(item) {
    const favorites = getFavorites();

    favorites.push(item);

    saveFavorite(JSON.stringify(favorites));
}

export function removeFavorite(item) {
    const favorites = getFavorites();

    favorites.splice(favorites.indexOf(item), 1);

    saveFavorite(JSON.stringify(favorites));
}