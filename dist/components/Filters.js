import React from 'react';
import { Paper } from '@material-ui/core';
import Input from './Input';
export default (props => {
  return /*#__PURE__*/React.createElement(Paper, {
    className: "Filters",
    style: {
      marginBottom: '2rem',
      padding: '0.5rem',
      backgroundColor: '#EEEEEE'
    }
  }, /*#__PURE__*/React.createElement("h3", null, "Filters"), /*#__PURE__*/React.createElement("div", {
    className: "autogrid has-gutter"
  }, props.filters.map((filter, i) => /*#__PURE__*/React.createElement(Input, {
    key: i,
    style: {
      margin: '1rem'
    },
    label: filter.title,
    onChange: value => props.onChange(value, filter.filter, filter.title)
  }))));
});