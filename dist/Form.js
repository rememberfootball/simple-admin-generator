function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect } from 'react';
import { isUndefined, get, set } from 'lodash';
import SaveButton from './form/SaveButton';
import externalObjectPropsHelper from '../helpers/externalObjectPropsHelper';
import { getEmptyOptions, fetchAllOptions, fetchOptions } from '../helpers/optionsStateHelper';
export default (props => {
  const [options, setOptions] = useState(getEmptyOptions(props.form.blocks));

  const init = () => {
    fetchAllOptions(props.form).then(setOptions);
  };

  useEffect(init, []);

  const handleChange = (newValue, block) => {
    const data = props.data;
    set(data, block.field, newValue);
    props.onChange(data);
  };

  const handleRequireRefresh = async block => setOptions({ ...options,
    ...(await fetchOptions(props.form, block))
  });

  return /*#__PURE__*/React.createElement("section", null, props.form.blocks.map((blocksContainer, r) => /*#__PURE__*/React.createElement("div", {
    className: "autogrid has-gutter-xl row",
    key: `r${r}`,
    style: {
      padding: '1rem'
    }
  }, blocksContainer.map((block, c) => {
    const Component = block.component;
    const optionsProp = isUndefined(options[block.field]) ? {} : {
      options: options[block.field]
    };
    const refreshProp = block.refreshable ? {
      onRequireRefresh: () => handleRequireRefresh(block)
    } : {};
    const dataValue = get(props.data, block.field);
    const value = isUndefined(dataValue) ? isUndefined(block.defaultValue) ? '' : block.defaultValue : dataValue;
    return /*#__PURE__*/React.createElement(Component, _extends({}, block.props, externalObjectPropsHelper(block.externalObjectProps, props.data), optionsProp, refreshProp, {
      value: value,
      onChange: v => handleChange(v, block),
      key: `r${r}c${c}`
    }));
  }))), /*#__PURE__*/React.createElement(SaveButton, {
    onSave: props.onSave
  }, "Save"));
});