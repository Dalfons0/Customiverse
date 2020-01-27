import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Pages from '../page';
import Login from '../page/login';

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function IsLoggedIn() {
  const { data } = useQuery(IS_LOGGED_IN);
  return data!.isLoggedIn ? <Pages /> : <Login />;
}
