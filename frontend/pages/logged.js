import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { Button, DataGrid, TableCell, TableBody, TableContainer, TableHead, TableRow, Table, Paper } from '@material-ui/core'
import MenuAppBar from '../components/MenuAppBar'
import api from '../api';
import { useRouter } from 'next/router'
import Comunicacao from '../communication';
const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.palette.primary.dark};
`

export default function Logged() {
  const router = useRouter();
  const [token, setToken] = React.useState('');
  const [funcionarioLogado, setFuncionarioLogado] = React.useState([]);
  const [listaFuncionarios, setListaFuncionarios] = React.useState([]);
  const [listaLivros, setListaLivros] = React.useState([]);
  const communication = new Comunicacao();
  useEffect(() => {
    var newToken = localStorage.token;
    setToken(newToken);

  }, []);

  const updateLivros = (event) => {
    event.preventDefault();
    communication.bearerGET(token, '/livros')
      .then((values) => {
        console.dir(values.livros);
        setListaLivros(values.livros);
      })
  }

  return (
    <div>
      <MenuAppBar />
      <Button color='primary' onClick={updateLivros}>Atualizar Livros</Button>
      <TableContainer component={Paper} style={{align: 'center', height: 400, width: '100%' }}>
        <Table size='small' aria-label='a dense table'>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Preço</TableCell>
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
    </div>
  )
}