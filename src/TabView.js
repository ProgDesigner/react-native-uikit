'use strict';

import React, {Component} from 'react';
import { Animated, Easing, View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

class TabItem extends Component {

    render() {

        let {styles, children} = this.props;

        return (
            <TouchableHighlight underlayColor={'white'} onPress={this.onSelect.bind(this)} style={tabItemStyle.wrapper, styles.item}>
                <View style={[tabItemStyle.container, styles.itemContainer]}>
                    {children}
                </View>
            </TouchableHighlight>
        );
    }

    onSelect() {

        this.props.onSelect && this.props.onSelect();
    }
}

export default class TabView extends Component {

    constructor(props) {
        super(props);

        let tabIndex = props.tabIndex > 0 ? props.tabIndex : 0;

        this.state = {
            text: '',
            tabIndex: tabIndex,
            stopAnimation: false,
            lineAnimationValue: new Animated.Value(0)
        };
    }

    animate( index, callback = () => {} ) {
        var {children} = this.props;
        var barCount = children ? children.length : 0;
        var barWidthRatio = barCount > 0 ? 100 / barCount : 100;
        var tabIndex = index || 0;
        var toValue = barCount > 0 ? tabIndex / barCount : 0;

        Animated.timing(this.state.lineAnimationValue, {
            toValue: toValue,
            duration: 250,
            easing: Easing.easingInOut
        }).start((animation) => {
            callback();
        });
    }

    render() {
        var {styles, lineStyle, barColor, barWidth, children} = this.props;

        if (!barWidth) {
            barWidth = 4;
        }

        if (!barColor) {
            barColor = "#ff0000";
        }

        var barCount = children ? children.length : 0;
        var barWidthRatio = barCount > 0 ? 100 / barCount : 100;

        const lineLeft = this.state.lineAnimationValue.interpolate({
            inputRange: [ 0, 1 ],
            outputRange: ['0%', '100%']
        });

        var lineAnimationStyle = {
            left: lineLeft,
            width: barWidthRatio + '%',
            height: barWidth,
            backgroundColor: barColor
        };

        return (
            <View style={[tabViewStyle.wrapper, styles.wrapper]}>
                <View style={[tabViewStyle.container, styles.container]}>
                    {this.renderChildren(children)}
                </View>
                <Animated.View style={[tabViewStyle.line, styles.line, lineAnimationStyle, lineStyle]}></Animated.View>
            </View>
        );
    }

    renderChildren(children) {

        let {styles} = this.props;

        return React.Children.map(children, (child, index) => {
            if (child.type === TabItem) {
                var isOn = index === this.state.tabIndex
                    ? true
                    : false;
                return React.cloneElement(child, {
                    isOn: isOn,
                    styles: styles,
                    onSelect: (event) => {
                        this.itemDidSelect(child, index);
                    }
                })
            }

            return child
        })
    }

    itemDidSelect(item, index) {

        this.animate(index, () => {
            this.setState({tabIndex: index});
        });

        this.props.onItemSelected && this.props.onItemSelected.apply(this, [index]);
    }
}

const tabItemStyle = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    }
});

const tabViewStyle = StyleSheet.create({
    wrapper: {},
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center"
    },
    line: {
        position: 'absolute',
        bottom: 0,
    }
});

TabView.Item = TabItem;
