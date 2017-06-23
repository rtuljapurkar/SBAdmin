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
  }


  componentWillMount() {
        if (this.props.params.amenityId > 0 && this.props.params.amenityId != this.props.amenity.id ) {
              this.LoadProps(this.props.params.amenityId);
          }
        else{
            if(this.props.amenity.id > 0){
                 this.props.actions.LoadDefaultAmenity();
            }
        }
  }
  componentWillReceiveProps (nextProps) {
     if(this.props.amenity.Id !== nextProps.amenity.id) {
          this.setState({amenity: Object.assign({}, nextProps.amenity)});
     }
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

    if (this.state.amenity.VName == "") {
      errors.VName = 'Amenity Name is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ASection == "") {
      errors.VAddress = 'amenity Section is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AChildAmenity == "") {
      errors.VCity = 'amenity ChildAmenity is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AType == "") {
      errors.VState = 'amenity Type is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ASubType == "") {
      errors.VZip = 'amenity zip Sub Type is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AMainFood == "") {
      errors.VGPSLoc = 'amenity Main Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AVeggieFood == "") {
      errors.VDescription = 'amenity Veggie Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AVeganFood == "") {
      errors.VCapacity = 'amenity Vegan Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AGFFood == "") {
      errors.VDetails = 'amenity AGF Food is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ABeverages == "") {
      errors.VTags = 'amenity Beverages is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ADomesticBeer == "") {
      errors.VImage = 'amenity Domestic Beer is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ACraftBeer == "") {
      errors.VCapacity = 'amenity Craft Beer is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AMixedDrinks == "") {
      errors.VDetails = 'amenity Mixed Drinks is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ATags == "") {
      errors.VTags = 'amenity Tags is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ACost == "") {
      errors.VImage = 'amenity Cost is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ADistance == "") {
      errors.VCapacity = 'amenity Distance is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AWalkingTime == "") {
      errors.VDetails = 'amenity Walking Time is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.ALotLocation == "") {
      errors.VTags = 'amenity Lot Location is invalid';
      formIsValid = false;
    }

    if (this.state.amenity.AKidsOk == "") {
      errors.VImage = 'amenity Kids Ok is invalid';
      formIsValid = false;
    }
    if (this.state.amenity.AImage == "") {
      errors.VImage = 'amenity Image URL is invalid';
      formIsValid = false;
    }


    this.setState({errors: errors});
    return formIsValid;
  }


  saveAmenity(event) {
      debugger;
    event.preventDefault();
    if (!this.amenityFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    let amenityToSubmit = this.state.amenity;

    this.props.actions.saveAmenity(amenityToSubmit)
    .then( () =>{

                if(this.state.amenity.id > 0)
                {
                    this.redirect(1, this.state.amenity.id);
                }else{
                    this.redirect(0, 0);
                }

      })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

 redirect(amenityID) {
      this.setState({saving: false});
      toastr.success('Amenity Saved Successfully');
      window.location = "/venues/"; /* + venueID;*/


  }


cancelAmenity(event){
    event.preventDefault();
    this.context.router.push('/venues');
}

  render() {
    let amenityFound = true;
    if((this.props.params.amenityId > 0) && (this.state.amenity.id == 0))
    {
        amenityFound = false;
    }
    return (
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
        </div>
    );
  }
}

ManageAmenityPage.propTypes = {
  venue: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  amenity: PropTypes.object,
  poi: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManageAmenityPage.contextTypes = {
  router: PropTypes.object
};



function mapStateToProps(state, ownProps) {
  return {
              amenity: state.manageAmenity.amenity
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(amenityActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAmenityPage);
