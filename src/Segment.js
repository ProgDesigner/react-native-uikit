'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, View, Text, TouchableHighlight, ViewPropTypes } from 'react-native';

class SegmentItem extends Component {

    render() {

        let { children, isOn, style } = this.props;

        if (isOn === true) {
            return (
                <View style={[segmentItemStyles.wrapper]}>
                    <View style={[segmentItemStyles.container, segmentItemStyles.actived, style]}>
                        {children}
                    </View>
                </View>
            );
        }

        return (
            <TouchableHighlight underlayColor={'white'} onPress={this.onSelect.bind(this)} style={[segmentItemStyles.wrapper]}>
                <View style={[segmentItemStyles.container, style]}>
                    {children}
                </View>
            </TouchableHighlight>
        );
    }

    onSelect(e) {

        this.props.onSelect && this.props.onSelect.apply(this, [this, e]);
    }
}

export default class Segment extends Component {

    static Item = SegmentItem;

    static defaultProps = {
        defaultPage: 0,
        borderWidth: 2,
        activeStyle: undefined
    };

    static propTypes = {
        ...ViewPropTypes,
        style: ViewPropTypes.style,
        defaultPage: PropTypes.number,
        borderWidth: PropTypes.number,
        activeStyle: ViewPropTypes.style,
        onItemSelected: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: props.defaultPage,
        };
    }

    componentDidMount() {
        let page = this.props.defaultPage;

        if (page >= this.props.children.length || page < 0){
            page = 0;
        }

        this.didUpdatePage(page, null);
    }

    didUpdatePage(index, e) {

        this.setState({
            selectedIndex: index,
        });

        this.props.onItemSelected && this.props.onItemSelected.apply(this, [index, e]);
    }

    didSelectItem( e, item, index ) {

        this.didUpdatePage( index, e );
    }

    render() {

        let { children, style } = this.props;
        let childCount = children.length;
        let selectedIndex = this.state.selectedIndex;

        const items = children.map((child, index) => {
            const isOn = selectedIndex == index ? true : false;
            const itemStyle = ((index) => {
                if (childCount <= 1 ) {
                    return segmentItemStyles.onlyOneItem;
                }
                else {
                    if (index === 0) {
                        return segmentItemStyles.firstItem;
                    }
                    else if (index === childCount - 1) {
                        return segmentItemStyles.lastItem;
                    }
                    else if (index === childCount - 2) {
                        return segmentItemStyles.centerLastItem
                    }

                    return segmentItemStyles.centerItem;
                }
            })(index);
            const itemOverrideStyle = selectedIndex == index ? this.props.activeStyle : undefined;

            if (child.type === SegmentItem) {
                return React.cloneElement(child, {
                    key: 'item_' + index,
                    isOn: isOn,
                    style: [itemStyle, child.props.style, itemOverrideStyle],
                    onSelect: (item, e) => {
                        this.didSelectItem(e, item, index);
                    }
                })
            }

            return child;
        });

        return (
            <View style={[segmentStyles.container, style]}>
                <View style={segmentStyles.content}>
                    {items}
                </View>
            </View>
        );
    }
}

const segmentItemStyles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 0,
        borderColor: '#eaeaea',
    },
    firstItem: {
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
    },
    centerItem: {
        borderRadius: 0,
        borderLeftWidth: 1,
    },
    centerLastItem: {
        borderRadius: 0,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    lastItem: {
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
    },
    onlyOneItem: {
        borderRadius: 8,
    }
});

const segmentStyles = StyleSheet.create({
    container: {
        width: 300,
        height: 60,
        borderColor: '#eaeaea',
        borderWidth :1,
        borderRadius: 9,
        overflow: 'hidden',
    },
    content: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
