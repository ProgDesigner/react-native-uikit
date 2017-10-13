const React = require('react');
const ReactNative = require('react-native');
const createReactClass = require('create-react-class');
const Moment = require('moment');
const TimerMixin = require('react-timer-mixin');
const PropTypes = require('prop-types');

var { Text } = ReactNative;

var TimerText = createReactClass({
  mixins: [TimerMixin],
  propTypes: {
    time: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.array,
      PropTypes.instanceOf(Date)
    ]).isRequired,
    reverse: PropTypes.bool,
    enabled: PropTypes.bool,
    interval: PropTypes.number
  },

  getInitialState () {
    return {
      time: this.props.reverse ? parseInt(Moment.utc().format('x')) : this.props.time,
    };
  },

  getDefaultProps() {
    return {
      time: parseInt(Moment.utc().format('x')),
      enabled: true,
      interval: 1000
    }
  },

  componentDidMount() {
    var {interval} = this.props;
    this.setInterval(this.update, interval);
  },

  componentWillUnmount() {
    this.clearInterval(this.update);
  },

  // We're using this method because of a weird bug
  // where autobinding doesn't seem to work w/ straight this.forceUpdate
  update() {
    if (this.props.enabled === true) {
        this.state.time = this.props.reverse ? parseInt(Moment.utc().format('x')) : this.state.time + this.props.interval;
    }
    this.forceUpdate();
  },

  render() {

    let timeMoment = this.props.reverse ? Moment.utc(this.props.time-this.state.time) : Moment.utc(this.state.time-this.props.time);
    let text = timeMoment.format('HH:mm:ss');

    return (
      <Text {...this.props}>{text}</Text>
    );
  }
});

module.exports = TimerText;
