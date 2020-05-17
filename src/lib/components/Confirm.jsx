import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';

export default props => {
    return <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={props.open}
    >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
            {props.content}
        </DialogContent>
        <DialogActions>
            <Button autoFocus onClick={props.onCancel} color="primary">Cancel</Button>
            <Button onClick={props.onOk} color="primary">Ok</Button>
        </DialogActions>
    </Dialog>;
};
