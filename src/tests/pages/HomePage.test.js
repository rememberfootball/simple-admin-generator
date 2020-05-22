import React from 'react';
import { act, render, screen } from '@testing-library/react';
import definitions from '../resources/definitions';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../lib/Routes';
import '@testing-library/jest-dom/extend-expect'
import withoutIconsDefinitions from '../resources/definitions/withoutIconsDefinitions';

test('renders links to all the back-offices if no auth', async () => {
    await act(async () => {
        render(
            <MemoryRouter>
                <Routes definitions={definitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const links = screen.getByTestId('page-home').getElementsByClassName('HomePage-link');

    expect(links.length).toEqual(2);
    expect(links[0]).toHaveAttribute('href', '/articles');
    expect(links[0].getElementsByTagName('p')[0]).toHaveTextContent('Articles');
    expect(links[0].getElementsByTagName('svg')[0]).toHaveAttribute('class', 'MuiSvgIcon-root');
    expect(links[1]).toHaveAttribute('href', '/comments');
    expect(links[1].getElementsByTagName('p')[0]).toHaveTextContent('Comments');
    expect(links[1].getElementsByTagName('svg')[0]).toHaveAttribute('class', 'MuiSvgIcon-root');
});

test('renders links to back-offices with roles and open ones if auth with access', async () => {
    await act(async () => {
        render(
            <MemoryRouter>
                <Routes definitions={definitions} withAuth={true} user={{ roles: ['ROLE_ADMIN'] }} />
            </MemoryRouter>
        );
    });

    const links = screen.getByTestId('page-home').getElementsByClassName('HomePage-link');

    expect(links.length).toEqual(2);
    expect(links[0]).toHaveAttribute('href', '/articles');
    expect(links[0].getElementsByTagName('p')[0]).toHaveTextContent('Articles');
    expect(links[0].getElementsByTagName('svg')[0]).toHaveAttribute('class', 'MuiSvgIcon-root');
    expect(links[1]).toHaveAttribute('href', '/comments');
    expect(links[1].getElementsByTagName('p')[0]).toHaveTextContent('Comments');
    expect(links[1].getElementsByTagName('svg')[0]).toHaveAttribute('class', 'MuiSvgIcon-root');
});

test('renders links to only open back-offices if auth with low access', async () => {
    await act(async () => {
        render(
            <MemoryRouter>
                <Routes definitions={definitions} withAuth={true} user={{ roles: ['ROLE_LOW_ACCESS'] }} />
            </MemoryRouter>
        );
    });

    const links = screen.getByTestId('page-home').getElementsByClassName('HomePage-link');

    expect(links.length).toEqual(1);
    expect(links[0]).toHaveAttribute('href', '/comments');
    expect(links[0].getElementsByTagName('p')[0]).toHaveTextContent('Comments');
    expect(links[0].getElementsByTagName('svg')[0]).toHaveAttribute('class', 'MuiSvgIcon-root');
});

test('renders links without icons', async () => {
    await act(async () => {
        render(
            <MemoryRouter>
                <Routes definitions={withoutIconsDefinitions} withAuth={false} />
            </MemoryRouter>
        );
    });

    const links = screen.getByTestId('page-home').getElementsByClassName('HomePage-link');

    expect(links.length).toEqual(1);
    expect(links[0]).toHaveAttribute('href', '/without-icon');
    expect(links[0].getElementsByTagName('p')[0]).toHaveTextContent('Without icon');
    expect(links[0].getElementsByTagName('svg')).toHaveLength(0);
});
