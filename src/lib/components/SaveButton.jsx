import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default () => {
    const classes = useStyles();

    return <Button
        data-testid="save-button"
        variant="contained"
        color="primary"
        className={classes.button}
        type="submit"
        startIcon={<SaveIcon />}
    >
        Save
    </Button>;
};
