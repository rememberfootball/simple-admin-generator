import React from 'react';
import {Paper} from '@material-ui/core';
import Input from './Input';

export default props => {
    return <Paper className="Filters" style={{marginBottom: '2rem', padding: '0.5rem', backgroundColor: '#EEEEEE'}}>
        <h3>Filters</h3>
        <div className="autogrid has-gutter">
            {props.filters.map((filter, i) => (
                <Input
                    key={i}
                    style={{margin: '1rem'}}
                    label={filter.title}
                    onChange={value => props.onChange(value, filter.filter, filter.title)}
                />
            ))}
        </div>
    </Paper>;
};
