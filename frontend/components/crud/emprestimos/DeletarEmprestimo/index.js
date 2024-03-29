import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
export default function AlterarEmprestimo({ emprestimo, communication, atualizarDados}) {
    const [open, setOpen] = React.useState(false);
    const [erros, setErros] = React.useState({
      isbn: { valid: true, text: '' }
    });

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
            communication.bearerPOST(localStorage.token, '/emprestimosDelete',
                JSON.stringify({ id: emprestimo.id}))
                .then((retorno) => {
                    if(retorno == 'Error') {
                        alert('Não foi possível deletar o emprestimo.');
                    }
                    setOpen(false);
                });
                atualizarDados();
        }
    }
    return (
        <div>
            <Button variant="outlined" color="inherit" size='small' variant='outlined' color='primary' onClick={handleClickOpen}>
                <DeleteForeverIcon color='error' />
            </Button>
            <Dialog open={open} align='center' onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{`Deletar ${emprestimo.nome}`}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Tem certeza que deseja apagar o emprestimo? Todos os registros o envolvendo, irão ser apagados também.
                    </DialogContentText>
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