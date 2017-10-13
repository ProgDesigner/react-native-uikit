'use strict';

import React, {Component} from 'react';
import { Animated, Easing, View, Text, TextInput, TouchableHighlight, StyleSheet, Platform } from 'react-native';

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

const deepcopy = require('deepcopy');
const includes = require('array-includes');

export class InputText extends Component {

    get tag() {
        return this.props.tag;
    }

    get contentComponent() {
        return this._contentRef;
    }

    get value() {

        if (this._innerValue) {
            return this._innerValue;
        }

        if (this._contentRef) {
            if (typeof this._contentRef._lastNativeText === 'undefined') {
                return this._contentRef._getText();
            }

            return this._contentRef._lastNativeText;
        }

        return this.props.defaultValue;
    }

    set value(value) {
        var nativeProps = { text: value };

        this._innerValue = value;

        if (this._contentRef && this._contentRef._inputRef) {
            this._contentRef._lastNativeText = value;
            this._contentRef._inputRef.setNativeProps(nativeProps);
            this._contentRef.forceUpdate();
        }
    }

    get isBlank() {
        return (!this.value) ? true : false;
    }

    get isFocused() {
        if (this._contentRef) {
            return this._contentRef.isFocused();
        }

        return false;
    }

    setNativeProps(props) {
        if (this._contentRef && this._contentRef._inputRef) {
            this._contentRef._inputRef.setNativeProps(props);
        }
    }

    clear() {
        this._innerValue = '';

        if (this._contentRef) {
            return this._contentRef.clear();
        }
    }

    focus() {
        if (this._contentRef) {
            this._contentRef.focus();
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            isFocused: false,
        };
    }

