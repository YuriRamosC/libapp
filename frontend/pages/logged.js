import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab';
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Comunicacao from '../communication';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  EMPRESTIMOS: 'EMPRESTIMOS',
  FUNCIONARIOS: 'FUNCIONARIOS',
  NOVOEMPRESTIMO: 'NOVOEMPRESTIMO',
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
const stylesForm = makeStyles((theme) => ({
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
export default function Logged() {
  const [screenState, setScreenState] = React.useState(screenStates.EMPRESTIMOS);
  const router = useRouter();
  const [funcionarioLogado, setFuncionarioLogado] = React.useState([]);
  const [listaLivros, setListaLivros] = React.useState([]);
  const [listaClientes, setListaClientes] = React.useState([]);
  const [emprestimos, setEmprestimos] = React.useState([]);
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
    communication.bearerGET(localStorage.token, '/emprestimos')
      .then((values) => {
        setEmprestimos(values.emprestimos);
      })
  }, [screenState]);
  function listarLivros() {
    setScreenState(screenStates.LIVROS);
  }
  function listarClientes() {
    setScreenState(screenStates.CLIENTES);
  }

  function listarEmprestimos() {
    setScreenState(screenStates.EMPRESTIMOS);
  }
  function novoEmprestimo() {
    setScreenState(screenStates.NOVOEMPRESTIMO);
  }
  function devolucao() {
    console.log('devolucao');
  }
  return (
    <div>
      <MenuAppBar funcionario={funcionarioLogado} novoEmprestimo={novoEmprestimo} devolucao={devolucao} listarLivros={listarLivros} listarClientes={listarClientes} listarEmprestimos={listarEmprestimos} />
      <Container maxWidth='md'>
        {screenState === screenStates.LIVROS && <TabelaLivros listaLivros={listaLivros} />}
        {screenState === screenStates.CLIENTES && <TabelaClientes listaClientes={listaClientes} />}
        {screenState === screenStates.EMPRESTIMOS && <TabelaEmprestimos listaEmprestimos={emprestimos} listaClientes={listaClientes} listaLivros={listaLivros} />}
        {screenState === screenStates.NOVOEMPRESTIMO && <NovoEmprestimo setScreenState={setScreenState} listaClientes={listaClientes} listaLivros={listaLivros} communication={communication}/>}
      </Container>
    </div>
  )
}

function TabelaEmprestimos({ listaEmprestimos, listaClientes, listaLivros }) {
  return (
    <TableContainer component={Paper} style={{ align: 'center' }} size='small' maxWidth='lg'>
      <Table stickyHeader size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Editar</StyledTableCell>
            <StyledTableCell>Deletar</StyledTableCell>
            <StyledTableCell>(ID) Cliente</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Livro</StyledTableCell>
            <StyledTableCell>ISBN</StyledTableCell>
            <StyledTableCell>Data de Entrega</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaEmprestimos.map((emprestimo, index) => {
            return (
              <TableRow key={`emprestimo_${index}`}>
                <StyledTableCell padding='checkbox'>
                  <EditIcon color="action" />
                </StyledTableCell>
                <StyledTableCell padding='checkbox'>
                  <DeleteForeverIcon color='error' />
                </StyledTableCell>
                <TableCell>{listaClientes.find((obj) => { return obj.id === emprestimo.cliente_id }).nome}</TableCell>
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

function TabelaLivros({ listaLivros }) {
  return (
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
            <StyledTableCell>Preço</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listaLivros.map((livro, index) => {
            return (
              <TableRow key={`livro_${index}`}>
                <StyledTableCell padding='checkbox'>
                  <EditIcon color="action" />
                </StyledTableCell>
                <StyledTableCell padding='checkbox'>
                  <DeleteForeverIcon color='error' />
                </StyledTableCell>
                <TableCell>{livro.isbn}</TableCell>
                <TableCell >{livro.nome}</TableCell >
                <TableCell >{livro.autor}</TableCell >
                <TableCell>{livro.editora}</TableCell>
                <TableCell>{livro.preco}</TableCell >
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

function NovoEmprestimo({ listaClientes, listaLivros, communication, setScreenState}) {
  const classes = stylesForm();
  const [clienteEmprestimo, setClienteEmprestimo] = React.useState('');
  const [livroEmprestimo, setLivroEmprestimo] = React.useState('');
  const [dataEntrega, setDataEntrega] = React.useState(undefined);

  const handleInputCliente = (event, newValue) => {
    console.log(newValue);
    setClienteEmprestimo(newValue);
  }
  const handleInputLivro = (event, newValue) => {
    console.log(newValue);
    setLivroEmprestimo(newValue);
  }

  const handleData = (event) => {
    setDataEntrega(event.target.value.replace('T02:00:00.000Z', ''));
  }

  const addEmprestimo = (event) => {
    event.preventDefault();
    communication.bearerPOST(localStorage.token, '/emprestimos',
    JSON.stringify({cliente_id: clienteEmprestimo.id, livro_id: livroEmprestimo.id, dataEntrega: dataEntrega}))
    .then((retorno) => {
      console.log(retorno);
      setScreenState(screenStates.EMPRESTIMOS);
    })
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Paper elevation={4} align='center' className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrar novo Empréstimo
        </Typography>
          <form align='center' onSubmit={addEmprestimo} method='post'>
            <Autocomplete
              id="cliente-emprestimo"
              align='center'
              options={listaClientes}
              getOptionLabel={(option) => option.nome}
              className={classes.textfield}
              onChange={handleInputCliente}
              onInputChange={handleInputCliente}
              value={clienteEmprestimo}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Cliente" align='center' className={classes.textfield} variant="outlined" fullWidth margin='normal' autoFocus />}
            />
            <Autocomplete
              id="livro-emprestimo"
              align='center'
              options={listaLivros}
              getOptionLabel={(option) => option.nome}
              className={classes.textfield}
              onChange={handleInputLivro}
              onInputChange={handleInputLivro}
              value={livroEmprestimo}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Livro" align='center' className={classes.textfield} variant="outlined" fullWidth margin='normal' autoFocus />}
            />
            <TextField align='center'
              id='date-emprestimo'
              label='Data de Entrega'
              type='date'
              value={dataEntrega}
              onChange={handleData}
              className={classes.submit}
              style={{ width: 300}}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              fullWidth
              type='submit'
              variant="contained"
              color="primary"
              className={classes.submit}
              value="Submit">
              Confirmar
          </Button>
          </form>
        </Paper>
      </Container>
    </div >
  )
}