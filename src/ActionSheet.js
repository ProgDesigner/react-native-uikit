'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, Dimensions, Modal, TouchableHighlight, TouchableOpacity, Animated, ScrollView, Platform, StatusBar, } from 'react-native';
import Screen from './Screen';

const titleHeight = 40;
const hairlineWidth = StyleSheet.hairlineWidth;
const buttonHeight = 50 + hairlineWidth;
const bottomMargin = 6;
const screenSize = Screen.size();
const [screenWidth, screenHeight] = [screenSize.width, screenSize.height];
const maxBoxHeight = screenHeight * 0.7;
const warnColor = '#ff3b30';

export default class ActionSheet extends Component {

	constructor(props) {
		super(props)

		this.scrollEnabled = false;
		this.selectedIndex = -1;
		this.boxHeight = maxBoxHeight;
        this.translateY = maxBoxHeight;
        this.state = {
			animationType: 'fade',
			transparent: true,
			cancelable: true,
            title: '',
            actions: null,
            tintColor: null,
            cancelButtonIndex: -1,
            destructiveButtonIndex: -1,
			onPress: null,

			animatedValue: new Animated.Value(screenHeight),
			modalVisible: false
		};
    }

	_calculateHeight( title, actions ) {

        let count = actions ? actions.length : 0;

		var boxHeight = (title) ? titleHeight : 0;
		boxHeight += buttonHeight * count + bottomMargin;

		if (boxHeight > maxBoxHeight) {
			this.scrollEnabled = true;
			return maxBoxHeight;
		}

		this.scrollEnabled = false;
		return boxHeight;
	}

    _animateToShow() {

		Animated.timing(this.state.animatedValue, {
			toValue: 0,
			duration: 250
		}).start()
    }

    _animateToHide( callback ) {

        Animated.timing(this.state.animatedValue, {
			toValue: this.translateY,
			duration: 150
		}).start(callback || function() {})
    }

    _onDismiss(sender) {

		this._animateToHide(() => {
			this.setState({modalVisible: false});

			if (this.selectedIndex > -1 && this.state.onPress) {
				this.state.onPress(this.selectedIndex);
			}
		});
    }

    _onCancel(sender) {

        this._onClick(sender, this.state.cancelButtonIndex);
    }

    _onClick(sender, buttonIndex) {

        this.selectedIndex = buttonIndex;
        this._onDismiss(this);
    }

    _renderMask() {

        return (
            <TouchableOpacity activeOpacity={1} onPress={(this.state.cancelable == true ? this._onCancel.bind(this) : null)} style={styles.mask} underlayColor='transparent'>
                <Text></Text>
            </TouchableOpacity>
        );
    }

	_renderHeader() {

		let title = this.state.title;

		if (!title) {
			return null;
		}

		if (React.isValidElement(title)) {
			return (
				<View style={styles.title}>{title}</View>
			);
		}

		return (
			<View style={styles.title}>
				<Text style={styles.titleText}>{title}</Text>
			</View>
		);
	}

	_renderContent() {

		if (this.props.components) {
			return (
				<View>
					{this.props.components}
				</View>
			);
		}

		let {actions, tintColor, cancelButtonIndex, destructiveButtonIndex} = this.state;

		if (!actions) {
			return null;
		}

		return actions.map((action, index) => {
			let fontColor = destructiveButtonIndex === index ? warnColor : tintColor;
			return index === cancelButtonIndex ? null : this._renderButton(action, fontColor, index);
		});
	}

    _renderButton(action, fontColor, index, style) {

		let title = typeof action === 'string' ? action : action.title || '';
		let callback = typeof action === 'object' && typeof action.callback === 'function' ? action.callback : () => {};

		var titleNode = null;

		if (React.isValidElement(title)) {
			titleNode = title
		} else {
			titleNode = <Text style={[styles.buttonText, {color: fontColor}]}>{title}</Text>
		}

		var onPress = () => {

			this._onClick(this, index);

			setTimeout( () => {
				callback();
			}, 750);
        };

		return (
			<TouchableHighlight
				key={index}
				activeOpacity={1}
				underlayColor="#f4f4f4"
				style={[styles.button, style || {}]}
				onPress={onPress.bind(this)}
			>
				{titleNode}
			</TouchableHighlight>
		);
    }

