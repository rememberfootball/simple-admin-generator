import React from 'react';
import { Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import ListPage from './pages/ListPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import filterFormDefinitionsHelper from './helpers/filterFormDefinitionsHelper';
import './grillade.css';

const Routes = props => {
    const definitions = filterFormDefinitionsHelper(props.definitions, props.withAuth, props.user);

    return <>
        <Route exact path="/">
            <HomePage definitions={definitions} withAuth={props.withAuth} user={props.user} />
        </Route>
        {
            definitions.map((d, id) => (
                <Route key={`c${id}`} exact path={`${d.baseUrl}/new`}>
                    <CreatePage definition={d} />
                </Route>
            ))
        }
        {
            definitions.map((d, id) => (
                <Route key={`u${id}`} exact path={`${d.baseUrl}/edit/:id`}>
                    <UpdatePage definition={d} />
                </Route>
            ))
        }
        {
            definitions.map((d, id) => (
                <Route key={`l${id}`} exact path={`${d.baseUrl}`}>
                    <ListPage definition={d} />
                </Route>
            ))
        }
        {
            props.withAuth ? (
                <Route exact path="/login">
                    <LoginPage login={props.login} />
                </Route>
            ) : null
        }
    </>;
};

export default Routes;