    render() {
        let {
            accessibilityLabel,
            autoCapitalize,
            autoCorrect,
            autoFocus,
            caretHidden,
            clearButtonMode,
            clearTextOnFocus,
            dataDetectorTypes,
            dblurOnSubmit,
            defaultValue,
            disableFullscreenUI,
            editable,
            enablesReturnKeyAutomatically,
            inlineImageLeft,
            inlineImagePadding,
            keyboardAppearance,
            keyboardType,
            maxLength,
            multiline,
            numberOfLines,
            // onBlur,
            onChangeText,
            onContentSizeChange,
            onEndEditing,
            // onFocus,
            onFocusxonChange,
            onKeyPress,
            onLayout,
            onScroll,
            onSelectionChange,
            onSubmitEditing,
            placeholder,
            placeholderTextColor,
            returnKeyLabel,
            returnKeyType,
            secureTextEntry,
            selection,
            selectionColor,
            selectionState,
            selectTextOnFocus,
            spellCheck,
            style,
            textAlign,
            // value,
            // underlineColorAndroid,

            placeholderStyle,
            userStyle,
            inputStyle,
        } = this.props;

        let newProps = {
            accessibilityLabel: accessibilityLabel,
            autoCapitalize: autoCapitalize,
            autoCorrect: autoCorrect,
            autoFocus: autoFocus,
            caretHidden: caretHidden,
            clearButtonMode: clearButtonMode,
            clearTextOnFocus: clearTextOnFocus,
            dataDetectorTypes:dataDetectorTypes ,
            dblurOnSubmit: dataDetectorTypes,
            defaultValue: defaultValue,
            disableFullscreenUI: disableFullscreenUI,
            // editable: editable,
            enablesReturnKeyAutomatically: enablesReturnKeyAutomatically,
            inlineImageLeft: inlineImageLeft,
            inlineImagePadding: inlineImagePadding,
            keyboardAppearance: keyboardAppearance,
            keyboardType: keyboardType,
            maxLength: maxLength,
            multiline: multiline,
            numberOfLines: numberOfLines,
            //onBlur: onBlur,
            // onChangeText: onChangeText,
            onContentSizeChange: onContentSizeChange,
            onEndEditing: onEndEditing,
            //onFocus: onFocus,
            onFocusxonChange: onFocusxonChange,
            onKeyPress: onKeyPress,
            onLayout: onLayout,
            onScroll: onScroll,
            onSelectionChange: onSelectionChange,
            onSubmitEditing,
            // placeholder: placeholder,
            // placeholderTextColor: placeholderTextColor,
            returnKeyLabel: returnKeyLabel,
            returnKeyType: returnKeyType ,
            secureTextEntry: secureTextEntry,
            selection: selection,
            selectionColor: selectionColor,
            selectionState: selectionState,
            selectTextOnFocus: selectTextOnFocus,
            spellCheck: spellCheck,
            textAlign: textAlign,
            // underlineColorAndroid
        };

        let pointerEvents = editable === false ? 'none' : 'auto';
        let userInputStyle = StyleSheet.flatten(inputStyle);
        var fontSize = styles.input && styles.input.fontSize ? styles.input.fontSize : 15;
        fontSize = userInputStyle && userInputStyle.fontSize ? userInputStyle.fontSize : fontSize;

        let textAlignStyle = ( textAlign ) ? { textAlign:textAlign } : undefined;
        let textHeightStyle = userStyle && userStyle.height ? { height:userStyle.height } : undefined;

        let placeholderBaseStyle = {position:'absolute', left:0, top:0, width:'100%', backgroundColor:'transparent', paddingVertical: 4, paddingHorizontal:8, opacity: 0.5};

        placeholderBaseStyle.height = userStyle && userStyle.height ? userStyle.height : undefined;

        let placeholderAlignStyle = multiline === true ? {flexDirection:'row', justifyContent:'flex-start', alignItems:'flex-start', } : {flexDirection:'row', justifyContent:'flex-start', alignItems:'center' };
        let placeholderVisibleStyle = this.state.isFocused === false && this.isBlank === true ? {} : {display:'none'};

        //let inputViewStyle = undefined;//multiline === true ? { alignItems:'flex-start', backgroundColor: '#ff3300', } : {};
        let inputViewStyle = userStyle && userStyle.height ? { height:userStyle.height } : undefined;

        return (
            <View pointerEvents={pointerEvents} accessibilityLabel={accessibilityLabel} style={[styles.inputContainer, style, inputViewStyle]} onLayout={this.onLayout}>
                <TextInput {...newProps} ref={ref => {this._contentRef = ref;}} style={[styles.input, textHeightStyle, textAlignStyle, inputStyle]} underlineColorAndroid='transparent' placeholder='' editable={true} spellCheck={false} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onChangeText={this.onChangeText.bind(this)} />
                <View pointerEvents='none' style={[placeholderBaseStyle, placeholderStyle, placeholderAlignStyle, placeholderVisibleStyle]}>
                    <Text style={{fontSize:fontSize, color:placeholderTextColor}}>{placeholder}</Text>
                </View>
            </View>
        );
    }

    onFocus() {
        this.setState({
            isFocused:true,
        });

        this.props.onFocus && this.props.onFocus();
    }

    onBlur() {

        this.setState({
            isFocused:false,
        });

        this.props.onBlur && this.props.onBlur();
    }

    onChangeText(text) {
        var newText = this.props.allowSpace === true ? text : text.replace(' ', '').trim();
        //

        if (text != newText) {
            this.value = newText;
            this.forceUpdate();
            return;
        }

        this._innerValue = newText;
        this.forceUpdate();
        this.props.onChangeText && this.props.onChangeText(newText);
    }
}

export default class TextField extends Component {

    get tag() {
        return this.props.tag;
    }

    get delegate() {
        return this._delegate;
    }

    set delegate( delegate ) {
        this._delegate = delegate;
    }

    get value() {

        if (this._innerValue) {
            return this._innerValue;
        }

        if (this._textInput) {
            if (typeof this._textInput._lastNativeText === 'undefined') {
                return this._textInput._getText();
            }

            return this._textInput._lastNativeText;
        }

        return this.props.defaultValue;
    }

