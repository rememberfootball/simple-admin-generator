import { cloneDeep } from 'lodash';

function API(start) {
    let _collection = cloneDeep(start);

    const reset = () => {
        _collection = cloneDeep(start);
    };

    const read = id => Promise.resolve(_collection.find(i => i.id === id));

    const list = () => Promise.resolve(_collection);

    const create = value => {
        _collection.push(value);

        return Promise.resolve();
    };

    const update = value => {
        _collection[_collection.findIndex(i => i.id === value.id)] = value;

        return Promise.resolve();
    };

    const del = id => {
        _collection.splice(_collection.findIndex(i => i.id === id), 1);

        return Promise.resolve();
    };

    return { reset, read, list, create, update, del };
}

export default API;
