/* eslint-disable no-param-reassign */
export default class Utils {
	static uniqueArray(array) {
		const obj = {};

		for (let i = 0; i < array.length; i++) {
			const item = array[i];
			obj[item] = true;
		}

		return Object.keys(obj);
	}

	static checkItemInStorage(storageName, item) {
		const storageArray = typeof localStorage.getItem(storageName) === 'string' ? JSON.parse(localStorage.getItem(storageName)) : [];

		return storageArray.indexOf(item) !== -1;
	}

	static changeValueInQuery(queryString, id, newValue) {
		let checker = false;
		const idReg = new RegExp(id, 'i');
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

		const finalString = checker ? paramsString : `${paramsString}&${id}_gt=${newValue}`;
		return finalString.substring(1);
	}

	static IDs(idsArray, page) {
		let str = '';
		const startIndex = (page - 1) * 12;
		const accArray = idsArray.slice(startIndex, startIndex + 12);
		accArray.forEach((item) => {
			str += `${item}|`;
		});
		return str.substring(0, str.length - 1);
	}
}