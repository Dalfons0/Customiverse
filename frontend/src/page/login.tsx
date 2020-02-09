import React from 'react';
import LoginForm from '../components/login-form';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import ApolloClient from 'apollo-client';
import ErrorDialog from '../components/error-dialog';
import { LinearProgress } from '@material-ui/core';

export const LOGIN_USER = gql`
  mutation login($code: String!) {
    login(code: $code)
  }
`;

export default function Login() {
  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted({ login }) {
      localStorage.setItem('token', login as string);
      client.writeData({ data: { isLoggedIn: true } });
      window.location.reload();
    },
  });
  if (loading) return <LinearProgress />;
  if (error) return <ErrorDialog message={'An error has ocurred during the logging!'} />;

  return <LoginForm login={login} />;
}
