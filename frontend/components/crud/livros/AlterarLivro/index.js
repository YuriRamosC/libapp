import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
export default function AlterarCliente({ livro, listaLivros, communication, atualizarDados }) {
    const [open, setOpen] = React.useState(false);
    const [newNome, setNewNome] = React.useState(livro.nome);
    const [newAutor, setNewAutor] = React.useState(livro.autor);
    const [newAno_pub, setNewAnopub] = React.useState(livro.ano_pub);
    const [newEditora, setNewEditora] = React.useState(livro.editora);
    const [newIsbn, setNewIsbn] = React.useState(livro.isbn);
    const [erros, setErros] = React.useState({
      isbn: { valid: true, text: '' }
    });
    function validarIsbn(isbn, id) {
        if (listaLivros.filter(obj => obj.isbn === isbn && obj.id != id).length > 0) {
            return { valid: false, text: 'Ja existe um livro com esse ISBN' }
        }
        else {
            return { valid: true, text: '' }
        };
    }
    const handleNome = (event) => {
        setNewNome(event.target.value);
      }
      const handleAutor = (event) => {
        setNewAutor(event.target.value);
      }
      const handleAnopub = (event) => {
        setNewAnopub(event.target.value);
      }
      const handleEditora = (event) => {
        setNewEditora(event.target.value);
      }
      const handleIsbn = (event) => {
        setNewIsbn(event.target.value);
      }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const Recusar = () => {
        setOpen(false);
    }
    const Aceitar = () => {
        if (erros.isbn.valid) {
            communication.bearerPOST(localStorage.token, '/livrosUpdate',
                JSON.stringify({ id: livro.id, nome: newNome, isbn: newIsbn, editora: newEditora, autor: newAutor, ano_pub: newAno_pub}))
                .then((retorno) => {
                    setOpen(false);
                });
                atualizarDados();
        }
    }
    return (
        <div>
            <Button variant="outlined" color="primary" size='small' variant='outlined' color='primary' onClick={handleClickOpen}>
                <EditIcon color="action" />
            </Button>
            <Dialog open={open} align='center' onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{`Alterar ${livro.nome}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ficha do livro
                    </DialogContentText>
                    <TextField
                        id='nome'
                        label='Nome'
                        value={newNome}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleNome}
                        fullWidth
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='isbn'
                        label='ISBN'
                        value={newIsbn}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleIsbn}
                        fullWidth
                        onBlur={(event) => {
                            setErros({ ...erros, isbn: validarIsbn(newIsbn, livro.id) });
                        }}
                        helperText={erros.isbn.text}
                        error={!erros.isbn.valid}
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='autor'
                        label='Autor'
                        value={newAutor}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleAutor}
                        fullWidth
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='editora'
                        label='Editora'
                        value={newEditora}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleEditora}
                        fullWidth
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='ano_pub'
                        label='Ano de Publicação'
                        value={newAno_pub}
                        variant="outlined"
                        margin='normal'
                        type='number'
                        autoFocus
                        onChange={handleAnopub}
                        fullWidth
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={Recusar} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={Aceitar} color="primary" autoFocus>
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}