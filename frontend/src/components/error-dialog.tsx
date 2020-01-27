import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

export default function ErrorDialog({ message }: { message: string }) {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Error</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.location.reload()} color="primary">
          Retry
        </Button>
      </DialogActions>
    </Dialog>
  );
}
