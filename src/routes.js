import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import App from './components/app';

import HomePage from './components/Home/HomePage';
import MasterPage from './components/MasterPage';
import VenuesPage from './components/Venues/VenuePage';
import ManageVenuePage from './components/Venues/ManageVenuePage';
import PostsPage from './components/Posts/PostsPage';
import ManagePostPage from './components/Posts/ManagePostPage';
import RegisterPage from './components/Authentication/RegisterPage';
import LoginPage from './components/Authentication/LoginPage';
import auth from './auth/authenticator';



export default (
  <Router history={history}>
  <Route path="/" component={MasterPage}>
    <IndexRoute component={HomePage} />
    <Route path="/login" title="Login"  component={LoginPage} />
    <Route path="/home" title="Home" component={PostsPage} onEnter={requireAuth}/>
    <Route path="/register" title="Register" component={RegisterPage} />
    <Route path="/venues" title="Venues" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/posts"  title="Posts"  component={PostsPage} onEnter={requireAuth}/>

    <Route path="/managevenue" title="Manage Venues" component={ManageVenuePage} onEnter={requireAuth}/>
    <Route path="/posts/add/:venueId" title="Manage Venue Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/amenities/add/:amenityId" title="Manage Amenity Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/poi/add/:poiId" title="Manage POI Post" component={ManagePostPage} onEnter={requireAuth}/>

  </Route>
  </Router>
);

function requireAuth(nextState, replace) {
      if (!auth.loggedIn()) {
        replace({
                  pathname: '/login',
                  state: { nextPathname: nextState.location.pathname }
        });
  }
}
