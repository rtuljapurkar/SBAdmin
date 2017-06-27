import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import {Button, Glyphicon, SplitButton, MenuItem} from 'react-bootstrap';

//  --------------------------------------------------------------------------------------------------------------//
//const AmenitiesTable = ({ Amenity }) => {
  class AmenitiesTable extends React.Component{
      constructor(props){
          super(props);
          this.redirectToDisable = this.redirectToDisable.bind(this);
          this.redirectToEnable = this.redirectToEnable.bind(this);
          this.redirectToManage = this.redirectToManage.bind(this);
      }
  redirectToDisable(){
      this.props.onDisable(this.props.Amenity);
  }

  redirectToEnable(){
      this.props.onEnable(this.props.Amenity);
  }

  redirectToManage(){
      this.props.onManage(this.props.Amenity);
  }
  render(){
    const {Amenity,  onDisable, onEnable, onManage} = this.props;
    let id = Amenity["id"];
    let active = Amenity["Active"];
    let rowHeader = [];
    let rows = [];
    let rowImage = [];
    let buttonRow = [];
    let parkingFields = ['AName', 'AImage', 'ASection','AType','ATags','ACost','ADistance','AWalkingTime','ALotLocation'];
    let foodFields = ['AName', 'AImage', 'AType', 'ASection','AChildAmenity','AMainFood','AVeggieFood','AVeganFood', 'AGFFood',
                          'ABeverages','ADomesticBeer','ACraftBeer','AMixedDrinks'];
    let informationFields = ['AName', 'AImage', 'ASection','AType','ATags'];
    let merchandiseFields = ['AName', 'AImage', 'ASection','AType','ACost','ATags'];
    let restroomsFields = ['AName', 'AImage', 'AChildAmenity', 'ASection','AType', 'ATags'];


    for (let key in Amenity)
    {
        if (Amenity.hasOwnProperty(key)
              && key!= "id" && key!= "VenueID" && key!= "ASubType" && key!= "Active"
          ) {
                   if( (Amenity["AType"].toLowerCase() == "parking" && parkingFields.indexOf(key) != -1) ||
                       (Amenity["AType"].toLowerCase() == "food and beverage" && foodFields.indexOf(key) != -1)  ||
                       (Amenity["AType"].toLowerCase() == "information" && informationFields.indexOf(key) != -1)  ||
                       (Amenity["AType"].toLowerCase() == "merchandise" && merchandiseFields.indexOf(key) != -1)  ||
                        (Amenity["AType"].toLowerCase() == "restrooms" && restroomsFields.indexOf(key) != -1)  ||
                       (  Amenity["AType"].toLowerCase() != "parking"
                          && Amenity["AType"].toLowerCase() != "food and beverage"
                          && Amenity["AType"].toLowerCase() != "information"
                          && Amenity["AType"].toLowerCase() != "merchandise"
                          && Amenity["AType"].toLowerCase() != "restrooms")
                      )
                   {

                      let value = Amenity[key] == null ? "": Amenity[key];
                      let modifiedkey = key.substr(1);
                      if(modifiedkey == "Name"){
                          rowHeader.push(<b key={id} style={{"fontSize":"24px"}}>{value}&nbsp;&nbsp;&nbsp;&nbsp;</b> );
                           {active == 1 &&   rowHeader.push(
                                          <Button key={id+"disable"} bsStyle="danger" onClick={this.redirectToDisable}  bsSize="small" >
                                              <Glyphicon glyph="pencil" />  Disable
                                          </Button>
                                      );}
                            {active == 0 &&   rowHeader.push(
                                           <Button key={id+"enable"} bsStyle="success" onClick={this.redirectToEnable}  bsSize="small" >
                                               <Glyphicon glyph="pencil" />  Enable
                                           </Button>
                                       );          }

                          buttonRow.push(<a key={id+"review"} href={"/posts/amenities/add/"+id}>
                                          <Button bsStyle="primary" bsSize="small" >
                                              <Glyphicon glyph="pencil" />  Review
                                          </Button>
                                      </a>);
                          buttonRow.push(<b key={id}>&nbsp;&nbsp;&nbsp;&nbsp;</b>);
                          buttonRow.push(<Button key={id+"Button"} bsStyle="primary" onClick={this.redirectToManage}  bsSize="small" >
                                              <Glyphicon glyph="pencil" />  Edit
                                          </Button>
                                    );
                      }
                      else if(modifiedkey == "Image"){
                              rowImage.push(<img src={value} key={id} height="200" width="200" alt=""/>);
                      }
                      else
                       {
                          rows.push(<span key={modifiedkey+id}  className="spanAmenities">{modifiedkey}: {value}<br/> </span>);
                       }

                  }
            }
     }

    return (
             <div className="blackBg">
                    <div className="ib" >{rowHeader}</div>
                    <div className="ibright">{buttonRow}</div>
                    <div className="ib">{rows}</div>
                    <div className="ibright">{rowImage}</div>
                    <div className="break">&nbsp;</div>
             </div>

    );
  }

}

AmenitiesTable.propTypes = {
  sortBy: PropTypes.func,
  filterBy: PropTypes.func,
  // state data
  data: PropTypes.array,
  filterString: PropTypes.string,
  filterType: PropTypes.string,
  sortKey: PropTypes.string,
  sortDesc: PropTypes.bool,
  amenities: PropTypes.object,
  actions:PropTypes.object,
  Amenity: PropTypes.object,
  onDisableVenue: PropTypes.func,
  onEnableVenue: PropTypes.func,
  onDisable: PropTypes.func,
  onEnable: PropTypes.func,
  onManage: PropTypes.func
};

export default AmenitiesTable;
