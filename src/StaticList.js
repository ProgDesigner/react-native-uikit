'use strict';

import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ViewPropTypes} from 'react-native';
import Button from './Button';
import ScrollView from './ScrollView';

const EdgeInsetsPropType = require('EdgeInsetsPropType');

class Item extends Component {

    get tag() {
        return this.props.tag;
    }

    render() {
        let { children, itemInset, selectable, style } = this.props;
        let contentStyle = {
            paddingTop: itemInset.top,
            paddingLeft: itemInset.left,
            paddingRight: itemInset.right,
            paddingBottom: itemInset.bottom,
        };

        if (selectable === false) {
            return (
                <View style={[styles.cellView, style]}>
                    <View style={[styles.cellContainer, contentStyle]} >
                        {children}
                    </View>
                </View>
            );
        }

        return (
            <View style={[styles.cellView, style]}>
                <Button style={[styles.cellButton, contentStyle]} containerStyle={styles.cellButtonContainer} onPress={this.onSelectItem.bind(this)} >
                    {children}
                </Button>
            </View>
        );
    }

    onSelectItem() {
        let { onSelectItem } = this.props;

        onSelectItem && onSelectItem( this );
    }
}

class Section extends Component {

    render() {
        let { children, onSelectItem, itemInset, selectable, style } = this.props;

        return (
            <View style={[styles.sectionView, style]}>
                {
                    Children.map(children, (child, index) => {
                        if (child && child.type === Item) {

                            return React.cloneElement(child, {
                                itemInset: itemInset,
                                selectable: typeof child.props.selectable !== 'undefined' ? child.props.selectable : selectable,
                                onSelectItem: onSelectItem && onSelectItem.bind(this)
                            })
                        }
                        return child
                    })
                }
            </View>
        );
    }
}

class StaticList extends Component {

    static defaultProps = {
        itemInset: {top: 0, left: 16, bottom: 0, right: 16},
        selectable: true
    };

    static propTypes = {
        ...ViewPropTypes,
        style: ViewPropTypes.style,
        itemInset: EdgeInsetsPropType,
        selectable: PropTypes.bool
    };

    render() {
        let { children, style, itemInset, selectable, onSelectItem, getTextInputRefs } = this.props;
        let sections = Children.map(children, (child, index) => {
            if (child && child.type === Section) {
                return React.cloneElement(child, {
                    itemInset: itemInset,
                    selectable: selectable,
                    onSelectItem: onSelectItem && onSelectItem.bind(this)
                })
            }
            return child
        });

        return (
            <View style={[styles.container, style]}>
                <ScrollView getTextInputRefs={getTextInputRefs} ref={ref => this.scrollView=ref} style={styles.scrollView}>
                    {sections}
                </ScrollView>
            </View>
        );
    }
}

StaticList.Section = Section;
StaticList.Item = Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    scrollView: {
        flex: 1,
    },
    sectionView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: "#EDEDED",
        backgroundColor: '#fff',
        marginTop: 16,
    },
    cellView: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#EDEDED",
    },
    cellContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cellButton: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0,
    },
    cellButtonContainer: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});

module.exports = StaticList;
