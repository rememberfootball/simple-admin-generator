import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
export default (props => {
  return /*#__PURE__*/React.createElement(Dialog, {
    disableBackdropClick: true,
    disableEscapeKeyDown: true,
    maxWidth: "xs",
    "aria-labelledby": "confirmation-dialog-title",
    open: props.open
  }, /*#__PURE__*/React.createElement(DialogTitle, null, props.title), /*#__PURE__*/React.createElement(DialogContent, null, props.content), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    autoFocus: true,
    onClick: props.onCancel,
    color: "primary"
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    onClick: props.onOk,
    color: "primary"
  }, "Ok")));
});