    set value(value) {
        var nativeProps = { text: value };

        this._innerValue = value;

        if (this._textInput && this._textInput._inputRef) {
            this._textInput._lastNativeText = value;
            this._textInput._inputRef.setNativeProps(nativeProps);
            this._textInput.forceUpdate();
        }
    }

    get isBlank() {

        return ( !this.value ) ? true : false;
    }

    isFocused() {
        if (this._textInput) {
            return this._textInput.isFocused();
        }

        return false;
    }

    clear() {
        this._innerValue = '';

        if (this._textInput) {
            return this._textInput.clear();
        }
    }

    focus() {
        if (this._textInput) {
            this._textInput.focus();
        }
    }

    constructor(props) {
        super(props);

        this._delegate = this.props.delegate;
        this.state = {
            placeholderAnimationValue: new Animated.Value(0)
        };
    }

    animate() {

        Animated.timing(this.state.placeholderAnimationValue, {
            toValue: !this.isBlank || this.isFocused() ? 1 : 0,
            duration: 250,
            easing: Easing.easingInOut
        }).start();
    }

    componentDidMount() {
        this.animate();
    }

    componentDidUpdate() {
        this.animate();
    }

    render() {
        let self = this;
        let {
            accessibilityLabel,
            autoCapitalize,
            autoCorrect,
            autoFocus,
            caretHidden,
            clearButtonMode,
            clearTextOnFocus,
            dataDetectorTypes,
            dblurOnSubmit,
            defaultValue,
            disableFullscreenUI,
            editable,
            enablesReturnKeyAutomatically,
            inlineImageLeft,
            inlineImagePadding,
            keyboardAppearance,
            keyboardType,
            maxLength,
            multiline,
            numberOfLines,
            // onBlur,
            // onChangeText,
            onContentSizeChange,
            // onEndEditing,
            // onFocus,
            onFocusxonChange,
            onKeyPress,
            onLayout,
            onScroll,
            onSelectionChange,
            // onSubmitEditing,
            placeholder,
            placeholderTextColor,
            returnKeyLabel,
            returnKeyType,
            secureTextEntry,
            selection,
            selectionColor,
            selectionState,
            selectTextOnFocus,
            spellCheck,
            style,
            textAlign,
            // value,
            // underlineColorAndroid,

            inputStyle,
            delegate
        } = this.props;

        const placeholderTop = this.state.placeholderAnimationValue.interpolate({
            inputRange: [
                0, 1
            ],
            outputRange: [8, 0]
        });

        const placeholderHeight = this.state.placeholderAnimationValue.interpolate({
            inputRange: [
                0, 1
            ],
            outputRange: ['100%', '10%']
        });

        const placeholderFontSize = this.state.placeholderAnimationValue.interpolate({
            inputRange: [
                0, 1
            ],
            outputRange: [14, 9]
        });

        let animationStyle = {
            placeholderView: {
                top: placeholderTop,
                height: placeholderHeight,
            },
            placeholderText: {
                fontSize: placeholderFontSize
            }
        };

        let placeholderColorStyle = placeholderTextColor ? { color: placeholderTextColor } : undefined;
        let textAlignStyle = ( textAlign ) ? { textAlign:textAlign } : undefined;
        let placeholderText = placeholder;
        let newProps = {
            accessibilityLabel: accessibilityLabel,
            autoCapitalize: autoCapitalize,
            autoCorrect: autoCorrect,
            autoFocus: autoFocus,
            caretHidden: caretHidden,
            clearButtonMode: clearButtonMode,
            clearTextOnFocus: clearTextOnFocus,
            dataDetectorTypes:dataDetectorTypes ,
            dblurOnSubmit: dataDetectorTypes,
            defaultValue: defaultValue,
            disableFullscreenUI: disableFullscreenUI,
            editable: editable,
            enablesReturnKeyAutomatically: enablesReturnKeyAutomatically,
            inlineImageLeft: inlineImageLeft,
            inlineImagePadding: inlineImagePadding,
            keyboardAppearance: keyboardAppearance,
            keyboardType: keyboardType ,
            maxLength: maxLength ,
            multiline: multiline,
            numberOfLines: numberOfLines ,
            // onBlur,
            // onChangeText,
            onContentSizeChange: onContentSizeChange,
            // onEndEditing,
            // onFocus
            onFocusxonChange: onFocusxonChange,
            onKeyPress: onKeyPress,
            onLayout: onLayout,
            onScroll: onScroll,
            onSelectionChange: onSelectionChange,
            // onSubmitEditing,
            // placeholder: placeholder,
            // placeholderTextColor : placeholderTextColor,
            returnKeyLabel: returnKeyLabel,
            returnKeyType: returnKeyType ,
            secureTextEntry: secureTextEntry,
            selection: selection,
            selectionColor: selectionColor,
            selectionState: selectionState,
            selectTextOnFocus: selectTextOnFocus,
            spellCheck: spellCheck,
            textAlign: textAlign,
            // underlineColorAndroid
        };

        return (
            <View accessibilityLabel={accessibilityLabel} style={[styles.view, style]} onLayout={this.onLayout}>
                <Animated.View style={[styles.placeholderView, animationStyle.placeholderView]}>
                    <Animated.Text style={[styles.placeholderText, animationStyle.placeholderText, placeholderColorStyle]} disabled={true}>{placeholderText}</Animated.Text>
                </Animated.View>
                <TextInput {...newProps} ref={(ref) => {this._loadRef(ref);}} style={[styles.input, textAlignStyle, inputStyle]} placeholder='' underlineColorAndroid='transparent' spellCheck={false} onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)} onChangeText={this.onChangeText.bind(this)} onSubmitEditing={this.onSubmitEditing.bind(this)} />
            </View>
        );
    }

    _loadRef( ref ) {
        if (ref === null){
            return;
        }

        this._textInput = ref;
    }

    _dispatchEvent(methodName, params) {

        const prefixDelegateMethod = 'textField';

        let delegate = this.delegate;
        let delegateMethodName = prefixDelegateMethod + methodName;

        if (delegate && typeof delegate[delegateMethodName] === 'function') {
            let method = delegate[delegateMethodName];
            method.apply(delegate, params);
        }
    }

    onFocus() {
        this.animate();
        this._dispatchEvent('DidBeginEditing', [this]);
    }

    onBlur() {
        this.animate();
        this._dispatchEvent('DidEndEditing', [this]);
    }

    onChangeText(text) {
        let newText = this.props.allowSpace === true ? text : text.replace(' ', '').trim();

        if (text != newText) {
            this.value = newText;
            this._textInput.forceUpdate();
            return;
        }

        this._innerValue = newText;

        this._dispatchEvent('DidChangeText', [this, text]);
    }

    onSubmitEditing() {
        this.animate();
        this._dispatchEvent('DidSubmit', [this]);
    }
}


const styles = StyleSheet.create({
    view: {
        paddingTop: 8,
        marginVertical: 8,
        marginHorizontal: 2,
    },
    placeholderView: {
        position: 'absolute',
        left: 0,
        top: 8,
        height: '100%',
        minHeight: 12,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center'
    },
    placeholderText: {
        color: '#333',
        fontSize: 14,
        textDecorationLine: 'none',
    },
    input: {
        flex: 1,
        marginVertical: 0,
        textDecorationLine: 'none',
        ...Platform.select({
            ios: {
                marginHorizontal: 0
            },
            android: {
                marginHorizontal: -4
            }
        })
    },

    inputContainer: {
        width: '100%',
        paddingHorizontal: 8,
    },
});
