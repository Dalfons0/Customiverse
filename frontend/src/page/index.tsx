import React from 'react';
import PopularThings from './popular-things';
import ThingDetails from './thing-details';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Login from './login';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export default function Pages() {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {data.isLoggedIn ? <Redirect to="/things" /> : <Login />}
        </Route>
        <Route exact path="/things" component={PopularThings} />
        <Route path="/things/:thingId" component={ThingDetails} />
      </Switch>
    </Router>
  );
}
