import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, ScrollView, StyleSheet } from 'react-native';
//import { OptimizedFlatList } from 'react-native-optimized-flatlist';
/**
 * A FlatList that is rendered in reverse.
 * Useful for chats and whatnots
 */
export default class ReversedFlatList extends React.Component {
  constructor(props) {
    super(props);
    this._previousData = props.data;
    this.state = {
      data: [...props.data]
    };
  }

  // when provided data array changes,
  // update the internal reversed copy
  componentWillReceiveProps({ data }) {
    if (data !== this._previousData) {
      this._previousData = data;
      this.setState({ data: [...data] });
    }
  }

  scrollToBottom() {
    this.scrollToIndex({ index: 0 });
  }

  scrollToIndex(...args) {
    if (this._listViewRef) {
      this._listViewRef.scrollToIndex(...args);
    }
  }

  // then backing scrollview is flipped to reverse the list
  renderScrollComponent = ({ style, refreshing, ...props }) => (
    <ScrollView style={[style, styles.flip]} {...props} />
  );

  // each row is flipped back to normal position
  renderItem = props => (
    <View style={styles.flip}>
      {this.props.renderItem(props)}
    </View>
  );

  render() {
    const { ...props } = this.props;
    // data={this.state.data}

    //renderItem={this.renderItem}
    return (
      <FlatList
        {...props}
        renderScrollComponent={this.renderScrollComponent}
        ref={ref => (this._listViewRef = ref)}
      />
    );
  }
}

// flipping is done by scale transform
const styles = StyleSheet.create({
  flip: {
    transform: [{ scaleY: -1 }]
  }
});
