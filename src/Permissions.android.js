'use strict';

const ReactNative = require('react-native');
const RNPermissions = ReactNative.NativeModules.RNPermissions;
const PermissionsAndroid = ReactNative.PermissionsAndroid;
const AsyncStorage = ReactNative.AsyncStorage;
const Device = require('./Device');

const RNPTypes = {
	location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	camera: PermissionsAndroid.PERMISSIONS.CAMERA,
	microphone: PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
	contacts: PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
	event: PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
	storage: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
	photo: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
};

const RESULTS = {
	[ PermissionsAndroid.RESULTS.GRANTED ]: 'authorized',
	[ PermissionsAndroid.RESULTS.DENIED ]: 'denied',
	[ PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN ]: 'restricted',
};

const STORAGE_KEY = '@RNPermissions:didAskPermission:';

const setDidAskOnce = p => AsyncStorage.setItem(STORAGE_KEY + p, 'true');
const getDidAskOnce = p =>  AsyncStorage.getItem(STORAGE_KEY + p).then(res => !!res);
const shouldShowRationale = ReactNative.NativeModules.PermissionsAndroid.shouldShowRequestPermissionRationale;

console.log( "RNPermissions", RNPermissions );

class Permissions {

	canOpenSettings() {
		return true;
	}

	openSettings() {
		return RNPermissions.openSettings();
	}

	getTypes() {
		return Object.keys(RNPTypes);
	}

	check(permission) {
		const androidPermission = RNPTypes[permission];

		if (!androidPermission) {
			return Promise.resolve('unsupported');
		}

		return PermissionsAndroid.check(androidPermission)
			.then(granted => {

				if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
					return 'authorized';
				}

				return getDidAskOnce(permission)
					.then(didAsk => {
						if (didAsk) {

							if (Device.getAndroidSDKVersion() < 23) {
								return 'authorized';
							}

							return shouldShowRationale(androidPermission)
								.then(shouldShow => {
									console.log( 'shouldShow', shouldShow );
									return shouldShow ? 'denied' : 'restricted'
								});
						}
						return 'undetermined';
					});
			});
	}


	request(permission, json = {}, options = {}) {
		const androidPermission = RNPTypes[permission];

		if (!androidPermission) {
			return Promise.resolve('unsupported');
		}

		return PermissionsAndroid.request(androidPermission, options)
			.then(granted => {

				return setDidAskOnce(permission)
					.then(() => {

						if (granted === true || granted === PermissionsAndroid.RESULTS.GRANTED) {
							return 'authorized'
						}

						if (Device.getAndroidSDKVersion() < 23) {
							return 'authorized';
						}

						return shouldShowRationale(androidPermission)
							.then(shouldShow => {
								console.log( 'shouldShow', shouldShow );
								return shouldShow ? 'denied' : 'restricted'
							});
					});
			});
	}

	checkMultiple(permissions) {
		return Promise.all(permissions.map(this.check.bind(this)))
			.then(res => res.reduce((pre, cur, i) => {
				var name = permissions[i]
				pre[name] = cur
				return pre
			}, {}));
	}
}

module.exports = new Permissions();
