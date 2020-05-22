import React from 'react';
import { act, render, screen } from '@testing-library/react';
import definitions from '../resources/definitions';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../lib/Routes';
import userEvent from '@testing-library/user-event';
import { cloneDeep } from 'lodash';
import '@testing-library/jest-dom/extend-expect';
import ArticleAPI from '../resources/apis/ArticleAPI';

beforeEach(() => {
    ArticleAPI.reset();
});

test('renders the list', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-list');
    const breadcrumb = page.getElementsByTagName('nav')[0];
    const breadcrumbsItems = breadcrumb.getElementsByClassName('MuiBreadcrumbs-li');
    const filters = page.getElementsByClassName('Filters')[0];
    const list = page.getElementsByClassName('MuiTable-root')[0];
    const listHeaders = list.getElementsByTagName('thead')[0];
    const listBody = list.getElementsByTagName('tbody')[0];
    const pagination = page.getElementsByClassName('MuiTablePagination-root')[0];

    expect(page.getElementsByTagName('h1')[0]).toHaveTextContent('Articles');
    expect(breadcrumb).toHaveAttribute('class', 'MuiTypography-root MuiBreadcrumbs-root MuiTypography-body1 MuiTypography-colorTextSecondary');
    expect(breadcrumbsItems).toHaveLength(2);
    expect(breadcrumb.getElementsByClassName('MuiBreadcrumbs-separator')).toHaveLength(1);
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveAttribute('href', '/');
    expect(breadcrumbsItems[0].getElementsByTagName('a')[0]).toHaveTextContent('Home');
    expect(breadcrumbsItems[1].getElementsByTagName('a')).toHaveLength(0);
    expect(breadcrumbsItems[1]).toHaveTextContent('Articles');
    expect(page.getElementsByClassName('MuiBackdrop-root')).toHaveLength(1);
    expect(filters).not.toBeUndefined();
    expect(filters.getElementsByTagName('input')).toHaveLength(1);
    expect(page.getElementsByClassName('MuiButtonBase-root')[0]).toHaveTextContent('New');
    expect(listHeaders.getElementsByTagName('th')).toHaveLength(2);
    expect(listHeaders.getElementsByTagName('th')[0]).toHaveTextContent('Name');
    expect(listBody.getElementsByTagName('tr')).toHaveLength(2);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')).toHaveLength(2);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0]).toHaveTextContent('Champions League: Rennes finally qualified');
    expect(listBody.getElementsByTagName('tr')[1].getElementsByTagName('td')).toHaveLength(2);
    expect(listBody.getElementsByTagName('tr')[1].getElementsByTagName('td')[0]).toHaveTextContent('Ligue 2: Final challenge for Ntep?');
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByClassName('MuiButtonBase-root')).toHaveLength(2);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByClassName('MuiButtonBase-root')[0]).toHaveTextContent('Edit');
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].getElementsByClassName('MuiButtonBase-root')[1]).toHaveTextContent('Delete');
    expect(pagination).not.toBeUndefined();
    expect(pagination).toHaveTextContent('1-2 of 2');
});

test('play with pagination', async () => {
    const testDefinitions = cloneDeep(definitions);

    testDefinitions[0].list.rowsPerPage = 1;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-list');
    const list = page.getElementsByClassName('MuiTable-root')[0];
    const listBody = list.getElementsByTagName('tbody')[0];
    const pagination = page.getElementsByClassName('MuiTablePagination-root')[0];

    expect(listBody.getElementsByTagName('tr')).toHaveLength(1);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0]).toHaveTextContent('Champions League: Rennes finally qualified');
    expect(pagination).toHaveTextContent('1-1 of 2');

    await act(async () => {
        await userEvent.click(pagination.getElementsByTagName('button')[1]);
    });

    expect(listBody.getElementsByTagName('tr')).toHaveLength(1);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0]).toHaveTextContent('Ligue 2: Final challenge for Ntep?');
    expect(pagination).toHaveTextContent('2-2 of 2');
});

