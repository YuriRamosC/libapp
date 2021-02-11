
import React, { useState, useEffect } from 'react';
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AlterarCliente from '../AlterarCliente';
import DeletarCliente from '../DeletarCliente';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
const stylesBase = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function TabelaClientes({ listaClientes, handleNovoCliente, setScreenState, screenStates, communication, atualizarDados }) {
    const classes = stylesBase();
    return (
        <div align='center'>
            <Button onClick={handleNovoCliente} className={classes.submit} margin='normal' align='center' variant="contained" color="action">Adicionar cliente</Button>
            <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='lg'>
                <Table stickyHeader size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Editar</StyledTableCell>
                            <StyledTableCell align='center'>Deletar</StyledTableCell>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell align="right" >CPF</StyledTableCell>
                            <StyledTableCell align="right" >Email</StyledTableCell>
                            <StyledTableCell align="right" >Telefone</StyledTableCell>
                            <StyledTableCell align="right" >Multa</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaClientes.map((cliente, index) => {
                            return (
                                <TableRow key={`cliente_${index}`}>
                                    <StyledTableCell align="center" padding='checkbox'>
                                        <AlterarCliente cliente={cliente} listaClientes={listaClientes} communication={communication} atualizarDados={atualizarDados}/>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" padding='checkbox'>
                                    <DeletarCliente cliente={cliente} communication={communication}  atualizarDados={atualizarDados}/>
                                    </StyledTableCell>
                                    <TableCell >{cliente.nome}</TableCell >
                                    <TableCell align="right">{cliente.cpf}</TableCell >
                                    <TableCell align="right">{cliente.email}</TableCell>
                                    <TableCell align="right">{cliente.telefone}</TableCell>
                                    <TableCell align="right">{cliente.multa}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}