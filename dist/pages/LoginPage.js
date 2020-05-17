import React, { useState } from 'react';
import Backdrop from '../components/Backdrop';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
export default (({
  login
}) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (username, password) => {
    try {
      setLoading(true);
      await login(username, password);
      setLoading(false);
      history.push('/');
    } catch (e) {
      setLoading(false);
    }
  };

  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", null, "Login"), /*#__PURE__*/React.createElement(Backdrop, {
    open: loading
  }), /*#__PURE__*/React.createElement(LoginForm, {
    onSubmit: handleSubmit
  }));
});