import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from '@material-ui/core';
import {get} from 'lodash';

export default (props) => {
    return <>
        <TableContainer component={Paper}>
            <Table style={{tableLayout: 'fixed'}}>
                <TableHead>
                    <TableRow>
                        {props.headers.map((header, i) => (
                            <TableCell key={`head-${i}`}>{ header.title }</TableCell>
                        ))}
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rows.map((row, i) => (
                        <TableRow key={`row-${i}`}>
                            {props.headers.map((header, j) => (
                                <TableCell key={`cell-${j}`}>{ get(row, header.field) }</TableCell>
                            ))}
                            <TableCell style={{textAlign: 'right'}}>
                                <Button
                                    variant="contained"
                                    color="default"
                                    startIcon={<EditIcon />}
                                    size="small"
                                    onClick={() => { props.onEditClick(row.id) }}
                                >
                                    Edit
                                </Button>
                                { props.canDelete ? (
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        startIcon={<DeleteIcon />}
                                        size="small"
                                        onClick={() => { props.onDeleteClick(row.id) }}
                                    >
                                        Delete
                                    </Button>
                                ) : null }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {props.paginate && props.rows.length > 0 ? (
            <TablePagination
                component="div"
                count={props.count}
                rowsPerPage={props.rowsPerPage}
                rowsPerPageOptions={[props.rowsPerPage]}
                page={props.page}
                onChangePage={props.onChangePage}
            />
        ) : null}
    </>;
};
