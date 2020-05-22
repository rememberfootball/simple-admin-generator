import React from 'react';
import { act, render, screen } from '@testing-library/react';
import definitions from '../resources/definitions';
import { MemoryRouter } from 'react-router-dom';
import Routes from '../../lib/Routes';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

const mockLogin = jest.fn();

beforeEach(() => {
    jest.resetAllMocks();
});

test('renders the login page', async () => {
    mockLogin.mockResolvedValue(null);

    await act(async () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes definitions={definitions} withAuth={true} login={mockLogin} />
            </MemoryRouter>
        );
    });

    const page = screen.getByTestId('page-login');
    const form = page.getElementsByTagName('form')[0];
    const inputs = form.getElementsByTagName('input');

    expect(page.getElementsByTagName('h1')[0]).toHaveTextContent('Login');
    expect(page.getElementsByClassName('MuiBackdrop-root')).toHaveLength(1);
    expect(form).toBeDefined();

    await act(async () => {
        await userEvent.type(inputs[0], 'myusername');
        await userEvent.type(inputs[1], 'mypassword');
        await userEvent.click(screen.getByTestId('login-button'));
    });

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('myusername', 'mypassword');
});
