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
export default function NovoLivro({ listaLivros, communication, setScreenState, screenStates }) {
  const classes = stylesForm();
  const [nome, setNome] = React.useState('');
  const [autor, setAutor] = React.useState('');
  const [ano_pub, setAnopub] = React.useState('');
  const [editora, setEditora] = React.useState('');
  const [isbn, setIsbn] = React.useState('');
  const [erros, setErros] = React.useState({
    isbn: { valid: true, text: '' }
  });
  function validarIsbn(isbn) {
    if (listaLivros.filter(livro => livro.isbn === isbn).length > 0) {
      return { valid: false, text: 'Ja existe um Livro com esse ISBN' }
    }
    else {
      return { valid: true, text: '' }
    };
  }

  const handleNome = (event) => {
    setNome(event.target.value);
  }
  const handleAutor = (event) => {
    setAutor(event.target.value);
  }
  const handleAnopub = (event) => {
    setAnopub(event.target.value);
  }
  const handleEditora = (event) => {
    setEditora(event.target.value);
  }
  const handleIsbn = (event) => {
    setIsbn(event.target.value);
  }
  const addLivro = (event) => {
    event.preventDefault();
    communication.bearerPOST(localStorage.token, '/livros',
      JSON.stringify({ nome: nome, autor: autor, ano_pub: ano_pub, editora: editora, isbn: isbn }))
      .then((retorno) => {
        setScreenState(screenStates.LIVROS);
      })
  }
  return (
    <div>
      <Container maxWidth='md'>
        <Paper elevation={4} align='center' className={classes.paper}>
          <Typography component="h1" variant="h5">
            Cadastrar livro
          </Typography>
          <form align='center' onSubmit={addLivro} method='post'>
            <TextField align='center'
              id='nome'
              label='Nome'
              variant="outlined"
              margin='normal'
              autoFocus
              value={nome}
              onChange={handleNome}
              className={classes.textfield}
              fullWidth
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='autor'
              label='Autor'
              variant="outlined"
              margin='normal'
              autoFocus
              value={autor}
              className={classes.textfield}
              fullWidth
              onChange={handleAutor}
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='anopub'
              label='Ano de Publicação'
              variant="outlined"
              margin='normal'
              autoFocus
              value={ano_pub}
              className={classes.textfield}
              fullWidth
              onChange={handleAnopub}
              type='number'
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='editora'
              label='Editora'
              variant="outlined"
              margin='normal'
              autoFocus
              value={editora}
              onChange={handleEditora}
              className={classes.textfield}
              fullWidth
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField align='center'
              id='isbn'
              label='ISBN'
              value={isbn}
              variant="outlined"
              margin='normal'
              autoFocus
              onChange={handleIsbn}
              className={classes.textfield}
              fullWidth
              helperText={erros.isbn.text}
              error={!erros.isbn.valid}
              style={{ width: 300 }}
              InputLabelProps={{
                shrink: true,
              }}
              onBlur={(event) => {
                setErros({ isbn: validarIsbn(isbn) });
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