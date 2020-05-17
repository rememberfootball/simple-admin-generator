import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

export default props => {
    const classes = useStyles();
    const IconComponent = props.icon;

    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: '1rem' }}>
            { props.links.map((l, i) => {
                const LinkIconComponent = l.icon;

                return (
                    <Link key={i} color="inherit" href={l.href} className={classes.link}>
                        <LinkIconComponent className={classes.icon} />
                        { l.label }
                    </Link>
                )
            }) }
            <Typography color="textPrimary" className={classes.link}>
                <IconComponent className={classes.icon} />
                { props.label }
            </Typography>
        </Breadcrumbs>
    );
};
