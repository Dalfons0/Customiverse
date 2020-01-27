import React from 'react';
import PopularThings from './popular-things';
import ThingDetails from './thing-details';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export default function Pages() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={PopularThings} />
        <Route path="/thing/:thingId" component={ThingDetails} />
      </Switch>
    </Router>
  );
}