	_renderFooter() {

		let {actions, cancelButtonIndex, tintColor} = this.state;

		if (!actions) {
			return null;
		}

		if (cancelButtonIndex > -1 && actions[cancelButtonIndex]) {

			let action = actions[cancelButtonIndex];
			if (!action) {
				return null;
			}

			let title = typeof action === 'string' ? action : action.title || '';

			return (
				<TouchableHighlight
					activeOpacity={1}
					underlayColor="#f4f4f4"
					style={[styles.button, {marginTop: 6}]}
					onPress={this._onCancel.bind(this)}
				>
					<Text style={[styles.buttonText, {fontWeight: '700', color: tintColor}]}>{title}</Text>
				</TouchableHighlight>
			);
		}

		return null;
	}

    render() {

		let { animatedValue } = this.state;

		let maskComponent = this._renderMask();
		let headerComponent = this._renderHeader();
		let contentComponent = this._renderContent();
		let footerComponent = this._renderFooter();

        return (
            <Modal animationType={this.state.animationType} transparent={this.state.transparent} visible={this.state.modalVisible} onRequestClose={this._onCancel.bind(this)} style={styles.modal}>
				<View style={styles.container}>
	                {maskComponent}
					<Animated.View style={[styles.content, {height: this.boxHeight, transform:[{translateY:animatedValue}]}]}>
						{headerComponent}
						<ScrollView scrollEnabled={this.scrollEnabled} contentContainerStyle={styles.scroll}>
							{contentComponent}
						</ScrollView>
						{footerComponent}
					</Animated.View>
				</View>
            </Modal>
        );
    }

	show( options ) {

		this.selectedIndex = -1;

        if (options) {
            var { title, actions, tintColor, cancelButtonIndex, destructiveButtonIndex, onPress } = options;

            title = (title === undefined) ? this.props.title : title;
            actions = (actions === undefined) ? this.props.actions : actions;
            tintColor = (tintColor === undefined) ? this.props.tintColor : tintColor;

			actions.map((action, index) => {
				if (typeof action === 'object') {
					if (action.type === 'cancel') {
						cancelButtonIndex = index;
					}
					else if (action.type === 'destructive') {
						destructiveButtonIndex = index;
					}
				}
			});

			cancelButtonIndex = (cancelButtonIndex === undefined) ? this.props.cancelButtonIndex : cancelButtonIndex;
            destructiveButtonIndex = (destructiveButtonIndex === undefined) ? this.props.cancelButtonIndex : destructiveButtonIndex;

			onPress = (onPress === undefined) ? this.props.onPress : onPress;

			let statusBarHeight = Platform.OS === 'ios' ? 0 : StatusBar.currentHeight;

			this.boxHeight = this._calculateHeight(title, actions);
			this.translateY = screenHeight - this.boxHeight;

			this.setState({
				title: title,
				actions: actions,
				tintColor: tintColor,
				cancelButtonIndex: cancelButtonIndex,
				destructiveButtonIndex: destructiveButtonIndex,
				onPress: onPress,
				modalVisible: true
			});
        }
        else {
			this.setState({modalVisible: true});
        }

		this._animateToShow();
	}

	hide() {

		this._onDismiss(this);
	}
}

const styles = StyleSheet.create({
    modal: {

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    mask: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
	content: {
		position: 'absolute',
		width:'100%',
		bottom: 0,
		backgroundColor: '#e5e5e5'
	},
	title: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	titleText: {
		color: '#8f8f8f',
		fontSize: 12
	},
	scroll: {
		flex: 1,
	},
    button: {
		height: 50,
		marginTop: hairlineWidth,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	buttonText: {
		fontSize: 18
	}
});
