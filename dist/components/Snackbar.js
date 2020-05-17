function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return /*#__PURE__*/React.createElement(MuiAlert, _extends({
    elevation: 6,
    variant: "filled"
  }, props));
}

export default (props => {
  return /*#__PURE__*/React.createElement(Snackbar, {
    open: props.open,
    autoHideDuration: 2000,
    onClose: props.onClose
  }, /*#__PURE__*/React.createElement(Alert, {
    onClose: props.onClose,
    severity: props.severity
  }, props.message));
});