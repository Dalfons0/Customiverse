import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './page';

const cache = new InMemoryCache();

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: 'http://localhost:4000/graphql',
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }),
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem('token'),
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root'),
);
