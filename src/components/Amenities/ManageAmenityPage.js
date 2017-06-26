import React  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as amenityActions from '../../actions/amenityActions';
import ManageAmenityForm from './ManageAmenityForm';
import toastr from 'toastr';
import {PropTypes} from 'prop-types';

class ManageAmenityPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      amenity:  Object.assign({}, props.amenity),
      errors: {},
      saving: false
    };


    this.updateAmenityState = this.updateAmenityState.bind(this);
    this.saveAmenity = this.saveAmenity.bind(this);
    this.cancelAmenity= this.cancelAmenity.bind(this);
    //this.populateVenueDrodown= this.populateVenueDrodown.bind(this);
    this.loadVenues = this.loadVenues.bind(this);
    this.onVenueSelected = this.onVenueSelected.bind(this);
    this.onAmenitySelected = this.onAmenitySelected.bind(this);
  }


  componentWillMount() {
    this.loadVenues();
    console.log("will mount");

    if(this.props.params.venueID > 0 && this.props.params.venueID != this.props.amenity.VenueID ){
        console.log("in if");
        this.props.actions.loadDefaultAmenity(this.props.params.venueID);
    }
  }

  componentWillReceiveProps (nextProps) {
     if(this.props.amenity.id !== nextProps.amenity.id  ||
                this.props.amenity.VenueID !== nextProps.amenity.VenueID) {
         debugger;
         console.log("in eillreceiveprops");
         console.log(nextProps);

         if(this.props.amenity.id != nextProps.amenity.id){
             this.setState({amenity: nextProps.amenity});
         }

         if(this.props.amenity.VenueID != nextProps.amenity.VenueID){
             if(nextProps.amenity.VenueID == 0){
                    this.props.actions.loadDefaultAmenity(nextProps.params.venueID);
                }
             else{
                    if(nextProps.amenity.VenueID > 0){
                        this.props.actions.manageAmenities(nextProps.amenity.VenueID);
                        this.props.actions.loadDefaultAmenity(nextProps.amenity.VenueID);
                      }
                }
         }


        //   this.setState({amenity: Object.assign({}, nextProps.amenity)});


         // this.props.actions.loadDefaultAmenity(nextProps.params.venueID);
     }
  }

  loadVenues(){
    this.props.actions.loadVenues()
    .then()
    .catch( error => {
        toastr.error(error);
    });
  }

  updateAmenityState(event) {
    const field = event.target.name;
    let amenity = this.state.amenity;
    amenity[field] = event.target.value;
    return this.setState({amenity: amenity});
  }

  amenityFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.amenity.VenueID == undefined || this.state.amenity.VenueID == "0") {
      errors.VenueID = 'Amenity Venue is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AName == "") {
      errors.AName = 'Amenity Name is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ASection == "") {
      errors.ASection = 'Amenity Section is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AChildAmenity == "") {
      errors.AChildAmenity = 'Amenity Child Amenity is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AType == "") {
      errors.AType = 'Amenity Type is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ASubType == "") {
      errors.ASubType = 'Amenity Sub Type is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AMainFood == "") {
      errors.AMainFood = 'Amenity Main Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AVeggieFood == "") {
      errors.AVeggieFood = 'Amenity Veggie Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AVeganFood == "") {
      errors.AVeganFood = 'Amenity Vegan Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AGFFood == "") {
      errors.AGFFood = 'Amenity GF Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ABeverages == "") {
      errors.ABeverages = 'Amenity Beverages is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ADomesticBeer == "") {
      errors.ADomesticBeer = 'Amenity Domestic Beer is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ACraftBeer == "") {
      errors.ACraftBeer = 'Amenity Craft Beer is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AMixedDrinks == "") {
      errors.AMixedDrinks = 'Amenity Mixed Drinks is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ATags == "") {
      errors.ATags = 'Amenity Tags is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ACost == "") {
      errors.ACost = 'Amenity Cost is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ADistance == "") {
      errors.ADistance = 'Amenity Distance is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AWalkingTime == "") {
      errors.AWalkingTime = 'Amenity Walking Time is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ALotLocation == "") {
      errors.ALotLocation = 'Amenity Lot Location is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AKidsOk == "") {
      errors.AKidsOk = 'Amenity Kids Ok is invalid';
      formIsValid = false;
    }
    if (this.state.amenity.AImage == "") {
      errors.AImage = 'Amenity Image URL is invalid';
      formIsValid = false;
    }


    this.setState({errors: errors});
    return formIsValid;
}

  saveAmenity(event) {
    event.preventDefault();
    if (!this.amenityFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    let amenityToSubmit = this.state.amenity;

    this.props.actions.saveAmenity(amenityToSubmit)
    .then( () =>{
            this.redirect(this.state.amenity.VenueID);
      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

 redirect(venueID) {
      this.setState({saving: false});
      toastr.success('Amenity Saved Successfully');
      window.location = "/amenities/" + venueID;
  }

 cancelAmenity(event){
        event.preventDefault();
        this.context.router.push('/venues');
    }

 onVenueSelected(){
      return (e) => {
        e.preventDefault();
        console.log(e.target.value);
        this.props.actions.setAmenityVenueID(e.target.value);
        if(e.target.value > 0){
            this.props.actions.manageAmenities(e.target.value);
        }
      };
   }

 onAmenitySelected(){
      return (e) => {
        e.preventDefault();
        console.log(e.target.value);
         let venueID = e.target.attributes["data-venueID"].value;
         if(venueID == undefined){
             venueID = 0
         }
        if(e.target.value > 0){
            this.props.actions.getAmenityByID(e.target.value)
            .then()
            .catch( error => {
                      toastr.error(error);
            });
        }
        else{
            this.props.actions.loadDefaultAmenity(venueID);
        }

      };
    }

  render() {
    let amenityFound = true;
    if((this.props.params.amenityId > 0) && (this.state.amenity.id == 0))
    {
        amenityFound = false;
    }
      console.log(this.state.amenity.VenueID);
     console.log("render");
    return (
        <div>
            <h1>Add/Edit Amenity</h1>
            {this.props.venues.length > 1 &&
                <div className="form-group">
                 <label htmlFor={"Venue"}>{"Venue"}</label>
                    <div className="field">
                             <select   name={"Venue"} className="btn btn-primary"
                                onChange={this.onVenueSelected()}
                                defaultValue={this.state.amenity.VenueID && this.state.amenity.VenueID > 0 ? this.state.amenity.VenueID: 0} >
                                <option key={0} value={0}>Select Venue</option>
                            {this.props.venues.map((venue, index) => {
                               return(<option key={venue.id} value={venue.id} >{venue.VName}</option>
                              );  })
                            }
                          </select>;
                          {this.state.errors.VenueID != undefined && this.state.errors.VenueID.length > 0
                              && <div className="form-group alert alert-danger has-error">{this.state.errors.VenueID}</div>}
                    </div>
                </div>}
            {this.props.amenities && this.props.amenities.length > 1 &&
                <div className="form-group">
                    <label htmlFor={"Amenities"}>{"Amenities"}</label>
                    <div className="field">
                             <select  data-venueID={this.state.amenity.VenueID}  name={"Amenities"} className="btn btn-primary"
                                onChange={this.onAmenitySelected()}
                                defaultValue={this.state.amenity.id && this.state.amenity.id > 0 ? this.state.amenity.id: 0} >
                                <option key={0} value={0}>New Amenity</option>
                                {this.props.amenities.map((amenity, index) => {
                               return(<option key={amenity.id} value={amenity.id} >{amenity.AName}</option>
                              );  })
                            }
                          </select>;
                      </div>
                </div>}
                <div>
             {amenityFound &&
                     <ManageAmenityForm
                        amenity={this.state.amenity}
                        onChange={this.updateAmenityState}
                        onSave={this.saveAmenity}
                        errors={this.state.errors}
                        saving={this.state.saving}
                        onCancel={this.cancelAmenity}
                    />}
            {!amenityFound &&
                <h3>Amenity Not Found</h3>
            }
            <br/><br/>
            </div>
        </div>
    );
  }
}

ManageAmenityPage.propTypes = {
  venue: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  amenity: PropTypes.object,
  venues: PropTypes.array,
  amenities: PropTypes.array
};

//Pull in the React Router context so router is available on this.context.router.
ManageAmenityPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
    console.log("here");
    console.log(state.manageAmenity.amenity);
  return {
        amenity: state.manageAmenity.amenity,
        venues: state.manageAmenity.venues,
        amenities: state.manageAmenity.amenities
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(amenityActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAmenityPage);
