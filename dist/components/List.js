import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { get } from 'lodash';
export default (props => {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TableContainer, {
    component: Paper
  }, /*#__PURE__*/React.createElement(Table, {
    style: {
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement(TableHead, null, /*#__PURE__*/React.createElement(TableRow, null, props.headers.map((header, i) => /*#__PURE__*/React.createElement(TableCell, {
    key: `head-${i}`
  }, header.title)), /*#__PURE__*/React.createElement(TableCell, null))), /*#__PURE__*/React.createElement(TableBody, null, props.rows.map((row, i) => /*#__PURE__*/React.createElement(TableRow, {
    key: `row-${i}`
  }, props.headers.map((header, j) => /*#__PURE__*/React.createElement(TableCell, {
    key: `cell-${j}`
  }, get(row, header.field))), /*#__PURE__*/React.createElement(TableCell, {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "default",
    startIcon: /*#__PURE__*/React.createElement(EditIcon, null),
    size: "small",
    onClick: () => {
      props.onEditClick(row.id);
    }
  }, "Edit"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "secondary",
    startIcon: /*#__PURE__*/React.createElement(DeleteIcon, null),
    size: "small",
    onClick: () => {
      props.onDeleteClick(row.id);
    }
  }, "Delete"))))))), props.paginate && props.rows.length > 0 ? /*#__PURE__*/React.createElement(TablePagination, {
    component: "div",
    count: props.count,
    rowsPerPage: props.rowsPerPage,
    rowsPerPageOptions: [props.rowsPerPage],
    page: props.page,
    onChangePage: props.onChangePage
  }) : null);
});