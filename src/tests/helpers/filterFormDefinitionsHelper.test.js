import React from 'react';
import filterFormDefinitionsHelper from '../../../src/lib/helpers/filterFormDefinitionsHelper';
import '@testing-library/jest-dom/extend-expect';
import definitions from '../resources/definitions';

test('returns all the definitions if there is no authentication', async () => {
    const data = filterFormDefinitionsHelper(definitions, false);

    expect(data).toEqual(definitions);
    expect(data.length).toEqual(2);
});

test('returns no definition if there is authentication but no user', async () => {
    const dataWithUndefined = filterFormDefinitionsHelper(definitions, true);
    const dataWithNull = filterFormDefinitionsHelper(definitions, true, null);

    expect(dataWithUndefined).toEqual([]);
    expect(dataWithNull).toEqual([]);
});

test('returns no definition if there is authentication but no user', async () => {
    const dataWithUndefined = filterFormDefinitionsHelper(definitions, true);
    const dataWithNull = filterFormDefinitionsHelper(definitions, true, null);

    expect(dataWithUndefined).toEqual([]);
    expect(dataWithNull).toEqual([]);
});

test('returns definitions with no roles if user role does not match', async () => {
    const data = filterFormDefinitionsHelper(definitions, true, { roles: ['ROLE_NOT_MATCHING'] });

    expect(data.length).toEqual(1);
    expect(data[0].baseUrl).toEqual('/comments');
});

test('returns definitions with no roles and definitions matching role', async () => {
    const data = filterFormDefinitionsHelper(definitions, true, { roles: ['ROLE_ADMIN'] });

    expect(data.length).toEqual(2);
    expect(data[0].baseUrl).toEqual('/articles');
    expect(data[1].baseUrl).toEqual('/comments');
});
