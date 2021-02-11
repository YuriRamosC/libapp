import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
export default function AlterarFuncionario({ funcionario, listaFuncionarios, communication }) {
    const [open, setOpen] = React.useState(false);
    const [newNome, setNewNome] = React.useState(funcionario.nome);
    const [newEmail, setNewEmail] = React.useState(funcionario.email);
    const [newPassword, setNewPassword] = React.useState(funcionario.password);
    const [newIsAdmin, setNewIsAdmin] = React.useState(funcionario.isAdmin);
    const [erros, setErros] = React.useState({
        email: { valid: true, text: '' }
    });
    function validarEmail(email, id) {
        if (listaFuncionarios.filter(obj => obj.email === email && obj.id != id).length > 0) {
            return { valid: false, text: 'Ja existe um funcionario com esse email' }
        }
        else {

            return { valid: true, text: '' }
        };
    }
    const handleNome = (event) => {
        setNewNome(event.target.value);
      }
      const handleEmail = (event) => {
        setNewEmail(event.target.value);
      }
      const handlePassword = (event) => {
        setNewPassword(event.target.value);
      }
      const handleIsAdmin = (event) => {
        setNewIsAdmin(event.target.value);
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
        if (erros.email.valid) {
            communication.bearerPOST(localStorage.token, '/funcionariosUpdate',
                JSON.stringify({ id: funcionario.id, nome: newNome, email: newEmail, password: newPassword, isAdmin: newIsAdmin }))
                .then((retorno) => {
                    setOpen(false);
                });
        }
    }
    return (
        <div>
            <Button variant="outlined" color="primary" size='small' variant='outlined' color='primary' onClick={handleClickOpen}>
                <EditIcon color="action" />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{`Alterar ${funcionario.nome}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ficha do funcionario
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
                        id='email'
                        label='Email'
                        value={newEmail}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleEmail}
                        fullWidth
                        onBlur={(event) => {
                            setErros({ ...erros, email: validarEmail(newEmail, funcionario.id) });
                        }}
                        helperText={erros.email.text}
                        error={!erros.email.valid}
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='password'
                        label='Senha'
                        value={newPassword}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handlePassword}
                        fullWidth
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='isAdmin'
                        label='Permissão de Admin'
                        value={newIsAdmin}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleIsAdmin}
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