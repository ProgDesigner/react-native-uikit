'use strict';

import React from 'react';
import {
	View,
	ViewPropTypes,
	Text,
	ColorPropType,
	StyleSheet,
	requireNativeComponent,
} from 'react-native';
import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';

const defaultStyles = StyleSheet.create({
	itemStyle: {
		color:'#333333', 
		fontSize: 21
	}
});

const Picker = createReactClass({

	propTypes: {
		...ViewPropTypes,

		data: PropTypes.array,

		textColor: ColorPropType,

		textSize: PropTypes.number,

		itemStyle: Text.propTypes.style,

		itemSpace: PropTypes.number,

		onValueChange: PropTypes.func,

		selectedValue: PropTypes.any,

		selectedIndex: PropTypes.number,
	},

	getDefaultProps(): Object {
		return {
			itemStyle: defaultStyles.itemStyle,
			itemSpace: 21,
		};
	},

	getInitialState: function() {
		return this._stateFromProps(this.props);
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState(this._stateFromProps(nextProps));
	},

	_stateFromProps: function(props) {
		var selectedIndex = 0;
		var items = [];
		React.Children.forEach(props.children, function (child, index) {
			if (child.props.value === props.selectedValue) {
				selectedIndex = index;
			}
			items.push({value: child.props.value, label: child.props.label});
		});

		var itemStyle = StyleSheet.flatten(props.itemStyle);
		var textSize = itemStyle.fontSize;
		var textColor = itemStyle.color;

		return {selectedIndex, items, textSize, textColor};
	},

	_onValueChange: function(e: Event) {
		if (this.props.onValueChange) {
			this.props.onValueChange(e.nativeEvent.data);
		}
	},

	render() {

		console.log( "this.state.textColor", this.state.textColor );

		return <PickerNative
				{...this.props}
				onValueChange={this._onValueChange}
				data={this.state.items}
				textColor={this.state.textColor}
				textSize={this.state.textSize}
				selectedIndex={parseInt(this.state.selectedIndex)} />;
	}
});

Picker.Item = createReactClass({
	propTypes: {
		value: PropTypes.any, // string or integer basically
		label: PropTypes.string,
	},

	render: function() {
		// These items don't get rendered directly.
		return null;
	},
});

const PickerNative = requireNativeComponent('RNPickerAndroid', Picker);

module.exports = Picker;
