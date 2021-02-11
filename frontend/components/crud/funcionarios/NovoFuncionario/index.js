import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Paper, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { withStyles, makeStyles } from '@material-ui/core/styles'
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
export default function NovoFuncionario({ listaFuncionarios, communication, setScreenState, screenStates }) {
  const classes = stylesForm();
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [erros, setErros] = React.useState({
    email: { valid: true, text: '' }
  });
  function validarEmail(email) {
    if (listaFuncionarios.filter(funcionario => funcionario.email === email).length > 0) {
      return { valid: false, text: 'Ja existe um funcionario com esse email' }
    }
    else {
      return { valid: true, text: '' }
    };
  }
  const handleNome = (event) => {
    setNome(event.target.value);
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handlePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleIsAdmin = (event) => {
    setIsAdmin(event.target.value);
  }

  const addFuncionario = (event) => {
    event.preventDefault();
    communication.bearerPOST(localStorage.token, '/funcionarios',
      JSON.stringify({ nome: nome, email: email, password: password, isAdmin: isAdmin }))
      .then((retorno) => {
        setScreenState(screenStates.CLIENTES);
      })
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Paper elevation={4} align='center' className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrar novo funcionario
          </Typography>
          <form align='center' onSubmit={addFuncionario} method='post'>
            <TextField align='center'
              id='nome'
              label='Nome'
              value={nome}
              onChange={handleNome}
              className={classes.textfield}
              fullWidth
              variant="outlined"
              margin='normal'
              autoFocus
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='email'
              label='Email'
              value={email}
              variant="outlined"
              margin='normal'
              autoFocus
              onChange={handleEmail}
              className={classes.textfield}
              fullWidth
              onBlur={(event) => {
                setErros({ ...erros, email: validarEmail(email) });
              }}
              helperText={erros.email.text}
              error={!erros.email.valid}
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='password'
              label='Senha'
              variant="outlined"
              margin='normal'
              autoFocus
              type='password'
              value={password}
              onChange={handlePassword}
              className={classes.textfield}
              fullWidth
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='isAdmin'
              label='Permissões de admin'
              variant="outlined"
              margin='normal'
              type='checkbox'
              autoFocus
              value={isAdmin}
              onChange={handleIsAdmin}
              className={classes.textfield}
              fullWidth
              style={{ width: 300 }}
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