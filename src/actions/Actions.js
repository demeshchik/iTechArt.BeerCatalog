import * as Constants from '../constants/Constants'

import Utils from '../utils/Utils'

function getBeers(dispatch, successAction, query, page) {
    let xhr = new XMLHttpRequest();
    let path = Constants.BASE_PATH + '?per_page=12&page=' + page + query;

    xhr.open('get', path, true);
    xhr.send();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);

            if (xhr.status === 200) {
                dispatch({
                    type: successAction,
                    data: {
                        beers: response,
                        hasMore: response.length === 12
                    }

                })
            }
            else {
                dispatch({
                    type: Constants.LOAD_BEERS_FAILED,
                    data: response
                })
            }
        }
    }
}

export function clearStore() {
    return function (dispatch) {
        dispatch({
            type: Constants.CLEAR_STORE,
            data: null
        })
    }
}

export function loadBeers(query, page) {
    return function (dispatch) {
        if (page === 1) {
            dispatch({
                type: Constants.CLEAR_STORE,
                data: null
            })
        }

        getBeers(dispatch, Constants.LOAD_BEERS_SUCCESS, query, page);
    }
}

export function loadFaves(page) {
    return function (dispatch) {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        getBeers(dispatch, Constants.LOAD_FAVES_SUCCESS, `&ids=${Utils.IDs(faves, page)}`, page);
    }
}

export function manageFave(flag, item) {
    return function (dispatch) {
        let faves = typeof localStorage.getItem('faves') !== 'string' ? [] : JSON.parse(localStorage.getItem('faves'));

        flag ? faves.push(item) : faves.splice(faves.indexOf(item), 1);

        localStorage.setItem('faves', JSON.stringify(faves));

        dispatch({
            type: Constants.MANAGE_FAVE,
            data: {flag, item}
        });
    }
}