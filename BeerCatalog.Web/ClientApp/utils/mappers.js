import { getArrayMash, getMappedIngredients } from './utils';

const Mappers = {
    method(method) {
        return {
            mash: getArrayMash(method.mash_temp),
            fermentation: [`Perfom at ${method.fermentation.temp.value} °C`],
            twist: [method.twist ? method.twist : ''],
        };
    },
    food(foodPairing) {
        return {
            food: foodPairing,
        };
    },
    ingredients(ingredients) {
        return getMappedIngredients(ingredients);
    },
    properties(beer) {
        return {
            abv: {
                value: beer.abv,
                tooltip: 'Alcohol by volume',
            },
            ebc: {
                value: beer.ebc,
                tooltip: 'Color by EBC',
            },
            ibu: {
                value: beer.ibu,
                tooltip: 'International bitterness units',
            },
        };
    },
};

export default Mappers;