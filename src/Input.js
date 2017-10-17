'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, TextInput, StyleSheet, Image, Platform } from 'react-native';
import { InputText } from './TextField';

class CheckBox extends Component {

    _checkComponent() {
        return this.props.checked ? this.props.checkedComponent : this.props.uncheckedComponent;
    }

    render () {

        let checkComponent = this._checkComponent();

        return (
            <View style={[styles.container, this.props.style]}>
                {checkComponent}
            </View>
        );
    }
}

const CHECKED_CHECKBOX_IMAGE = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABwElEQVR4Xu2awW3DMAxFFU1CeJJ2k2ayZpROonIStVBRA7YgOxSlGLT8c8khVKL3/MnYiW/u4o/bxfkdBCABFzeAFrh4ADAE0QJoAaGBaZp+hKUmykIIonSLihIRBCABaIHVDJD22FEDIW9R6f7UM0D6ARBwkAEkIBvS0oSiBaQJ1UZM+v6tddr9IQFS81rD0vdvrdPu7zQJIKI3Zv7aEjW0ACL68N5/OuceIYR7ScKwAhbwM3dRwpACCvB/EmKM73k7DCdgB/7OzI+8DYYSUAtf+r3itGeCGvhhBGjhzQkgImJmrjm5aYE3JWAGiTEWh1VJSiu8GQE5iERCD3gTAlLsvfff+RHek9AL3oSAtIkaoJpaySwxcx4gAZPUSKCXNWYEPEtCev3/wmbFKJkXe1JMCdiTUIJohTczA3K4ragv63rAmxXwLAm94E0L2JLQE968gFxCb/hTCJglpOfS9Xzt115eb+5boBWodj0E4K+x9f0Lp/1FqDb6cz1aAC2AFlDdwqP+b1Dbq0ete/kQPApE+zkQgDtFO98qq42i9XXiIWgdRLs/CNCaG2UdEjDKkdRyIAFac6OsQwJGOZJajl89Wwpfa6TMJQAAAABJRU5ErkJggg=='};

const UNCHECKED_CHECKBOX_IMAGE = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABS0lEQVR4Xu2aMRKDMBAD4Sv8/03+SjIpodpZBQaPlVpW5EV3lfdt8d+++P23AmgDFifQEVi8AF2CHYGOACRwHMcHSl8hG2OgdiPR70YF0AZ0BE47gM7YUwvhOqI0n94B9A8K4CECbcBlSdOGdgRoQ23FqH+qs/naAEreEqb+qc7mawMoeUuY+qc6m68NoOQtYeqf6my+NoCSt4Spf6qz+doASt4Spv6pzuZrAyh5S5j6pzqbrw2g5C1h6p/qbL42gJK3hKl/qrP52gBK3hKm/qnO5msDKHlLmPqnOpuvDaDkLWHqn+psvjaAkreEqX+qs/naAEreEqb+qc7mawMoeUuY+qc6m68NoOQtYeqf6mw+3YA08N3nb38gcfcFUv8C6EvRPz+VTSv51vN4Cb71AmmuAkgJzn6+DZj9C6b524CU4Ozn24DZv2Ca/ws01kBQxniBrgAAAABJRU5ErkJggg=='};

CheckBox.defaultProps = {
    checked: false,
    checkedComponent: ( <Image source={CHECKED_CHECKBOX_IMAGE} style={{width:30, height:30}} /> ),
    uncheckedComponent: ( <Image source={UNCHECKED_CHECKBOX_IMAGE} style={{width:30, height:30}} /> )
};

CheckBox.propTypes = {
    checked: PropTypes.bool,
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element
};

class Radio extends Component {

    _checkComponent() {
        return this.props.checked ? this.props.checkedComponent : this.props.uncheckedComponent;
    }

    render () {

        let checkComponent = this._checkComponent();

        return (
            <View style={[styles.container, this.props.style]}>
                {checkComponent}
            </View>
        );
    }
}

