
import React, { useState, useEffect } from 'react';
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AlterarFuncionario from '../AlterarFuncionario';
import DeletarFuncionario from '../DeletarFuncionario';
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
export default function TabelaFuncionarios({ listaFuncionarios, handleNovoFuncionario, setScreenState, screenStates, communication }) {
    const classes = stylesBase();
    return (
        <div align='center'>
            <Button onClick={handleNovoFuncionario} className={classes.submit} margin='normal' align='center' variant="contained" color="action">Adicionar funcionario</Button>
            <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='lg'>
                <Table stickyHeader size='small' aria-label='a dense table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align='center'>Editar</StyledTableCell>
                            <StyledTableCell align='center'>Deletar</StyledTableCell>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell align="right" >Email</StyledTableCell>
                            <StyledTableCell align="right" >Senha</StyledTableCell>
                            <StyledTableCell align="right" >Admin</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listaFuncionarios.map((funcionario, index) => {
                            return (
                                <TableRow key={`funcionario_${index}`}>
                                    <StyledTableCell align="center" padding='checkbox'>
                                        <AlterarFuncionario funcionario={funcionario} listaFuncionarios={listaFuncionarios} communication={communication}/>
                                    </StyledTableCell>
                                    <StyledTableCell align="center" padding='checkbox'>
                                    <DeletarFuncionario funcionario={funcionario} communication={communication}/>
                                    </StyledTableCell>
                                    <TableCell >{funcionario.nome}</TableCell >
                                    <TableCell align="right">{funcionario.email}</TableCell>
                                    <TableCell align="right">{funcionario.password}</TableCell>
                                    <TableCell align="right">{funcionario.admin}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}