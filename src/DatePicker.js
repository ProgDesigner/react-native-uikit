'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes, Text, Image} from 'react-native';
import Picker from './Picker';
import Moment from 'moment';
import NumberPad from 'pad-number';

export default class DatePicker extends Component {

    static defaultProps = {
        currentDate: Moment().format("YYYY-MM-DD"),
        startDate: "1900-01-01",
        endDate: "2020-12-31",
    };

    static propTypes = {
        ...ViewPropTypes,
        style: ViewPropTypes.style,
        currentDate: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
    };

    get currentDate() {
        return this.state.currentDate;
    }

    _defaultYearPicker(date) {
        let current = parseInt(Moment(date).format("YYYY"));
        let start = parseInt(Moment(this.props.startDate).format("YYYY"));
        let end = parseInt(Moment(this.props.endDate).format("YYYY"));

        var selectedItem = start;
        var itemList = [];

        for (var i=0; i<=(end-start); i++ ){
            let item = start + i;

            if (item === current) {
                selectedItem = i;
            }

            itemList.push(item);
        }

        return {
            selectedItem: selectedItem,
            itemList: itemList
        };
    }

    _defaultMonthPicker(date) {
        let current = parseInt(Moment(date).format("MM"));
        let start = 1;
        let end = 12;

        var selectedItem = start;
        var itemList = [];

        for (var i=0; i<=(end-start); i++ ){
            let item = start + i;

            if (item === current) {
                selectedItem = i;
            }
            itemList.push(item);
        }

        return {
            selectedItem: selectedItem,
            itemList: itemList
        };
    }

    _defaultDayPicker(date) {
        let currentDate = Moment(date);
        let current = parseInt(currentDate.format("DD"));
        let start = 1;
        let end = parseInt(currentDate.add(1, 'months').date(0).format("DD"));

        var selectedItem = start;
        var itemList = [];

        for (var i=0; i<=(end-start); i++ ){
            let item = start + i;

            if (item === current) {
                selectedItem = i;
            }
            itemList.push(item);
        }

        return {
            selectedItem: selectedItem,
            itemList: itemList
        };
    }

    constructor(props) {
        super(props);

        let currentDate = this.props.currentDate;

        this.state = {
            currentDate: currentDate,
            yearPicker: this._defaultYearPicker(currentDate),
            monthPicker: this._defaultMonthPicker(currentDate),
            dayPicker: this._defaultDayPicker(currentDate)
        };
    }

    render() {

        let {style} = this.props;

        return (

            <View style={[styles.container, style]}>
                <View style={styles.pickerWrapView}>
                    <Picker style={styles.pickerView} selectedValue={this.state.yearPicker.selectedItem} itemStyle={styles.pickerItem} onValueChange={(index) => this.onPickerSelect('year', index)}>
                        {this.state.yearPicker.itemList.map((value, i) => (<Picker.Item label={NumberPad(value, 4)} value={i} key={"year" + value}/>))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapView}>
                    <Picker style={styles.pickerView} selectedValue={this.state.monthPicker.selectedItem} itemStyle={styles.pickerItem} onValueChange={(index) => this.onPickerSelect('month', index)}>
                        {this.state.monthPicker.itemList.map((value, i) => (<Picker.Item label={NumberPad(value, 2)} value={i} key={"month" + value}/>))}
                    </Picker>
                </View>
                <View style={styles.pickerWrapView}>
                    <Picker style={styles.pickerView} selectedValue={this.state.dayPicker.selectedItem} itemStyle={styles.pickerItem} onValueChange={(index) => this.onPickerSelect('day', index)}>
                        {this.state.dayPicker.itemList.map((value, i) => (<Picker.Item label={NumberPad(value, 2)} value={i} key={"day" + value}/>))}
                    </Picker>
                </View>
            </View>
        );
    }

    onPickerSelect(identifier, index) {
        if (identifier === 'year') {
            let picker = this.state.yearPicker;
            let value = picker.itemList[index];
            let currentDate = Moment(this.state.currentDate);
            let selectedDate = currentDate.year(value).format("YYYY-MM-DD");

            this.setState({
                currentDate: selectedDate,
                yearPicker: this._defaultYearPicker(selectedDate),
                monthPicker: this._defaultMonthPicker(selectedDate),
                dayPicker: this._defaultDayPicker(selectedDate)
            }, () => {
                this.props.onSelectDate && this.props.onSelectDate(selectedDate)
            });
        } else if (identifier === 'month') {
            let picker = this.state.monthPicker;
            let value = picker.itemList[index];
            let currentDate = Moment(this.state.currentDate);
            let selectedDate = currentDate.month(value-1).format("YYYY-MM-DD");

            this.setState({
                currentDate: selectedDate,
                yearPicker: this._defaultYearPicker(selectedDate),
                monthPicker: this._defaultMonthPicker(selectedDate),
                dayPicker: this._defaultDayPicker(selectedDate)
            }, () => {
                this.props.onSelectDate && this.props.onSelectDate(selectedDate)
            });
        } else if (identifier === 'day') {
            let picker = this.state.dayPicker;
            let value = picker.itemList[index];
            let currentDate = Moment(this.state.currentDate);
            let selectedDate = currentDate.date(value).format("YYYY-MM-DD");

            this.setState({
                currentDate: selectedDate,
                yearPicker: this._defaultYearPicker(selectedDate),
                monthPicker: this._defaultMonthPicker(selectedDate),
                dayPicker: this._defaultDayPicker(selectedDate)
            }, () => {
                this.props.onSelectDate && this.props.onSelectDate(selectedDate)
            });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 240,
        overflow: 'hidden',
        borderWidth: 0,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerWrapView: {
        flex: 1,
        margin: 8
    },
    pickerView: {
        flex: 1
    },
    pickerItem: {
        color: '#333333',
        fontSize: 21
    },
});
