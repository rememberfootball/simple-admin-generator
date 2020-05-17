import { forIn, get } from 'lodash';

export default (placeholder, vars, object) => {
    let str = placeholder;

    forIn(vars, (val, key) => {
        str = str.replace(key, get(object, val, ''));
    });

    return str;
};
