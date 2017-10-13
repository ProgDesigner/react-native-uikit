'use strict';

import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes, Platform, Dimensions, } from 'react-native';
import RootSiblings from '../third-party/root-siblings';

const ScreenSize = Dimensions.get('window');

export default class Screen {

    static refresh() {
        let size = Screen.size();
        let instance = new RootSiblings(<View pointerEvents='none' style={{width:ScreenSize.width, height:ScreenSize.height, backgroundColor:'transparent'}}></View>);
        setTimeout(() => {
            instance.destroy();
        }, 0);
    }

    static size() {
        let screenWidth = Math.min( ScreenSize.width, ScreenSize.height );
        let screenHeight = Math.max( ScreenSize.width, ScreenSize.height );
        return {
            width: screenWidth,
            height: screenHeight,
        };
    }
}
