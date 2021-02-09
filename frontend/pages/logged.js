import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, DataGrid, TableCell, TableBody, TableContainer, TableHead, TableRow, Table, Paper } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Comunicacao from '../communication';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  FUNCIONARIOS: 'FUNCIONARIOS',
  DEFAULT: 'DEFAULT'
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function Logged() {
  const [screenState, setScreenState] = React.useState(screenStates.LIVROS);
  const router = useRouter();
  const [funcionarioLogado, setFuncionarioLogado] = React.useState([]);
  const [listaLivros, setListaLivros] = React.useState([]);
  const [listaClientes, setListaClientes] = React.useState([]);
  const communication = new Comunicacao();
  useEffect(() => {
    communication.bearerGET(localStorage.token, '/profile')
      .then((values => {
        setFuncionarioLogado(values);
      }))

    communication.bearerGET(localStorage.token, '/livros')
      .then((values) => {
        setListaLivros(values.livros);
      })
    communication.bearerGET(localStorage.token, '/clientes')
      .then((values) => {
        setListaClientes(values.clientes);
      })
  }, []);
  function listarLivros() {
    setScreenState(screenStates.LIVROS);
  }
  function listarClientes() {
    setScreenState(screenStates.CLIENTES);
  }

  return (
    <div>
      <MenuAppBar funcionario={funcionarioLogado} listarLivros={listarLivros} listarClientes={listarClientes} />
      {screenState === screenStates.LIVROS && <TabelaLivros listaLivros={listaLivros} />}
      {screenState === screenStates.CLIENTES && <TabelaClientes listaClientes={listaClientes} />}
    </div>
  )
}

function TabelaLivros({ listaLivros }) {
  return (
    <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='md'>
      <Table stickyHeader size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Editar</StyledTableCell>
            <StyledTableCell align='center'>Deletar</StyledTableCell>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right" >Autor</StyledTableCell>
            <StyledTableCell align="right" >Preço</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaLivros.map((livro, index) => {
            return (
              <TableRow key={`livro_${index}`}>
                <StyledTableCell align="center" padding='checkbox'>
                  <EditIcon color="action" />
                </StyledTableCell>
                <StyledTableCell align="center" padding='checkbox'>
                  <DeleteForeverIcon color='error' />
                </StyledTableCell>
                <TableCell >{livro.nome}</TableCell >
                <TableCell align="right" >{livro.autor}</TableCell >
                <TableCell align="right" >{livro.preco}</TableCell >
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function TabelaClientes({ listaClientes }) {
  return (
    <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='md'>
      <Table stickyHeader size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Editar</StyledTableCell>
            <StyledTableCell align='center'>Deletar</StyledTableCell>
            <StyledTableCell>Nome</StyledTableCell>
            <StyledTableCell align="right" >CPF</StyledTableCell>
            <StyledTableCell align="right" >Email</StyledTableCell>
            <StyledTableCell align="right" >Telefone</StyledTableCell>
            <StyledTableCell align="right" >Multa atual</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaClientes.map((cliente, index) => {
            return (
              <TableRow key={`cliente_${index}`}>
                <StyledTableCell align="center" padding='checkbox'>
                  <EditIcon color="action" />
                </StyledTableCell>
                <StyledTableCell align="center" padding='checkbox'>
                  <DeleteForeverIcon color='error' />
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
  )
}