import React, { useState } from 'react';
import Input from './Input';
import { Button } from '@material-ui/core';
export default (props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmit(username, password);
  };

  return /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    value: username,
    onChange: setUsername,
    label: "Username"
  }), /*#__PURE__*/React.createElement(Input, {
    type: "password",
    value: password,
    onChange: setPassword,
    label: "Password"
  }), /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    type: "submit"
  }, "Login"));
});