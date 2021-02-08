import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { withStyles, Button, DataGrid, TableCell, TableBody, TableContainer, TableHead, TableRow, Table, Paper } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Comunicacao from '../communication';
import theme from '../theme'
const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  FUNCIONARIOS: 'FUNCIONARIOS',
  DEFAULT: 'DEFAULT'
}
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.dark,
    color: theme.palette.contrastText,
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
      <MenuAppBar funcionario={funcionarioLogado} listarLivros={listarLivros} listarClientes={listarClientes}/>
      {screenState === screenStates.LIVROS  && <TabelaLivros listaLivros={listaLivros} />}
      {screenState === screenStates.CLIENTES && <TabelaClientes listaClientes={listaClientes}/>}
    </div>
  )
}

function TabelaLivros({ listaLivros }) {
  return (
    <TableContainer component={Paper} style={{ align: 'center', height: 400, width: '100%' }}>
    <Table size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow>
          <StyledTableCell>Nome</StyledTableCell>
          <StyledTableCell>Autor</StyledTableCell>
          <StyledTableCell>Preço</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listaLivros.map((livro, index) => {
          return (
            <TableRow key={`livro_${index}`}>
              <TableCell >{livro.nome}</TableCell >
              <TableCell >{livro.autor}</TableCell >
              <TableCell >{livro.preco}</TableCell >
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
    <TableContainer component={Paper} style={{ align: 'center', height: 400, width: '100%' }}>
    <Table size='small' aria-label='a dense table'>
      <TableHead>
        <TableRow>
          <StyledTableCell>Nome</StyledTableCell>
          <StyledTableCell>CPF</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Telefone</StyledTableCell>
          <StyledTableCell>Multa atual</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {listaClientes.map((cliente, index) => {
          return (
            <TableRow key={`cliente_${index}`}>
              <TableCell >{cliente.nome}</TableCell >
              <TableCell >{cliente.cpf}</TableCell >
              <TableCell >{cliente.email}</TableCell>
              <TableCell >{cliente.telefone}</TableCell>
              <TableCell >{cliente.multa}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  </TableContainer>
  )
}