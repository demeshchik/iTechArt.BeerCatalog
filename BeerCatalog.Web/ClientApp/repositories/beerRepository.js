import { ITEMS_PER_PAGE } from '../constants/globalConstants';

import { requestServer } from '../utils/utils';

export function getNewBeers(query, page) {
    return new Promise((resolve, reject) => {
        const paramsString = `per_page=${ITEMS_PER_PAGE}&page=${page}${query}`;

        requestServer(paramsString)
            .then(response => resolve(JSON.parse(response)))
            .catch(error => reject(error));
    });
}