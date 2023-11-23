import * as React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

export default function AlertDialog({ open, handleClose, handleConfirmExcluir }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmação"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Você deseja realmente executar a ação de Excluir para o item selecionado?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='error'>Não</Button>
        <Button onClick={handleConfirmExcluir} autoFocus>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}