test('with no pagination', async () => {
    const testDefinitions = cloneDeep(definitions, {});

    testDefinitions[0].list.paginate = false;
    testDefinitions[0].list.rowsPerPage = null;

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-list');
    const listBody = page.getElementsByClassName('MuiTable-root')[0].getElementsByTagName('tbody')[0];
    const pagination = page.getElementsByClassName('MuiTablePagination-root')[0];

    expect(listBody.getElementsByTagName('tr')).toHaveLength(2);
    expect(pagination).toBeUndefined();
});

test('filters', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-list');
    const filters = page.getElementsByClassName('Filters')[0];
    const list = page.getElementsByClassName('MuiTable-root')[0];
    const listBody = list.getElementsByTagName('tbody')[0];

    expect(filters).not.toBeUndefined();
    expect(filters.getElementsByTagName('input')).toHaveLength(1);
    expect(listBody.getElementsByTagName('tr')).toHaveLength(2);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0]).toHaveTextContent('Champions League: Rennes finally qualified');
    expect(listBody.getElementsByTagName('tr')[1].getElementsByTagName('td')[0]).toHaveTextContent('Ligue 2: Final challenge for Ntep?');

    await act(async () => {
        await userEvent.type(filters.getElementsByTagName('input')[0], 'Ntep');
    });

    expect(listBody.getElementsByTagName('tr')).toHaveLength(1);
    expect(listBody.getElementsByTagName('tr')[0].getElementsByTagName('td')[0]).toHaveTextContent('Ligue 2: Final challenge for Ntep?');
});

test('click on new', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.click(screen.getByTestId('page-list').getElementsByClassName('MuiButtonBase-root')[0]);
    });

    expect(screen.getByTestId('page-create').getElementsByTagName('h1')[0]).toHaveTextContent('Add a new article');
});

test('click on edit', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.click(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByClassName('MuiButtonBase-root')[0]);
    });

    expect(screen.getByTestId('page-update').getElementsByTagName('h1')[0]).toHaveTextContent('Update');
});

test('delete', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.click(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByClassName('MuiButtonBase-root')[1]);
    });

    const dialog = screen.getByRole('presentation');

    expect(dialog).not.toBeUndefined();
    expect(dialog).toHaveTextContent('Are you sure you want to delete this item ?');

    await act(async () => {
        await userEvent.click(dialog.getElementsByClassName('MuiButtonBase-root')[0]);
    });

    expect(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')).toHaveLength(2);

    await act(async () => {
        await userEvent.click(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByClassName('MuiButtonBase-root')[1]);
    });

    await act(async () => {
        await userEvent.click(dialog.getElementsByClassName('MuiButtonBase-root')[1]);
    });

    expect(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')).toHaveLength(1);
});

test('delete a filtered value', async () => {
    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-list');
    const filters = page.getElementsByClassName('Filters')[0];

    await act(async () => {
        await userEvent.type(filters.getElementsByTagName('input')[0], 'Ntep');
    });

    const deleteButton = screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByClassName('MuiButtonBase-root')[1];

    await act(async () => {
        await userEvent.click(deleteButton);
    });

    const dialog = screen.getByRole('presentation');

    await act(async () => {
        await userEvent.click(dialog.getElementsByClassName('MuiButtonBase-root')[1]);
    });

    expect(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')).toHaveLength(0);
});

test('fail to load', async () => {
    const testDefinitions = cloneDeep(definitions);

    testDefinitions[0].calls.list = () => Promise.reject();

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    expect(screen.getByTestId('page-list').getElementsByClassName('MuiSnackbar-root')).toHaveLength(1);
});

test('fail to delete', async () => {
    const testDefinitions = cloneDeep(definitions);

    testDefinitions[0].calls.delete = () => Promise.reject();

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/articles']}>
                <Routes definitions={testDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    await act(async () => {
        await userEvent.click(screen.getByTestId('page-list').getElementsByClassName('MuiTable-root')[0].getElementsByClassName('MuiButtonBase-root')[1]);
    });

    const dialog = screen.getByRole('presentation');

    await act(async () => {
        await userEvent.click(dialog.getElementsByClassName('MuiButtonBase-root')[1]);
    });

    expect(screen.getByTestId('page-list').getElementsByClassName('MuiSnackbar-root')).toHaveLength(1);
});
