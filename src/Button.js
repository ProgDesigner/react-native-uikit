'use strict';

import React from 'react';
import {View,TouchableHighlight, TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableNativeFeedback, Platform} from 'react-native';
import isEqual from 'lodash.isequal';

const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');

const Button = createReactClass({
    propTypes: {
        textStyle: Text.propTypes.style,
        disabledStyle: Text.propTypes.style,
        children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.element]),
        touchableType: PropTypes.string,
        underlayColor: PropTypes.string,
        //containerStyle: Text.propTypes.style,
        accessibilityLabel: PropTypes.string,
        activeOpacity: PropTypes.number,
        allowFontScaling: PropTypes.bool,
        isLoading: PropTypes.bool,
        isDisabled: PropTypes.bool,
        activityIndicatorColor: PropTypes.string,
        delayLongPress: PropTypes.number,
        delayPressIn: PropTypes.number,
        delayPressOut: PropTypes.number,
        onPress: PropTypes.func,
        onLongPress: PropTypes.func,
        onPressIn: PropTypes.func,
        onPressOut: PropTypes.func,
        background: (TouchableNativeFeedback.propTypes)
            ? TouchableNativeFeedback.propTypes.background
            : PropTypes.any
    },

    // statics: {
    //   isAndroid: (Platform.OS === 'android'),
    // },

    _renderChildren: function() {
        let childElements = [];
        React.Children.forEach(this.props.children, (item) => {
            if (typeof item === 'string' || typeof item === 'number') {
                const element = (
                    <Text style={[styles.textButton, this.props.textStyle]} allowFontScaling={this.props.allowFontScaling} key={item}>
                        {item}
                    </Text>
                );
                childElements.push(element);
            } else if (React.isValidElement(item)) {
                childElements.push(item);
            }
        });
        return (childElements);
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        if (!isEqual(nextProps, this.props)) {
            return true;
        }
        return false;
    },

    _renderInnerText: function() {
        if (this.props.isLoading) {
            return (<ActivityIndicator animating={true} size='small' style={styles.spinner} color={this.props.activityIndicatorColor || 'black'}/>);
        }
        return this._renderChildren();
    },

    render: function() {
        if (this.props.isDisabled === true || this.props.isLoading === true) {
            return (
                <View style={[
                    styles.button,
                    this.props.style,
                    (this.props.disabledStyle || styles.opacity)
                ]}>
                    {this._renderInnerText()}
                </View>
            );
        }

        let touchableType = this.props.touchableType;

        if (touchableType === 'highlight') {
            // Extract Touchable props
            let touchableProps = {
                accessibilityLabel: this.props.accessibilityLabel,
                onPress: this.props.onPress,
                onPressIn: this.props.onPressIn,
                onPressOut: this.props.onPressOut,
                onLongPress: this.props.onLongPress,
                underlayColor: this.props.underlayColor,
                delayLongPress: this.props.delayLongPress,
                delayPressIn: this.props.delayPressIn,
                delayPressOut: this.props.delayPressOut,
                tag: this.props.tag,
            };
            return (
                <TouchableHighlight {...touchableProps} style={[styles.button, this.props.style]}>
                    <View style={[this.props.containerStyle]}>
                        {this._renderInnerText()}
                    </View>
                </TouchableHighlight>
            );
        }

        // Extract Touchable props
        let touchableProps = {
            accessibilityLabel: this.props.accessibilityLabel,
            onPress: this.props.onPress,
            onPressIn: this.props.onPressIn,
            onPressOut: this.props.onPressOut,
            onLongPress: this.props.onLongPress,
            activeOpacity: this.props.activeOpacity,
            delayLongPress: this.props.delayLongPress,
            delayPressIn: this.props.delayPressIn,
            delayPressOut: this.props.delayPressOut,
            tag: this.props.tag,
        };

        return (
            <TouchableOpacity {...touchableProps} style={[styles.button, this.props.style]}>
                {this._renderInnerText()}
            </TouchableOpacity>
        );
    }
});

const styles = StyleSheet.create({
    button: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    textButton: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    spinner: {
        alignSelf: 'center'
    },
    opacity: {
        opacity: 0.5
    }
});

module.exports = Button;
