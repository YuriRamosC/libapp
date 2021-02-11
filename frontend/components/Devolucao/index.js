import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Devolucao({devolucao, emprestimo}) {
  const [open, setOpen] = React.useState(false);

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
    devolucao(emprestimo);
    setOpen(false);
  }
  return (
    <div>
      <Button variant="outlined" color="primary" size='small' variant='outlined' color='primary' onClick={handleClickOpen}>
        PENDENTE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Devolução"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Essa é a janela de confirmação da devoluçao, tem certeza que deseja aceitar?
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