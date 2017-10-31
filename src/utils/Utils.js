export default class Utils {
    static checkItemInStorage(storageName, item) {
        let storageArray = typeof localStorage.getItem(storageName) === 'string' ? JSON.parse(localStorage.getItem(storageName)) : [];

        return storageArray.indexOf(item) !== -1;
    }

    static changeValueInQuery(queryString, id, newValue) {
        let checker = false;
        let idReg = new RegExp(id, 'i');
        let paramsArray = queryString.split('&');
        let paramsString = "";

        paramsArray.forEach(function (item) {
            if (item.search(idReg) !== -1) {
                checker = true;
                item = item.replace(/\d+/, newValue);
            }
            item = item.padStart(item.length + 1, "&");
            paramsString += item;
        });

        let finalString = checker ? paramsString : paramsString + `&${id}_gt=${newValue}`;
        return finalString.substring(1);
    }

    static IDs(idsArray, page) {
        let str = "";
        let startIndex = (page - 1) * 9;
        let accArray = idsArray.slice(startIndex, startIndex + 9);
        accArray.forEach((item) => {
            str += item + '|';
        });
        return str.substring(0, str.length - 1);
    }
}