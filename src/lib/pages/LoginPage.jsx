import React, { useState } from 'react';
import Backdrop from '../components/Backdrop';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default ({ login }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleSubmit = async (username, password) => {
        try {
            setLoading(true);
            await login(username, password);
            setLoading(false);
            history.push('/');
        } catch (e) {
            setLoading(false);
        }
    };

    return <section>
        <h1>Login</h1>

        <Backdrop open={loading} />
        <LoginForm onSubmit={handleSubmit} />
    </section>;
}
