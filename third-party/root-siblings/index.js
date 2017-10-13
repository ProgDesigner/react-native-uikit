import React, { cloneElement } from 'react';
import { StyleSheet } from 'react-native';
import emitter from './AppRegistry.Injection';

let uid = 0;

class RootSiblings {

    constructor(element, callback) {
        Object.defineProperty(this, '_id', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: uid++
        });

        this.update(element, callback);
    }

    _offStreamElement(element) {
        return cloneElement(element, {
            style: [element.props.style, styles.offStream]
        });
    }

    _id = null;

    update(element, callback) {
        emitter.emit('siblings.update', this._id, this._offStreamElement(element), callback);
    }

    destroy(callback) {
        emitter.emit('siblings.update', this._id, null, callback);
    }
}

const styles = StyleSheet.create({
    offStream: {
        position: 'absolute'
    }
});

export default RootSiblings;