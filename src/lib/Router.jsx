import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Routes from './Routes';

export default props => {
    return <Router>
        <Switch>
            <Routes definitions={props.definitions} withAuth={props.withAuth} user={props.user} login={props.login} />
        </Switch>
    </Router>;
}
