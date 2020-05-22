import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { getEmptyOptions, fetchOptions, fetchAllOptions } from '../../lib/helpers/optionsStateHelper';
import AuthorFormDefinition from '../resources/definitions/forms/AuthorFormDefinition';

const mockCommentAPIlist = jest.fn();
const mockCategoryAPIlist = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

describe('getEmptyOptions', () => {
    test('returns only fields with providers, fed with an empty array', () => {
        expect(getEmptyOptions(AuthorFormDefinition.blocks)).toEqual({ goodComments: [], badComments: [], category: [] })
    });
});

describe('fetchOptions', () => {
    test('fetches options for all the fields with the given field\'s provider, making only one call', async () => {
        const APIresult = [{ optionId: 1 }, { optionId: 2 }];

        AuthorFormDefinition.providers.comments = mockCommentAPIlist;
        mockCommentAPIlist.mockResolvedValueOnce(APIresult);

        const result = await fetchOptions(AuthorFormDefinition, AuthorFormDefinition.blocks[1][0]);

        expect(result).toEqual({ goodComments: APIresult, badComments: APIresult });
        expect(mockCommentAPIlist).toHaveBeenCalledTimes(1);
    });
});

describe('fetchAllOptions', () => {
    test('fetches options for all the fields, making only one call per provider', async () => {
        const CommentAPIresult = [{ optionId: 1 }, { optionId: 2 }];
        const CategoryAPIresult = [{ optionId: 3 }, { optionId: 4 }];

        AuthorFormDefinition.providers.comments = mockCommentAPIlist;
        AuthorFormDefinition.providers.category = mockCategoryAPIlist;

        mockCommentAPIlist.mockResolvedValueOnce(CommentAPIresult);
        mockCategoryAPIlist.mockResolvedValueOnce(CategoryAPIresult);

        const result = await fetchAllOptions(AuthorFormDefinition);

        expect(result).toEqual({
            goodComments: CommentAPIresult,
            badComments: CommentAPIresult,
            category: CategoryAPIresult
        });
        expect(mockCommentAPIlist).toHaveBeenCalledTimes(1);
        expect(mockCategoryAPIlist).toHaveBeenCalledTimes(1);
    });
});
