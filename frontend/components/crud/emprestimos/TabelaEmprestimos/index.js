import React, { useState, useEffect } from 'react';
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Devolucao from '../../../Devolucao';
import DeletarEmprestimo from '../DeletarEmprestimo';
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
export default function TabelaEmprestimos({ listaEmprestimos, listaClientes, listaLivros, devolucao, communication }) {
    return (
      <TableContainer component={Paper} style={{ align: 'center' }} size='medium'>
        <Table stickyHeader size='medium' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Deletar</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Cliente</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Livro</StyledTableCell>
              <StyledTableCell>ISBN</StyledTableCell>
              <StyledTableCell>Entrega</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaEmprestimos.map((emprestimo, index) => {
              return (
                <TableRow key={`emprestimo_${index}`}>
                  <StyledTableCell align='center' padding='checkbox'>
                    <DeletarEmprestimo emprestimo={emprestimo} communication={communication} />
                  </StyledTableCell>
                  {emprestimo.devolvido === 1 && <StyledTableCell>Devolvido</StyledTableCell>}
                  {emprestimo.devolvido === 0 && <StyledTableCell><Devolucao devolucao={devolucao} emprestimo={emprestimo}/></StyledTableCell>}
                  <TableCell align='center'>{listaClientes.find((obj) => { return obj.id === emprestimo.cliente_id }).nome}</TableCell>
                  <TableCell>{listaClientes.find((obj) => { return obj.id === emprestimo.cliente_id }).email}</TableCell>
                  <TableCell>{listaLivros.find((obj) => { return obj.id === emprestimo.livro_id }).nome}</TableCell>
                  <TableCell>{listaLivros.find((obj) => { return obj.id === emprestimo.livro_id }).isbn}</TableCell>
                  <TableCell>{emprestimo.dataEntrega.replace('T02:00:00.000Z', '')}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }
  