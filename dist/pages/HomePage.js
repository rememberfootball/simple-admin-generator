import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './HomePage.css';
import '../vendor/icofont/icofont.min.css';
import filterFormDefinitionsHelper from '../helpers/filterFormDefinitionsHelper';
export default (props => {
  const definitions = filterFormDefinitionsHelper(props.definitions, props.withAuth, props.user);
  const IconComponent = d.icon || /*#__PURE__*/React.createElement(React.Fragment, null);
  return /*#__PURE__*/React.createElement("section", {
    className: "HomePage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-8-small-2-tiny-2"
  }, definitions.map((d, i) => /*#__PURE__*/React.createElement(Link, {
    className: "HomePage-link",
    to: d.baseUrl,
    key: i
  }, /*#__PURE__*/React.createElement(Paper, {
    className: "HomePage-paper",
    square: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "HomePage-linkContent"
  }, /*#__PURE__*/React.createElement(IconComponent, null), /*#__PURE__*/React.createElement("br", null), d.titles.list))))));
});