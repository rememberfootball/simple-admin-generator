import React from 'react';
import TextField from '@material-ui/core/TextField';

export default props => <TextField
    {...props}
    style={{ width: '100%', margin: '0.5rem', ...props.style }}
    onChange={e => props.onChange(e.target.value)}
/>;
