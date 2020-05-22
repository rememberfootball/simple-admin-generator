import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Form from '../lib/Form';
import ArticleFormDefinition from './resources/definitions/forms/ArticleFormDefinition';
import { definitionToDefaultValueHelper } from '../../index';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('renders form with accurate inputs', async () => {
    let data = definitionToDefaultValueHelper(ArticleFormDefinition);
    const setData = d => { data = d; }

    await act(async () => {
        render(<Form form={ArticleFormDefinition} data={data} onChange={setData} onSave={() => {}} />)
    });

    const form = screen.getByTestId('form');
    const row0 = screen.getByTestId('row-0');
    const row1 = screen.getByTestId('row-1');
    const blockName = screen.getByTestId('form-block-name');
    const blockContent = screen.getByTestId('form-block-content');
    const blockCategory = screen.getByTestId('form-block-category');

    expect(form).toContainElement(row0);
    expect(form).toContainElement(row1);
    expect(row0).toContainElement(blockName);
    expect(row0).toContainElement(blockContent);
    expect(row1).toContainElement(blockCategory);
    expect(blockName.tagName).toBe('INPUT');
    expect(blockContent.tagName).toBe('TEXTAREA');
    expect(blockCategory.tagName).toBe('DIV');
});

test('props are sent to components', async () => {
    let data = definitionToDefaultValueHelper(ArticleFormDefinition);
    const setData = d => { data = d; }

    await act(async () => {
        render(<Form form={ArticleFormDefinition} data={data} onChange={setData} onSave={() => {}} />)
    });

    const blockName = screen.getByTestId('form-block-name');
    const blockContent = screen.getByTestId('form-block-content');

    expect(blockName).toHaveAttribute('placeholder', 'Name');
    expect(blockContent).toHaveAttribute('placeholder', 'Content');

});

test('default values are sent to components', async () => {
    let data = definitionToDefaultValueHelper(ArticleFormDefinition);
    const setData = d => { data = d; }

    await act(async () => {
        render(<Form form={ArticleFormDefinition} data={data} onChange={setData} onSave={() => {}} />)
    });

    const blockContent = screen.getByTestId('form-block-content');

    expect(blockContent).toHaveValue('This is the default content');
});

test('external object props are sent to components', async () => {
    await act(async () => {
        let data = definitionToDefaultValueHelper(ArticleFormDefinition);
        data.name = 'THE GREAT NAME';

        render(<Form form={ArticleFormDefinition} data={data} onChange={d => { data = d; }} onSave={() => {}} />)
    });

    const blockCategory = screen.getByTestId('form-block-category');

    expect(blockCategory.getElementsByTagName('p')[0]).toHaveTextContent('Select called "THE GREAT NAME"');
});

test('options provider returns accurate amount of options', async () => {
    await act(async () => {
        let data = definitionToDefaultValueHelper(ArticleFormDefinition);
        data.name = 'THE GREAT NAME';

        render(<Form form={ArticleFormDefinition} data={data} onChange={d => { data = d; }} onSave={() => {}} />)
    });

    expect(screen.getByTestId('form-block-category').getElementsByTagName('select')[0].getElementsByTagName('option').length).toEqual(2);
});

test('options refresher adds options', async () => {
    await act(async () => {
        let data = definitionToDefaultValueHelper(ArticleFormDefinition);
        data.name = 'THE GREAT NAME';

        render(<Form form={ArticleFormDefinition} data={data} onChange={d => { data = d; }} onSave={() => {}} />)
    });

    expect(screen.getByTestId('form-block-category').getElementsByTagName('select')[0].getElementsByTagName('option').length).toEqual(2);

    await act(async () => {
        await userEvent.click(screen.getByTestId('button-for-select-add'));
    });

    expect(screen.getByTestId('form-block-category').getElementsByTagName('select')[0].getElementsByTagName('option').length).toEqual(3);
});

test('click on save activates onSave', async () => {
    let data = definitionToDefaultValueHelper(ArticleFormDefinition);
    let saved = false;
    let rerender = () => {};
    const handleSave = () => {
        saved = true;
    };
    const handleChange = newData => {
        data = newData;
        rerender(<Form form={ArticleFormDefinition} data={data} onChange={handleChange} onSave={handleSave} />);
    }

    await act(async () => {
        rerender = render(<Form form={ArticleFormDefinition} data={data} onChange={handleChange} onSave={handleSave} />).rerender
    });

    expect(saved).toBeFalsy();
    expect(data).toEqual({
        name: '',
        content: 'This is the default content',
        category: ''
    });

    // Changes inputs
    await act(async () => {
        await userEvent.type(screen.getByTestId('form-block-name'), 'The brand new name');
        await userEvent.clear(screen.getByTestId('form-block-content'));
        await userEvent.type(screen.getByTestId('form-block-content'), 'The brand new content !');
        await userEvent.selectOptions(screen.getByTestId('form-block-category').getElementsByTagName('select')[0], ['2']);
    });

    // Hit save
    await act(async () => {
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(saved).toBeTruthy();
    expect(data).toEqual({
        name: 'The brand new name',
        content: 'The brand new content !',
        category: '2'
    });
});
