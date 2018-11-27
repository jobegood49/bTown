import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './../pages/Home'
import Items from './../pages/Items'
import Share from './../pages/Share'
import Profile from './../pages/Profile'
import NavBar from './../components/Header'

export default () => (
  <Fragment>
    <NavBar />
    <Switch>
      <Route exact path="/items" component={Items} />
      <Route exact path="/welcome" component={Home} />
      <Route exact path="/share" component={Share} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/profile/:id" component={Profile} />
      <Redirect from="/" exact to="/welcome" component={Home} />
      <Redirect to="/items" component={Items} />
    </Switch>
  </Fragment>
);
