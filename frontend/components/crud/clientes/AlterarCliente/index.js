import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
export default function AlterarCliente({ cliente, listaClientes, communication }) {
    const [open, setOpen] = React.useState(false);
    const [newNome, setNewNome] = React.useState(cliente.nome);
    const [newCpf, setNewCpf] = React.useState(cliente.cpf);
    const [newEmail, setNewEmail] = React.useState(cliente.email);
    const [newTelefone, setNewTelefone] = React.useState(cliente.telefone);
    const [newEndereco, setNewEndereco] = React.useState(cliente.endereco);
    const [erros, setErros] = React.useState({
        email: { valid: true, text: '' },
        cpf: { valid: true, text: '' }
    });
    function validarCPF(cpf, id) {
        if (listaClientes.filter(obj => obj.cpf === cpf && obj.id != id).length > 0) {
            return { valid: false, text: 'Ja existe um cliente com esse CPF' }
        }
        else {
            return { valid: true, text: '' }
        };
    }
    function validarEmail(email, id) {
        if (listaClientes.filter(obj => obj.email === email && obj.id != id).length > 0) {
            return { valid: false, text: 'Ja existe um cliente com esse email' }
        }
        else {

            return { valid: true, text: '' }
        };
    }
    const handleNome = (event) => {
        setNewNome(event.target.value);
    }
    const handleCpf = (event) => {
        setNewCpf(event.target.value);
    }
    const handleEmail = (event) => {
        setNewEmail(event.target.value);
    }
    const handleTelefone = (event) => {
        setNewTelefone(event.target.value);
    }
    const handleEndereco = (event) => {
        setNewEndereco(event.target.value);
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
        console.log('Email: ' + erros.email.valid);
        console.log('CPF: ' + erros.cpf.valid);
        if (erros.email.valid && erros.cpf.valid) {
            communication.bearerPOST(localStorage.token, '/clientesUpdate',
                JSON.stringify({ id: cliente.id, nome: newNome, cpf: newCpf, email: newEmail, telefone: newTelefone, endereco: newEndereco, multa: cliente.multa }))
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
                <DialogTitle id="alert-dialog-title">{`Alterar ${cliente.nome}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ficha do cliente
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
                            setErros({ ...erros, email: validarEmail(newEmail, cliente.id) });
                        }}
                        helperText={erros.email.text}
                        error={!erros.email.valid}
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='email'
                        label='CPF'
                        value={newCpf}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleCpf}
                        fullWidth
                        onBlur={(event) => {
                            setErros({ ...erros, email: validarCPF(newCpf, cliente.id) });
                        }}
                        helperText={erros.cpf.text}
                        error={!erros.cpf.valid}
                        style={{ width: 300 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id='endereco'
                        label='Endereço'
                        value={newEndereco}
                        variant="outlined"
                        margin='normal'
                        autoFocus
                        onChange={handleEndereco}
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