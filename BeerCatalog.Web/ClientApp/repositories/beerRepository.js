import { ITEMS_PER_PAGE } from 'AppRoot/constants/globalConstants';

import { requestServer } from 'AppRoot/utils/utils';

export function getNewBeers(query, page) {
    return new Promise((resolve, reject) => {
        const paramsString = `count=${ITEMS_PER_PAGE}&page=${page}${query}`;

        requestServer(paramsString)
            .then(response => resolve(JSON.parse(response)))
            .catch(error => reject(error));
    });
}