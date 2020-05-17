# Simple Admin Generator

## What is it?

It's a tool that helps you create a full back-office by declaring all the resources forms in dedicated files. 

Why that?

Conceiving a back-office can quickly introduce a lot of redundancies. Let's consider each form has its `handleThisChanged`, `handleThatChanged` method, followed by a `handleSubmit`, that will always do the same work, passing the bundled data to a parent component. Then you have, for each resource, a list, create, edit, delete behavior, and you can easily end-up with a lot of crap if you don't reuse.

Well, this is exactly the purpose of this project. Don't implement the pages, don't implement the forms. Just tell it some information that it can't guess, such as "where do you want to put your inputs", "what are the handlers to perform actions (call the API for instance)".

Just the needed stuff.

## Install

```
npm install i -S @rememberfootball/simple-admin-generator 
```

## User guide

You can find detailed instructions on using Simple Admin Generator in its [documentation](docs/user-guide.md)

