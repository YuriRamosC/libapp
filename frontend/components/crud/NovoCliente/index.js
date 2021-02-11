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
export default function NovoCliente({ listaClientes, communication, setScreenState, screenStates }) {
  const classes = stylesForm();
  const [nome, setNome] = React.useState('');
  const [cpf, setCpf] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [endereco, setEndereco] = React.useState('');
  const [erros, setErros] = React.useState({
    email: { valid: true, text: '' },
    cpf: { valid: true, text: '' }
  });
  function validarCPF(cpf) {
    if (listaClientes.filter(cliente => cliente.cpf === cpf).length > 0) {
      return { valid: false, text: 'Ja existe um cliente com esse CPF' }
    }
    else {
      return { valid: true, text: '' }
    };
  }
  function validarEmail(email) {
    if (listaClientes.filter(cliente => cliente.email === email).length > 0) {
      return { valid: false, text: 'Ja existe um cliente com esse email' }
    }
    else {
      return { valid: true, text: '' }
    };
  }
  const handleNome = (event) => {
    setNome(event.target.value);
  }
  const handleCpf = (event) => {
    setCpf(event.target.value);
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleTelefone = (event) => {
    setTelefone(event.target.value);
  }
  const handleEndereco = (event) => {
    setEndereco(event.target.value);
  }

  const addCliente = (event) => {
    event.preventDefault();
    communication.bearerPOST(localStorage.token, '/clientes',
      JSON.stringify({ nome: nome, cpf: cpf, email: email, telefone: telefone, endereco: endereco, multa: 0 }))
      .then((retorno) => {
        setScreenState(screenStates.CLIENTES);
      })
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Paper elevation={4} align='center' className={classes.paper}>
          <Typography component="h1" variant="h5">
            Registrar novo cliente
          </Typography>
          <form align='center' onSubmit={addCliente} method='post'>
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
              id='cpf'
              label='CPF'
              value={cpf}
              variant="outlined"
              margin='normal'
              autoFocus
              onChange={handleCpf}
              className={classes.textfield}
              fullWidth
              helperText={erros.cpf.text}
              error={!erros.cpf.valid}
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={(event) => {
                setErros({ ...erros, cpf: validarCPF(cpf) });
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
              id='telefone'
              label='Telefone'
              variant="outlined"
              margin='normal'
              autoFocus
              value={telefone}
              onChange={handleTelefone}
              className={classes.textfield}
              fullWidth
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='endereco'
              label='Endereço'
              variant="outlined"
              margin='normal'
              autoFocus
              value={endereco}
              onChange={handleEndereco}
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