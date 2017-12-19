/* eslint-disable no-param-reassign */
import { ITEMS_PER_PAGE, BASE_PATH, STORE_NAME } from 'AppRoot/constants/globalConstants';

export function checkItemInStorage(storageName, item) {
    const storageArray = typeof localStorage.getItem(storageName) === 'string' ? JSON.parse(localStorage.getItem(storageName)) : [];

    return storageArray.indexOf(item) !== -1;
}

export function changeValueInQuery(queryString, paramName, newValue) {
    let checker = false;
    const idReg = new RegExp(paramName, 'i');
    const paramsArray = queryString.split('&');
    let paramsString = '';

    paramsArray.forEach((item) => {
        if (item.search(idReg) !== -1) {
            checker = true;
            item = item.replace(/\d+/, newValue);
        }
        item = item.padStart(item.length + 1, '&');
        paramsString += item;
    });

    const finalString = checker ? paramsString : `${paramsString}&${paramName}=${newValue}`;
    return finalString.substring(1);
}

export function idCombinator(array, page) {
    let str = '';
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const accArray = array.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    accArray.forEach((item) => {
        str += `${item}|`;
    });
    return str.substring(0, str.length - 1);
}

export function requestServer(query) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const path = `${BASE_PATH}?${query}`;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    resolve(xhr.responseText);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            }
        };
    });
}

export function saveFavorite(favorites) {
    localStorage.setItem(STORE_NAME, favorites);
}

export function getArrayMash(targetMash) {
    const array = [];

    targetMash.forEach((item) => {
        const mash = `${item.duration} minutes at ${item.temp.value} °C`;
        array.push(mash);
    });

    return array;
}

export function getMappedIngredients(targetIngredients) {
    const generatedObject = {};

    Object.keys(targetIngredients).forEach((key) => {
        const ingredient = targetIngredients[key];

        if (typeof ingredient === 'string') {
            generatedObject[key] = [ingredient];
        } else {
            const array = [];

            ingredient.forEach((item) => {
                let mash = `${item.name} - ${item.amount.value} ${item.amount.unit}`;
                if ('add' in item) {
                    mash += ` add at ${item.add}`;
                }
                array.push(mash);
            });

            generatedObject[key] = array;
        }
    });

    return generatedObject;
}