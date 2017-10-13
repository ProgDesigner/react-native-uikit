'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet, TouchableOpacity, Text, ScrollView, Dimensions, Modal } from 'react-native';
import RootSiblings from '../third-party/root-siblings';
import Screen from './Screen';

const screenSize = Screen.size();
const [screenWidth, screenHeight] = [screenSize.width, screenSize.height];
const [minBoxWidth, minBoxHeight] = [300, 140];

export default class Dialog extends Component {

    static defaultProps = {
        animationType: 'fade',
        transparent: true,
        cancelable: true,
        title: '',
        message: '',
        styles: {},
        cancelButtonIndex: -1,
        destructiveButtonIndex: -1,
    };

    static propTypes = {
        ...ViewPropTypes,
        animationType: PropTypes.string,
        transparent: PropTypes.bool,
        cancelable: PropTypes.bool,
        title: PropTypes.string,
        message: PropTypes.string,
        styles: PropTypes.object,
        cancelButtonIndex: PropTypes.number,
        destructiveButtonIndex: PropTypes.number,
    };

    constructor(props) {
        super(props);

        this.state = {
            components: this.props.components,
            animationType: this.props.animationType,
            transparent: this.props.transparent,
            cancelable: this.props.cancelable,
            title: this.props.title,
            message: this.props.message,
            boxWidth: this.props.boxWidth,
            boxHeight: this.props.boxHeight,
            actions: this.props.actions,
            styles: this.props.styles,
            modalVisible: false,
        };
    }

    componentWillReceiveProps( newProps ) {

        this.setState({
            components: this.props.components,
            animationType: this.props.animationType,
            transparent: this.props.transparent,
            cancelable: this.props.cancelable,
            title: this.props.title,
            message: this.props.message,
            boxWidth: this.props.boxWidth,
            boxHeight: this.props.boxHeight,
            actions: this.props.actions,
            // styles: this.props.styles,
        });
    }

    _renderMask() {

        let customStyles = this.state.styles;

        return (
            <TouchableOpacity activeOpacity={1} onPress={(this.state.cancelable == true ? this._onCancel.bind(this) : null)} style={[styles.mask, customStyles.mask]} underlayColor='transparent'>
                <Text></Text>
            </TouchableOpacity>
        );
    }

    _getTitle() {
        if (this.state.title) {
            return this.state.title;
        }

        if (this.state.components && typeof this.state.components.type.getTitle === 'function') {
            return this.state.components.type.getTitle( this.state.components.props );
        }

        return null;
    }

    _renderHeader() {

        let title = this._getTitle();

        if (!title) {
            return null;
        }

        let customStyles = this.state.styles ? this.state.styles : {};

        return (
            <View style={[styles.boxHeader, customStyles.boxHeader]}>
                <Text style={[styles.boxHeaderText, customStyles.boxHeaderText]}>{title}</Text>
            </View>
        );
    }

    _getContent() {
        if (this.state.components) {
            return this.state.components;
        }

        let customStyles = this.state.styles;

        return (
            <View style={[styles.boxContentTextView, customStyles.boxContentTextView]}>
                <Text style={[styles.boxContentText, customStyles.boxContentText]}>{this.state.message}</Text>
            </View>
        );
    }

    _renderContent() {

        let customStyles = this.state.styles;

        return (
            <View style={[styles.boxContent, customStyles.boxContent,]}>
                {this._getContent()}
            </View>
        );
    }

    _getActions() {

        if (this.state.actions) {
            return this.state.actions;
        }

        if (this.state.components && typeof this.state.components.type.getActions === 'function') {
            return this.state.components.type.getActions( this.state.components.props );
        }

        return [];
    }

    _rendeFooter() {

        var actions = this._getActions();

        if (!actions || actions.length === 0) {
            return null;
        }

        let customStyles = this.state.styles;
        let buttons = actions.map( (item, i) => {
            return this._renderButton(item, i);
        });

        return (
            <View style={[styles.boxFooter, customStyles.boxFooter]}>
                {buttons}
            </View>
        );
    }

