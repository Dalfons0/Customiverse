import React from 'react';
import { TextField, makeStyles, createStyles, Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

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
  const location = useLocation();
  const { code } = parse(location.search);
  const url = `https://www.thingiverse.com/login/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=http://localhost:3000`;

  if (code) {
    login({ variables: { code } });
  }
  return (
    <div className={classes.root}>
      <TextField required id="user-input" label="User" />
      <TextField required id="password-input" label="Password" type="password" autoComplete="current-password" />
      <Button className={classes.submitButon} href={url} variant="contained" color="primary">
        Login
      </Button>
    </div>
  );
}
