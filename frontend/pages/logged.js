import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab';
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import moment from 'moment';
import { useRouter } from 'next/router'
import Comunicacao from '../communication/api';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import NovoEmprestimo from '../components/crud/NovoEmprestimo';
import NovoLivro from '../components/crud/NovoLivro';
import NovoCliente from '../components/crud/NovoCliente';
import Devolucao from '../components/Devolucao';
const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  EMPRESTIMOS: 'EMPRESTIMOS',
  FUNCIONARIOS: 'FUNCIONARIOS',
  NOVOEMPRESTIMO: 'NOVOEMPRESTIMO',
  NOVOLIVRO: 'NOVOLIVRO',
  NOVOCLIENTE: 'NOVOCLIENTE',
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
        return values.emprestimos;
      }).then((emprestimos) => {
        const today = moment();
        listaClientes.map((cliente) => {
          //lógica da multa e do email
          var multaTotal = 0;
          emprestimos.map((emprestimo) => {
            if (cliente.id === emprestimo.cliente_id && emprestimo.devolvido == false) {
              var diasAtrasados = today.diff(moment(emprestimo.dataEntrega.replace('T02:00:00.000Z', '')), 'days');
              var clienteEmprestimo = listaClientes.find((obj) => { return obj.id === emprestimo.cliente_id });
              var livroEmprestimo = listaLivros.find((obj) => { return obj.id === emprestimo.livro_id });

              if (diasAtrasados > 0) {
                multaTotal = multaTotal + (5 * today.diff(moment(emprestimo.dataEntrega.replace('T02:00:00.000Z', '')), 'days'))
              }
              else if (diasAtrasados === 0 && emprestimo.isNotified == false) {
                communication.bearerPOST(localStorage.token,
                  '/notificarEntrega',
                  JSON.stringify({
                    remetente: clienteEmprestimo.email,
                    assunto: 'Notificação LibApp',
                    mensagem: `${clienteEmprestimo.nome} Falta 1 dia para você entregar o livro ${livroEmprestimo.nome}`
                  })
                ).then((retorno) => {
                  communication.bearerPOST(localStorage.token,
                    '/emprestimosUpdate',
                    JSON.stringify({
                      id: emprestimo.id,
                      cliente_id: emprestimo.cliente_id,
                      livro_id: emprestimo.livro_id,
                      dataEntrega: emprestimo.dataEntrega,
                      isNotified: 1,
                      devolvido: emprestimo.devolvido
                    }));
                });
              }
            }
          })
          communication.bearerPOST(localStorage.token,
            '/clientesUpdate',
            JSON.stringify({
              id: cliente.id,
              nome: cliente.nome,
              cpf: cliente.cpf,
              email: cliente.email,
              multa: multaTotal,
              telefone: cliente.telefone,
              endereco: cliente.endereco
            }))
            .then(retorno => console.log(retorno));
        });
      });
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
  function handleNovoLivro() {
    setScreenState(screenStates.NOVOLIVRO);
  }
  function handleNovoCliente() {
    setScreenState(screenStates.NOVOCLIENTE);
  }
  function devolucao() {
    console.log('devolucao');
  }
  return (
    <div>
      <MenuAppBar funcionario={funcionarioLogado} novoEmprestimo={novoEmprestimo} devolucao={devolucao} listarLivros={listarLivros} listarClientes={listarClientes} listarEmprestimos={listarEmprestimos} />
      <Container maxWidth='md'>
        {screenState === screenStates.LIVROS && <TabelaLivros listaLivros={listaLivros} handleNovoLivro={handleNovoLivro} setScreenState={setScreenState} screenStates={screenStates} />}
        {screenState === screenStates.CLIENTES && <TabelaClientes listaClientes={listaClientes} handleNovoCliente={handleNovoCliente} setScreenState={setScreenState} screenStates={screenStates} />}
        {screenState === screenStates.EMPRESTIMOS && <TabelaEmprestimos devolucao={devolucao} listaEmprestimos={emprestimos} listaClientes={listaClientes} listaLivros={listaLivros} />}
        {screenState === screenStates.NOVOEMPRESTIMO && <NovoEmprestimo setScreenState={setScreenState} screenStates={screenStates} listaClientes={listaClientes} listaLivros={listaLivros} communication={communication} />}
        {screenState === screenStates.NOVOLIVRO && <NovoLivro listaLivros={listaLivros} communication={communication} setScreenState={setScreenState} screenStates={screenStates} />}
        {screenState === screenStates.NOVOCLIENTE && <NovoCliente listaClientes={listaClientes} communication={communication} setScreenState={setScreenState} screenStates={screenStates} />}
      </Container>
    </div>
  )
}

function TabelaEmprestimos({ listaEmprestimos, listaClientes, listaLivros, devolucao }) {
  return (
    <TableContainer component={Paper} style={{ align: 'center' }} size='medium'>
      <Table stickyHeader size='medium' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>Editar</StyledTableCell>
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
                  <EditIcon color="action" />
                </StyledTableCell>
                <StyledTableCell align='center' padding='checkbox'>
                  <DeleteForeverIcon color='error' />
                </StyledTableCell>
                {emprestimo.devolvido === 1 && <StyledTableCell>Devolvido</StyledTableCell>}
                {emprestimo.devolvido === 0 && <StyledTableCell><Devolucao devolucao={devolucao}/></StyledTableCell>}
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

function TabelaLivros({ listaLivros, handleNovoLivro, setScreenState, screenStates }) {
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
                    <EditIcon color="action" />
                  </StyledTableCell>
                  <StyledTableCell padding='checkbox'>
                    <DeleteForeverIcon color='error' />
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

function TabelaClientes({ listaClientes, handleNovoCliente, setScreenState, screenStates }) {
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
    </div>
  )
}