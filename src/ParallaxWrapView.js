'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Animated, StatusBar } from 'react-native';

export default class ParallaxWrapView extends Component {

    static propTypes = {
        wrapHeight: PropTypes.number,
    };

    static defaultProps = {
        wrapHeight: 300,
    };

    onScroll(e) {
        let scrollY = e.nativeEvent.contentOffset.y - 20;
        this.state.scrollY.setValue(scrollY);
    }

    constructor(props) {
        super(props);

        this.state = {
            wrapHeight: this.props.wrapHeight,
            scrollY: new Animated.Value(0)
        };
    }

    render() {

        let { children } = this.props;
        let { scrollY, wrapHeight } = this.state;

        let transformStyle = {
            transform: [
                {
                    translateY: scrollY.interpolate({
                        inputRange: [ - wrapHeight, 0, wrapHeight],
                        outputRange: [ - wrapHeight * 0.5, 0, 0]
                    })
                },
                {
                   scale: scrollY.interpolate({
                       inputRange: [ - wrapHeight, 0, wrapHeight],
                       outputRange: [2, 1, 1]
                   })
                }
            ]
        };

        return (
            <Animated.View style={[styles.container, transformStyle]}>
                {children}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    }
});
