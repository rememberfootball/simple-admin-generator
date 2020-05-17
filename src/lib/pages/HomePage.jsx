import React from 'react';
import { Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import filterFormDefinitionsHelper from '../helpers/filterFormDefinitionsHelper';
import './HomePage.css';

export default props => {
    const definitions = filterFormDefinitionsHelper(props.definitions, props.withAuth, props.user);
    const IconComponent = d.icon || <></>

    return <section className="HomePage">
        <div className="grid-8-small-2-tiny-2">
            {definitions.map((d, i) => <Link className="HomePage-link" to={d.baseUrl} key={i}>
                <Paper className="HomePage-paper" square={true}>
                    <div className="HomePage-linkContent">
                        <IconComponent />
                        <br />
                        {d.titles.list}
                    </div>
                </Paper>
            </Link>)}
        </div>
    </section>;
}
