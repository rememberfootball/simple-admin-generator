import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import filterFormDefinitionsHelper from '../helpers/filterFormDefinitionsHelper';
import './HomePage.css';
export default (props => {
  const definitions = filterFormDefinitionsHelper(props.definitions, props.withAuth, props.user);
  return /*#__PURE__*/React.createElement("section", {
    className: "HomePage",
    "data-testid": "page-home"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-8-small-2-tiny-2"
  }, definitions.map((d, i) => {
    const IconComponent = d.icon || React.Fragment;
    return /*#__PURE__*/React.createElement(Link, {
      className: "HomePage-link",
      to: d.baseUrl,
      key: i
    }, /*#__PURE__*/React.createElement(Paper, {
      className: "HomePage-paper",
      square: true
    }, /*#__PURE__*/React.createElement("div", {
      className: "HomePage-linkContent"
    }, /*#__PURE__*/React.createElement(IconComponent, null), /*#__PURE__*/React.createElement("p", null, d.titles.list))));
  })));
});