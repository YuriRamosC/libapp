import React, { useState, useEffect } from 'react';
import { Button, DataGrid, Container, TableCell, TableBody, TableContainer, TableHead, Typography, TableRow, Table, Paper, TextField } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import MenuAppBar from '../components/MenuAppBar'
import moment from 'moment';
import { useRouter } from 'next/router'
import Comunicacao from '../communication/api';
import NovoEmprestimo from '../components/crud/emprestimos/NovoEmprestimo';
import TabelaEmprestimos from '../components/crud/emprestimos/TabelaEmprestimos';
import NovoLivro from '../components/crud/livros/NovoLivro';
import TabelaLivros from '../components/crud/livros/TabelaLivros';
import NovoCliente from '../components/crud/clientes/NovoCliente';
import TabelaClientes from '../components/crud/clientes/TabelaClientes';
import TabelaFuncionarios from '../components/crud/funcionarios/TabelaFuncionarios';
import NovoFuncionario from '../components/crud/funcionarios/NovoFuncionario';
const screenStates = {
  LIVROS: 'LIVROS',
  CLIENTES: 'CLIENTES',
  EMPRESTIMOS: 'EMPRESTIMOS',
  FUNCIONARIOS: 'FUNCIONARIOS',
  NOVOEMPRESTIMO: 'NOVOEMPRESTIMO',
  NOVOLIVRO: 'NOVOLIVRO',
  NOVOCLIENTE: 'NOVOCLIENTE',
  FUNCIONARIOS: 'FUNCIONARIOS',
  NOVOFUNCIONARIO: 'NOVOFUNCIONARIO'
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
  const [listaFuncionarios, setListaFuncionarios] = React.useState([]);
  const [listaLivros, setListaLivros] = React.useState([]);
  const [listaClientes, setListaClientes] = React.useState([]);
  const [emprestimos, setEmprestimos] = React.useState([]);
  const communication = new Comunicacao();
  useEffect(() => {
    if (funcionarioLogado.isAdmin) {
      communication.bearerGET(localStorage.token, '/funcionarios')
        .then(values => {
          setListaFuncionarios(values.funcionarios);
        });
    }
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
                      isNotified: 1,
                    }));
                });
              }
            }
          })
          communication.bearerPOST(localStorage.token,
            '/clientesUpdate',
            JSON.stringify({
              id: cliente.id,
              multa: multaTotal,
            }))
            .then(retorno => console.log('ok'));
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
  function listarFuncionarios() {
    setScreenState(screenStates.FUNCIONARIOS);
  }

  function handleNovoFuncionario() {
    setScreenState(screenStates.NOVOFUNCIONARIO);
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
  function devolucao(emprestimo) {
    communication.bearerPOST(localStorage.token,
      '/emprestimosUpdate',
      JSON.stringify({
        id: emprestimo.id,
        cliente_id: emprestimo.cliente_id,
        livro_id: emprestimo.livro_id,
        dataEntrega: emprestimo.dataEntrega,
        isNotified: emprestimo.isNotified,
        devolvido: 1
      }))
      .then(retorno => console.log(retorno));
  };
  return (
    <div>
      <MenuAppBar funcionario={funcionarioLogado} novoEmprestimo={novoEmprestimo} devolucao={devolucao} listarFuncionarios={listarFuncionarios} listarLivros={listarLivros} listarClientes={listarClientes} listarEmprestimos={listarEmprestimos} />
      <Container maxWidth='md'>
        {screenState === screenStates.LIVROS && <TabelaLivros listaLivros={listaLivros} handleNovoLivro={handleNovoLivro} setScreenState={setScreenState} screenStates={screenStates} communication={communication} />}
        {screenState === screenStates.CLIENTES && <TabelaClientes listaClientes={listaClientes} handleNovoCliente={handleNovoCliente} setScreenState={setScreenState} screenStates={screenStates} communication={communication} />}
        {screenState === screenStates.EMPRESTIMOS && <TabelaEmprestimos devolucao={devolucao} listaEmprestimos={emprestimos} listaClientes={listaClientes} listaLivros={listaLivros} communication={communication} />}
        {funcionarioLogado.isAdmin === 1 && screenState === screenStates.FUNCIONARIOS && <TabelaFuncionarios listaFuncionarios={listaFuncionarios} handleNovoFuncionario={handleNovoFuncionario} setScreenState={setScreenState} screenStates={screenStates} communication={communication} />}
        {screenState === screenStates.NOVOEMPRESTIMO && <NovoEmprestimo setScreenState={setScreenState} screenStates={screenStates} listaClientes={listaClientes} listaLivros={listaLivros} communication={communication} />}
        {screenState === screenStates.NOVOLIVRO && <NovoLivro listaLivros={listaLivros} communication={communication} setScreenState={setScreenState} screenStates={screenStates} />}
        {screenState === screenStates.NOVOCLIENTE && <NovoCliente listaClientes={listaClientes} communication={communication} setScreenState={setScreenState} screenStates={screenStates} />}
        {funcionarioLogado.isAdmin === 1 && screenState === screenStates.NOVOFUNCIONARIO && <NovoFun listaFuncionarios={listaFuncionarios} communication={communication} setScreenState={setScreenState} screenStates={screenStates} />}
      </Container>
    </div>
  )
}