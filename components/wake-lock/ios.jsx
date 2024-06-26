import PropTypes from 'prop-types';
import createReactClass from 'create-react-class';
import { _DEBUG } from '../tools';

// method taken from https://github.com/richtr/NoSleep.js/blob/master/NoSleep.js
// needs testing.

let WakeLockIOS = createReactClass({

  displayName: "WakeLockIOS",

  propTypes: {
    preventSleep: PropTypes.bool
  },

  getDefaultProps() {
    return {
      preventSleep: true
    };
  },

  componentDidMount() {
    this.syncState(this.props.preventSleep);
  },


  componentWillUnmount() {
    this.syncState(false);
  },


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.syncState(nextProps.preventSleep);
  },


  syncState(preventSleep) {

    if (preventSleep && !this.timer) {
      _DEBUG('WakeLockIOS', 'Prevent sleep');

      this.timer = setInterval(() => {

        if (!document.hidden) {  // gh-richtr/NoSleep.js#25
          location.href = location.href;  // gh-richtr/NoSleep.js#12
          setTimeout(window.stop, 0);
        }

      }, 15000);

    }

    if (!preventSleep && this.timer) {

      clearInterval(this.timer);
      this.timer = null;

    }

  },


  render() {

    return null;

  }

});


export default WakeLockIOS;

