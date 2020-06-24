# Simple Admin Generator - Documentation - Authentication

Simple Admin Generator lets you handle the authentication. Everything it needs is to know if there actually is an authentication mechanism, and if there is, who is the user and what is the login method to call. All the rest is up to you.

With built-in router:
```javascript
const login = (username, password) => {
    /* call API for login, retrieve user, and return promise resolve if ok, rejection if not */
}

return <Router definitions={definitions} withAuth={true} user={user} login={login} />;
```

With `Routes` component:
```javascript
const login = (username, password) => {
    /* call API for login, retrieve user, and return promise resolve if ok, rejection if not */
}

return <Routes definitions={definitions} withAuth={true} user={user} login={login} />;
```

If `withAuth` is set to true, a login page will be created, and accessible through `/login`.
If `withAuth` is set to false, no param other than `definitions` is needed, obviously.

### Restricting some forms to given roles

Some forms and fields can be restricted to given roles, by setting the `roles` array property in their definition (see [dedicated chapter](form-definitions.md)). In this case, the user **must** have a `roles` array property.  