    _renderButton(item, index) {

        let customStyles = this.state.styles;
        let dialog = this;

        let onPress = () => {
            if (item.callback) {
                item.callback();
            }

            this._onClick(this, index);
        };

        let title = typeof item === 'string' ? item : item.title;
        let customButtonFrameStyle = index === 0 ? [styles.firstButtonFrame, customStyles.firstButtonFrame] : [styles.otherButtonFrame, customStyles.otherButtonFrame];
        let customButtonTextStyle = item.type === 'cancel' ? [styles.buttonCancelText, customStyles.buttonCancelText] : [styles.buttonDefaultText, customStyles.buttonDefaultText];

        return (
            <View key={index} style={[styles.buttonFrame, customButtonFrameStyle]}>
                <TouchableOpacity
                    style={[styles.button, customStyles.button, item.style]}
                    onPress={onPress.bind(this)}
                >
                    <Text style={[styles.buttonText, customButtonTextStyle, item.textStyle]}>{title}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onDismiss(sender) {

        this.setState({modalVisible: false});

        if (this.state.onDismiss) {
            this.state.onDismiss();
        }
    }

    _onCancel(sender) {

        if (this.state.cancelable === false) {
            return;
        }

        this._onClick(sender, this.state.cancelButtonIndex);
    }

    _onClick(sender, buttonIndex) {

        let dialog = this;

        if (buttonIndex > -1 && this.state.onPress) {
            this.state.onPress(buttonIndex);
        }

        this._onDismiss(this);
    }

    render() {

        var maskComponent = this._renderMask();
        var headerComponent = this._renderHeader();
        var contentComponent = this._renderContent();
        var footerComponent = this._rendeFooter();

        let style = this.state.style;
        let customStyles = this.state.styles;

        return (
            <Modal animationType={this.state.animationType} transparent={this.state.transparent} visible={this.state.modalVisible} onRequestClose={this._onCancel.bind(this)} style={[styles.modal, customStyles.modal]}>
                <View style={[styles.container, customStyles.container]}>
                    {maskComponent}
                    <View style={[styles.boxView, customStyles.box, style]}>
                        {headerComponent}
                        {contentComponent}
                        {footerComponent}
                    </View>
                </View>
            </Modal>
        );
    }

    show( options, defaultStyles = undefined ) {

        if (options) {
            var { animationType, components, cancelable, title, message, boxWidth, boxHeight, actions, onPress, onDismiss } = options;

            components = (components == undefined) ? this.props.components : components;
            animationType = (animationType == undefined) ? 'fade' : animationType;
            cancelable = (cancelable == undefined) ? true : cancelable;
            title = (title == undefined) ? '' : title;
            message = (message == undefined) ? '' : message;
            boxWidth = (boxWidth == undefined) ? this.state.boxWidth : boxWidth;
            boxHeight = (boxHeight == undefined) ? this.state.boxHeight : boxHeight;

            actions = (actions == undefined) ? this.props.actions : actions;
            onPress = (onPress == undefined) ? () => {} : onPress;
            onDismiss = (onDismiss == undefined) ? () => {} : onDismiss;

            this.setState({
                components: components,
                animationType: animationType,
                cancelable: cancelable,
                title: title,
                message: message,
                boxWidth: boxWidth,
                boxHeight: boxHeight,
                actions: actions,
                modalVisible: true,
                onPress: onPress,
                onDismiss: onDismiss,
                styles: defaultStyles == undefined ? this.state.styles : defaultStyles,
            });
        }
        else {

            this.setState({
                boxWidth: this.state.boxWidth,
                boxHeight: this.state.boxHeight,
                modalVisible: true
            });
        }
    }

    hide() {
        this._onDismiss(this);
    }

    static sharedInstance = null;

    static show( options, defaultStyles = undefined, callback = (instance) => {} ) {

        if (! Dialog.sharedInstance) {
            Dialog.sharedInstance = new RootSiblings(<Dialog ref={ref=>Dialog.sharedInstanceDialog=ref} styles={defaultStyles} />);
        }

        if (!options.onDismiss) {
            options.onDismiss = () => {

            };
        }

        if (Dialog.sharedInstance && Dialog.sharedInstanceDialog) {
            Dialog.sharedInstanceDialog.show(options, defaultStyles);
            callback(Dialog.sharedInstanceDialog);
        }
        else {
            setTimeout(() => {
                if (Dialog.sharedInstance && Dialog.sharedInstanceDialog) {
                    Dialog.sharedInstanceDialog.show(options, defaultStyles);
                    callback(Dialog.sharedInstanceDialog);
                }
            }, 100);
        }

    }

    static hide() {
        if (Dialog.sharedInstance && Dialog.sharedInstanceDialog) {
            Dialog.sharedInstanceDialog.hide();
        }
    }

    static onDismiss() {
        Dialog.hide();
    }
}   

const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    container: {
        width: screenWidth,
        height: screenHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    mask: {
        position: 'absolute',
        top: 0, right: 0, bottom: 0, left: 0,
		backgroundColor: 'rgba(0,0,0,0.4)'
	},
    boxView: {
        minWidth: minBoxWidth,
        minHeight: minBoxHeight,
        width: minBoxWidth,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
		backgroundColor: '#ffffff',
        overflow: 'hidden',
        borderWidth: 0,
        borderRadius: 8
    },
    boxHeader: {
        minHeight: 40,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    boxHeaderText: {
        paddingTop: 16,
        paddingHorizontal: 10,
        backgroundColor: 'transparent',
        color: '#333',
        fontSize: 17,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    boxContent: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContentTextView: {
        marginTop: 8,
        marginBottom: 16,
        paddingHorizontal: 10,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxContentText: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#333',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    boxFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: '100%',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        marginBottom: 0,
    },
    buttonFrame: {
        flex: 1,
        height:44,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0,
        borderRadius: 3,
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    	height: 44,
        borderWidth: 0,
        borderRadius: 0,
        margin: 0,
    },
    buttonText: {
        fontSize: 14,
        color: '#333',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    firstButtonFrame: {

    },
    otherButtonFrame: {
        borderRadius: 0,
        borderLeftWidth: 1,
        borderLeftColor: '#E0E0E0',
    },
    buttonDefaultText: {
        color: '#0D73D9',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttonCancelText: {
        color: '#C43E3D',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold'
    },
});
