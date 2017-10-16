'use strict';

const ReactNative = require('react-native');
const RNPermissions = ReactNative.NativeModules.RNPermissions;

const RNPTypes = [
	'unknown',
	'backgroundRefresh',
	'bluetooth',
	'camera',
	'contacts',
	'event',
	'location',
	'microphone',
	'notification',
	'photo',
	'reminder',
	'speechRecognition',
];

const DEFAULTS = {
	'location' : 'whenInUse',
	'notification': ['alert', 'badge', 'sound'],
};

class Permissions {

	canOpenSettings() {
		return RNPermissions.canOpenSettings();
	}

	openSettings() {
		return RNPermissions.openSettings();
	}

	getTypes() {
		return RNPTypes;
	}

	check(permission, options) {
  	if (!RNPTypes.includes(permission)) {
			return Promise.resolve('unsupported');
		}

		if (permission == 'microphone') {
			return Promise.resolve('restricted');
		}

		let typeOptions = (typeof options === 'object' || typeof options === 'string') ? options : undefined;
		let json = typeOptions || DEFAULTS[permission];

		return RNPermissions.getPermissionStatus(permission, json);
	}

	request(permission, options) {
		if (!RNPTypes.includes(permission)) {
			return Promise.resolve('unsupported');
		}

		if (permission == 'microphone') {
			return Promise.resolve('restricted');
		}

		if (permission == 'backgroundRefresh') {
			return Promise.reject('Permissions: You cannot request backgroundRefresh')
		}

		let typeOptions = (typeof options === 'object' || typeof options === 'string') ? options : undefined;
		let json = typeOptions || DEFAULTS[permission];

		return RNPermissions.requestPermission(permission, json);
	}

	checkMultiple(permissions) {
		return Promise.all(permissions.map(this.check.bind(this)))
			.then(results => {
				return results.reduce((finalResults, result, i) => {
					let permission = permissions[i];
					finalResults[permission] = result;
					return finalResults;
				}, {});
			});
	}
}

module.exports = new Permissions()
