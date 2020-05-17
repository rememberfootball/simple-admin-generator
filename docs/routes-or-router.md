# Simple Admin Generator - Documentation - Using routes vs using router

## Using router

Simple Admin Generator comes with a built-in router (it uses `react-router`). This router is perfectly usable as it is, all you have to do is this and you'll get a fully working back-office:

```javascript
import React from 'react';
import { Router } from '@rememberfootball/Router';
import definitions from './forms/definitions';

const BackOffice = () => {
    return <div className="App">
        <Router definitions={definitions} withAuth={false} />
    </div>;
};

export default BackOffice;
```

This will add all the routes automatically. If `withAuth` is set to `true`, it will also add a login page (see [dedicated chapter](authentication.md)).

## Using routes

Sometimes you may need to have more routes in your application. In this case, it will be better to grab the routes instead, in order to incorporate them in your router yourself.

```javascript
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LegalPage from './pages/LegalPage';
import { Routes } from '@rememberfootball/Routes';
import definitions from './forms/definitions';

const Router = props => <BrowserRouter>
   <Switch>
       <Routes definitions={definitions} withAuth={props.withAuth} user={props.user} />
       <Route exact path="/legal">
           <LegalPage />
       </Route>
   </Switch>
</BrowserRouter>;

export default Router;
```

## Next step

[Using the Form component to create forms](form-component.md)
