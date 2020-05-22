import React from 'react';

export default props => <textarea
    {...props}
    placeholder={props.label}
    onChange={e => props.onChange(e.target.value)}
/>
