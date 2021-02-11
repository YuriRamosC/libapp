import React, { useState, useEffect } from 'react';
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import AlterarLivro from '../AlterarLivro';
import DeletarLivro from '../DeletarLivro';
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
export default function TabelaLivros({ listaLivros, handleNovoLivro, setScreenState, screenStates, communication, atualizarDados }) {
    const classes = stylesBase();
    return (
      <div align='center'>
        <Button onClick={handleNovoLivro} margin='normal' className={classes.submit} align='center' variant="contained" color="action">Adicionar livro</Button>
        <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='lg'>
          <Table stickyHeader size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Editar</StyledTableCell>
                <StyledTableCell>Deletar</StyledTableCell>
                <StyledTableCell>ISBN</StyledTableCell>
                <StyledTableCell>Nome</StyledTableCell>
                <StyledTableCell>Autor</StyledTableCell>
                <StyledTableCell>Editora</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listaLivros.map((livro, index) => {
                return (
                  <TableRow key={`livro_${index}`}>
                    <StyledTableCell padding='checkbox'>
                    <AlterarLivro livro={livro} listaLivros={listaLivros} communication={communication} atualizarDados={atualizarDados}/>
                    </StyledTableCell>
                    <StyledTableCell padding='checkbox'>
                    <DeletarLivro livro={livro} communication={communication} atualizarDados={atualizarDados}/>
                    </StyledTableCell>
                    <TableCell>{livro.isbn}</TableCell>
                    <TableCell >{livro.nome}</TableCell >
                    <TableCell >{livro.autor}</TableCell >
                    <TableCell>{livro.editora}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }