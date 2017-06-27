import React from 'react';
import { Route, IndexRoute, browserHistory, Router } from 'react-router';
import App from './components/app';

import HomePage from './components/Home/HomePage';
import MasterPage from './components/MasterPage';
import VenuesPage from './components/Venues/VenuePage';
import ManageVenuePage from './components/Venues/ManageVenuePage';
import ManageAmenityPage from './components/Amenities/ManageAmenityPage';
import ManagePOIPage from './components/POI/ManagePOIPage';
import VenueDetailPage from './components/Venues/VenueDetailPage';
import PostsPage from './components/Posts/PostsPage';
import ManagePostPage from './components/Posts/ManagePostPage';
import RegisterPage from './components/Authentication/RegisterPage';
import LoginPage from './components/Authentication/LoginPage';
import AmenitiesPage from './components/Venues/AmenitiesPage';
import PointOfInterestPage from './components/Venues/PointOfInterestPage';
import auth from './auth/authenticator';



export default (
  <Router history={history}>
  <Route path="/" component={MasterPage}>
    <IndexRoute component={HomePage} />
    <Route path="/login" title="Login"  component={LoginPage} />
    <Route path="/home" title="Home" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/register" title="Register" component={RegisterPage} />
    <Route path="/venues" title="Venues" component={VenuesPage} onEnter={requireAuth}/>
    <Route path="/amenity/edit" title="Manage Amenity" component={ManageAmenityPage} onEnter={requireAuth}/>
    <Route path="/amenities/manage" title="Manage Amenity" component={ManageAmenityPage} onEnter={requireAuth}/>
    <Route path="/amenity/add/:venueID" title="Manage Amenity" component={ManageAmenityPage} onEnter={requireAuth}/>
    <Route path="/poi/edit" title="Manage POI" component={ManagePOIPage} onEnter={requireAuth}/>
    <Route path="/poi/manage" title="Manage POI" component={ManagePOIPage} onEnter={requireAuth}/>
    <Route path="/poi/add/:venueID" title="Manage POI" component={ManagePOIPage} onEnter={requireAuth}/>
    <Route path="/posts"  title="Posts"  component={PostsPage} onEnter={requireAuth}/>
    <Route path="/venues/add" title="Manage Venue" component={ManageVenuePage} onEnter={requireAuth}/>
    <Route path="/venues/:venueId" component={VenueDetailPage} onEnter={requireAuth}/>
    <Route path="/venues/edit/:venueId" title="Manage Venue" component={ManageVenuePage} onEnter={requireAuth}/>
    <Route path="/posts/add/:venueId" title="Manage Venue Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/amenities/add/:amenityId" title="Manage Amenity Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/posts/poi/add/:poiId" title="Manage POI Post" component={ManagePostPage} onEnter={requireAuth}/>
    <Route path="/amenities/:venueId" title="Amenities" component={AmenitiesPage} onEnter={requireAuth}/>
    <Route path="/poi/:venueId" title="Point Of Interests" component={PointOfInterestPage} onEnter={requireAuth}/>
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
