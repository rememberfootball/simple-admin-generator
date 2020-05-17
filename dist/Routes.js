import React from 'react';
import { Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import ListPage from './pages/ListPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import filterFormDefinitionsHelper from './helpers/filterFormDefinitionsHelper';
import './grillade.css';

const Routes = props => {
  const definitions = filterFormDefinitionsHelper(props.definitions, props.withAuth, props.user);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/"
  }, /*#__PURE__*/React.createElement(HomePage, {
    definitions: definitions,
    withAuth: props.withAuth,
    user: props.user
  })), definitions.map((d, id) => /*#__PURE__*/React.createElement(Route, {
    key: `c${id}`,
    exact: true,
    path: `${d.baseUrl}/new`
  }, /*#__PURE__*/React.createElement(CreatePage, {
    definition: d
  }))), definitions.map((d, id) => /*#__PURE__*/React.createElement(Route, {
    key: `u${id}`,
    exact: true,
    path: `${d.baseUrl}/edit/:id`
  }, /*#__PURE__*/React.createElement(UpdatePage, {
    definition: d
  }))), definitions.map((d, id) => /*#__PURE__*/React.createElement(Route, {
    key: `l${id}`,
    exact: true,
    path: `${d.baseUrl}`
  }, /*#__PURE__*/React.createElement(ListPage, {
    definition: d
  }))), props.withAuth ? /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: "/login"
  }, /*#__PURE__*/React.createElement(LoginPage, {
    login: props.login
  })) : null);
};

export default Routes;