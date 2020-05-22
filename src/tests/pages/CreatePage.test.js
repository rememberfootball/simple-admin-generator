import React from 'react';
import { act, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import definitions from '../resources/definitions';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../lib/Routes';
import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import '@testing-library/jest-dom/extend-expect';

const mockAPICreate = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

test('renders the creation page', async () => {
    const testDefinitions = cloneDeep(definitions);

    mockAPICreate.mockResolvedValue({ id: 2 });

    testDefinitions[0].calls.create = mockAPICreate;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles/new']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-create');
    const breadcrumb = page.getElementsByTagName('nav')[0];
    const breadcrumbsItems = breadcrumb.getElementsByClassName('MuiBreadcrumbs-li');
    const form = page.getElementsByTagName('form')[0];

    expect(page.getElementsByTagName('h1')[0]).toHaveTextContent('Add a new article');
    expect(breadcrumb).toHaveAttribute('class', 'MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary');
    expect(breadcrumbsItems).toHaveLength(3);
    expect(breadcrumb.getElementsByClassName('MuiBreadcrumbs-separator')).toHaveLength(2);
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveAttribute('href', '/');
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveTextContent('Home');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveAttribute('href', '/articles');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveTextContent('Articles');
    expect(breadcrumbsItems[2].getElementsByTagName('a')).toHaveLength(0);
    expect(breadcrumbsItems[2]).toHaveTextContent('Add a new article');
    expect(page.getElementsByClassName('MuiBackdrop-root')).toHaveLength(1);
    expect(form).toBeDefined();

    await act(async () => {
        await userEvent.type(screen.getByTestId(`form-block-name`), 'Autret leaves Stade Brestois');
        await userEvent.clear(screen.getByTestId(`form-block-content`));
        await userEvent.type(screen.getByTestId(`form-block-content`), 'After having waited for a contract extension, Mathias Autret decided to leave the club.');
        await userEvent.selectOptions(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0], '2');
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(mockAPICreate).toHaveBeenCalledTimes(1);
    expect(mockAPICreate).toHaveBeenCalledWith({
        name: 'Autret leaves Stade Brestois',
        content: 'After having waited for a contract extension, Mathias Autret decided to leave the club.',
        category: '2'
    });

    const snackBars = screen.getByTestId('page-create').getElementsByClassName('MuiSnackbar-root');
    expect(snackBars).toHaveLength(1);
    expect(snackBars[0]).toHaveTextContent('Saved successfully');

    await waitForElementToBeRemoved(snackBars[0], { timeout: 3000 });

    expect(screen.getByTestId('page-update')); // checks the redirection has been made
});

test('fails to create', async () => {
    const testDefinitions = cloneDeep(definitions);

    mockAPICreate.mockRejectedValue(null);

    testDefinitions[0].calls.create = mockAPICreate;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles/new']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.type(screen.getByTestId(`form-block-name`), 'Autret leaves Stade Brestois');
        await userEvent.clear(screen.getByTestId(`form-block-content`));
        await userEvent.type(screen.getByTestId(`form-block-content`), 'After having waited for a contract extension, Mathias Autret decided to leave the club.');
        await userEvent.selectOptions(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0], '2');
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(mockAPICreate).toHaveBeenCalledTimes(1);
    expect(mockAPICreate).toHaveBeenCalledWith({
        name: 'Autret leaves Stade Brestois',
        content: 'After having waited for a contract extension, Mathias Autret decided to leave the club.',
        category: '2'
    });

    const snackBars = screen.getByTestId('page-create').getElementsByClassName('MuiSnackbar-root');
    expect(snackBars).toHaveLength(1);
    expect(snackBars[0]).toHaveTextContent('Error while saving');

    await waitForElementToBeRemoved(snackBars[0], { timeout: 3000 });

    expect(screen.getByTestId('page-create')); // checks the redirection has not been made
});
