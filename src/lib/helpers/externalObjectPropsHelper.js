import { forIn, get, set } from 'lodash';

export default (propsToBuild, data) => {
    if (!propsToBuild) {
        return {};
    }

    const newProps = {};

    forIn(propsToBuild, (val, key) => {
        set(newProps, key, get(data, val));
    });

    return newProps;
}
