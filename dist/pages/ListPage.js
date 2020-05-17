import React, { useEffect, useState } from 'react';
import { toPairs } from 'lodash';
import Backdrop from '../components/Backdrop';
import Snackbar from '../components/Snackbar';
import List from '../components/List';
import { useHistory } from 'react-router-dom';
import Filters from '../components/Filters';
import { Button } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Confirm from '../components/Confirm';
import Breadcrumb from '../components/Breadcrumb';
export default (props => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [compares, setCompares] = useState({});
  const [filtersValues, setFiltersValues] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [listData, setListData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  const load = async () => {
    try {
      const d = await props.definition.calls.list();
      setLoading(false);
      return Promise.resolve(d);
    } catch (e) {
      setErrorSnackbar(true);
      return Promise.reject();
    }
  };

  const init = () => {
    load().then(d => {
      const subset = props.definition.list.paginate ? d.slice(0, props.definition.list.rowsPerPage) : d;
      setData(d);
      setFilteredData(d);
      setListData(subset);
    }).catch(() => {
      setErrorSnackbar(true);
    });
  };

  useEffect(init, []);

  const handleEditClick = id => {
    history.push(`${props.definition.baseUrl}/edit/${id}`);
  };

  const handleDeleteClick = id => {
    setToDeleteId(id);
  };

  const handleDeleteOk = () => {
    setLoading(true);
    setToDeleteId(null);
    props.definition.calls.delete(toDeleteId).then(() => {
      load().then(d => {
        const filtered = props.definition.list.filters ? d.filter(i => {
          for (const [key, comp] of toPairs(compares)) {
            if (!comp(i, filtersValues[key])) {
              return false;
            }
          }

          return true;
        }) : [...d];
        setData(d);
        setFilteredData(filtered);
        setListData(props.definition.paginate ? filtered.slice(page * props.definition.list.rowsPerPage, (page + 1) * props.definition.list.rowsPerPage) : filtered);
        setPage(0);
      });
    }).catch(() => {
      setErrorSnackbar(true);
    });
  };

  const handleFilterChange = (value, compare, title) => {
    const newCompares = { ...compares,
      [title]: compare
    };
    const newFiltersValues = { ...filtersValues,
      [title]: value
    };
    const filtered = data.filter(i => {
      for (const [key, comp] of toPairs(newCompares)) {
        if (!comp(i, newFiltersValues[key])) {
          return false;
        }
      }

      return true;
    });
    setFilteredData(filtered);
    setCompares(newCompares);
    setFiltersValues(newFiltersValues);
    setListData(filtered.slice(page * props.definition.list.rowsPerPage, (page + 1) * props.definition.list.rowsPerPage));
    setPage(0);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    setListData(filteredData.slice(newPage * props.definition.list.rowsPerPage, (newPage + 1) * props.definition.list.rowsPerPage));
  };

  const handleCloseErrorSnackbar = () => {
    setErrorSnackbar(false);
  };

  const ListComponent = props.definition.list.component || List;
  return /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("h1", null, props.definition.titles.list), /*#__PURE__*/React.createElement(Breadcrumb, {
    links: [{
      label: 'Home',
      href: '/',
      icon: HomeIcon
    }],
    label: props.definition.titles.list,
    icon: ListIcon
  }), /*#__PURE__*/React.createElement(Backdrop, {
    open: loading
  }), props.definition.list.filters ? /*#__PURE__*/React.createElement(Filters, {
    filters: props.definition.list.filters,
    onChange: handleFilterChange
  }) : null, /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary",
    size: "small",
    startIcon: /*#__PURE__*/React.createElement(AddCircleIcon, null),
    onClick: () => history.push(`${props.definition.baseUrl}/new`)
  }, "New"), /*#__PURE__*/React.createElement(ListComponent, {
    headers: props.definition.list.displayedColumns,
    rows: listData,
    paginate: props.definition.list.paginate || false,
    rowsPerPage: props.definition.list.rowsPerPage,
    page: page,
    count: filteredData.length,
    onEditClick: handleEditClick,
    onDeleteClick: handleDeleteClick,
    onChangePage: handleChangePage
  }), /*#__PURE__*/React.createElement(Snackbar, {
    open: errorSnackbar,
    onClose: handleCloseErrorSnackbar,
    severity: "error",
    message: "An error occured"
  }), /*#__PURE__*/React.createElement(Confirm, {
    open: toDeleteId !== null,
    title: "Are you sure ?",
    content: "Are you sure you want to delete this item ?",
    onCancel: () => {
      setToDeleteId(null);
    },
    onOk: handleDeleteOk
  }));
});