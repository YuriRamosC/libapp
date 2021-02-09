import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Button, IconButton, InputAdornment, InputLabel } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar({ funcionario, listarLivros, listarClientes, listarEmprestimos, novoEmprestimo, devolucao }) {
  const classes = useStyles();
  const [funcionarioLogado, setFuncionarioLogado] = React.useState({});
  useEffect(() => {
    if (funcionario) {
      setFuncionarioLogado(funcionario);
    }
  });
  return (
    <div className={classes.root}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            LibApp
          </Typography>
          {funcionario && ( <Typography variant="h6" className={classes.title}> Seja bem vindo, {funcionario.nome}</Typography>)}
          {!funcionario && <Button color="inherit" href='/'>Login</Button>}
          {funcionario && (
            <div>
              <Button color='inherit' onClick={novoEmprestimo}>Novo</Button>
              <Button color='inherit' onClick={devolucao}>Devolução</Button>
              <Button color='inherit' onClick={listarEmprestimos}>Empréstimos</Button>
              <Button color='inherit' onClick={listarLivros}>Livros</Button>
              <Button color='inherit' onClick={listarClientes}>Clientes</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}