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
    this.getDropdown = this.getDropdown.bind(this);
  }


  componentWillMount() {
    this.loadVenues();
    if(this.props.amenity.VenueID == 0 && this.props.params.venueID != 0){
      console.log("here");
        this.props.actions.setAmenityVenueID(this.props.params.venueID);
    }
  // debugger;
  //
  //       if (this.props.params.amenityId > 0 && this.props.params.amenityId != this.props.amenity.id ) {
  //             this.LoadProps(this.props.params.amenityId);
  //         }
  //       else{
  //           if(this.props.amenity.id > 0){
  //                this.props.actions.LoadDefaultAmenity();
  //           }
  //       }
  }
  componentWillReceiveProps (nextProps) {
     if(this.props.amenity.Id !== nextProps.amenity.id) {
          this.setState({amenity: Object.assign({}, nextProps.amenity)});
     }
  }

  loadVenues(){
    this.props.actions.loadVenues()
    .then()
    .catch( error => {
        toastr.error(error);
    });
  }
  LoadProps(amenityId){
      this.props.actions.loadAmenityByID(amenityId)
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

// populateVenueDrodown(){
//   let items = this.props.venues;
//        for (let i = 0; i <= this.props.maxValue; i++) {
//             items.push(<option key=i value=i>{i["VName"]}</option>);
//        }
//        return items;
// }

getDropdown(){
  let i = 0;
  let options = this.props.venues.map(function (option) {
       return React.createElement(
           'option',
           { value: option, key: i++ },
           option
       );
   });
  return React.createElement(
       'select',
       { onChange: this.onVenueSelected },
       options
   );
}
onVenueSelected(){
  return (e) => {
    e.preventDefault();
  console.log(e.target.value);
  };
}
  render() {
    console.log(this.state.amenity.VenueID);
    console.log(this.props.params.venueID);

    // var Data     = ['this', 'example', 'isnt', 'funny'],
    //     MakeItem = function(X) {
    //        return <option>{X}</option>;
    //     };

    let amenityFound = true;
    if((this.props.params.amenityId > 0) && (this.state.amenity.id == 0))
    {
        amenityFound = false;
    }
    console.log(this.props.venues);

    return (
        <div>
            <div>
                // {this.getDropdown()}
              {this.props.venues.length > 1 && <select>{this.props.venues.map((venue, index) => {
                           return(<option key={venue.id} value={venue.id}>{venue.VName}</option>
                          );  })

                  }</select>};
            </div>
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
  venues: PropTypes.array
};

//Pull in the React Router context so router is available on this.context.router.
ManageAmenityPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  console.log(state.manageAmenity.venues)
  return {
        amenity: state.manageAmenity.amenity,
        venues: state.manageAmenity.venues
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(amenityActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAmenityPage);
