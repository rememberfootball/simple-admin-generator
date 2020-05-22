import React from 'react';
import externalObjectPropsHelper from '../../../src/lib/helpers/externalObjectPropsHelper';
import '@testing-library/jest-dom/extend-expect';

test('returns an empty array if called with nothing', async () => {
    const data = externalObjectPropsHelper();

    expect(data).toEqual({});
});

test('returns an array of props based on given data\'s property pathes', async () => {
    const data = externalObjectPropsHelper({
        label: 'name',
        picture: 'picture.path',
        category: 'category.name'
    }, {
        name: 'The name',
        picture: {
            path: '/background.jpg'
        }
    });

    expect(data).toEqual({
        label: 'The name',
        picture: '/background.jpg',
        category: undefined
    });
});
