import {Platform, NativeModules, DeviceEventEmitter} from 'react-native';

const RNDevice = NativeModules.RNDevice;

class Device {
    getUniqueID() {
      return RNDevice.uniqueId;
    }

    getDeviceID() {
      return RNDevice.deviceId;
    }

    getManufacturer() {
      return RNDevice.systemManufacturer;
    }

    getModel() {
      return RNDevice.model;
    }

    getBrand() {
      return RNDevice.brand;
    }

    getSystemName() {
      return RNDevice.systemName;
    }

    getSystemVersion() {
      return RNDevice.systemVersion;
    }

    getAndroidSDKVersion() {
      if (Platform.OS === 'android') {
        return RNDevice.sdkVersion;
      }

      return 0;
    }

    getBundleID() {
      return RNDevice.bundleId;
    }

    getBuildNumber() {
      return RNDevice.buildNumber;
    }

    getVersion() {
      return RNDevice.appVersion;
    }

    getReadableVersion() {
      return RNDevice.appVersion + "." + RNDevice.buildNumber;
    }

    getDisplayName() {
      return RNDevice.displayName;
    }

    getDeviceName() {
      return RNDevice.deviceName;
    }

    getDeviceLocale() {
      return RNDevice.deviceLocale;
    }

    getLanguage() {
      if (RNDevice.deviceLocale.indexOf('-') === -1) {
        return RNDevice.deviceLocale;
      }
      let components = RNDevice.deviceLocale.split('-');
      return components[0];
    }

    getDeviceCountry() {
      return RNDevice.deviceCountry;
    }

    getTimezone() {
      return RNDevice.timezone;
    }

    isEmulator() {
      return RNDevice.isEmulator;
    }

    isTablet() {
      return RNDevice.isTablet;
    }
}

module.exports = new Device();
