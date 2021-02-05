import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

export default function MenuAppBar({ funcionario }) {
  const classes = useStyles();
  const [funcionarioLogado, setFuncionarioLogado] = React.useState({});
  useEffect(()=> {
    if(funcionario) {
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
          {!funcionario && <Button color="inherit">Login</Button>}
          {funcionario && (
            <Typography variant="h6" start='end' className={classes.title}>
            Seja bem vindo, {funcionario.nome}
          </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}