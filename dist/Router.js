import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes';
export default (props => {
  return /*#__PURE__*/React.createElement(Router, null, /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Routes, {
    definitions: props.definitions,
    withAuth: props.withAuth,
    user: props.user,
    login: props.login
  })));
});