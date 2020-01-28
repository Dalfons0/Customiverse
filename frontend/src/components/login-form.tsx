import React from 'react';
import { TextField, makeStyles, createStyles, Button } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '20%',
    },
    submitButon: {
      marginTop: 10,
    },
  }),
);

export default function LoginForm({ login }: any) {
  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={() => login({variables: { user: '', pass: ''}})}>
      <TextField required id="user-input" label="User" />
      <TextField required id="password-input" label="Password" type="password" autoComplete="current-password" />
      <Button className={classes.submitButon} variant="contained" color="primary" type="submit">
        Login
      </Button>
    </form>
  );
}