const CHECKED_RADIO_IMAGE = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTdDQkQyNzM1QTkxMTFFNzk1RDI4QjYzREIzMzlBRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTdDQkQyNzQ1QTkxMTFFNzk1RDI4QjYzREIzMzlBRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBN0NCRDI3MTVBOTExMUU3OTVEMjhCNjNEQjMzOUFFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBN0NCRDI3MjVBOTExMUU3OTVEMjhCNjNEQjMzOUFFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhNZhnwAAAQcSURBVHja7JpBTxNBFMdbNKgBvBlvJSga2nglxFAknooHjYFEkJuGokETY7z4AUj4AiYaD3pQbOWmXqSgRuoHkEQh0YQochG5SEEQofW/8ZHUcWZ3pp3ZLnYm+R12d/bNm//O7sy+eeFCoRCq5hK2AlgBrABWACuAFcAKYAVwK7vD4R3ZuU2JvvklQB2Ig04QA0fBQVBP11fAV/ABzIApkAWrO1kA56YEuABOg32K96+BZ+A+GAcFEwKEHAG82IV6inSDt6CgCcfWWVU/ZPqmW4DDIKOx4ywZakObADpfgV5wF+wXXJ8DGfAGzILPIEfXGkAjiNK3wnl1mgR2lsElkA7KKxAGw4IntgXS4Lji8HVsxkGKbPBsD1O9ir4CjgO3BA6+ALESvh8sMbLFa+OOmwh+CDDCcWoNXNHQcZYhss22N1IpAfo4ziyBNgOd36aN2mDbPe+3AM6X+DvjxCJoMdj5bVqoreK2l3mzg0kB2Knuh+STj4CbYBx8AesgB2bBc7rWJDkSVjlTpC8CdHOG4KBExx+BTYm5fovqRjxsDnLu7TYtQJizwst4OHqGhqjqoicnereLYGeH6eJZwYQACabBXyDq4uA1l3lchjy47mI/Sj4U39NlUoA009gDF+d6qQPlLn/zZEvUzkOmftqUAHWcebjd5Z3PafwHyLl8Ezo465A6EwKww3/OZRU2auBHKOWyGp1j6iZkBahR+L3uZI4zgn9056emz0CA5xzZ/ud3hnxx81VYVAQ4xhxnBfX6FO2q+CoSNuvhqxYBjjDHM4J6Jw2G+US2Zzx81SLAAeZ4XnKk6Cwi2/MevmqJCf4EtUWn94ANTvV1umaibAhs15J/f9WTCYjUhKq8qAiQY44bBPWWDPr7TXC+3sNXLQKwjUcE9d4bFOCd4HyjpFBlCfCROY4J6r00KMArwfmYh69aBGDVjwvqPQZ5A53Pk21eiUuOlLIEmGKOE7T7w5ZPYMyAAGNkW7QD5earlrB4UH+G2sv5GVIZAc5G5RPm3GWXhUmylP08wVo/6bLwusocP1XaVFWMB3RVICBywyMgwto/ZTokNs00OG4wJNbvYXvS75CYKCialAiKpiRHwxbV9QqKJjn39lQqLL5aQlh8AWwQC3TOuXaoxLD4hN8bI8sB2xhpDsrWWKvBzrcGZWvMa3N0wEDnB2gHKjCbo17b45OatsejnK99YLbHZRIkUiUmSLT7kSChM0WmH9yWSJHJUorMPKW7hOieCKXIdEikyAyB0SBmiTXTdGQqSWqC97UPUpbYNj2cFWO5aXI9JtLk/EiUvEiJknsV71+nRMl7JhMl/UqVraegxQkKbTtxezZVdjH0J1XWCam9pnS6lXIaDZIAFSnaBPifixXACmAFsAJYAawAVoDqLb8FGAAeeTp3NcFmTwAAAABJRU5ErkJggg=='};

