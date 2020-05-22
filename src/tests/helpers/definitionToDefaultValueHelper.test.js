import React from 'react';
import ArticleFormDefinition from '../resources/definitions/forms/ArticleFormDefinition';
import { definitionToDefaultValueHelper } from '../../../index';
import '@testing-library/jest-dom/extend-expect';

test('returns the form\'s default value based on its definition', async () => {
    const data = definitionToDefaultValueHelper(ArticleFormDefinition);

    expect(data).toEqual({
        name: '',
        content: 'This is the default content',
        category: ''
    });
});
