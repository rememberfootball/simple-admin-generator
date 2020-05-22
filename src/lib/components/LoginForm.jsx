import React, {useState} from 'react';
import Input from './Input';
import { Button } from '@material-ui/core';

export default  props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit(username, password);
    }

    return <form onSubmit={handleSubmit}>
        <Input type="text" value={username} onChange={setUsername} label="Username" />
        <Input type="password" value={password} onChange={setPassword} label="Password" />
        <Button color="primary" type="submit" data-testid="login-button">Login</Button>
    </form>;
};
