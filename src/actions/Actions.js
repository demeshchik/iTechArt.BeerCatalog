import * as Constants from '../constants/Constants'

export function getBeers(query, page) {
    return function (dispatch) {
        if (page === 1) {
            dispatch({
                type: Constants.CLEAR_STORE,
                data: null
            })
        }

        let xhr = new XMLHttpRequest();
        let path = Constants.BASE_PATH + '?per_page=9&page=' + page + query;

        xhr.open('get', path, true);
        xhr.send();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    dispatch({
                        type: Constants.GET_BEERS_SUCCESS,
                        data: JSON.parse(xhr.responseText)
                    })
                } else {
                    dispatch({
                        type: Constants.GET_BEERS_FAILED,
                        data: JSON.parse(xhr.responseText)
                    })
                }
            }
        }
    }
}