const UNCHECKED_RADIO_IMAGE = {uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTdDQkQyNkY1QTkxMTFFNzk1RDI4QjYzREIzMzlBRTEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTdDQkQyNzA1QTkxMTFFNzk1RDI4QjYzREIzMzlBRTEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBN0NCRDI2RDVBOTExMUU3OTVEMjhCNjNEQjMzOUFFMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBN0NCRDI2RTVBOTExMUU3OTVEMjhCNjNEQjMzOUFFMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg+SL5EAAAOHSURBVHja7JrPaxNBFMd3tYeIbU+KN4tYpQleS7FGe0w9CJIc/HGy0lap/hmF/gOC4kFP0nhUT03rwaZ6tqARFBR7s/Zi0tiCSvwOfQvhMclk0pnd0cyDz2Gyycybb2Z3Z957YaPRCHrZDgQ9bl4AL4AXwAvgBfAC9LD1dfSlMPwnJ/e7g01eX0y+HAZZMAEy4DQ4Bvrp+jb4Bj6CClgFZVC37VjYyVa4yxUgfpQDU+ASOKT5+x3wAjwGS6BhYwUEQgAVB/E9TfLgLWgYQvR1WdePTuZmWoCToGRw4pwSjWFMAJO3wBXwEAy2uP4ZlMAa+AC+ghpdGwBDIE3PCnHrnGjRTxXcAkVXboEQzLf4x/6AIjiruXxFn1mwSH3I+p6n7yV6CwgH7rVw8CXIdPH84GSoL9kYD9qJEIcACxKndsAdAxPnzFHffLyFpAS4KnFmC4xZmHzEGI3Bx70WtwDiSfyDObEJRixOPmKExmoeuyp7O9gUgL/qflr+52UroS55RcYiQF6yBGdjnHzErMSPvG0BQskOr5TA5CP422G9+a1gQ4AcG/AXSCcoQJp8aPZpUkcA3XjAFGsXaVeXlImxn7LPbtg6DYoj7RZINV0S29bXCR/7z9PxObJdcEQcpTvZCuusgCyb/BfwxoG4xxr5ElmKfDUeEptg7VI3Z3QL1iBf2vlqRIAzrF12KPpVVvhqRIBTrF1xSICKwlcjAhxl7Q2HBNhQ+GpEgAHWrjkkQE3hq88LmBCga5VjsP5uV6eOAN9Z+7hDAgwpfDUiwCfWzjgkQEbhqxEB3kl2hq5YVuGrEQFWWTtH2Z+kLcpAtfPViABlOmhEJuL24w4IMM5yCLs6u1QdAUSi8hn77LYDAtxl7eeBTlJVMyAy6WBAhCdOLtoOia2zAZcSFGAl7pBYq6DoTAKTn5H4UUgqLF53ICy+HHdipOpYYmTYldTYqMXJj7qSGlMlR6ctTH6aMlDOJEdV6fEVQ+nxtORp70x6vJMCicUuCyTOxVEgYbJE5jq4H6hLZMqU0BBhrCpdG6TjdZri/KoSmTnwROVQElViw/Q6slUktSx72rtUJRZRkOwY91smV7BRJhdHoeTNYK9QMqX5e3GqE4WSjwKLhZI2BeAxOxG0uEBJCxG356Wym8Feqex78IpSXtv7GdQlARIxYwL4sLgXwAvgBfACeAG8AF6A/9H+CjAAm31OzB/PbS4AAAAASUVORK5CYII='};

Radio.defaultProps = {
    checked: false,
    checkedComponent: ( <Image source={CHECKED_RADIO_IMAGE} style={{width:30, height:30}} /> ),
    uncheckedComponent: ( <Image source={UNCHECKED_RADIO_IMAGE} style={{width:30, height:30}} /> )
};

Radio.propTypes = {
    checked: PropTypes.bool,
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element
};

class Input extends Component {

    get isChecked() {
        return this.state.checked;
    }

    get contentComponent() {
        return this._contentRef;
    }

    get value() {
        if (this._contentRef) {
            return this._contentRef.value;
        }

        return this.state.value;
    }

    set value( value ) {

        if (this._contentRef) {
            this._contentRef.value = value;

            this.setState({
                value: value
            });
        }
    }

    isFocused() {
        if (this._contentRef) {
            return this._contentRef.isFocused;
        }

        return false;
    }

    clear() {
        this._contentRef.clear();
    }

    setNativeProps(props) {
        if (this._contentRef ) {
            this._contentRef.setNativeProps(props);
        }
    }

    constructor(props) {
        super(props);

        this.state = this.props.type === 'text' ? {value:this.props.value} : {checked:false};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.checked !== this.state.checked) {
            this.setState({
                checked: nextProps.checked
            });
        }
    }

    _contentComponent() {
        if (this.props.type === 'checkbox') {
            return (
                <CheckBox
                    checked={this.state.checked}
                    checkedComponent={this.props.checkedComponent}
                    uncheckedComponent={this.props.uncheckedComponent}
                 />
            );
        }

        if (this.props.type === 'radio') {
            return (
                <Radio
                    checked={this.state.checked}
                    checkedComponent={this.props.checkedComponent}
                    uncheckedComponent={this.props.uncheckedComponent}
                 />
            );
        }

        return null;
    }

    render() {

        if (this.props.type === 'text') {

            let { accessibilityLabel, allowSpace, autoCapitalize, autoCorrect, autoFocus, caretHidden, clearButtonMode, clearTextOnFocus, dataDetectorTypes, dblurOnSubmit, defaultValue, disableFullscreenUI, editable, enablesReturnKeyAutomatically, inlineImageLeft, inlineImagePadding, keyboardAppearance, keyboardType, maxLength, multiline, numberOfLines, onBlur, onChangeText, onContentSizeChange, onEndEditing, onFocus, onFocusxonChange, onKeyPress, onLayout, onScroll, onSelectionChange, onSubmitEditing, placeholder, placeholderTextColor, placeholderStyle, returnKeyLabel, returnKeyType, secureTextEntry, selection, selectionColor, selectionState, selectTextOnFocus, spellCheck, textAlign, inputStyle} = this.props;

            let newProps = { accessibilityLabel, allowSpace, autoCapitalize, autoCorrect, autoFocus, caretHidden, clearButtonMode, clearTextOnFocus, dataDetectorTypes, dblurOnSubmit, defaultValue, disableFullscreenUI, editable, enablesReturnKeyAutomatically, inlineImageLeft, inlineImagePadding, keyboardAppearance, keyboardType, maxLength, multiline, numberOfLines, onBlur, onChangeText, onContentSizeChange, onEndEditing, onFocus, onFocusxonChange, onKeyPress, onLayout, onScroll, onSelectionChange, onSubmitEditing, placeholder, placeholderStyle, placeholderTextColor, returnKeyLabel, returnKeyType, secureTextEntry, selection, selectionColor, selectionState, selectTextOnFocus, spellCheck, textAlign, inputStyle};

            let userStyle = StyleSheet.flatten(this.props.style);
            let containerStyle = userStyle && userStyle.height ? { height: userStyle.height } : undefined;

            return (
                <View style={[styles.frame, this.props.style]}>
                    <View style={[styles.textContainer, containerStyle, this.props.containerStyle]}>
                        {this.props.hideLabel === false && this.props.labelBefore === true && this.props.label.length > 0 ? <Label labelStyle={this.props.labelStyle} numberOfLabelLines={this.props.numberOfLabelLines} label={this.props.label} /> : null}
                        <InputText ref={ref => this._contentRef=ref} userStyle={userStyle} style={this.props.inputFrameStyle} {...newProps} value={this.state.value} />
                        {this.props.hideLabel === false && this.props.labelBefore === false && this.props.label.length > 0 ? <Label labelStyle={this.props.labelStyle} numberOfLabelLines={this.props.numberOfLabelLines} label={this.props.label} /> : null}
                    </View>
                </View>
            );
        }

        let contentComponent = this._contentComponent();

        return (
            <TouchableOpacity onPress={this.handleToggleChecked.bind(this)} underlayColor={this.props.underlayColor} style={[styles.frame, this.props.style]}>
                <View style={[styles.container, this.props.containerStyle]}>
                    {this.props.hideLabel === false && this.props.labelBefore === true && this.props.label.length > 0 ? <Label labelStyle={this.props.labelStyle} numberOfLabelLines={this.props.numberOfLabelLines} label={this.props.label} /> : null}
                    {contentComponent}
                    {this.props.hideLabel === false && this.props.labelBefore === false && this.props.label.length > 0 ? <Label labelStyle={this.props.labelStyle} numberOfLabelLines={this.props.numberOfLabelLines} label={this.props.label} /> : null}
                </View>
            </TouchableOpacity>
        );
    }

    handleToggleChecked() {
        if (this.props.type === 'radio') {
            if (this.state.checked === true) {
                return;
            }
        }

        const checked = !this.state.checked;
        const name = this.props.label;

        this.setState({checked}, () => {
            this.props.onChange && this.props.onChange(this);
        });
    }
}

Input.defaultProps = {
    type: 'text',
    label: 'Label',
    numberOfLabelLines: 1,
    hideLabel: false,
    labelBefore: false,
    checked: false,
    checkedComponent: undefined,
    uncheckedComponent: undefined
};

Input.propTypes = {
    type: PropTypes.string,
    checkedComponent: PropTypes.element,
    uncheckedComponent: PropTypes.element,
    checked: PropTypes.bool,
    containerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    label: PropTypes.string,
    hideLabel: PropTypes.bool,
    labelBefore: PropTypes.bool,
    labelStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    numberOfLabelLines: PropTypes.number,
    onChange: PropTypes.func
};

const Label = (props) => (
    <View style={styles.labelContainer}>
        <Text style={[styles.label, props.labelStyle]} numberOfLines={props.numberOfLabelLines}>
            {props.label}
        </Text>
    </View>
)

const styles = StyleSheet.create({

    frame: {

    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    labelContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    label: {
        fontSize: 16,
        color: '#222'
    },
});

module.exports = Input;
