import React from 'react';
import { act, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import definitions from '../resources/definitions';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../lib/Routes';
import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import '@testing-library/jest-dom/extend-expect';

const mockAPIRead = jest.fn();
const mockAPIUpdate = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

test('renders the update page', async () => {
    const testDefinitions = cloneDeep(definitions);

    mockAPIRead.mockResolvedValue({
        id: 1,
        name: 'Champions League: Rennes finally qualified',
        content: 'Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world',
        category: '2'
    });
    mockAPIUpdate.mockResolvedValue(null);

    testDefinitions[0].calls.read = mockAPIRead;
    testDefinitions[0].calls.update = mockAPIUpdate;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles/edit/1']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await waitFor(() => expect(mockAPIRead).toHaveBeenCalled());

    expect(mockAPIRead).toHaveBeenCalledWith('1');

    const page = screen.getByTestId('page-update');
    const breadcrumb = page.getElementsByTagName('nav')[0];
    const breadcrumbsItems = breadcrumb.getElementsByClassName('MuiBreadcrumbs-li');
    const form = page.getElementsByTagName('form')[0];

    expect(page.getElementsByTagName('h1')[0]).toHaveTextContent('Update "Champions League: Rennes finally qualified"');
    expect(breadcrumb).toHaveAttribute('class', 'MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary');
    expect(breadcrumbsItems).toHaveLength(3);
    expect(breadcrumb.getElementsByClassName('MuiBreadcrumbs-separator')).toHaveLength(2);
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveAttribute('href', '/');
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveTextContent('Home');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveAttribute('href', '/articles');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveTextContent('Articles');
    expect(breadcrumbsItems[2].getElementsByTagName('a')).toHaveLength(0);
    expect(breadcrumbsItems[2]).toHaveTextContent('Update "Champions League: Rennes finally qualified"');
    expect(page.getElementsByClassName('MuiBackdrop-root')).toHaveLength(1);
    expect(form).toBeDefined();
    expect(screen.getByTestId(`form-block-name`)).toHaveValue('Champions League: Rennes finally qualified');
    expect(screen.getByTestId(`form-block-content`)).toHaveValue('Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world');
    expect(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0]).toHaveValue('2');

    await act(async () => {
        await userEvent.clear(screen.getByTestId(`form-block-name`));
        await userEvent.type(screen.getByTestId(`form-block-name`), 'Autret leaves Stade Brestois');
        await userEvent.clear(screen.getByTestId(`form-block-content`));
        await userEvent.type(screen.getByTestId(`form-block-content`), 'After having waited for a contract extension, Mathias Autret decided to leave the club.');
        await userEvent.selectOptions(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0], '1');
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(mockAPIUpdate).toHaveBeenCalledTimes(1);
    expect(mockAPIUpdate).toHaveBeenCalledWith({
        id: 1,
        name: 'Autret leaves Stade Brestois',
        content: 'After having waited for a contract extension, Mathias Autret decided to leave the club.',
        category: '1'
    });

    const snackBars = screen.getByTestId('page-update').getElementsByClassName('MuiSnackbar-root');
    expect(snackBars).toHaveLength(1);
    expect(snackBars[0]).toHaveTextContent('Saved successfully');

    await waitForElementToBeRemoved(snackBars[0], { timeout: 3000 });
});

test('renders the update page when called from a noList configuration', async () => {
    const testDefinitions = cloneDeep(definitions);

    mockAPIRead.mockResolvedValue({
        id: 1,
        name: 'Champions League: Rennes finally qualified',
        content: 'Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world',
        category: '2'
    });
    mockAPIUpdate.mockResolvedValue(null);

    testDefinitions[0].list.noList = true;
    testDefinitions[0].calls.read = mockAPIRead;
    testDefinitions[0].calls.update = mockAPIUpdate;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await waitFor(() => expect(mockAPIRead).toHaveBeenCalled());

    expect(mockAPIRead.mock.calls[0][0]).toBeUndefined();

    const page = screen.getByTestId('page-update');
    const breadcrumb = page.getElementsByTagName('nav')[0];
    const breadcrumbsItems = breadcrumb.getElementsByClassName('MuiBreadcrumbs-li');
    const form = page.getElementsByTagName('form')[0];

    expect(page.getElementsByTagName('h1')[0]).toHaveTextContent('Update "Champions League: Rennes finally qualified"');
    expect(breadcrumb).toHaveAttribute('class', 'MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary');
    expect(breadcrumbsItems).toHaveLength(3);
    expect(breadcrumb.getElementsByClassName('MuiBreadcrumbs-separator')).toHaveLength(2);
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveAttribute('href', '/');
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveTextContent('Home');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveAttribute('href', '/articles');
    expect(breadcrumbsItems[1].getElementsByTagName('a')[0]).toHaveTextContent('Articles');
    expect(breadcrumbsItems[2].getElementsByTagName('a')).toHaveLength(0);
    expect(breadcrumbsItems[2]).toHaveTextContent('Update "Champions League: Rennes finally qualified"');
    expect(page.getElementsByClassName('MuiBackdrop-root')).toHaveLength(1);
    expect(form).toBeDefined();
    expect(screen.getByTestId(`form-block-name`)).toHaveValue('Champions League: Rennes finally qualified');
    expect(screen.getByTestId(`form-block-content`)).toHaveValue('Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world');
    expect(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0]).toHaveValue('2');

    await act(async () => {
        await userEvent.clear(screen.getByTestId(`form-block-name`));
        await userEvent.type(screen.getByTestId(`form-block-name`), 'Autret leaves Stade Brestois');
        await userEvent.clear(screen.getByTestId(`form-block-content`));
        await userEvent.type(screen.getByTestId(`form-block-content`), 'After having waited for a contract extension, Mathias Autret decided to leave the club.');
        await userEvent.selectOptions(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0], '1');
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(mockAPIUpdate).toHaveBeenCalledTimes(1);
    expect(mockAPIUpdate).toHaveBeenCalledWith({
        id: 1,
        name: 'Autret leaves Stade Brestois',
        content: 'After having waited for a contract extension, Mathias Autret decided to leave the club.',
        category: '1'
    });

    const snackBars = screen.getByTestId('page-update').getElementsByClassName('MuiSnackbar-root');
    expect(snackBars).toHaveLength(1);
    expect(snackBars[0]).toHaveTextContent('Saved successfully');

    await waitForElementToBeRemoved(snackBars[0], { timeout: 3000 });
});

test('fails to update', async () => {
    const testDefinitions = cloneDeep(definitions);

    mockAPIRead.mockResolvedValue({
        id: 1,
        name: 'Champions League: Rennes finally qualified',
        content: 'Thanks to its third position in French Ligue 1, Rennes will compete for the first time in the most prestigious football competition in the world',
        category: '2'
    });
    mockAPIUpdate.mockRejectedValue(null);

    testDefinitions[0].calls.read = mockAPIRead;
    testDefinitions[0].calls.update = mockAPIUpdate;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles/edit/1']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.clear(screen.getByTestId(`form-block-name`));
        await userEvent.type(screen.getByTestId(`form-block-name`), 'Autret leaves Stade Brestois');
        await userEvent.clear(screen.getByTestId(`form-block-content`));
        await userEvent.type(screen.getByTestId(`form-block-content`), 'After having waited for a contract extension, Mathias Autret decided to leave the club.');
        await userEvent.selectOptions(screen.getByTestId(`form-block-category`).getElementsByTagName('select')[0], '1');
        await userEvent.click(screen.getByTestId('save-button'));
    });

    expect(mockAPIUpdate).toHaveBeenCalledTimes(1);
    expect(mockAPIUpdate).toHaveBeenCalledWith({
        id: 1,
        name: 'Autret leaves Stade Brestois',
        content: 'After having waited for a contract extension, Mathias Autret decided to leave the club.',
        category: '1'
    });

    const snackBars = screen.getByTestId('page-update').getElementsByClassName('MuiSnackbar-root');
    expect(snackBars).toHaveLength(1);
    expect(snackBars[0]).toHaveTextContent('Error while saving');

    await waitForElementToBeRemoved(snackBars[0], { timeout: 3000 });
});
