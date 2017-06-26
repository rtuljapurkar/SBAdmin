import React  from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as pointOfInterestActions from '../../actions/pointOfInterestActions';
import ManagePOIForm from './ManagePOIForm';
import toastr from 'toastr';
import {PropTypes} from 'prop-types';

class ManagePOIPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      poi:  Object.assign({}, props.poi),
      errors: {},
      saving: false
    };


    this.updatePOIState = this.updatePOIState.bind(this);
    this.savePOI = this.savePOI.bind(this);
    this.cancelPOI= this.cancelPOI.bind(this);
  }


  componentWillMount() {

    if(this.props.poi.VenueID == 0 && this.props.params.venueID != 0){
        this.props.actions.setPOIVenueID(this.props.params.venueID);
    }

  }
  componentWillReceiveProps (nextProps) {
     if(this.props.poi.Id !== nextProps.poi.id) {
          this.setState({poi: Object.assign({}, nextProps.poi)});
     }
  }

  LoadProps(poiId){
      this.props.actions.loadPOIByID(poiId)
      .then()
      .catch( error => {
                toastr.error(error);
      });
    }

  updatePOIState(event) {
    const field = event.target.name;
    let poi = this.state.poi;
    poi[field] = event.target.value;
    return this.setState({poi: poi});
  }

   poiFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.poi.POIName == "") {
      errors.POIName = 'Name is invalid';
      formIsValid = false;
    }


    if (this.state.poi.POIType == "") {
      errors.POIType = 'Type is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POISubType == "") {
      errors.POISubType = 'Sub Type is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIAddress == "") {
      errors.POIAddress = 'Address is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POICity == "") {
      errors.POICity = 'City is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIState == "") {
      errors.POIState = 'State is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIZip == "") {
      errors.POIZip = 'Zip is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIGPSLoc == "") {
      errors.POIGPSLoc = 'GPS Location is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIPhone == "") {
      errors.POIPhone = 'Phone is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIDescription == "") {
      errors.POIDescription = 'Description is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIDetails == "") {
      errors.POIDetails = 'Details is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POITags == "") {
      errors.POITags = 'Tags is invalid';
      formIsValid = false;
    }
    if (this.state.poi.POIImage == "") {
      errors.POIImage = 'Image URL is invalid';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }


  savePOI(event) {
    event.preventDefault();
    if (!this.poiFormIsValid()) {
      return;
    }
    this.setState({saving: true});
    let poiToSubmit = this.state.poi;

    this.props.actions.savePOI(poiToSubmit)
    .then( () =>{
                  this.redirect(this.state.poi.VenueID);
                })
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

 redirect(venueID) {
      this.setState({saving: false});
      toastr.success('poi Saved Successfully');
      window.location = "/poi/" + venueID;

  }


cancelPOI(event){
    event.preventDefault();
    this.context.router.push('/venues');
}

  render() {    
    let poiFound = true;
    if((this.props.params.poiId > 0) && (this.state.poi.id == 0))
    {
        poiFound = false;
    }
    return (
        <div>
             {poiFound &&
                     <ManagePOIForm
                        poi={this.state.poi}
                        onChange={this.updatePOIState}
                        onSave={this.savePOI}
                        errors={this.state.errors}
                        saving={this.state.saving}
                        onCancel={this.cancelPOI}
                    />}
            {!poiFound &&
                <h3>poi Not Found</h3>
            }
            <br/><br/>

        </div>
    );
  }
}

ManagePOIPage.propTypes = {
  venue: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  poi: PropTypes.object
};

//Pull in the React Router context so router is available on this.context.router.
ManagePOIPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
        poi: state.managePOI.poi
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pointOfInterestActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePOIPage);
