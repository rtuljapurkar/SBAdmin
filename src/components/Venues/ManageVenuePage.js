import React  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as venueActions from '../../actions/venueActions';
import ManageVenueForm from './ManageVenueForm';
import toastr from 'toastr';
import {PropTypes} from 'prop-types';

class ManageVenuePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      venue:  Object.assign({}, props.venue),
      errors: {},
      saving: false
    };

    this.updateVenueState = this.updateVenueState.bind(this);
    this.saveVenue = this.saveVenue.bind(this);
    this.cancelVenue= this.cancelVenue.bind(this);
  }


  componentWillMount() {
        if (this.props.params.venueId > 0 && this.props.params.venueId != this.props.venue.id ) {
              this.LoadProps(this.props.params.venueId);
          }
        else{
            if(this.props.venue.id > 0){
                 this.props.actions.LoadDefaultVenue();
            }
        }
  }
  componentWillReceiveProps (nextProps) {
     if(this.props.venue.Id !== nextProps.venue.id) {
          this.setState({venue: Object.assign({}, nextProps.venue)});
     }
  }

  LoadProps(venueId){
      this.props.actions.loadVenueByID(venueId)
      .then()
      .catch( error => {
            toastr.error(error);
      });
    }

  updateVenueState(event) {
    const field = event.target.name;
    let venue = this.state.venue;
    venue[field] = event.target.value;
    return this.setState({venue: venue});
  }

   venueFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.venue.VName == "") {
      errors.VName = 'Venue Name is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VAddress == "") {
      errors.VAddress = 'Venue Address is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VCity == "") {
      errors.VCity = 'Venue City is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VState == "") {
      errors.VState = 'Venue State is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VZip == "") {
      errors.VZip = 'Venue zip code is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VGPSLoc == "") {
      errors.VGPSLoc = 'Venue GPSLoc is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VDescription == "") {
      errors.VDescription = 'Venue Description is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VCapacity == "") {
      errors.VCapacity = 'Venue Capacity is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VDetails == "") {
      errors.VDetails = 'Venue Details is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VTags == "") {
      errors.VTags = 'Venue Tags is invalid';
      formIsValid = false;
    }

    if (this.state.venue.VImage == "") {
      errors.VImage = 'Venue image url is invalid';
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

    this.props.actions.saveVenue(venueToSubmit)
    .then( () =>{

                if(this.state.venue.id > 0)
                {
                    this.redirect(1, this.state.venue.id);
                }else{
                    this.redirect(0, 0);
                }

      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

 redirect(toVenueDetail, venueID) {
      this.setState({saving: false});
      toastr.success('Venue Saved Successfully');
      if(toVenueDetail ==0){
           window.location = "/venues/";
      }
      else{
           window.location = "/venues/"; /* + venueID;*/
      }

  }


cancelVenue(event){
    event.preventDefault();
    this.context.router.push('/venues');
}

  render() {
    let venueFound = true;
    if((this.props.params.venueId > 0) && (this.state.venue.id == 0))
    {
        venueFound = false;
    }
    return (
        <div>
             {venueFound &&
                     <ManageVenueForm
                        venue={this.state.venue}
                        onChange={this.updateVenueState}
                        onSave={this.saveVenue}
                        errors={this.state.errors}
                        saving={this.state.saving}
                        onCancel={this.cancelVenue}
                    />}
            {!venueFound &&
                <h3>Venue Not Found</h3>
            }
        </div>
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
              venue: state.manageVenue.venue
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(venueActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageVenuePage);
