import React, { useState, useEffect } from 'react';
import { Button,Container, Typography,  Paper, TextField } from '@material-ui/core'
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
export default function NovoEmprestimo({ listaClientes, listaLivros, communication, setScreenState, screenStates}) {
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
        console.log(`
        cliente_id: ${clienteEmprestimo.id}
        livro_id: ${livroEmprestimo.id}
        dataEntrega: ${dataEntrega}
        `);
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
                options={listaClientes.filter(cliente => cliente.multa === 0)}
                getOptionLabel={(option) => option.nome}
                className={classes.textfield}
                onChange={handleInputCliente}
                onInputChange={handleInputCliente}
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