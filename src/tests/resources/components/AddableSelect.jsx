import React from 'react';

export default props => {
    const handleAdd = async e => {
        e.preventDefault();
        props.onAdd({ id: props.options.length + 1, label: `Category ${props.options.length + 1}` });

        props.onRequireRefresh();
    };

    return <div data-testid={props['data-testid']}>
        <p>Select called "{ props.label }"</p>
        <select value={props.value} onChange={e => props.onChange(e.target.value)}>
            {props.options.map((o, i) => <option value={o.id} key={i}>{ o.label }</option> )}
        </select>
        <button data-testid="button-for-select-add" onClick={handleAdd}>+</button>
    </div>
}
