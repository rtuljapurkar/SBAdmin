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

    this.loadVenues = this.loadVenues.bind(this);
    this.onVenueSelected = this.onVenueSelected.bind(this);
    this.onPOISelected = this.onPOISelected.bind(this);
  }


  componentWillMount() {
        this.loadVenues();
        if(this.props.params.venueID > 0 && this.props.params.venueID != this.props.poi.VenueID ){
             this.props.actions.loadDefaultPOI(this.props.params.venueID);
        }

        if(this.props.pointOfInterests.length == 1 && this.props.poi.VenueID > 0){
          this.props.actions.managePointOfInterests(this.props.poi.VenueID);
        }
    // if(this.props.poi.VenueID == 0 && this.props.params.venueID != 0){
    //     this.props.actions.setPOIVenueID(this.props.params.venueID);
    // }

  }
  componentWillReceiveProps (nextProps) {
      if(this.props.poi.id !== nextProps.poi.id  ||
                this.props.poi.VenueID !== nextProps.poi.VenueID) {

             if(this.props.poi.id != nextProps.poi.id){
                  this.setState({poi: Object.assign({}, nextProps.poi)});
             }

         if(this.props.poi.VenueID != nextProps.poi.VenueID){
             if(nextProps.poi.VenueID == 0){
                    //this.props.actions.loadDefaultPOI(nextProps.params.venueID);
                    this.setState({poi: Object.assign({}, nextProps.poi)});
                }
             else{
                    if(nextProps.poi.VenueID > 0){
                        this.props.actions.managePointOfInterests(nextProps.poi.VenueID);
                    //    this.props.actions.loadDefaultPOI(nextProps.params.venueID);
                         this.setState({poi: Object.assign({}, nextProps.poi)});
                      }
                }
         }
  }
}

loadVenues(){
   this.props.actions.loadVenues()
   .then()
   .catch( error => {
       toastr.error(error);
   });
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

    if (this.state.poi.VenueID == undefined || this.state.poi.VenueID == "0") {
          errors.VenueID = 'Venue is invalid';
          formIsValid = false;
    }

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

onVenueSelected(){
      return (e) => {
        e.preventDefault();
        this.props.actions.setPOIVenueID(e.target.value);
        if(e.target.value > 0){
            this.props.actions.managePointOfInterests(e.target.value);
        }
      };
   }

 onPOISelected(){
      return (e) => {
        e.preventDefault();
         let venueID = e.target.attributes["data-venueID"].value;
         if(venueID == undefined){
             venueID = 0;
         }
         if(e.target.value > 0){
            this.props.actions.getPOIByID(e.target.value)
            .then()
            .catch( error => {
                      toastr.error(error);
            });
        }
        else{
            this.props.actions.loadDefaultPOI(venueID);
        }

      };
    }

    sortData (data, sortKey) {
      const multiplier =  1;
      data.sort((a, b) => {
        const aVal = a[sortKey] || 0;
        const bVal = b[sortKey] || 0;
        return aVal > bVal ? multiplier : (aVal < bVal ? -multiplier : 0);
      });
      return data;
    }


    render() {
      let poiFound = true;
      if((this.props.params.poiId > 0) && (this.state.poi.id == 0))
      {
          poiFound = false;
      }
      let venues = [];
      venues = this.sortData (this.props.venues, "VName");
      return (
          <div>
              <h1>Add/Edit Point Of Interest</h1>
                  {this.props.venues.length > 1 &&
                   <div className="form-group">
                       <label htmlFor={"Venue"}>{"Venue"}</label>
                          <div className="field">
                                   <select   name={"Venue"} className="btn btn-primary"
                                      onChange={this.onVenueSelected()}
                                      value={this.state.poi.VenueID}>
                                      <option key={0} value={0}>Select Venue</option>
                                  {venues.map((venue, index) => {
                                     return(<option key={venue.id} value={venue.id} >{venue.VName}</option>
                                    );  })
                                  }
                                </select>;
                                {this.state.errors.VenueID != undefined && this.state.errors.VenueID.length > 0
                                    && <div className="form-group alert alert-danger has-error">{this.state.errors.VenueID}</div>}
                          </div>
                   </div>}
                  {this.props.pointOfInterests && this.props.pointOfInterests.length > 1 &&
                       <div className="form-group">
                              <label htmlFor={"POIS"}>{"Points Of Interest"}</label>
                              <div className="field">
                                       <select  data-venueID={this.state.poi.VenueID}  name={"POIS"} className="btn btn-primary"
                                          onChange={this.onPOISelected()}
                                          defaultValue={this.state.poi.id && this.state.poi.id > 0 ? this.state.poi.id: 0} >
                                          <option key={0} value={0}>New Point Of Interest</option>
                                          {this.props.pointOfInterests.map((poi, index) => {
                                         return(<option key={poi.id} value={poi.id} >{poi.POIName}</option>
                                        );  })
                                      }
                                    </select>;
                                </div>
                          </div>}
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
          </div>
      );
    }

}

ManagePOIPage.propTypes = {
  venue: PropTypes.object,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  poi: PropTypes.object,
  venues: PropTypes.array,
  pointOfInterests: PropTypes.array
};

//Pull in the React Router context so router is available on this.context.router.
ManagePOIPage.contextTypes = {
  router: PropTypes.object
};


function mapStateToProps(state, ownProps) {
  return {
        poi: state.managePOI.poi,
        venues: state.managePOI.venues,
        pointOfInterests: state.managePOI.pointOfInterests
    };
}


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pointOfInterestActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePOIPage);
