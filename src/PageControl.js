'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing, View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';

export default class PageControl extends Component {

    static propTypes = {
        currentPage: PropTypes.number,
        numberOfPages: PropTypes.number,
        defaultColor: PropTypes.string,
        activeColor: PropTypes.string
    };

    static defaultProps = {
        currentPage: 0,
        numberOfPages: 1,
        defaultColor: 'rgba(125,125,125,0.4)',
        activeColor: '#FFFFFF'
    };

    constructor(props) {
        super(props);

    }

    render() {

        let {style, currentPage, numberOfPages, defaultColor, activeColor } = this.props;

        var pages = [];

        for (var i = 0; i < numberOfPages; i++) {
            let pageStyle = currentPage === i ? {backgroundColor:activeColor} : {backgroundColor:defaultColor};
            let page = (<View key={i} style={[styles.page, pageStyle]}></View>);
            pages.push( page );
        }

        return (
            <View style={[styles.container, style]}>
                {pages}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    page: {
        width: 10,
        height: 10,
        borderWidth: 0,
        borderRadius: 5,
        marginLeft: 4,
        marginRight: 4,
        overflow: 'hidden',
    }
});
