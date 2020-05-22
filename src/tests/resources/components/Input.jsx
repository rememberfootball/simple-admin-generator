import React from 'react';

export default props => <input
    {...props}
    placeholder={props.label}
    type="text"
    onChange={e => props.onChange(e.target.value)}
/>
