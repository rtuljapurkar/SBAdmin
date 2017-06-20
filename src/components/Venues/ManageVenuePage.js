import React  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as venueActions from '../../actions/venueActions';
import VenueForm from './VenueForm';
import toastr from 'toastr';
import {PropTypes} from 'prop-types';

class ManageVenuePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      venue:  Object.assign({}, this.props.venue),
      errors: {},
      saving: false
    };

    this.updateVenueState = this.updateVenueState.bind(this);
    this.saveVenue = this.saveVenue.bind(this);
    this.cancelVenue= this.cancelVenue.bind(this);
    this.onStarRatingChange = this.onStarRatingChange.bind(this);
  }

  componentWillMount() {
    if (this.props.params.venueId > 0) {
        this.props.actions.addVenueLoad(this.props.params.venueId)
        .then()
        .catch( error => {
                    toastr.error(error);
        });
    }
  }

  updateVenueState(event) {
    const field = event.target.name;
    let venue = this.state.venue;
    venue[field] = event.target.value;
    return this.setState({venue: venue});
  }

  onStarRatingChange(newRating) {
    let venue = this.state.venue;
    venue["Stars"] = newRating;
    return this.setState({venue: venue});
  }

  venueFormIsValid() {
    let formIsValid = true;
    let errors = {};
    if (this.state.venue.Text == "") {
      errors.Text = 'Venue text must be filled';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  saveVenue(event) {
    event.preventDefault();
    if (!this.venueFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    let venueToSubmit = this.state.venue;
    venueToSubmit.VenueID = this.props.venue.venue.id;

    this.props.actions.saveVenue(venueToSubmit)
    .then( () =>{
                this.redirect(0, 0);
                }

        )
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });

  }

cancelVenue(event){
    event.preventDefault();
    this.context.router.push('/venues');
}
  redirect(toVenueDetail, venueID) {
    this.setState({saving: false});
    toastr.success('Venue saved');
    window.location = "/venues/" + venueID;

  }

  render() {

      console.log(this.state.venue);
    return (
      <VenueForm
        venue={this.props.venue}
        onChange={this.updatevenueState}
        onSave={this.saveVenue}

        errors={this.state.errors}
        saving={this.state.saving}
        onCancel={this.cancelVenue}
        onStarRatingChange={this.onStarRatingChange}
      />
    );
  }
}

ManageVenuePage.propTypes = {
  venue: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  amenity: PropTypes.object,
  poi: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageVenuePage.contextTypes = {
  router: PropTypes.object
};



function mapStateToProps(state, ownProps) {
  return {
        venue: state.newVenue
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(venueActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageVenuePage);
