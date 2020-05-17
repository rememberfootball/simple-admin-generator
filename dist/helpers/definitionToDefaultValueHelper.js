import { isUndefined, set } from 'lodash';
export default (definition => {
  const defaultValue = {};
  definition.blocks.forEach(container => {
    container.forEach(b => {
      set(defaultValue, b.field, isUndefined(b.defaultValue) ? '' : b.defaultValue);
    });
  });
  return defaultValue;
});