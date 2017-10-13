'use strict';

import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class Navigation extends Component {

    render() {

        let {leftItem, rightItem, title, style} = this.props;

        return (
            <View style={[styles.box, style && style.box]}>
              <View style={styles.leftItem}>
                {leftItem}
              </View>
              <View style={styles.rightItem}>
                {rightItem}
              </View>
              <View style={styles.content}>
                <Text style={[styles.title, style && style.title]}>{title}</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    box: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#EDEDED'
    },
    leftItem: {
        position: 'absolute',
        height: '100%',
        left: 0,
        width: 80,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        alignSelf: 'center'
    },
    rightItem: {
        position: 'absolute',
        height: '100%',
        right: 0,
        width: 80,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignItems: 'center',
        alignSelf: 'center'
    },
    content: {
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 80,
        marginRight: 80,
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
