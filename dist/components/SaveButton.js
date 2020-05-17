import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));
export default (props => {
  const classes = useStyles();
  return /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary",
    className: classes.button,
    startIcon: /*#__PURE__*/React.createElement(SaveIcon, null),
    onClick: props.onSave
  }, "Save");
});