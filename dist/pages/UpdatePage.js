import React, { useEffect, useState } from 'react';
import definitionToDefaultValueHelper from '../helpers/definitionToDefaultValueHelper';
import titleHelper from '../helpers/titleHelper';
import Form from '../Form';
import Backdrop from '../components/Backdrop';
import Snackbar from '../components/Snackbar';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
export default (props => {
  const [data, setData] = useState(definitionToDefaultValueHelper(props.definition.form));
  const [loading, setLoading] = useState(true);
  const [successSnackbar, setSuccessSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const {
    id
  } = useParams();

  const init = () => {
    props.definition.calls.read(id).then(data => {
      setData(data);
      setLoading(false);
    });
  };

  useEffect(init, []);

  const handleChange = d => {
    setData({ ...d
    });
  };

  const handleSave = () => {
    setLoading(true);
    props.definition.calls.update(data).then(() => {
      setLoading(false);
      setSuccessSnackbar(true);
    }).catch(() => {
      setLoading(false);
      setErrorSnackbar(true);
    });
  };

  const handleCloseSuccessSnackbar = () => {
    setSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbar(false);
  };

  return /*#__PURE__*/React.createElement("section", {
    "data-testid": "page-update"
  }, /*#__PURE__*/React.createElement("h1", null, titleHelper(props.definition.titles.update, props.definition.titles.vars, data)), /*#__PURE__*/React.createElement(Breadcrumb, {
    links: [{
      label: 'Home',
      href: '/',
      icon: HomeIcon
    }, {
      label: props.definition.titles.list,
      href: props.definition.baseUrl,
      icon: ListIcon
    }],
    label: titleHelper(props.definition.titles.update, props.definition.titles.vars, data),
    icon: EditIcon
  }), /*#__PURE__*/React.createElement(Form, {
    data: data,
    form: props.definition.form,
    onChange: handleChange,
    onSave: handleSave
  }), /*#__PURE__*/React.createElement(Backdrop, {
    open: loading
  }), /*#__PURE__*/React.createElement(Snackbar, {
    open: successSnackbar,
    onClose: handleCloseSuccessSnackbar,
    severity: "success",
    message: "Saved successfully"
  }), /*#__PURE__*/React.createElement(Snackbar, {
    open: errorSnackbar,
    onClose: handleCloseErrorSnackbar,
    severity: "error",
    message: "Error while saving"
  }));
});