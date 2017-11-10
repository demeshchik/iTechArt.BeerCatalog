import * as Constants from '../constants/constants'

export default class Wrapper {
    static getBeers(query, page, callback) {
        let xhr = new XMLHttpRequest();
        let path = Constants.BASE_PATH + '?per_page=12&page=' + page + query;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                let response = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {
                    callback(response, false);
                }
                else {
                    callback(response, true);
                }
            }
        }
    }

    static getBeer(id, callback) {
        let xhr = new XMLHttpRequest();
        let path = `${Constants.BASE_PATH}?ids=${id}`;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                let response = JSON.parse(xhr.responseText);

                if (xhr.status === 200) {
                    callback(response[0], false);
                }
                else {
                    callback(response, true);
                }
            }
        }
    }

    static getFaves() {
        return typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));
    }

    static faveManager(flag, item) {
        let faves = Wrapper.getFaves();

        flag ? faves.push(item) : faves.splice(faves.indexOf(item), 1);

        localStorage.setItem('faves', JSON.stringify(faves));
    }
}